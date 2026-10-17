# Little Luxe: design language and build spec
*A teardown of partakefoods.com, adapted for Little Luxe (littleluxe.in): skincare for kids aged 4–16, bought by their parents.*

---

## Part A: How partakefoods.com is built

### A1. Stack and code
| Layer | What Partake uses | Notes |
|---|---|---|
| Platform | Shopify, a heavily customised Dawn-based theme (theme `t/154`) | Sections: `custom_stickers`, `falling_cookies`, `focus_carousel`, `split_content`, `find_us`, `marquee`, `power_footer` |
| Motion | **GSAP 3 + ScrollTrigger** (pinned scroll scenes), plus a small IntersectionObserver script (`animations.js`) for reveal-on-scroll and scroll-zoom | `scrub: 2` gives a soft, lagging, "buttery" scroll |
| Stickers | Custom element `<sticker-animated>` | Two modes: `spin-scroll` (rotation = scroll × speed) and `float-scroll` (vertical offset follows scroll) |
| Header | Custom element `<sticky-header>` | Hides when you scroll down, comes back when you scroll up. Its wrapper has `pointer-events:none`, so only the buttons can be clicked |
| Carousel | Custom `FocusCarousel` class | The active slide sits in the centre; the previous and next slides are scaled down and peek in from the sides. Supports swipe and mouse drag |
| Fonts | Bunch-Bold (display), Toroka Condensed Bold (labels and buttons), Toroka Black (product names), Gilroy Medium (body) | All self-hosted woff2 |
| Scrollbar | Hidden everywhere (`scrollbar-width:none`) | Gives the page an "app-like", frameless feel |

**On sound:** the saved archive and the live pages contain **no audio files and no sound scripts.** The playful *feel* comes from snappy motion, not from audio. Hover sounds are a **new layer** for Little Luxe (see B6). They are generated with the Web Audio API, so there are no files to load, and a toggle turns them off.

**On parallax:** Partake does not use a parallax library. Its parallax comes from three places: (1) stickers that move at a different speed from the page (`float-scroll`), (2) the pinned cookie scene, where objects fall while the page holds still, and (3) `--zoom-in-ratio` image scaling as the page scrolls.

### A2. Sitemap
```
/                         Home
/collections/full-lineup  Shop all (product grid with tab filters)
  ├ /collections/cookies-1, mini-cookies-1, grahams, grahams-1, teeny-tiny
/products/<handle>        Product page (x15)
/pages/about              Our story: hero, timeline 2016 → TODAY, mission block
/pages/faq                "Snack Facts": jump links, then 3 grouped Q&A blocks
/pages/find-us            Store locator
/blogs/all                Blog
/pages/contact, terms-of-service, privacy-policy, shipping-returns, authorized-reseller-policy
/cart  (plus a cart drawer overlay on every page)
```

### A3. Home page, section by section
1. **Announcement bar** in magenta with tiny uppercase type ("Announcing Girl Scout Sparkables™").
2. **Floating header.** Logo chip on the left (it nudges up and left by -10px on hover); round blob buttons on the right (Shop, Find in store, Search, Cart). Each button has a **hard offset shadow** of 4–6px that **collapses to 0 on hover**, so the button looks physically pressed.
3. **Stickers** with spin and float on scroll, sitting over the hero.
4. **Hero.** A full-bleed (100vh) lifestyle photo with a big chunky headline ("Partake in Daily Sweetness") and one button. Tilted *label stickers* in the photo ("BETTER FOR YOU", "DANG DELICIOUS FOR YOU") give it a hand-made, collage feel.
5. **Marquee.** "Delicious • Wholesome • Inclusive" in condensed uppercase, running for 24s on a loop and **pausing on hover**.
6. **Product carousel** ("All the Tasties, None of the FOMO"). Each card has its **own light background colour** with a matching dark text colour. On hover a card lifts 8px, rotates 3°, and gains a 6px hard shadow in its own dark colour.
7. **Retailers.** A huge rounded blue panel with a logo marquee.
8. **The signature scene: "Leave No Taste Buds Behind".** The section pins (`position: sticky`, about 150vh). Scrolling makes 3 cookies fall onto a yellow tiled kitchen counter. Crumbs follow, and claim badges ("Top 9 allergen free", "Always gluten free", "Safe for school") slide up and settle at angles.
9. **Founder split panel.** Magenta, heavily rounded. Mom and daughter photo with handwritten name tags, the headline "A Recipe For Inclusivity", and a short story.
10. **"Certified Tasty" focus carousel.** Reviews on coloured slides (blue, orange, teal) over a cookie macro texture, with stickers scattered around.
11. **"Daily Dimple-Popping Joy".** Social image marquee. Hovering an image rotates it 5° and adds a magenta 8px hard shadow.
12. **Social icons** (round, colour-filled).
13. **Footer marquee** ("Sweet Treat • Sweeter Mission") and a **big blue footer** with uppercase condensed links, a newsletter field clipped to the blob shape, and certification icons.

### A4. Visual language
- **Base:** warm beige `#FFF6EB` with ink blue `#00559B`.
- **Colour pairs (light / dark):** green `#C2E5E2/#40BCB5`, orange `#FFCD78/#FF7700`, pink `#EAACD2/#BE008B`, blue `#82D8E7/#00559B`, yellow `#FFEBC1/#FFB600`. *Every surface uses a light colour with its own dark partner for text and shadow.* That pairing rule is the system.
- **Shape:** a custom organic "blob rectangle" (`partake-shape-clip`) used as a clip-path or mask on buttons, menu items and inputs. Panels have very large radii (`max(3rem,40px)`).
- **Depth:** no soft blur shadows at all. **Hard, offset, flat shadows** (4–8px) in the element's dark partner colour, like a sticker or a screen print.
- **Type:** heavy, rounded display type at a huge scale (`min(6vw,106px)`, line-height 1, `text-wrap: balance`); condensed uppercase labels with `.05em` tracking; body text at around 20–27px.
- **Voice:** punny, warm, and inclusive. "None of the FOMO", "Dimple-popping joy", "Totally sweet on us".

### A5. Interaction inventory
| Interaction | Mechanic | Feeling |
|---|---|---|
| Button press | Hard shadow 6px → 0 on hover (`.2s cubic-bezier(.4,0,.2,1)`) | Tactile, like a "squish" |
| Card hover | `translateY(-8px) rotate(3deg)` plus a coloured hard shadow | Playful pick-up |
| Logo hover | `translate(-10px,-10px)` | Cheeky |
| Sticker spin and float | Tied to the scroll position | The page feels alive |
| Pinned falling scene | Sticky, with scroll-scrubbed timeline | Story beat, wow moment |
| Marquee | 24s loop, pauses on hover | Rhythm, energy |
| Focus carousel | Centre slide scale 1, sides 0.7, swipeable | Spotlight |
| Header | Hides on scroll down, reveals on scroll up | Out of the way, still close |
| Accordions | + rotates into − | Clear state |
| Burst keyframe | `scale .3 → 1.05 → 1`, rotate −5° → 2° → 0 | Pop |
| Page transitions | `categoryFadeIn .42s` | Soft |

---

## Part B: The Little Luxe system

### B1. Brand facts used (from littleluxe.in)
- Lines: **"Growing skin deserves care"**, **"Care that grows with them"**, *"Clinical standards for their skin. Peace of mind for you."*
- Products: **Glow Shield** opaque gel mineral sunscreen, SPF 60 PA++++ (2-in-1 sunscreen and moisturiser, non-chalky gel). **Hydrating Cloud Mist Gel** (panthenol, cica, hyaluronic acid; lightweight, non-greasy). **Blush & Block** tinted sunscreen, SPF 60 PA++++ (coral tint, 3-in-1). **First Glow Ritual Kit** (all three, plus a founder note and a seed-paper bookmark; ₹599, was ₹945).
- Claims: dermatologically tested, clinically tested, pH balanced, non-irritant, parent approved, not tested on animals, paraben free, sulphate free, mineral oil free. Doctor custom-formulated. Made in India for Indian skin.
- Audience: kids, tweens and teens aged 4–16; parents buy.
- Founder: **Dr. Jui Gijare**, a dentist and mum. She couldn't find real kids' skincare for her son (only "adult formulas in smaller bottles"), so she made it and tested it on herself first.

### B2. Concept: "Little skin, big days"
Partake's emotional engine is *inclusion* ("no one left out at snack time"). Little Luxe's engine is **protection that feels like a hug**. It speaks to the parent's quiet worry (sun, school, sports day, the terrace cricket match) and to the kid's joy (play, freedom, feeling grown-up). Two voices run through the site:
- **The parent voice:** calm and reassuring, with clinical proof ("pH balanced", "doctor-formulated").
- **The kid voice:** handwritten scribbles and stickers in a crayon feel ("I put it on MYSELF!").

The signature visual metaphor is the **growth chart on the door frame**: pencil marks, ages and heights. It turns "care that grows with them" into something you can touch, and it shows up in the age slider, the dividers and the timeline.

### B3. Colour tokens (Partake's pairing rule, Little Luxe hues)
| Token | Light | Dark (text and hard shadow) | Used for |
|---|---|---|---|
| Cloud (base) | `#F7F3FF` lavender milk | — | Page background (a cool tone instead of beige) |
| Ink | — | `#2B1A4A` plum ink | Headlines, footer, body |
| Sunny (Glow Shield) | `#FFE68F` | `#8A5200` (accent `#F2B705`) | Sun care, hero sun |
| Blush (Blush & Block) | `#FFD0C7` | `#B5223F` (accent `#E2405A`) | Primary call to action, tint product |
| Mint (Cloud Mist) | `#C9F0DF` | `#0B6B50` (accent `#17A57C`) | Hydration, cica |
| Sky | `#CFE2FF` | `#2449B8` (accent `#4F7BF0`) | Story scene, links |
| Lilac | `#E3D7FF` | `#5B36B8` (accent `#8C67E8`) | Kit, night time |

Rule: **every coloured surface has a light fill, text in its dark partner, and a 6px hard shadow in its dark partner.** No grey shadows. The dark partners were darkened during the build so text passes WCAG AA on the light fills. The brighter *accent* shades are used for packs, illustrations and buttons.

### B4. Type
- **Display:** *Bagel Fat One* (Google Fonts). Chunky, round and candy-like; it plays the role Bunch-Bold plays for Partake.
- **UI and body:** *Bricolage Grotesque*, a variable font. Buttons and stickers use width 75 and weight 800, the condensed bold that matches Toroka Condensed. Body uses width 100 and weight 450.
- **Kid voice:** *Gochi Hand*, used only for scribbles, the founder signature and handwritten notes.
- Scale: hero `clamp(3.2rem, 9vw, 8.5rem)`/0.92 · H2 `clamp(2.4rem, 6vw, 5.5rem)`/0.95 · lead 1.35rem · body 1.05rem/1.55 · `text-wrap: balance` on all headings.

### B5. Shape and depth
- **Blob buttons:** an organic squircle from `border-radius: 18px 22px 16px 24px / 20px 16px 24px 18px`, so every corner differs, like a hand-cut sticker.
- **Hard shadows** of 4–8px in the partner colour that collapse on hover (the press).
- **Stickers:** tilted label tags with a die-cut white border, plus band-aid-shaped claim tags.
- **Panels:** radius 40–56px, set inside the page with a 12px gutter (as Partake does).

### B6. Sound design (new layer, Web Audio, no files)
| Event | Sound | Character |
|---|---|---|
| Button or card hover | Soft "bubble pop": sine 620→380Hz, 70ms | Bath bubble |
| Click or add to bag | Two-note rising "boop-bip" (C6→G6) | Reward |
| Growth slider tick | Xylophone note; pitch rises with age | Growing up |
| Rub-in complete | 5-note glittery arpeggio | Sparkle |
| Page change | Airy "swish" (filtered noise) | Page turn |
| Marquee hover | Quiet wind chime | Ambient |

The sound toggle sits in the header. Audio only starts after the first tap or click (browser rule), and it is fully silent when switched off or when `prefers-reduced-motion` is set.

### B7. Signature interactions (the big moments)
1. **Hero parallax.** Product tubes, a smiling sun and stickers sit on separate depth layers that follow the mouse (and the phone's tilt), plus float-scroll stickers.
2. **"One sunny day" pinned story** (replaces "falling cookies"). The section pins for about 400vh. As you scroll, the sky moves from dawn to noon to evening to night, and the sun arcs across it. A child walks: school bus, then recess, then terrace cricket, then bedtime. At noon the **Glow Shield bubble** wraps the child; at night a **Cloud Mist** moon rises. Each moment has its own card of parent copy and a kid scribble.
3. **Products land on bathroom tiles** (Partake's counter homage). The three tubes drop onto mint bathroom tiles, and claim band-aids ("pH balanced", "paraben free", "dermatologically tested") slide up.
4. **"Rub it in" demo.** A canvas over an illustrated cheek: drag to rub the gel in, the white blob disappears ("non-chalky"), a progress ring fills, and at 85% sparkles and a chime play.
5. **Growth-chart age slider (4 → 16).** A pencil line climbs a door frame, the illustrated child grows, and the recommended ritual and copy change. Each step plays a xylophone tick.
6. **Founder letter.** An envelope opens on scroll and the handwritten note slides out.
7. **Pinky-promise carousel.** A focus carousel of the brand's promises. The real review slots are marked so they can be swapped in.
8. **Micro-interactions throughout:** blob buttons that press down, cards that tilt and pop, a bubble cursor trail, sticker wiggle, add-to-bag fly-to-cart with a bag bounce, accordion + → −, a marquee that pauses on hover, a header that hides on scroll, and confetti-hearts on newsletter signup.

### B8. Sitemap built (single-file site with hash routes)
```
#/            Home
#/shop        Shop: filters All · Sun care · Hydration · Kits
#/product/:id Product page: gallery, add to bag, how-to ritual, accordions, pairs well with
#/story       Our story: founder chapters timeline + growth-chart dividers
#/start-here  Start here: a 3-question ritual finder quiz
#/inside      What's inside: hero ingredients, never-inside list, certifications
#/faq         FAQ: grouped accordions with jump links
#/skin-notes  Skin Notes: journal cards
Cart drawer (global) · sound toggle (global) · newsletter footer (global)
```

### B9. UX writing principles
- Speak to the parent first, then wink at the kid.
- Short, warm, specific: "SPF 60 that doesn't turn them into a ghost."
- Indian childhood references: school bus, recess, terrace cricket, summer holidays, sports day.
- Proof comes after emotion: lead with the feeling, then show the claim band-aids.
- Buttons say what happens: "Add to bag", "Find their ritual", "Read the founder note".

### B10. Content to swap later (placeholders in the build)
- All illustrations are inline SVG. Swap in product packshots and lifestyle photos where the code says `<!-- SWAP: ... -->`.
- **Individual prices are placeholders** (marked `// EDIT` in the `PRODUCTS` object). Only the kit price (₹599, was ₹945) came from the live site.
- **The review carousel holds brand promises, not customer reviews.** Paste real parent reviews from Instagram or the store into the marked slots.
- Ingredient details beyond panthenol, cica and hyaluronic acid (for example the exact mineral filters) need confirming with the brand.
- The Instagram strip uses illustrated tiles. Replace them with real posts.

### B11. Quality floor
- Mobile-first. Pinned scenes become shorter on phones, the header collapses to a blob menu, and nothing scrolls sideways.
- `prefers-reduced-motion`: parallax, pins and auto-marquees stop; sound is off.
- Keyboard focus is visible as a 3px plum outline. Every interactive element is a real button or link. Canvas demos have a "skip" button.
- Contrast: dark partner text on light fills passes WCAG AA.

---

## Part C: Build notes (littleluxe.html)
- **One self-contained file.** CSS, JS and all illustrations are inline. It only needs internet for Google Fonts (Bagel Fat One, Bricolage Grotesque, Gochi Hand). Open it in any browser.
- **Pages** use hash routes: `#/`, `#/shop`, `#/product/glow-shield`, `#/product/blush-block`, `#/product/cloud-mist`, `#/product/first-glow-kit`, `#/story`, `#/start-here`, `#/inside`, `#/faq`, `#/skin-notes`.
- **No animation libraries.** Partake's GSAP pinned scenes are rebuilt with `position: sticky` and a single smoothed scroll loop (the lerp gives the same "scrub" feel), so nothing external can break.
- **Where to edit:** the `PRODUCTS` object (names, prices, copy, ingredients), `NOTES` (articles), the FAQ list in `pageFaq`, and the founder chapters in `pageStory`. Search for `EDIT` and `SWAP`.
- **Going live on Shopify:** each page maps onto a Dawn section. The hero, the pinned day story, the tiles drop, the rub-in demo, the growth chart, the founder letter and the promise carousel each become a custom section. The cart drawer and checkout use Shopify's own.
