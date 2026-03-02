# Lazy Loading Audit

## Images missing loading="lazy"

- [ ] Footer.tsx: logo img (line ~60) — below fold, needs loading="lazy" + decoding="async"
- [ ] Navigation.tsx: logo img (line ~107) — above fold, should stay eager (fetchPriority="high")
- [ ] ManusDialog.tsx: dialog img (line ~58) — rendered on demand, OK as-is
- [ ] Home.tsx hero img (line ~237) — above fold LCP, correctly uses fetchPriority="high", no lazy
- [ ] Home.tsx about section img (line ~521) — already has loading="lazy" ✓
- [ ] Blog.tsx featured article img (line ~250) — already has loading="lazy" ✓
- [ ] Blog.tsx article cards img (line ~303) — already has loading="lazy" ✓
- [ ] BlogArticle.tsx related articles img (line ~668) — already has loading="lazy" ✓
- [ ] Services.tsx vehicle type img (line ~63) — already has loading="lazy" ✓
- [ ] OptimizedImage component — defaults to loading="lazy" unless priority=true ✓

## Background images (CSS) that could benefit from lazy loading
- [ ] PageHero.tsx: backgroundImage on inner pages — convert to <img> with lazy loading
- [ ] BlogArticle.tsx: hero backgroundImage — convert to <img> with lazy loading
- [ ] Blog.tsx: passes backgroundImage to PageHero

## Other
- [ ] Navigation.tsx logo: add fetchPriority="high" since it's above fold on every page
- [ ] ServiceIcon SVGs: check if they're heavy (inline SVGs, no lazy needed)
- [ ] LazyMap: already uses IntersectionObserver — ✓
