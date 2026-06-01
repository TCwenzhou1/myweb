# Reverse Sanguosha Public Play Deployment

Date: 2026-06-01

## Decision

Do not deploy the full Reverse Sanguosha runtime inside the MYweb/Vercel site.

The game runtime is over 1GB and requires root-level browser file API routes such as `/checkFile`, `/readFile`, `/getFileList`, and `/writeFile`. MYweb should stay a portfolio site and embed a separate game runtime service.

## Target Shape

- `https://www.tcwenzhou.site` hosts MYweb.
- `https://game.tcwenzhou.site` hosts the playable Reverse Sanguosha runtime.
- MYweb embeds the game with:

```env
NEXT_PUBLIC_REVERSE_SANGUOSHA_GAME_URL=https://game.tcwenzhou.site/index.html
```

Local development can point to:

```env
NEXT_PUBLIC_REVERSE_SANGUOSHA_GAME_URL=http://127.0.0.1:8088/index.html
```

## Game Server

The standalone server lives at:

```text
E:\PROJECT\Reverse sanguosha\workspace\reverse-sanguosha-web-server
```

It provides:

- static game resource serving
- patched browser HTML bootstrap
- root-path module compatibility
- browser file API compatibility
- per-visitor cookie session overlays for writes/saves

The source runtime remains read-only:

```text
E:\PROJECT\Reverse sanguosha\noname\resources\app
```

## Local Run

```powershell
cd "E:\PROJECT\Reverse sanguosha\workspace\reverse-sanguosha-web-server"
$env:PORT = "8088"
$env:HOST = "127.0.0.1"
$env:GAME_ROOT = "E:\PROJECT\Reverse sanguosha\noname\resources\app"
$env:GAME_USER_ROOT = "E:\PROJECT\Reverse sanguosha\workspace\reverse-sanguosha-web-server\.data"
$env:COOKIE_SECURE = "false"
node server.mjs
```

Smoke:

```powershell
$env:SMOKE_URL = "http://127.0.0.1:8088"
node tools\smoke.mjs
```

## Production Deployment

Use a Node host with persistent disk, for example:

- VPS
- Fly.io
- Railway
- Render

Set:

```env
PORT=8088
HOST=0.0.0.0
GAME_ROOT=/srv/reverse-sanguosha/app
GAME_USER_ROOT=/srv/reverse-sanguosha/data
PUBLIC_ORIGIN=https://www.tcwenzhou.site
COOKIE_SECURE=true
```

Reverse proxy:

```nginx
server {
  server_name game.tcwenzhou.site;

  location / {
    proxy_pass http://127.0.0.1:8088;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## Verification

Current local checks:

- `node --check server.mjs`
- `node --check tools\smoke.mjs`
- game server smoke: `7` HTTP checks passed
- MYweb build passes with `NEXT_PUBLIC_REVERSE_SANGUOSHA_GAME_URL=http://127.0.0.1:8088/index.html`
- browser smoke confirms:
  - MYweb iframe points to the standalone server
  - direct game runtime reports `profile=web adapter=browser bridge=false`
  - the game menu renders the expected mode labels

Expected public acceptance:

- `https://game.tcwenzhou.site/healthz` returns `success: true`
- `https://game.tcwenzhou.site/character/standard.js` returns `200`
- `https://game.tcwenzhou.site/checkFile?fileName=noname.js` returns `{"success":true,"data":"file"}`
- `https://game.tcwenzhou.site/index.html` reports `window.__nonameRuntime.profile === "web"`
- `https://www.tcwenzhou.site/reverse-sanguosha/play` shows the playable iframe
