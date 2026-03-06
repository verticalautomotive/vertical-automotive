# Tile Rounding Fixes

## Issues
The glass-card CSS has border-radius: 18px which makes tiles look oval/pill-shaped instead of rectangular.
Blog article cards and images also appear too rounded (circular images).

## Fixes needed
- [ ] ServiceDetail.tsx "Other Services" tiles: add rounded-xl (12px) 
- [ ] Blog.tsx featured article card: add rounded-xl (12px)
- [ ] Blog.tsx grid article cards: add rounded-xl (12px) and images rounded-t-xl
- [ ] glass-card CSS: reduce border-radius from 18px to 12px globally
- [ ] glass-offer CSS: reduce border-radius similarly
- [ ] glass-coupon CSS: reduce border-radius similarly
