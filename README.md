# Mohamed Mahir

Personal site: Front-End Lead and Senior Full-Stack Engineer, Dubai. The site is built to be read as code as well as a page.

## What to look at

- [`docs/engineering-notes.md`](docs/engineering-notes.md): real problems from work on my CV, the principle behind each call, and the approach.
- [`app/domain`](app/domain): the logic behind the demos, with no framework in it and tested first in [`tests/unit`](tests/unit).
- [`server/utils/contact.ts`](server/utils/contact.ts): the contact form parses at the boundary and only reports success after delivery.
- [`tests/e2e`](tests/e2e): Playwright checks, including the recruiter's answer with JavaScript off and accessibility in both themes.
- [`.github/workflows/ci.yml`](.github/workflows/ci.yml): type-check, lint, unit and end-to-end gates on every push.

Built with Nuxt, Vue and strict TypeScript, working with Claude Code. No client code is in this repo.

## Run it

```bash
npm ci
npm run dev
```

```bash
npm run typecheck && npm run lint && npm test && npm run build && npm run test:e2e
```

The first end-to-end run needs `npx playwright install chromium`.

The contact form needs the settings in `.env.example`. Without them it refuses honestly with a 503, and the page points to email.
