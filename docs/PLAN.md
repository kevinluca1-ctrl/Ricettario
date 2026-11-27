# Recipe App: Product & Development Plan

> Working title: **Ricettario** (placeholder, rename anytime)
> Purpose of this file: single source of truth for building the app step by step in Claude Code.
> Status: Planning. Nothing built yet. Revision 3 (adds culinary atlas, nutrition/macros, diets, diet variants, dish families; replaces automatic supermarket price lookup with in-store shopping mode, own prices, price history and an editable store pick list).
> Date: 2026-11-27

---

## 0. How to use this document with Claude Code

1. Create an empty repo, put this file in `/docs/PLAN.md`.
2. Create a `CLAUDE.md` in the repo root from the template in Appendix A.
3. Work **one phase at a time** (Section 9). Each phase has:
   - a goal
   - tasks
   - acceptance criteria (the "done" test)
   - a ready-to-paste prompt for Claude Code
4. At the start of each phase, ask Claude Code to **plan first** (plan mode), review the plan, then let it implement.
5. After each phase: run tests, commit, tag (`v0.1-phase1`, etc.), update the checklist in Section 9.

Rule of thumb: **never ask Claude Code to build two phases at once.** Small, verifiable steps beat big ones.

---

## 1. Vision & scope

**One sentence:** A home-cooking ERP and culinary atlas that captures recipes from any source, perfects and scales them, shows macros and diet fit, explains where dishes come from, tracks what you have at home, and turns the rest into shopping lists with your own price history.

### Core pillars

| # | Pillar | What it means |
|---|---|---|
| P1 | **Capture** | Import a recipe from a photo (handwritten or printed), PDF, DOCX, website URL, or a photo of a finished dish |
| P2 | **Perfect** | Clarify unclear ingredients via a questionnaire, then generate exact quantities and an optimized step-by-step method (temperatures, times, order of addition) |
| P3 | **Archive** | Store recipes safely, offline-first, with backups, own photos, editing, tags |
| P4 | **Scale & cost** | Portion scaling, unit conversion, cost estimate based on **your own recorded prices** |
| P5 | **Inventory** | Catalog what is at home (fridge/cupboard photos + manual + barcode), with confidence scores and confirmation |
| P6 | **Plan & shop** | Compare recipe vs. inventory, generate shopping lists, use them in the store (check off items, optionally enter price and store), build your own price history |
| P7 | **Share** | Export as WhatsApp text, styled PDF, styled DOCX |
| P8 | **Discover** | Random button, trending recipes, filters (cuisine, "use what I have" vs. "something new") |
| P9 | **Multilingual** | DE / EN / IT from day one, system language by default, switchable in-app, extensible |
| P10 | **Culinary atlas (educational)** | Recipes classified on a micro scale (country > region > province/area > city/town), plus historical and seasonal themes. Used both for labeling your archive and for discovery, with short educational context ("why this dish exists here") |

| P11 | **Nutrition & diets** | Macros always shown per portion and per recipe; filter and categorize by diet (vegetarian, vegan, carnivore, keto, low carb, sugar-free, low sugar, ...); create diet variants of existing recipes |
| P12 | **Dish families** | Soft links between the same dish across regions and names (e.g. Turkish *börek* and Bosnian *burek*), with key differences and disputed origins stated openly |

**Guiding idea:** a highly educational *and* highly practical home culinary experience. Every recipe should answer "how do I cook it?" and, optionally, "where does it come from, how is it called elsewhere, and how does it fit my diet?"

**UX principle: progressive disclosure.** The recipe card stays simple: title, photo, servings, time, macros, diet badges, ingredients, steps. Everything educational (origin, history, dish family, variants) sits one tap deeper, in collapsible sections or a separate "Learn" tab. Never let the learning layer clutter the cooking layer.

### Explicitly out of scope for v1
- Social features (accounts following each other, comments)
- iOS release (architecture keeps it possible later)
- Daily food diary / calorie intake logging (macros per recipe are in scope; personal intake tracking is not)
- Medical diet guidance (e.g. for diabetes or kidney disease); the app shows data, not advice
- Online grocery ordering / checkout

---

## 2. Feature catalogue (prioritized)

Priority: **M** = Must (MVP), **S** = Should (v1.0), **C** = Could (v1.x), **L** = Later

| ID | Module | Feature | Priority | Notes |
|---|---|---|---|---|
| F01 | Recipes | Manual create / edit / delete | M | Foundation for everything |
| F02 | Recipes | Own photos per recipe (multiple, cover image) | M | |
| F03 | Recipes | Tags, cuisine, course, difficulty, time | M | Needed for filters later |
| F04 | Capture | Import from photo of handwritten/printed recipe | M | AI vision |
| F05 | Capture | Import from PDF / DOCX | M | Text extraction first, AI second |
| F06 | Capture | Import from website URL | M | Parse schema.org `Recipe` JSON-LD first, AI fallback |
| F07 | Capture | Guess recipe from photo of a dish | S | Lower accuracy, needs questionnaire |
| F08 | Capture | Clarification questionnaire for uncertain items | M | Core UX of capture |
| F09 | Perfect | Optimized method: temps, times, order of addition, "why" notes | S | AI + deterministic food-safety rules |
| F10 | Scale | Portion scaling with smart rounding | M | Pure logic, no AI |
| F11 | Scale | Unit conversion (metric/imperial, g/ml via density) | M | Pure logic |
| F12 | Inventory | Manual inventory with quantity, unit, location, expiry | M | |
| F13 | Inventory | Fridge/cupboard photo recognition with confidence + edit | S | AI vision |
| F14 | Inventory | Barcode scan (Open Food Facts) | S | More reliable than photos for packaged goods |
| F15 | Plan | "What am I missing?" check before cooking | M | Recipe vs. inventory diff |
| F16 | Plan | Shopping list (merged across recipes) | M | |
| F17 | Plan | "Cooked it" button deducts inventory | S | |
| F18 | Shop | In-store shopping mode: big checkboxes, grouped by category/aisle, works offline, keeps screen awake, checked items move down | M | Replaces automatic price lookup |
| F19 | Prices | Cost estimate per recipe and per portion, based on your latest (or average) recorded prices | S | Shows "price unknown" for items without history |
| F48 | Prices | Optional price entry while shopping (price + package size, e.g. 1.29 € / 500 g), unit price computed automatically | S | Never mandatory, one tap to skip |
| F49 | Prices | Price history per ingredient and per store (last, average, lowest, trend) | S | |
| F50 | Stores | Store pick list: dropdown with common chains preseeded (DE: Aldi, Lidl, REWE, Edeka, Kaufland, Penny, Netto, Norma, dm, Rossmann; IT: Conad, Coop, Esselunga, Eurospin, Lidl, ...) + "Other..." to type your own (e.g. "Wochenmarkt Heidelberg", "Mercato di Olbia"), saved to the pick list for next time | S | Stores can be renamed, hidden, reordered, favorited |
| F51 | Shop | "Bought" moves checked items into inventory (with quantity confirmation) | S | Closes the loop with F12 |
| F20 | Share | WhatsApp-formatted text export | M | Share intent |
| F21 | Share | Styled PDF export (themes, fonts, colors, photos) | S | |
| F22 | Share | Styled DOCX export | S | |
| F23 | Discover | Random recipe button | M | From own archive first |
| F24 | Discover | Trending / new recipes with filters | C | Needs a content source |
| F25 | Discover | "Only with what I have" toggle | S | Uses F12 |
| F26 | i18n | DE/EN/IT UI, system default, in-app switch | M | Set up in Phase 1, not retrofitted |
| F27 | i18n | Translate a recipe's content into another language | C | AI, nice fit for your translation background |
| F28 | Safety | Backup/export full archive (JSON + images), restore | M | "Safely archive" is a core promise |
| F29 | Sync | Cloud sync across devices | S | |
| F30 | Atlas | Hierarchical origin tag: country > region > province/area > city/town (e.g. Italy > Sardinia > Gallura > Tempio Pausania) | M | Stored in Phase 1, so it never has to be retrofitted |
| F31 | Atlas | AI suggests origin on import, user confirms (questionnaire style) | S | Part of the capture draft |
| F32 | Atlas | Historical themes (e.g. Roman cuisine, medieval, Renaissance courts, "cucina povera", wartime/post-war, emigrant cuisines, festival dishes) | S | Many-to-many tags |
| F33 | Atlas | Seasonal themes: season, month, holidays and local festivals (Christmas, Easter, Carnival, Sagre, Oktoberfest, Advent) | S | Combined with in-season produce |
| F34 | Atlas | Seasonal produce calendar per region ("what is in season now in Germany / Sardinia") | C | Also feeds Discover |
| F35 | Atlas | Educational card per recipe and per region: origin story, traditional occasion, protected names (DOP/IGP, PDO/PGI, g.U./g.g.A.), regional variants, local name of the dish | S | AI draft, clearly labeled, editable |
| F36 | Atlas | Browse by map/tree: drill down from country to town and see your archive + suggestions there | C | "Culinary atlas" screen |
| F37 | Families | Dish families: soft links between the same dish under different names/places (börek, burek, byrek, pita in Bosnia), with "also known as" chips and 1 to 3 key differences | S | Collapsed by default on the card |
| F38 | Families | Origin status per dish/family: agreed, disputed, unknown; multiple origin claims with short notes and sources | S | Shown openly as "disputed" instead of picking a winner |
| F39 | Families | Family page: map/list of where the dish is common, local names, differences, history branches | C | Part of the Learn layer |
| F40 | Nutrition | Macros per portion and per recipe: kcal, protein, fat (saturated), carbs, sugar, fiber, salt | M | Deterministic calculation, updates with scaling |
| F41 | Nutrition | Nutrition values per canonical ingredient (per 100 g), from open databases; per-item override; barcode items use Open Food Facts label data | M | Foundation for F40 |
| F42 | Diets | Automatic diet badges from ingredients + macros: vegetarian, vegan, pescatarian, carnivore, keto, low carb, sugar-free, low sugar, gluten-free, lactose-free, high protein | M | Rule-based, user can override |
| F43 | Diets | Filter/sort archive and Discover by diet and macro ranges (e.g. carbs < 20 g/portion, protein > 30 g) | M | |
| F44 | Diets | Diet variants: create a variant of a recipe that fits a diet (e.g. keto lasagna), AI proposes substitutions, macros recomputed, original untouched, both linked | S | Same variant mechanism as regional variants |
| F45 | Diets | Diet compliance explanation: why a recipe is or is not keto/vegan ("contains honey", "42 g carbs per portion") | S | Educational + practical |
| F46 | Diets | EU 14 major allergens flagged per recipe | S | Uses ingredient categories |
| F47 | Diets | Personal diet profile: preferred diets and exclusions applied as default filters | C | |

---

## 3. Platform recommendation: Web first or Android first?

### Options compared

| Option | Android quality | Web | Camera / share / offline | Effort for one person + Claude Code | Path to iOS | Verdict |
|---|---|---|---|---|---|---|
| **PWA (web app only)** | Medium (installable, but weaker camera, share and file handling on Android) | Excellent | Partial | Low | Partial | Good prototype, weak final product |
| **PWA + Capacitor wrapper** | Good | Excellent | Good via plugins | Low/medium | Yes | Solid alternative |
| **Expo (React Native) + TypeScript** | Very good, truly native | Good (Expo Web) | Excellent (camera, share sheet, SQLite, file system, print-to-PDF) | Medium | Yes, same code | **Recommended** |
| Flutter | Very good | OK | Excellent | Medium | Yes | Fine, but Dart; Claude Code is strongest in TS |
| Native Kotlin (Jetpack Compose) | Best | None | Excellent | High | No | Overkill, no web |

### Recommendation

**Build Android-first with Expo (React Native + TypeScript), keeping the web build as a free by-product.**

Why:
- Your core flows are **camera-heavy** (recipes, dishes, fridge, barcodes) and **share-heavy** (WhatsApp, PDF). Those are much better native than in a browser.
- One TypeScript codebase gives Android now, web for desktop browsing and editing, iOS later.
- Offline-first storage (SQLite on device) fits the "safely archive" promise.
- TypeScript + React is the ecosystem Claude Code handles best, with the most examples and libraries.
- You can test on your own phone from day one with **Expo Go** or a development build, no Play Store needed.

What "web first" would cost you: you would build the camera, file and share flows twice, once for web and once for native.

---

## 4. Architecture & tech stack

### 4.1 High-level architecture

```
┌──────────────────────────────┐
│  Expo App (Android / Web)    │
│  - UI (React Native)         │
│  - Local DB (SQLite, Drizzle)│  <- offline-first, source of truth on device
│  - i18n (i18next)            │
│  - Image capture / compress  │
└──────────────┬───────────────┘
               │ HTTPS (auth token)
┌──────────────▼───────────────┐
│  Backend (Supabase)          │
│  - Auth                      │
│  - Postgres (sync copy)      │
│  - Storage (photos)          │
│  - Edge Functions:           │
│     • ai-extract-recipe      │  <- holds the AI API key, never in the app
│     • ai-recognize-dish      │
│     • ai-recognize-inventory │
│     • ai-optimize-method     │
│     • discover-trending      │
└──────────────┬───────────────┘
               │
   ┌───────────┼────────────────┬──────────────────┐
   ▼           ▼                ▼                  ▼
 Claude API  Open Food Facts  Nutrition DBs (USDA)  Recipe source(s)
 (vision +   (barcodes)       (Section 7)         (Section 7)
  text)
```

### 4.2 Stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript (strict) | One language end to end |
| App framework | Expo (latest SDK), Expo Router | File-based navigation, Android + Web |
| UI kit | Tamagui or React Native Paper | Themeable, works on web |
| State | Zustand + TanStack Query | Simple local state + server cache |
| Local DB | expo-sqlite + Drizzle ORM | Typed schema, migrations |
| Forms / validation | react-hook-form + Zod | Zod schemas shared with backend |
| i18n | i18next + react-i18next + expo-localization | System language detection, pluralization |
| Camera / images | expo-camera, expo-image-picker, expo-image-manipulator | Capture + compress before upload |
| Barcode | expo-camera barcode scanning | Built in |
| Documents in | expo-document-picker; PDF text via backend; DOCX via `mammoth` in backend | |
| PDF out | expo-print (HTML template to PDF) | Themes = CSS |
| DOCX out | `docx` npm library (backend or app) | Same theme tokens as PDF |
| Share | expo-sharing, React Native `Share` | WhatsApp via system share sheet |
| Backend | Supabase (Auth, Postgres, Storage, Edge Functions) | EU region available, free tier enough for personal use |
| AI | Claude API (vision + structured JSON output) | Called only from Edge Functions |
| Testing | Vitest/Jest (logic), React Native Testing Library, Maestro (E2E on Android) | |
| CI | GitHub Actions + EAS Build | Builds the APK/AAB in the cloud |

### 4.3 Key architectural rules
1. **Offline-first:** every recipe and inventory item lives in local SQLite. Sync is a layer on top, never a requirement to view or cook.
2. **AI never writes directly to the archive.** AI returns a *draft* that the user reviews and confirms.
3. **Deterministic logic for numbers.** Scaling, unit conversion, inventory diff, cost math: pure functions with unit tests, no AI.
4. **API keys only on the backend.** The app talks to Edge Functions, never to the AI provider directly.
5. **Language-neutral data.** Ingredients reference a canonical ingredient ID with translated names, so a recipe saved in Italian can be shown in German.
6. **Numbers are computed, never generated.** Macros, diet compliance and costs come from the ingredient database and rules. AI may *suggest* substitutions, but the resulting macros are always recalculated deterministically.
7. **Variants never overwrite.** Regional, dietary and personal variants are separate recipes linked to a parent. The original stays intact.
8. **Progressive disclosure.** Cooking layer first, learning layer one tap deeper.

---

## 5. Data model (first draft)

```
Recipe
  id, title, description, language_original
  servings_base (number), yield_note
  cuisine, course, tags[], difficulty, prep_min, cook_min, rest_min
  source_type: manual | photo_text | pdf | docx | url | dish_photo
  source_ref (url or file id), source_attribution
  cover_photo_id, created_at, updated_at, version
  is_favorite, rating, notes

RecipeIngredient
  id, recipe_id, ingredient_id (canonical, nullable), raw_text
  quantity (decimal), unit (canonical unit code), preparation ("finely chopped")
  group_label ("for the sauce"), optional (bool), order_index
  scaling_rule: linear | sublinear | fixed | to_taste

RecipeStep
  id, recipe_id, order_index, text
  temperature_c (nullable), duration_sec (nullable), heat_level (nullable)
  ingredient_refs[] (which ingredients are added in this step)
  science_note (optional "why")
  timer (bool)

Ingredient (canonical dictionary)
  id, names {de, en, it, ...}, synonyms {lang: []}
  category (dairy, vegetable, spice, ...), default_unit
  density_g_per_ml (for g <-> ml), avg_unit_weight_g (1 egg ≈ ...)
  shelf_life_days_default, barcode_links[]
  diet_flags: animal_origin, meat, fish, dairy, egg, honey, gluten, lactose, added_sugar
  allergens[] (EU 14)

IngredientNutrition (per 100 g, edible part)
  ingredient_id, kcal, protein_g, fat_g, sat_fat_g, carbs_g, sugar_g, fiber_g, salt_g
  source (database name + id), source_version, is_user_override

RecipeNutrition (cached, recomputed on any change)
  recipe_id, per_portion {...}, per_recipe {...}, completeness (0..1: share of ingredients with nutrition data),
  computed_at

DietDefinition (rules live in data, not code, so thresholds are editable)
  id, names {de, en, it}, type: exclusion | macro_threshold | mixed
  excluded_flags[] (e.g. vegan: animal_origin), thresholds (e.g. keto: net_carbs_g_per_portion <= 10)
  description_i18n

RecipeDiet
  recipe_id, diet_id, status: compliant | not_compliant | unknown, reasons[], user_override (bool)

Recipe variant fields (on Recipe)
  parent_recipe_id (nullable), variant_type: regional | dietary | personal
  target_diet_id (nullable), variant_summary ("pasta replaced with zucchini sheets")

DishFamily (the "same dish, many names" concept)
  id, canonical_label (e.g. "Börek / Burek family"), description_i18n
  origin_status: agreed | disputed | unknown, origin_notes_i18n

DishFamilyMember (can exist without a recipe in your archive, as reference knowledge)
  id, dish_family_id, local_name (e.g. "Burek"), language, place_id
  recipe_id (nullable, link to your own recipe), key_differences_i18n[] (1 to 3 short bullets)
  sources[]

OriginClaim (for disputed origins)
  id, dish_family_id or recipe_id, place_id, claim_note_i18n, sources[]

InventoryItem
  id, ingredient_id, raw_name, quantity, unit
  location: fridge | freezer | pantry | spice_rack | other
  expiry_date, opened_date, source: manual | photo | barcode
  confidence (0..1, for photo), confirmed (bool), updated_at

Photo
  id, owner_type (recipe | step | inventory_scan), owner_id, uri_local, uri_remote

ShoppingList
  id, name, created_at, status: open | shopping | done, planned_store_id (nullable)

ShoppingListItem
  id, list_id, ingredient_id, raw_name, quantity, unit, category (for grouping),
  from_recipe_ids[], checked, checked_at, note

Store (the editable pick list)
  id, name, type: supermarket | discounter | market | butcher | bakery | drugstore | online | other
  is_preseeded (bool), is_hidden (bool), is_favorite (bool), sort_order, city (optional), country

PriceRecord (one entry per purchase, only when the user enters it)
  id, ingredient_id, store_id, price, package_qty, package_unit,
  unit_price (computed, e.g. €/kg or €/l), currency, was_on_offer (bool, optional),
  purchased_at, shopping_list_item_id (nullable)

ExportTheme
  id, name, primary_color, accent_color, font_heading, font_body, layout (classic | magazine | minimal), show_photos

Place (culinary geography, hierarchical)
  id, parent_id (nullable), level: country | region | province_area | city_town | (custom: valley, island, district)
  names {de, en, it, local}, iso_code (country/region where available), lat, lng
  description_i18n (short educational text, optional)

RecipeOrigin (a recipe can have one primary + several related origins)
  recipe_id, place_id, role: primary | variant_of | popular_in, confidence, confirmed

Theme
  id, type: historical | seasonal | festival | occasion | dietary_tradition
  names {de, en, it}, description_i18n
  period (for historical: e.g. "1st century BC to 5th century AD"), months[] (for seasonal)
  place_id (nullable, for local festivals)

RecipeTheme
  recipe_id, theme_id

EducationNote
  id, owner_type (recipe | place | theme), owner_id, language, text
  source: ai_draft | user | imported, sources[] (links), reviewed (bool)

SeasonalProduce
  ingredient_id, place_id, months_in_season[]

ProtectedDesignation
  id, name, type (PDO/DOP/g.U. | PGI/IGP/g.g.A. | TSG), place_id, ingredient_id or dish

Recipe additions
  dish_local_name (e.g. "Culurgiones"), dish_family_id (nullable)

UserSettings
  ui_language (system | de | en | it), unit_system (metric | imperial), default_servings,
  default_store_id, currency, theme_default
```

---

## 6. AI pipeline design

### 6.1 Recipe capture flow

```
Input (photo / PDF / DOCX / URL / dish photo)
   │
   ├─ URL?  -> try schema.org JSON-LD parse (no AI, exact) -> fallback to AI
   ├─ PDF/DOCX? -> extract text -> AI structures it
   ├─ Text photo? -> AI vision reads + structures
   └─ Dish photo? -> AI vision guesses dish + likely ingredients (low confidence)
   │
   ▼
Draft Recipe (JSON validated against Zod schema)
   + per-field confidence
   + list of "uncertainties" with suggested answers
   │
   ▼
Clarification questionnaire (only uncertain items)
   e.g. "Is this 'Mehl Type 405' or 'Type 550'?"  [405] [550] [other]
        "Quantity unreadable: 2 or 3 eggs?"        [2] [3]
        "Dish looks like Carbonara. Contains cream?" [yes] [no] [unsure]
   │
   ▼
Optional: "Optimize method" (F09)
   │
   ▼
User review screen (everything editable) -> Save to archive
```

### 6.2 Structured output contract
Every AI function returns JSON that must pass a Zod schema. If validation fails: one automatic retry with the error message, then show the raw text for manual editing. Store the prompt version with each draft so results are reproducible.

### 6.3 Confidence scores: important caveat
AI "confidence" numbers are **not well calibrated** out of the box. Treat them as a ranking, not a probability:
- Show them as **High / Medium / Low** badges, not as "87 %".
- Always ask the user about anything Medium or Low.
- Later, improve calibration by logging how often users correct each confidence band (local, private stats).

### 6.4 "Chemically optimized" method (F09)
- AI proposes: order of addition, temperatures, times, resting, why (Maillard reaction, emulsions, gluten development, carryover cooking, salting timing, etc.).
- **Food-safety minimums come from a deterministic table**, not from the AI (core temperatures for poultry, minced meat, reheating, etc., sourced from official guidance such as BfR / EU food safety authorities). The AI output is checked against this table and flagged if it goes below.
- The method is shown as a **suggestion next to the original**, never silently replacing a family recipe.

### 6.5 Inventory photo recognition (F13)
- One photo -> list of `{name, estimated_quantity, unit, location, confidence}`.
- Review screen: each item with confidence badge, edit, delete, merge with an existing item.
- Expect weak results for: opaque containers, leftovers in boxes, items behind other items, spices in unlabeled jars. Barcode scanning and manual entry are the reliable complements.

### 6.6 Nutrition engine (deterministic, no AI)
```
recipe ingredients (qty, unit) -> grams via density/unit weight -> × IngredientNutrition per 100 g
-> sum per recipe -> ÷ servings -> per portion
```
- Shows a **completeness indicator** when some ingredients lack data ("macros based on 9 of 10 ingredients").
- "To taste" items (salt, pepper) count with a small default amount or are excluded, configurable.
- Known limits shown in the UI as an info tooltip: values are estimates (raw vs. cooked weights, frying oil absorption, water loss).

### 6.7 Diet classification (deterministic)
- Exclusion diets (vegetarian, vegan, gluten-free, ...) are checked against ingredient `diet_flags`.
- Threshold diets (keto, low carb, low sugar, high protein) are checked against per-portion macros using `DietDefinition` thresholds.
- Every badge has a "why" list. "Unknown" when data is missing; never a guess.
- Note: diets like keto or low carb have no single official definition; the app ships sensible defaults and lets you edit the thresholds.

### 6.8 Diet variant generation (AI suggests, rules verify)
```
Recipe + target diet
   -> AI proposes substitutions + method changes (e.g. sugar -> erythritol, flour -> almond flour, adjust baking time)
   -> app recomputes macros deterministically
   -> diet rules check compliance
   -> if not compliant: show why, ask AI for a second pass (max 1 retry)
   -> user reviews a side-by-side diff (original vs. variant, macros before/after)
   -> saved as a linked variant (variant_type = dietary)
```

### 6.9 Dish family suggestions (AI draft, user confirms)
- On import or on request, AI suggests: family membership, other local names, places, 1 to 3 key differences, origin status (agreed/disputed/unknown) with claims.
- Shown as a draft with sources; nothing joins a family without confirmation.
- Display on the recipe card: one small chip row, e.g. `Also known as: Burek (BA) · Byrek (AL) · +3`. Tap opens the family page.

---

## 7. Feasibility study

| Feature | Feasibility | Main risk | Mitigation |
|---|---|---|---|
| Manual recipes, photos, tags | ✅ High | None | Standard CRUD |
| Import from website URL | ✅ High | Some sites block scraping or have no structured data | JSON-LD first, AI fallback, user can paste text |
| Import from PDF / DOCX | ✅ High | Scanned PDFs without text layer | Rasterize page and send to vision |
| Handwritten recipe photo | 🟡 Medium/High | Messy handwriting, smudges | Questionnaire for unclear parts, show original photo side by side |
| Recipe from dish photo | 🟠 Medium/Low | A photo cannot show quantities or hidden ingredients | Frame as "best guess", heavy questionnaire, user confirmation |
| Optimized method | 🟡 Medium | AI can sound confident and be wrong | Deterministic safety table, "suggestion" framing, keep original |
| Scaling & unit conversion | ✅ High | Non-linear items (spices, leavening, baking time, pan size) | `scaling_rule` per ingredient, pan-size hint, notes |
| Fridge/cupboard recognition | 🟡 Medium | Occlusion, packaging, quantities hard to estimate | Confirmation step, barcode scan, manual quick-add |
| Inventory diff + shopping list | ✅ High | Ingredient name matching ("Zwiebel" vs "rote Zwiebel") | Canonical ingredient dictionary + synonyms + user merges |
| Automatic supermarket prices / offers | ❌ **Dropped** | The big German chains (REWE, Edeka, Aldi, Lidl, Kaufland) offer no public developer API; offer aggregators have no open API either; unofficial scraping is fragile and may breach terms of service | **Decision: not built.** Replaced by own price entry while shopping + price history (F48, F49) |
| In-store shopping mode, own prices, price history, store pick list | ✅ High | Price entry must not slow down shopping | Price entry optional and one tap to skip; numeric keypad; last price prefilled |
| Cost estimate | 🟡 Medium/High | Only as good as your recorded prices; package vs. used amount | Unit prices from your history, "price unknown" shown openly, accuracy grows with use |
| WhatsApp export | ✅ High | Formatting limits | WhatsApp supports `*bold*`, `_italic_`, `~strike~`, lists; send via share sheet |
| PDF export with themes | ✅ High | Layout polish takes time | HTML/CSS templates, 2 to 3 themes first |
| DOCX export with themes | ✅ High | Fewer styling options than PDF | Same theme tokens, simpler layouts |
| Random button (own archive) | ✅ High | None | |
| Trending recipes | 🟠 Medium/Low | No free, legal "trending" feed. Social platforms do not offer open APIs for this | Options: recipe APIs (e.g. Spoonacular, Edamam, TheMealDB; check licenses and prices), AI-generated suggestions, seasonal suggestions. Label clearly what the source is |
| Micro-regional origin tagging | ✅ High (structure) / 🟡 Medium (accuracy) | Origins are often disputed or fuzzy (several towns claim the same dish); AI may invent a "precise" origin | Allow multiple origins with roles, "attributed to" wording, user confirmation. Seed places from an open geographic dataset (e.g. GeoNames or Wikidata, check licenses) instead of letting AI invent the hierarchy |
| Historical & educational content | 🟡 Medium | Food history is full of myths (popular origin stories are often unverified) | Label AI text as "draft", store sources, show "reviewed" badge once you checked it. Keep cards short |
| Seasonal themes & produce calendar | ✅ High | Seasonality differs by region (Heidelberg vs. Sardinia) | Seasonality stored per place, not globally |
| Dish families & disputed origins | 🟡 Medium | Boundaries are fuzzy (is Bosnian pita the same as burek?), nationally sensitive topics | Families are soft links, "disputed" is a valid state, multiple OriginClaims side by side, neutral wording, sources |
| Macros per recipe | ✅ High (calculation) / 🟡 Medium (data) | Needs a good nutrition database in DE/EN/IT; cooked vs. raw weights; ingredient matching | Use open datasets: **USDA FoodData Central** (public domain, very complete), **Open Food Facts** (packaged goods, open license with share-alike terms), national tables such as the German BLS or Italian CREA tables (check license before use). Completeness indicator, user overrides |
| Diet badges & filters | ✅ High | Keto/low carb not formally defined; hidden ingredients (gelatin, anchovy in Worcestershire sauce) | Editable thresholds, ingredient flags, "unknown" state, user override |
| Diet variants | 🟡 Medium | Substitutions can ruin texture (baking with sugar replacements, gluten-free doughs) | AI suggestion + deterministic macro check + user review; keep original; let user rate variants |
| DE/EN/IT i18n | ✅ High | Retrofitting later is painful | Set up in Phase 1, lint rule: no hardcoded strings |
| Play Store release | 🟡 Medium | New personal developer accounts must run a **closed test with at least 12 testers for 14 consecutive days** before production access. Organization accounts are exempt, but need business verification (D-U-N-S) | For personal use: sideload the APK, no store needed. For public release: recruit testers early (Phase 10) |

---

## 8. Legal, privacy, costs

### 8.1 Legal
- **Recipe copyright:** a plain list of ingredients is generally not protected, but descriptive text, photos and layout are. For URL imports: store the source URL and attribution, keep imports for **personal archive use**, do not republish imported photos or texts in "Trending". (Not legal advice; check before any commercial launch.)
- **Impressum + privacy policy** required in Germany as soon as the app is public (Play Store needs a privacy policy URL anyway). Your Limba site could host it.

### 8.2 Privacy (GDPR)
- Fridge and kitchen photos are personal data. Process via EU region backend, do not keep images on the AI side, delete scan photos after confirmation unless the user keeps them.
- Data export + delete account feature (also covers F28).

### 8.3 Running costs (personal use scale)

| Item | Cost |
|---|---|
| Supabase | Free tier is enough for personal use |
| Claude API | Pay per use; a few cents per image scan range, depends on model and image size (check current pricing). Compress images before upload |
| Expo EAS Build | Free tier has limited builds per month; local builds are free |
| Google Play developer account | One-time USD 25 (only if publishing) |
| Recipe data APIs (optional, Discover) | Free tiers exist for some; check license and limits |

---

## 9. Phased roadmap (build order for Claude Code)

> Each phase ends with something you can use on your phone.
> Checkbox = phase completed and tagged.

### Phase 0: Project setup
- [ ] Done

**Goal:** Empty but production-grade skeleton.
**Tasks:**
- Expo app with TypeScript strict, Expo Router, ESLint, Prettier
- Folder structure: `app/` (screens), `src/features/*`, `src/lib/*`, `src/db/*`, `src/i18n/*`, `supabase/`
- i18next with `de`, `en`, `it` namespaces, system language detection, in-app switch
- ESLint rule against hardcoded UI strings
- Theme tokens (light grey palette, dark mode)
- GitHub repo, CI running lint + tests
- `CLAUDE.md` (Appendix A)

**Acceptance:** App runs on Android (Expo Go/dev build) and web, shows a home screen in the system language, language switch works and persists.

**Prompt for Claude Code:**
```
Read docs/PLAN.md and CLAUDE.md. Implement Phase 0 only. Start in plan mode: propose
folder structure, dependencies and i18n setup, wait for my approval, then implement.
Include a language switcher (System / Deutsch / English / Italiano) that persists.
```

---

### Phase 1: Recipe archive (manual)
- [ ] Done

**Goal:** A usable recipe book without any AI.
**Tasks:**
- SQLite + Drizzle schema for Recipe, RecipeIngredient, RecipeStep, Photo, Ingredient (seed ~300 common canonical ingredients in DE/EN/IT)
- Recipe list (search, filter by tag/cuisine), detail view, create/edit form
- Ingredient groups, step list with optional temp/time, drag to reorder
- Add own photos (camera + gallery), cover image
- Random button (from own archive)
- Full backup export/import (ZIP: JSON + images) (F28)
- **Culinary atlas foundation (F30, F32, F33):** Place hierarchy, Theme, RecipeOrigin, RecipeTheme tables; seed Germany, Italy (all regions + key provinces/areas, Sardinia in detail) and a starter list of historical + seasonal themes; origin picker (drill-down + search) and theme chips in the recipe form; filter the archive by place and theme
- **Schema only (UI comes later):** DishFamily, DishFamilyMember, OriginClaim, variant fields on Recipe (`parent_recipe_id`, `variant_type`), Ingredient `diet_flags` and `allergens`, IngredientNutrition, DietDefinition. Creating the tables now avoids painful migrations later
- Manual "Create variant" action (copies recipe, sets parent, variant_type = personal/regional)

**Acceptance:** Create, edit, delete a recipe with photos fully offline; backup and restore on a fresh install works; a recipe can be tagged e.g. Italy > Sardinia > Gallura and "Christmas" + "cucina povera", and found again via those filters; a manual variant is linked to its parent and the parent is unchanged.

**Prompt:**
```
Implement Phase 1 from docs/PLAN.md. Use the data model in Section 5. Write unit tests
for the repository layer and the backup/restore round trip. Plan first, then implement.
```

---

### Phase 2: Scaling, units, nutrition, diets, cooking mode
- [ ] Done

**Goal:** Exact, scalable quantities with macros and diet badges.
**Tasks:**
- Pure `scaleRecipe()` with `scaling_rule` (linear, sublinear, fixed, to_taste) and smart rounding (eggs, pinches, packages)
- Unit system: canonical units, metric/imperial, g↔ml via density
- Servings selector on recipe detail
- **Nutrition engine (6.6):** import nutrition for the seeded canonical ingredients from the chosen open database (D9), store source + version; pure `computeNutrition()`; macros block on the recipe card (per portion, toggle per recipe), completeness indicator; recomputes on scaling and edits
- **Diet engine (6.7):** seed DietDefinitions (vegetarian, vegan, pescatarian, carnivore, keto, low carb, sugar-free, low sugar, gluten-free, lactose-free, high protein) with editable thresholds; pure `classifyDiets()` with reasons; diet badges + "why" sheet; allergen flags
- Archive filters by diet and macro ranges (F43)
- Cooking mode: one step per screen, big text, keep screen awake, step timers

**Acceptance:** Test suite with at least 30 scaling/conversion cases and at least 20 nutrition/diet cases passes; 4 → 7 servings gives sensible results (no "1.75 eggs"); a carbonara is correctly "not vegetarian" with the reason "guanciale"; a recipe with honey is "not vegan"; macros per portion stay constant when scaling servings.

**Prompt:**
```
Implement Phase 2 from docs/PLAN.md (Sections 6.6 and 6.7). Scaling, unit conversion,
nutrition and diet classification must be pure functions with exhaustive unit tests.
Diet thresholds live in DietDefinition data, not in code. Before importing nutrition
data, show me the source, its license and the mapping approach for my approval.
```

---

### Phase 3: Backend + AI recipe capture (text sources)
- [ ] Done

**Goal:** Import from URL, PDF, DOCX, photo of written recipe.
**Tasks:**
- Supabase project (EU region), auth (email magic link or Google)
- Edge Function `ai-extract-recipe` with Zod-validated JSON output, retry on invalid
- URL import: JSON-LD parser first, AI fallback
- PDF/DOCX text extraction, scanned pages via vision
- Photo import with image compression
- Clarification questionnaire UI driven by the `uncertainties` array
- Review screen showing original source side by side
- Store source attribution
- Draft also suggests origin (place + confidence), themes and local dish name; confirmed via questionnaire (F31)
- Imported ingredients are matched to canonical ingredients (so macros and diet badges work immediately); unmatched ones go into the questionnaire

**Acceptance:** 10 test inputs (2 handwritten in different languages, 2 PDFs, 2 DOCX, 4 URLs) import into editable drafts; questionnaire only shows real uncertainties.

**Prompt:**
```
Implement Phase 3. The AI API key must only live in Supabase Edge Function secrets.
Define the Zod schema for DraftRecipe first and show it to me before writing the
prompts. AI output is always a draft that the user confirms.
```

---

### Phase 4: AI enrichment (dish photo, method, diet variants, dish families)
- [ ] Done

**Goal:** "What is this dish?", "make this method better", "make this keto", "what else is this dish called?"
**Tasks:**
- Edge Function `ai-recognize-dish` (top 3 dish candidates + likely ingredients + questionnaire)
- Edge Function `ai-optimize-method` (order of addition, temps, times, science notes)
- Deterministic food-safety table + validator that flags unsafe suggestions
- UI: original vs. optimized, accept per step
- **Edge Function `ai-diet-variant` (6.8):** "Make a variant for: [diet]" action; deterministic macro + diet re-check; side-by-side diff with macros before/after; saved as linked dietary variant
- **Edge Function `ai-dish-family` (6.9):** suggest family, local names, places, key differences, origin status + claims; review screen; "Also known as" chip row on the card (collapsed, max one line)

**Acceptance:** Optimized method never goes below the safety table; a keto variant of a lasagna passes the keto rule or clearly shows why not; the original recipe is never modified; börek and burek can be linked into one family with a "disputed" or "shared" origin note, and the card stays uncluttered.

**Prompt:**
```
Implement Phase 4 from docs/PLAN.md (Sections 6.4, 6.8, 6.9). AI only suggests; macros
and diet compliance are always recomputed by the Phase 2 engines. Variants are new
linked recipes, never edits of the original. Plan first, then implement one Edge
Function at a time.
```

---

### Phase 5: Inventory
- [ ] Done

**Goal:** Know what is at home.
**Tasks:**
- Inventory screens by location (fridge, freezer, pantry, spices)
- Manual quick-add with autocomplete from canonical ingredients
- Barcode scan via Open Food Facts
- Edge Function `ai-recognize-inventory` (photo of fridge/cupboard) with High/Medium/Low badges, edit/merge/delete before saving
- Expiry dates, "expiring soon" list

**Acceptance:** Photo of a real fridge produces a reviewable list; confirmed items appear in inventory; nothing is saved without confirmation.

---

### Phase 6: Cook planning & shopping list
- [ ] Done

**Goal:** "Do I have everything?"
**Tasks:**
- Recipe vs. inventory diff (with unit conversion and synonyms)
- Optional: "missing ingredients" also suggests diet-compatible substitutes that are already in inventory
- "Missing ingredients" panel before cooking
- Shopping list, merge across multiple recipes, check off items
- "Cooked it" deducts quantities from inventory (with undo)

**Acceptance:** Diff is correct across units (e.g. 500 g needed, 0.3 kg at home → buy 200 g).

---

### Phase 7: Export & sharing
- [ ] Done

**Goal:** Beautiful sharing.
**Tasks:**
- WhatsApp text template (Appendix B), share sheet
- PDF export via HTML templates, 3 themes, adjustable colors/fonts/photos
- DOCX export with the same theme tokens
- Export in any of the 3 UI languages
- Optional blocks in every export: macros per portion, diet badges, origin line, "also known as"

**Acceptance:** Same recipe exports to all 3 formats; PDF includes cover photo and looks good on print preview.

---

### Phase 8: Shopping mode, stores, prices & cost estimate
- [ ] Done

**Goal:** Use the list in the store, optionally record what you paid and where, and get cost estimates from your own history. No external price sources.
**Tasks:**
1. **Store pick list (F50):** preseeded DE/IT chains; dropdown with search; "Other..." opens a text field, the new name (e.g. "Wochenmarkt Heidelberg") is saved and appears in the dropdown next time; manage stores (rename, hide, favorite, reorder, type)
2. **In-store shopping mode (F18):** open a list, items grouped by category, big tap targets, offline, screen stays awake, checked items move to the bottom, undo
3. **Optional price entry (F48):** when checking off an item, a small inline sheet: price, package size, store (defaults to the list's store or the last used one); "skip" is the default action; unit price computed (€/kg, €/l, €/piece)
4. **Price history (F49):** per ingredient: last, average, lowest price, per store, simple trend chart
5. **Cost estimate (F19):** per recipe and per portion, scales with servings, uses latest unit price (setting: latest / average / lowest), shows which ingredients have no price yet
6. **"Bought" → inventory (F51):** finishing a list offers to add checked items to inventory

**Acceptance:** A list can be shopped fully offline; a new store typed via "Other..." is available in the dropdown afterwards; entering 1.29 € for 500 g pasta stores 2.58 €/kg and updates the cost estimate of every recipe using pasta; skipping price entry never blocks checking off.

**Prompt:**
```
Implement Phase 8 from docs/PLAN.md. There is no external price API: all prices come
from the user. Price entry is always optional and skippable. Unit price and cost
estimate are pure functions with unit tests. Plan first, then implement.
```

---

### Phase 9: Discover & Culinary atlas
- [ ] Done

**Goal:** Inspiration that also teaches.
**Tasks:**
- Filters: cuisine, **place at any level (country down to town)**, historical theme, seasonal theme/month, festival, **diet**, **macro ranges**, time, difficulty, "only with what I have" vs. "something new" vs. "from my archive"
- Random button respects active filters (e.g. "random keto dish from Sardinia")
- **Dish family pages (F39):** where the dish is common, local names, key differences, origin claims, links to your own variants
- "In season now" view using SeasonalProduce for your selected place (F34)
- Educational cards for recipes, places and themes (F35): AI draft, sources, "reviewed" badge
- Atlas screen: drill-down tree first, map view later (F36)
- Personal diet profile as default filter (F47)
- Themed collections, e.g. "Sardinian Christmas", "Roman cuisine", "Palatinate autumn"
- Source adapter for an external recipe API (evaluate license and pricing first)
- AI suggestions based on inventory ("what can I cook tonight?")
- Save a discovered recipe into the archive (with attribution)

---

### Phase 10: Sync, polish, release
- [ ] Done

**Tasks:**
- Cloud sync (last-write-wins with version field to start; conflict view later)
- Accessibility pass (font scaling, contrast, screen reader labels)
- E2E tests with Maestro on Android
- EAS Build: APK for sideloading, AAB for Play Store
- Privacy policy + Impressum
- If publishing: start the closed test with 12+ testers early, keep them opted in 14 days

---

## 10. What you need to know (and what you can ignore)

### Need to know
- **Expo basics:** Expo Go vs. development build (camera and some native modules need a dev build), EAS Build for APKs.
- **Where secrets live:** only in Supabase Edge Function secrets, never in the app bundle.
- **Offline-first mindset:** local DB is the truth, sync is secondary.
- **AI outputs are drafts.** Always validate (Zod) and always let the user confirm.
- **i18n discipline:** every string through `t()`, every recipe field language-aware. You will catch translation quality issues better than most developers; use that.
- **Git hygiene with Claude Code:** commit after every working step, small branches, review diffs.
- **Nutrition values are estimates.** Show the source and completeness; the app informs, it does not give medical or dietary advice.
- **Data licenses matter.** Nutrition and geography datasets each have their own license (public domain, share-alike, attribution). Record them in `docs/data-sources.md` from the first import.
- **Neutral wording for origins.** Dish families touch national identity; "disputed" and "shared" are valid, honest answers.

### Can safely ignore (for now)
- iOS specifics, App Store
- Kubernetes, microservices, custom servers: Supabase covers it
- Writing your own ML models: use the Claude API
- Perfect sync conflict resolution: last-write-wins is fine for one user
- Monetization, subscriptions, ads
- Performance tuning before you have 500+ recipes

---

## 11. Open decisions (answer before the phase that needs them)

| # | Question | Needed by | Default if undecided |
|---|---|---|---|
| D1 | Personal use only, or Play Store release? | Phase 10 | Personal (sideload APK) |
| D2 | Account login required, or fully local without account? | Phase 3 | Optional login, local works without |
| D3 | Which UI kit (Tamagui vs. Paper)? | Phase 0 | React Native Paper (simpler) |
| D4 | Which stores to preseed in the pick list | Phase 8 | Main DE and IT chains (F50); everything else added by you |
| D5 | Recipe content source for Discover (API vs. AI-only)? | Phase 9 | AI-only + own archive |
| D6 | App name and branding | Phase 10 | Working title |
| D7 | Which countries get a detailed place hierarchy at launch? | Phase 1 | Germany + Italy in depth, other countries at country/region level |
| D8 | How deep should educational content go (short card vs. long article)? | Phase 9 | Short cards (max ~120 words) with optional "read more" sources |
| D9 | Primary nutrition database | Phase 2 | USDA FoodData Central (public domain) + Open Food Facts for barcodes; evaluate German BLS / Italian CREA licenses as a second step |
| D10 | Default thresholds for keto, low carb, low sugar, high protein (per portion) | Phase 2 | Sensible defaults shipped, editable in settings |
| D11 | Which macros are always visible on the card vs. in the details? | Phase 2 | Card: kcal, protein, carbs, fat. Details: sugar, fiber, saturated fat, salt |

---

## Appendix A: `CLAUDE.md` starter

```markdown
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
```

## Appendix B: WhatsApp export template

```
*🍝 {title}*
_{servings} Portionen · {total_time} min · {difficulty}_
_{origin} · {diet_badges}_
_Pro Portion: {kcal} kcal · {protein} g Eiweiß · {carbs} g KH · {fat} g Fett_

*Zutaten*
• {qty} {unit} {ingredient}
• ...

*Zubereitung*
1. {step} ({temp} °C, {time} min)
2. ...

💡 {tip}
_Erstellt mit Ricettario_
```
(Labels come from i18n, so the same template exports in DE, EN or IT.)

## Appendix C: i18n conventions
- Files: `src/i18n/locales/{de,en,it}/{common,recipes,inventory,export}.json`
- Keys in English, dot-separated: `recipes.detail.servings`
- Use i18next plurals (`_one`, `_other`); Italian and German differ from English in places
- Units and numbers via `Intl.NumberFormat` (decimal comma in DE/IT)
- Adding a language later = add one folder + one entry in the language picker
