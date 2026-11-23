# Trainera website

The public website at **trainera.ai**: the home page, Book a demo, the privacy
policy, the promo video page and two CSIA share pages.

The Trainera **app** (app.trainera.ai) is a separate project in a separate
repository. Nothing in this repository can reach the app's data, and this
site needs no passwords, keys or environment variables.

## Run it on your computer

You need Node.js 22.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Before you open a pull request, run all three checks (CI runs them too):

```bash
npm run typecheck
npm run lint
npm run build
```

## Where things are

| Page | Address | File |
|---|---|---|
| Home page | `/` | `components/landing/premium-page.tsx` (styles in `components/landing/premium.css`) |
| Header and menu | | `components/landing/landing-nav.tsx` |
| Book a demo | `/book-a-demo` | `app/book-a-demo/page.tsx`, form in `app/book-a-demo/demo-form.tsx` |
| Privacy policy | `/privacy` | `app/privacy/page.tsx` (needs the owner's approval, see below) |
| Promo video | `/promo` | `app/promo/page.tsx` |
| CSIA program video | `/CCCE` | `app/ccce/page.tsx` |
| CSIA welcome tour | `/CSIAvideo` | `app/csiavideo/page.tsx` |
| Pictures and videos | | `public/` |
| Search engine list | `/sitemap.xml` | `app/sitemap.ts` (add new public pages here) |

**Any address without a page here is sent on to the app** (for example
`trainera.ai/login` goes to `app.trainera.ai/login`). That is
`app/[...path]/route.ts`; leave it in place. A new page you add always wins
over it.

## How the site connects to the app

Only two things, both in `lib/site.ts`:

- **Log in** links go to `https://app.trainera.ai/login`. Always use
  `appLoginUrl()` and a plain `<a href>`, never `next/link` and never a
  relative `/login`.
- **The Book a demo form** sends its answers to
  `https://app.trainera.ai/api/demo-request`. The app stores the request and
  emails the team. The app only accepts the form from trainera.ai,
  www.trainera.ai, this project's Vercel previews and your own computer.

Requests sent from a preview or from your computer still reach the team's
real inbox, labelled "[Test]" in the subject. Please keep test submissions
to a minimum.

## Rules for this site

These are the owner's rules. Please follow them in every change.

1. **No dashes in the words people read.** No em dashes, no en dashes, no
   hyphenated words, no ` · ` separators in sentences. Rewrite the sentence
   instead: "teams that talk to customers" (not "customer-facing"),
   "online courses" (not "e-learning"). Page titles use a pipe:
   `Trainera | Book a demo`.
2. **Never mention Citrus** (or Citrus 360, or citrusgroup.com.au) anywhere:
   copy, alt text, links, page titles or metadata.
3. **Colours.** Logo orange `#F7841E`, charcoal `#211F1C`. Text on an orange
   button is charcoal, never white (white on this orange is too faint to
   read). Small orange text uses `#B14C15`. Every bit of text must pass
   WCAG AA contrast: 4.5:1, or 3:1 for large text.
4. **Don't promise what the product doesn't do.** Claims about features,
   timings, accents, data storage and so on are checked against the app
   before they go live. Ask the owner before adding a new claim. In
   particular, the data answer in the FAQ must stay as written: the database
   and uploaded files are stored in Australia (Sydney), and conversations
   are processed by AI and voice providers.
5. **Never name the outside companies we use** (AI model, voice, hosting
   and so on) on the website.
6. **Fonts are bundled** (`@fontsource-variable/...`). Don't load fonts from
   Google (`next/font/google`) or any other outside server.
7. **Keep `id="s-hero"` on the home page hero.** The smooth scrolling of the
   menu links depends on it (`app/globals.css`).
8. **Animation** must stop for people who ask for reduced motion
   (`prefers-reduced-motion`), without hiding any content.
9. **Pictures:** use `next/image`, keep files small (WebP where you can) and
   always write useful `alt` text.

## The privacy policy needs the owner's approval

`app/privacy/page.tsx` is a legal document that customer contracts point at.
Every statement in it is a promise about how the app handles data, so
changes to it need the owner's review (see `.github/CODEOWNERS`).

## Before you ship a change

Check every page you touched at desktop width (1440px) and phone width
(390px):

- nothing runs off the side of the screen (no sideways scrolling),
- text contrast passes AA,
- no dashes and no "Citrus" anywhere in the page (open every FAQ item too),
- every link and button goes where it should,
- the browser console shows no errors.

## Deployment

Vercel builds every pull request into a preview with its own address, and
deploys `main` to trainera.ai when a pull request is merged. There is
nothing to configure: the site has no secrets.
