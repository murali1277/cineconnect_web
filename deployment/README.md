# Deployment — NOT READY FOR PUBLIC CUTOVER

1. Confirm Hostinger hosting plan actually supports Node.js/Next.js server runtime, or select compatible independent hosting; do not upload Next.js source as plain HTML and expect it to work.
2. Run `npm install`, `npm run typecheck`, `npm test`, and `npm run build` in `frontend`.
3. Configure deployment environment variables on server. Never put secrets in Next.js `NEXT_PUBLIC_*` values.
4. Protect staging from anonymous indexing and unwanted use.
5. First release website design with public content reads; wait until the new V4 editorial API is installed and security tested before setting `PUBLIC_EDITORIAL_MEDIA_BASE_URL`.
6. Make a separate planned authorization correction to existing Supabase policies; validate Flutter/Admin usage before any change.
7. Snapshot existing public site and make rollback plan. Perform production cutover only after live staging acceptance.
