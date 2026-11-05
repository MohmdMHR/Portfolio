# Engineering notes

How real problems from the work on my CV were solved, and the principles behind each call. Client names are withheld and appear on the CV. No client code is reproduced. Code samples are written for this page to show the pattern.

## One engine, many brands

**Setting:** multi-tenant iGaming platform. 4 React white-label platforms built from scratch, alongside the Vue 3 and Nuxt 3 player front-end, back office and Laravel backend.

**Problem:** every new brand is a chance to fork the product. Forks feel fast for one launch, then each fix has to be shipped many times.

**Principle:** Open/Closed (Martin). The engine stays closed to modification and open to extension. Separate what varies from what stays.

**Approach:** what varies per brand lives outside the code path: runtime theming, tokenized environment variables, and tenant data resolved by tenant ID. New brands onboard from a single engine.

## Stopping contract drift at the boundary

**Setting:** the same platform, with front-end apps depending on backend services.

**Problem:** TypeScript types disappear at runtime. A type says what the API should return, not what it did return. When the two disagree, the failure surfaces far from its cause.

**Principle:** parse, don't validate (Alexis King), and the Dependency Rule (Martin): the UI depends on its own model, never on a wire format.

**Approach:** the validation layer was rewritten across the whole app with Zod runtime schemas and typed service boundaries. Data is checked once where it enters, and everything inside can trust its type.

```ts
const Player = z.object({
  id: z.string(),
  currency: z.string().length(3),
})
type Player = z.infer<typeof Player>

// Beyond this line the app holds a checked Player.
const toPlayer = (raw: unknown): Player => Player.parse(raw)
```

## Thin controllers in a legacy backend

**Setting:** Laravel endpoints behind the platform, a codebase with history.

**Problem:** fat controllers mix HTTP, business rules and persistence, and partial writes are expensive where audit matters. Rewriting everything at once is not an option.

**Principle:** Single Responsibility and the Boy Scout Rule (Martin), and a transaction as one consistency boundary.

**Approach:** new and refactored controllers are thin, with logic in services and actions. Older ones stay thick until there is a reason to touch them. DTO patterns give a request one explicit shape, and atomic database transactions mean a business operation commits whole or not at all.

## Rewriting a checkout without gambling on it

**Setting:** high-traffic minicart, checkout and localised payment flows on a multi-store European e-commerce platform. Led the migration of core modules to Vue and TypeScript, working across three squads against Symfony services.

**Problem:** checkout rules were tangled with presentation, so a UI change could break a business rule, and revenue was at risk during any rewrite.

**Principle:** Domain-Driven Design (Evans), the Dependency Rule (Martin), test-first (Beck), and separating deploy from release with feature flags.

**Approach:** a total rewrite, proven in staging, with much of the development behind feature flags so unfinished work could ship without reaching customers. Domain rules were isolated from UI presentation and written test-first, so they could be read and tested without rendering a component. Contract compatibility with Symfony services was kept strict.

## Introducing TypeScript to code that was already running

**Setting:** legacy Vue repositories on a European retail platform.

**Problem:** a big-bang rewrite was not an option, and untyped data contracts kept producing runtime regressions.

**Principle:** seams (Feathers, *Working Effectively with Legacy Code*), and the Boy Scout Rule (Martin): leave the code cleaner than you found it.

**Approach:** TypeScript was introduced incrementally to enforce consistent data contracts, with strictness tightening as files were touched. Git workflows, review protocols and CI checks were standardised across squads at the same time, so the gain stayed in place.

## Tokens as a shared language

**Setting:** design tokens across three squads on e-commerce, and Vue component libraries on shared tokens for national telecom portals.

**Problem:** without a shared vocabulary, each squad reinvents spacing and colour, and consistency depends on people remembering.

**Principle:** Ubiquitous Language (Evans), applied between design and code.

**Approach:** decisions were named once as tokens and consumed everywhere.

## Accessibility built into the component

**Setting:** Vue and Nuxt packages in a micro-frontend architecture on enterprise Java services, for a public procurement platform on the ARA Design System.

**Problem:** accessibility fixed page by page gets lost at the next change.

**Principle:** Don't Repeat Yourself (Hunt and Thomas): one authoritative place for the behaviour.

**Approach:** reusable, WCAG-compliant catalog pages and filtering flows, so every page using them inherited the behaviour.

## A coupon can only be redeemed once

**Setting:** NestJS microservices and PostgreSQL schemas for coupon generation, POS redemption and analytics, with React dashboards.

**Problem:** a coupon crosses systems, and a point-of-sale terminal retries when the network fails.

**Principle:** idempotency, and Dependency Inversion (Martin) through dependency injection.

**Approach:** redemption is idempotent, so a retry cannot redeem twice. Clean service layers with dependency injection, REST APIs documented in Swagger, JWT authentication, role-based access control and rate limiting.

## Moving reads off the backend

**Setting:** Algolia on a high-SKU retail catalog, and Elasticsearch on telecom catalogs.

**Problem:** faceted navigation asks many read questions per interaction, which is a poor fit for the transactional backend.

**Principle:** a read model apart from the write model (the idea behind CQRS, Young).

**Approach:** discovery moved to a search engine built for it, reducing backend query load and discovery latency.

## Working with Claude Code

**Setting:** the team's engineering workflow.

**Problem:** generated code arrives faster than anyone can review it.

**Principle:** contract-first. Strict domain modelling stays the ground truth, and AI accelerates execution inside it.

**Approach:**
- Custom skills encode the team's conventions, constrained by domain interface models, so changes stay scoped.
- Every task starts from a plan.
- Strict TypeScript and DDD boundaries give the agent walls to work within. Tests come first, so it has a failing spec to satisfy.
- Type-check, lint, Vitest and Playwright block the merge, with human PR review after them.

**What gets rejected:**
- **Design decisions, most of all.** Code can pass every check and still be the wrong design. That call stays with the engineer.
- **Things only visible on screen.** Some decisions were rejected only after visual QA of the running UI, with the tests already green.
- **Bypassing a gate.** An agent trying to get past a gate is treated as a failure.
- **A fix in the wrong layer.** It wrote front-end code to cover a backend issue without saying so. A workaround like that hides the real bug, so it was rejected.
