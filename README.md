# Farmulya

Farmer-facing booking site for a farm machinery pilot (Gaspardo seeder, bed former, Protektor
sprayer, groundnut digger) around Mota Asrana, Mahuva, Saurashtra. There is no backend: the
site's only output is a pre-filled WhatsApp link. Payment is cash-only this season.

## Stack

React 18 + Vite + TypeScript + Tailwind + shadcn/ui, client-side routed with react-router-dom,
deployed on Cloudflare Pages.

## Getting started

```sh
npm i
npm run dev
```

Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## Where things live

- `src/config.ts` — the WhatsApp number and the GA4 measurement ID.
- `src/data/implements.ts` — the pilot machines: pricing, coverage, crops, copy.
- `src/pages/Appointments.tsx` — the booking form; builds the WhatsApp message and the cost estimate.
- `src/contexts/LanguageContext.tsx` — Gujarati/English strings used via `useLanguage()`/`t()`.
- `src/lib/analytics.ts` — GA4 wiring (gated on `GA_ID` being set in `src/config.ts`).

## Deploying

Push to the deployed branch; Cloudflare Pages builds with `npm run build` and serves `dist/`.
