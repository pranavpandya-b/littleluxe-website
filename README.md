# Little Luxe website

A creative, interactive website concept for Little Luxe (littleluxe.in): skincare for kids aged 4–16, written for parents and their kids. Its interaction style is modelled on partakefoods.com.

## Open it
Double-click `index.html`. It runs in any modern browser, needs no server and no build step. You need an internet connection for the Google Fonts (Bagel Fat One, Bricolage Grotesque, Gochi Hand). Without one, fallback fonts are used.

`single-file/littleluxe-single-file.html` is the same site in one file, handy for emailing or quick previews.

## Folder structure
```
index.html                  Page shell: announcement bar, header, menu, cart drawer, footer
css/styles.css              All styles. Design tokens (colours, fonts, shapes) are at the top in :root
js/art.js                   Illustration library: product packs, kids, sun, day scene, icons (inline SVG)
js/app.js                   Everything else: product data, sound engine, cart, router, pages, scroll scenes
assets/favicon.svg          Browser tab icon
assets/illustrations/       The same illustrations exported as standalone SVG files, for Figma/Illustrator
docs/                       Design-language document (the Partake teardown and the Little Luxe system)
single-file/                All of the above combined into one HTML file
```

## Pages (hash routes)
| URL | Page |
|---|---|
| `index.html#/` | Home |
| `#/shop` (`#/shop/sun`, `/hydration`, `/kits`) | Shop with filters |
| `#/product/glow-shield` · `blush-block` · `cloud-mist` · `first-glow-kit` | Product pages |
| `#/story` | Our story (timeline and founder letter) |
| `#/start-here` | Three-question ritual quiz |
| `#/inside` | Ingredients (parent/kid switch), never-inside list, certifications |
| `#/faq` | FAQ |
| `#/skin-notes` | Journal |

## Where to edit content
Search the files for `EDIT` and `SWAP`.
- **Products, prices, copy and ingredients:** the `PRODUCTS` object at the top of `js/app.js`. Individual prices are placeholders; only the kit price (₹599, was ₹945) is from the live site.
- **FAQ:** `pageFaq()` in `js/app.js`.
- **Story chapters:** `pageStory()` in `js/app.js`.
- **Journal articles:** the `NOTES` array in `js/app.js`.
- **Home page sections and copy:** `pageHome()` in `js/app.js`.
- **Colours and fonts:** the `:root` block at the top of `css/styles.css`. The same colours appear as hex values in the `C` object at the top of `js/art.js`, which the illustrations use.

## Swapping in real photos
Every illustration is a function call in `js/app.js`, such as `ART.tube('sunny','Glow','Shield')` or `ART.jar()`. To use a real image, replace the call with an image tag, for example:
```js
art: () => `<img src="assets/images/glow-shield.png" alt="Glow Shield sunscreen">`,
```
Then put the photo in `assets/images/`. The Instagram strip (`ART.gramTiles` in `js/art.js`) and the review carousel (marked `SWAP` in `pageHome()`) are ready for real posts and real parent reviews.

## Interactions included
- **Sound:** Web Audio sounds with no audio files: bubble pops on hover, a chime on click, a rising xylophone on the age slider, sparkles and a page swish. There's an on/off toggle in the header, and sound starts after the first tap (a browser rule).
- **Hero parallax:** product packs, sun and clouds sit on depth layers that follow the mouse. A spinning SPF badge and floating stickers respond to scroll.
- **"One sunny day" pinned story:** the sky moves from morning to night as you scroll, with a school bus, recess, cricket and bedtime, and a sun shield at midday.
- **Products drop onto bathroom tiles,** and claim stickers slide in.
- **"Rub it in" demo:** drag on a canvas to rub sunscreen into a cheek, with a progress ring and sparkles.
- **Growth-chart age slider (4–16):** the child grows and the suggested ritual changes.
- **Founder letter:** the envelope opens on scroll.
- **Pinky-promise focus carousel:** swipe, arrows and dots.
- **Shop:** add-to-bag fly animation, cart drawer, "buy 3 kits, get 1 free" logic, header that hides on scroll, marquees, bubble cursor trail, and confetti on newsletter signup.
- **Accessibility:** reduced-motion support, keyboard focus styles and screen-reader labels.

## Mobile behaviour
- **Header:** hides when you scroll down and comes back when you scroll up. The "tap anywhere for little sounds" hint is attached to the header, so it hides and returns with it. After the first tap unlocks sound (a browser rule), the hint disappears and doesn't come back on later visits.
- **Touch feedback:** taps get a pop sound and a press effect instead of hover tilts, which would otherwise stick after a tap. On Android, adding to bag, quiz answers, the age slider and finishing the rub-in demo also give a short vibration. The vibration respects the sound toggle.
- **Phone tilt (Android):** tilting the phone moves the hero illustrations.
- **Layout:** layouts are tuned for 360–430px screens. The announcement bar is shorter, the hero buttons sit on one row, the shop is a two-column grid, the sunny-day story cards sit at the top, and tap targets are 44px or larger. The product page has a sticky "Add to bag" bar and respects the iPhone safe area.
- **Battery:** scroll scenes stop redrawing when nothing is moving.

## Going live
The checkout button is a placeholder. To launch on Shopify, rebuild each home-page section as a custom Dawn section, and use Shopify's own cart and checkout.
