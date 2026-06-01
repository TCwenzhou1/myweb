import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const url = process.argv[2] || 'http://127.0.0.1:3000/reverse-sanguosha/play'
const port = Number(process.argv[3] || 9334)
const edgePath =
  process.env.MSEDGE_PATH ||
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const outDir = path.resolve('playwright-mcp-artifacts')
const screenshotPath = path.join(outDir, 'reverse-sanguosha-play-cdp.png')
const userDataDir = path.resolve('.playwright-mcp', `reverse-sanguosha-edge-${port}`)

async function fetchJson(targetUrl) {
  const response = await fetch(targetUrl)
  if (!response.ok) throw new Error(`${targetUrl} returned ${response.status}`)
  return response.json()
}

async function waitForVersion() {
  const deadline = Date.now() + 30000
  let lastError
  while (Date.now() < deadline) {
    try {
      return await fetchJson(`http://127.0.0.1:${port}/json/version`)
    } catch (error) {
      lastError = error
      await sleep(300)
    }
  }
  throw lastError || new Error('Edge CDP did not start.')
}

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.nextId = 1
    this.pending = new Map()
    this.listeners = new Map()
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl)
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('WebSocket connect timeout')), 10000)
      this.ws.addEventListener('open', () => {
        clearTimeout(timer)
        resolve()
      }, { once: true })
      this.ws.addEventListener('error', () => {
        clearTimeout(timer)
        reject(new Error('WebSocket error'))
      }, { once: true })
    })
    this.ws.addEventListener('message', event => this.#onMessage(event.data))
  }

  #onMessage(raw) {
    const message = JSON.parse(raw)
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id)
      this.pending.delete(message.id)
      if (message.error) reject(new Error(`${message.error.message}: ${JSON.stringify(message.error.data || '')}`))
      else resolve(message.result)
      return
    }
    for (const listener of this.listeners.get(message.method) || []) listener(message.params)
  }

  on(method, callback) {
    const listeners = this.listeners.get(method) || []
    listeners.push(callback)
    this.listeners.set(method, listeners)
  }

  send(method, params = {}) {
    const id = this.nextId++
    this.ws.send(JSON.stringify({ id, method, params }))
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id)
          reject(new Error(`${method} timed out`))
        }
      }, 60000)
    })
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true,
    })
    if (result.exceptionDetails) throw new Error(`Evaluation failed: ${result.exceptionDetails.text}`)
    return result.result?.value
  }

  close() {
    this.ws?.close()
  }
}

await mkdir(outDir, { recursive: true })

const browser = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--remote-allow-origins=*',
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu',
  'about:blank',
], { stdio: 'ignore' })

try {
  const version = await waitForVersion()
  const browserClient = new CdpClient(version.webSocketDebuggerUrl)
  await browserClient.connect()
  const { targetId } = await browserClient.send('Target.createTarget', { url: 'about:blank' })
  const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`)
  const target = targets.find(item => item.id === targetId)
  const pageClient = new CdpClient(target.webSocketDebuggerUrl)
  await pageClient.connect()

  const consoleRows = []
  const networkFailures = []
  const dialogs = []
  pageClient.on('Runtime.consoleAPICalled', params => {
    const text = (params.args || []).map(arg => arg.value ?? arg.description ?? '').join(' ')
    consoleRows.push({ level: params.type, text })
  })
  pageClient.on('Network.loadingFailed', params => {
    networkFailures.push(params)
  })
  pageClient.on('Page.javascriptDialogOpening', async params => {
    dialogs.push(params)
    await pageClient.send('Page.handleJavaScriptDialog', { accept: true }).catch(() => undefined)
  })

  await pageClient.send('Page.enable')
  await pageClient.send('Runtime.enable')
  await pageClient.send('Network.enable')
  await pageClient.send('Page.navigate', { url }).catch(error => {
    console.warn(`Page.navigate did not settle before probe timeout: ${error.message}`)
  })
  await sleep(45000)

  let screenshotError = null
  try {
    const screenshot = await pageClient.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    })
    await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'))
  } catch (error) {
    screenshotError = error.message
  }

  let diagnostics = null
  let diagnosticsError = null
  let directGameDiagnostics = null
  let directGameDiagnosticsError = null
  try {
    diagnostics = await pageClient.evaluate(`(() => {
      const iframe = document.querySelector('iframe');
      let frameData = null;
      let frameAccessError = null;
      try {
        const frameWindow = iframe?.contentWindow || window;
        const frameDocument = iframe?.contentDocument || document;
        const text = frameDocument?.body?.innerText || '';
        frameData = {
          iframeReadyState: frameDocument?.readyState || null,
          iframeLocation: frameWindow?.location?.href || null,
          runtime: frameWindow?.__nonameRuntime || window.__nonameRuntime || null,
          hasGameRoot: !!frameDocument?.querySelector('#arena, .arena, #window, .window'),
          bodyTextStart: text.slice(0, 220),
        };
      } catch (error) {
        frameAccessError = error?.message || String(error);
      }
      return {
        title: document.title,
        iframeSrc: iframe?.src || null,
        frameAccessError,
        frameData,
      };
    })()`)
  } catch (error) {
    diagnosticsError = error.message
  }

  const iframeSrc = diagnostics?.iframeSrc
  if (iframeSrc) {
    try {
      await pageClient.send('Page.navigate', { url: iframeSrc }).catch(error => {
        console.warn(`Direct game Page.navigate did not settle before probe timeout: ${error.message}`)
      })
      await sleep(20000)
      directGameDiagnostics = await pageClient.evaluate(`(() => {
        const text = document.body?.innerText || '';
        return {
          title: document.title,
          location: location.href,
          readyState: document.readyState,
          runtime: window.__nonameRuntime || null,
          hasGameRoot: !!document.querySelector('#arena, .arena, #window, .window'),
          bodyTextStart: text.slice(0, 220),
        };
      })()`)
    } catch (error) {
      directGameDiagnosticsError = error.message
    }
  }

  console.log(JSON.stringify({
    diagnostics,
    diagnosticsError,
    directGameDiagnostics,
    directGameDiagnosticsError,
    screenshotError,
    dialogs,
    consoleRows: consoleRows.slice(-50),
    networkFailures: networkFailures.slice(-50),
    screenshotPath,
  }, null, 2))
  pageClient.close()
  browserClient.close()
} finally {
  browser.kill()
}
