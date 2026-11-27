# CLAUDE.md

## Project

Recipe archive + home kitchen ERP. Expo (React Native) + TypeScript + Supabase.
Full plan: docs/PLAN.md. Work only on the phase I name.

## Rules

- TypeScript strict, no `any`.
- No hardcoded UI strings. All text via i18next (de, en, it). Add keys to all three files.
- Never put API keys in the app. AI calls only via Supabase Edge Functions.
- AI results are drafts validated with Zod and confirmed by the user before saving.
- Scaling, units, nutrition, diet classification, inventory diff, costs: pure functions with unit tests. AI never produces final numbers.
- Variants (regional, dietary, personal) are new linked recipes; never modify the original.
- Recipe card stays simple; educational content (origin, history, dish family) goes one tap deeper.
- Local SQLite is the source of truth (offline-first).
- Plan first, wait for approval, then implement. Small commits.
- Run lint + tests before saying a task is done.
- Do not use the em dash character in UI copy or docs.

## Commands

- npm run dev / npm run android / npm run web
- npm test
- npm run lint
- npm run typecheck
