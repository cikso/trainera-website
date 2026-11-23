# Notes for AI coding tools

This repository is the public website at trainera.ai. Read `README.md` first:
its "Rules for this site" section is binding on every change, in particular
no dashes in visible copy, never mentioning Citrus, AA contrast, and no new
product claims without the owner's approval.

- The app (app.trainera.ai) is a different repository. This site must never
  hold keys, passwords or environment secrets, and must never call any
  service other than the app's public `/api/demo-request` endpoint.
- `lib/site.ts` is the only place the app's address is written.
- `app/privacy/page.tsx` is a legal document; propose changes, don't make
  them on your own.
- Run `npm run typecheck`, `npm run lint` and `npm run build` before
  finishing, and check changed pages in a browser at 1440px and 390px.
