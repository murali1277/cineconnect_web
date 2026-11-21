# V4 preservation / launch gates

## Critical confirmed risk
Previous live review identified anonymous write grants and permissive policies on `crafts` and `media_server_storage_paths`. Do not assume read-only frontend queries secure the entire database. Any RLS changes need consumer inventory and impact testing.

## Gate A: capture current installed baseline
1. Inventory active FastAPI PID/executable/route table.
2. Capture exact Flutter and Admin source SHA values.
3. Capture schema/RLS grants (read only), V4 policy and transaction contract, and active tunnel/DNS configuration.
4. Preserve proven authenticated-HLS 28-case baseline.

## Gate B: public content contract
- Anonymous may SELECT only intentionally published data.
- Unauthorized anonymous INSERT/UPDATE/DELETE must be denied by grants *and* RLS.
- No public API response exposes `absolute_local_path`, private storage keys, secrets or unapproved profile fields.
- Fail closed on unknown publication state.

## Gate C: editorial API (not implemented here)
- Introduce new router under `/v1/public/editorial/`, separately from legacy routes.
- Resolve from published craft/article/magazine record ID to approved media key and file.
- Validate path containment, file type, sizes, symlinks, cache invalidation, CORS and public GET/HEAD.
- Verify unpublished/draft/delete/replacement denial including cached thumbnail behavior.

## Gate D: cross-client regression
- Flutter profile switching, media upload/read/delete, private media denial, V4 job recovery and subscription visibility.
- Admin edit, preview, thumbnail, gallery, role-based permissions, media mutation and transaction recovery.
- No changes to HLS ticket behavior, no blanket closure of actively used old routes without migration.

## Gate E: deployment
- Protected staging first, versioned release, hashes/backups, smoke tests, performance limit and rollback.
- User approval before making any live production mutations.
