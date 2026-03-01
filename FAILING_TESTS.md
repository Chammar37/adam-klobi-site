# Pre-existing Failing Playwright Tests

These failures exist on `main` before any recent changes.

## interactive-image.spec.js
- **container fills viewport minus footer** (desktop) — `box.width` returns `1439.999...` instead of exact `1440`, floating point precision issue
- **hotspot images are rendered** (desktop) — expects 4 `.hotspot-image` elements, gets 0 (likely timing/load issue)
- **container is relatively positioned** (tablet) — `.interactive-image-container` is hidden at 768px (mobile menu replaces it)
- **home page loads** (tablet/mobile) — same as above, container hidden at ≤768px

## responsive.spec.js
- **about page fills viewport height** (all viewports) — `flex: 1` on `.about-page` doesn't account for nav/footer height
- **signup form uses horizontal flex layout** (tablet) — expects `row`, gets `row-reverse`

## footer.spec.js
- **AK logo is visible** (tablet) — `.footer-ak` is `display: none` at ≤768px by design

## pages.spec.js
- **home page loads** (tablet/mobile) — `.interactive-image-container` hidden at ≤768px
