# Cine Connect Corporate Web — Visual V3 + Live Supabase

This package preserves the original cinematic homepage and now server-fetches **active crafts, public articles and public magazines** from the real Cine Connect Supabase project.

## Windows setup
1. Extract the ZIP so that `E:\CineConnect_Corporate_Web\frontend\package.json` exists.
2. In PowerShell:

```powershell
Set-Location 'E:\CineConnect_Corporate_Web\frontend'
Copy-Item '.env.example' '.env.local' -ErrorAction Stop
npm install
npm run dev -- -p 3001
```

3. Visit http://localhost:3001 and look for **LIVE SUPABASE** inside Crafts and Magazine. Connection failures appear explicitly, with no fake live counts.

### Security and media
The only key included is a **public publishable key**, not a privileged service key. This package does not make database changes. Existing production RLS grants on `crafts` and `media_server_storage_paths` require separate security remediation before public deployment.

**V4 media integration is NOT complete:** existing media routes are not safely publication-bound. The corporate site intentionally does not try to fetch images using raw storage keys. Published article text, names, craft labels and magazine records are live. Craft icon, article thumbnail and magazine cover delivery requires an authorized V4 editorial API, installed and tested separately.

Use `npm run test` and `npm run typecheck` after installing dependencies.
