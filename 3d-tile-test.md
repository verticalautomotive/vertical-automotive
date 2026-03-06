# 3D Tile Effects - Visual Test Results

## Homepage
- Vehicle type image tiles (Tesla & EV, Asian, European, Domestic): tile-3d-image class applied, rounded corners visible
- Service tiles (15 cards in 5-col grid): tile-3d class with perspective wrapper, rounded corners, subtle gradient background, soft shadows visible
- Offer cards (6 cards in 3-col grid): tile-3d + tile-3d-offer applied, rounded corners, gradient background visible
- Hover on "A/C Vent & Duct Disinfecting" card: card appears slightly elevated with blue border highlight

## Observations
- The 3D lift + tilt effect is subtle and professional
- The ::before pseudo-element adds a nice top-edge highlight
- Cards have rounded corners (~12px) as specified
- Soft shadows create depth without being heavy
- The hover state shows border-primary highlight + shadow deepening
