# Cine Connect Corporate Web — initial isolated scaffold

This is a **working initial Next.js/TypeScript frontend scaffold**, not a production V4 integration or a replacement for your Flutter/Admin system.

## What is included
- Next.js App Router with real home, crafts, articles, magazine, collaboration, opportunities, learning and contact routes.
- Dynamic article and magazine detail pages.
- Responsive corporate visual system with the left-focus hero and right-side navigation panel.
- Read-only Supabase REST content adapter for existing crafts, articles, magazines.
- Clearly labeled illustrative content while the public publishable key is absent; when configured, database errors show an honest unavailable state.
- Proposed *disabled-by-default* record-bound editorial image URL builder, ready for the future V4 API, not connected to legacy by-key routes.
- Contact form opens an email draft; a backend submission service has not been configured.
- Tests, gitignore, deployment checklist, and security gates.

## Local setup (Windows PowerShell)
```powershell
Expand-Archive .\CineConnect_Corporate_Web.zip -DestinationPath E:\ -Force
Set-Location E:\CineConnect_Corporate_Web\frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```
Open http://localhost:3000.

## Configure real content
Set `SUPABASE_PUBLISHABLE_KEY` in `.env.local` to the current **publishable** key. The project URL is preset to Cine Connect.
The adapter uses only the selected public content fields and requests explicitly published rows. This is NOT a substitute for server-side grant/RLS hardening.

## Images
Leave `PUBLIC_EDITORIAL_MEDIA_BASE_URL` unset until the new V4 editorial routes are installed, security tested, and accessible through HTTPS. Without that configuration, cards show cinematic graphic placeholders.

## Never do in this project
- Do not put service_role/secret keys in browser code or `.env.local` intended for disclosure.
- Do not expose the existing arbitrary by-key or by-storage-path endpoint as a public media shortcut.
- Do not modify your existing Flutter, Admin Dashboard, Cloudflare Tunnel or V4 transaction modules in order to run this scaffold.
- Do not publish publicly until security/RLS and media-auth closure gates pass.

## Caveats
- No Git history, screenshots, npm lockfile, host-specific deployment or production browser acceptance has been included at scaffold stage.
- Next.js dependencies are pinned by major/runtime versions; `npm install` on the user's host generates a `package-lock.json`, which should be committed before staging/production deployments.
- Remote background photographs require internet access; CSS gradients preserve layout when unavailable.
