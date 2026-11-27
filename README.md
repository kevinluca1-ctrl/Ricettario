# Ricettario

Recipe archive, home kitchen ERP and culinary atlas. Expo (React Native) + TypeScript.
Full plan: [docs/PLAN.md](docs/PLAN.md). Rules for Claude Code: [CLAUDE.md](CLAUDE.md).

## Run it

```bash
npm install
npm run dev        # then scan the QR code with Expo Go on Android
npm run web        # browser
```

## Checks

```bash
npm run lint       # includes the "no hardcoded UI strings" rule
npm run typecheck
npm test
```

## Structure

- `app/` screens (Expo Router)
- `src/i18n/` i18next setup, `locales/{de,en,it}/*.json`
- `src/theme/` colour tokens, light and dark theme (React Native Paper)
- `src/lib/` shared helpers
- `src/features/`, `src/db/`, `supabase/` filled in later phases
