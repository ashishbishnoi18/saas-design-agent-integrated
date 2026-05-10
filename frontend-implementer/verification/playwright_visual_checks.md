# Playwright Verification Checklist

Run after frontend implementation:

1. Desktop viewport: 1440x900
2. Tablet viewport: 768x1024
3. Mobile viewport: 390x844
4. Verify `#page-root`, `#primary-section`, `#primary-action`, and all required selectors are visible.
5. Verify no horizontal overflow on mobile.
6. Verify primary action is reachable in the mobile first viewport unless the architecture explicitly requires otherwise.
7. Capture first-viewport screenshots and full-page screenshots.
8. Compare visual hierarchy against the architecture spec.
9. Run accessibility checks for labels, focus order, keyboard reachability, and contrast.
