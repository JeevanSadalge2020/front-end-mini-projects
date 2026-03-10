# Profile Card — Concepts & Learnings

A quick-reference guide covering everything touched in this project.

---

## 1. HTML Structure & Best Practices

### Avoid unnecessary wrapper divs
If a wrapper exists only to hold a single element, remove it and put the class directly on the element.

```html
<!-- ❌ Unnecessary wrapper -->
<div class="card__bio">
  <p>Bio text here.</p>
</div>

<!-- ✅ Class directly on the element -->
<p class="card__bio">Bio text here.</p>
```

### Always add `type` to buttons
Without `type`, a button inside a form defaults to `type="submit"` and may trigger unexpected form submission.

```html
<button type="button">Contact me</button>  <!-- ✅ -->
<button type="submit">Submit form</button>  <!-- ✅ intentional -->
```

### `alt` on images
- Descriptive `alt` for meaningful images
- Empty `alt=""` for purely decorative images (screen readers skip them)

```html
<img src="profile.png" alt="Sarah Dole" />   <!-- ✅ meaningful -->
<img src="divider.png" alt="" />              <!-- ✅ decorative -->
```

### BEM Naming Convention
Block__Element--Modifier. Keeps CSS scoped and readable.

```html
<div class="card">               <!-- Block -->
  <div class="card__identity">   <!-- Element -->
    <h3 class="card__name">      <!-- Element -->
  </div>
</div>
```

---

## 2. CSS Reset

Always load a reset before your own styles. Browsers have their own default styles that cause inconsistencies across browsers.

```css
*, *::before, *::after {
  box-sizing: border-box;   /* padding/border included in width */
}

* {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  line-height: 1.5;         /* browser default ~1.2 is too tight */
}

/* Browsers explicitly set font on these — inheritance won't work */
button, input, textarea, select {
  font-family: inherit;
  font-size: inherit;
}

img, video, svg {
  display: block;           /* removes mysterious ~4px bottom gap */
  max-width: 100%;          /* prevents overflow on small screens */
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word; /* prevents long words from breaking layout */
}
```

**Why `font-family: inherit` on buttons?**
Browsers explicitly set `font-family` on `<button>`, `<input>` etc. in their own stylesheet. Because it's explicitly set, CSS inheritance never kicks in — your `body` font is ignored. `inherit` forces it to use the parent's font.

---

## 3. CSS Custom Properties (Variables)

Define once in `:root`, use everywhere. Makes theming and updates easy.

```css
:root {
  --color-brand: #4338ca;
  --color-bg-start: #f9fafb;
  --color-text-heading: #171717;
}

/* Usage */
button {
  background-color: var(--color-brand);
}
```

**Benefits:**
- Change a color in one place, updates everywhere
- Self-documenting (`--color-brand` is clearer than `#4338ca`)
- Can be overridden in media queries or child elements

---

## 4. Flexbox

### Common pattern — centering a card on screen
```css
body {
  display: flex;
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  min-height: 100vh;
}
```

### `flex-direction: column` for card layout
```css
.card {
  display: flex;
  flex-direction: column;
  align-items: center;  /* centers children horizontally */
  gap: 1rem;            /* spacing between sections */
}
```

### ⚠️ `align-items: center` shrinks children
When `align-items: center` is set on a flex container, children shrink to their content width. `width: 100%` on a child won't work unless the child itself has an explicit width.

```css
/* ❌ button won't be full width */
.card { align-items: center; }
button { width: 100%; }  /* 100% of shrunk width = still small */

/* ✅ fix: give button full width explicitly */
.card { align-items: center; }
button { width: 100%; }  /* works if parent has a defined width */
```

---

## 5. Responsiveness

### Mobile-first with `max-width`
No media queries needed for simple cases. Let `max-width` do the work.

```css
.card {
  width: 90%;        /* fluid on small screens */
  max-width: 400px;  /* caps width on large screens */
}
```

### Add body padding for mobile
Prevents card from touching screen edges on small devices.

```css
body {
  padding: 1rem;
}
```

---

## 6. Hover States & Transitions

Always add hover feedback on interactive elements (buttons, links).

```css
button {
  transition: opacity 0.3s ease;
  cursor: pointer;
}

button:hover {
  opacity: 0.85;
}

.card__socials a:hover {
  opacity: 0.85;
  cursor: pointer;
}
```

**Rule:** `transition` goes on the element itself, not just the hover state — so it animates both on hover AND on hover-out.

---

## 7. Accessibility (a11y)

### `aria-label` — for elements with no visible text
Used when an element has no text content for screen readers to read.

```html
<!-- ❌ Screen reader says: "link" -->
<a href="#"><i class="ri-github-fill"></i></a>

<!-- ✅ Screen reader says: "GitHub" -->
<a href="#" aria-label="GitHub"><i class="ri-github-fill"></i></a>
```

**When to use `aria-label`:**
- Icon-only links and buttons
- Inputs without a visible `<label>`
- Images that convey meaning (use `alt` for images)

**When NOT needed:**
- Buttons/links that already have visible text
- Decorative images (use `alt=""` instead)

---

## 8. CSS File Organisation

Load stylesheets in this order:

```html
<link rel="stylesheet" href="css/reset.css" />   <!-- 1. Reset first -->
<link rel="stylesheet" href="css/style.css" />   <!-- 2. Your styles -->
```

Within `style.css`, order rules from broad to specific:

```
:root          → variables
body           → base styles
.credits       → utility/global components
.card          → parent component first
.card__*       → children after parent
```

---

## 9. Icon Libraries — Remix Icons

Add via CDN, use class names. Icons are font-based so `font-size` controls size.

```html
<!-- In <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" />

<!-- Usage -->
<i class="ri-github-fill"></i>
<i class="ri-linkedin-box-fill"></i>
<i class="ri-instagram-fill"></i>
<i class="ri-twitter-x-fill"></i>
```

```css
/* Control size with font-size */
.card__socials a {
  font-size: 1.5rem;
}
```

---

## 10. CSS Selector Scope

Prefer scoped selectors over global ones to avoid unintended side effects.

```css
/* ❌ Global — affects ALL h3s on the page */
h3 {
  font-size: 1.125rem;
}

/* ✅ Scoped — only affects h3 inside .card__identity */
.card__identity h3 {
  font-size: 1.125rem;
}
```

---

## Quick Checklist for Any Project

- [ ] CSS reset loaded before your styles
- [ ] Colors moved to CSS variables
- [ ] `type="button"` on all non-submit buttons
- [ ] `alt` attribute on all images
- [ ] `aria-label` on icon-only links and buttons
- [ ] `font-family: inherit` on form elements (or handled by reset)
- [ ] Hover states on all interactive elements
- [ ] `max-width` + `width: 90%` for responsive cards
- [ ] `padding` on body so content doesn't touch screen edges
- [ ] CSS ordered: reset → variables → base → components → children
