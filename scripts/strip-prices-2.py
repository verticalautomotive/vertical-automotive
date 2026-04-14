#!/usr/bin/env python3
"""
Targeted cleanup of remaining price mentions in city-pages-content.ts
"""

file_path = "/home/ubuntu/vertical-automotive/client/src/data/city-pages-content.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix oil change intro (Fort Lauderdale) - remove price range from prose
content = content.replace(
    "Our oil service starts at $89.99 for conventional oil and goes up to $185 for full synthetic — and every oil change includes a complimentary multi-point inspection that checks fluid levels, belt condition, tire pressure, brake wear, and your vehicle's major systems.",
    "Every oil change includes a complimentary multi-point inspection that checks fluid levels, belt condition, tire pressure, brake wear, and your vehicle's major systems."
)

# Fix oil change intro (Fort Lauderdale) Spanish
content = content.replace(
    "proporcionamos servicio completo de aceite de motor desde $89.99 para aceite convencional y hasta $185 para sintético completo. Pero no solo cambiamos su aceite — cada servicio de aceite incluye una inspección multipunto cubriendo niveles de fluidos, condición de correas, presión de llantas, desgaste de frenos y una verificación visual de los sistemas principales de su vehículo.",
    "cada servicio de aceite incluye una inspección multipunto cubriendo niveles de fluidos, condición de correas, presión de llantas, desgaste de frenos y una verificación visual de los sistemas principales de su vehículo."
)

# Fix oil change intro (Wilton Manors)
content = content.replace(
    "Our oil service starts at $89.99 for conventional oil and goes up to $185 for full synthetic — and every oil change includes a complimentary multi-point inspection",
    "Every oil change includes a complimentary multi-point inspection"
)

# Fix oil change intro (Wilton Manors) Spanish
content = content.replace(
    "Nuestro servicio de aceite comienza en $89.99 para aceite convencional y llega hasta $185 para sintético completo — y cada cambio de aceite incluye una inspección multipunto de cortesía.",
    "Cada cambio de aceite incluye una inspección multipunto de cortesía."
)

# Fix FAQ answer (Fort Lauderdale oil change)
content = content.replace(
    'answer:"At Vertical Automotive, oil change pricing is: conventional oil $89.99. European vehicles requiring long-life synthetic oils are at the higher end. Every oil change includes a multi-point inspection at no extra charge. Engine air filter replacement is and fuel filter service is Call (645) 216-2266."',
    'answer:"At Vertical Automotive in Fort Lauderdale, we offer conventional, synthetic blend, and full synthetic oil changes — pricing varies by vehicle and oil type. Every oil change includes a multi-point inspection at no extra charge. Call (645) 216-2266 for a quote specific to your vehicle."'
)

# Fix FAQ answer (Fort Lauderdale oil change) Spanish
content = content.replace(
    'answerEs:"En Vertical Automotive, los precios de cambio de aceite son: aceite convencional $89.99. Los vehículos europeos que requieren aceites sintéticos de larga vida están en el extremo superior. Llame al (645) 216-2266."',
    'answerEs:"En Vertical Automotive en Fort Lauderdale, ofrecemos cambios de aceite convencional, mezcla sintética y sintético completo. Llame al (645) 216-2266 para una cotización específica para su vehículo."'
)

# Fix FAQ answer (Wilton Manors oil change)
content = content.replace(
    'answer:"At Vertical Automotive in Wilton Manors, oil changes cost: conventional $89.99. European vehicles with long-life oil specifications are at the higher end. Every oil change includes a free multi-point inspection. Call (954) 565-1518 or just stop by — walk-ins welcome."',
    'answer:"At Vertical Automotive in Wilton Manors, we offer conventional, synthetic blend, and full synthetic oil changes — pricing varies by vehicle and oil type. Every oil change includes a free multi-point inspection. Call (954) 565-1518 or just stop by — walk-ins welcome."'
)

# Fix FAQ answer (Wilton Manors oil change) Spanish
content = content.replace(
    'answerEs:"En Vertical Automotive en Wilton Manors, los cambios de aceite cuestan: convencional $89.99. Llame al (954) 565-1518 o simplemente pase — se aceptan visitas sin cita."',
    'answerEs:"En Vertical Automotive en Wilton Manors, ofrecemos cambios de aceite convencional, mezcla sintética y sintético completo. Llame al (954) 565-1518 o simplemente pase — se aceptan visitas sin cita."'
)

# Fix "Prevents Expensive Breakdowns" Why Choose Us item
content = content.replace(
    'description:"Regular maintenance catches small problems before they become expensive repairs — a $150 coolant flush prevents a $2,000 overheating disaster"',
    'description:"Regular maintenance catches small problems before they become expensive repairs — a coolant flush today prevents a costly overheating disaster down the road"'
)

# Fix FAQ about skipping maintenance
content = content.replace(
    'answer:"You can, but it\'s significantly more expensive in the long run. A $285 transmission fluid exchange prevents a transmission rebuild. A $230 coolant flush prevents a overheating repair. Regular maintenance also preserves your vehicle\'s resale value — buyers and dealers check service records."',
    'answer:"You can, but it\'s significantly more expensive in the long run. A transmission fluid exchange prevents a costly rebuild. A coolant flush prevents an overheating repair. Regular maintenance also preserves your vehicle\'s resale value — buyers and dealers check service records."'
)

# Fix FAQ about skipping maintenance (Spanish) - truncated version
content = content.replace(
    'answerEs:"Puede, pero es significativamente más costoso a largo plazo. Un intercambio de fluido de transmisión de $285 previene una reconstrucción de transmisión de"',
    'answerEs:"Puede, pero es significativamente más costoso a largo plazo. Un intercambio de fluido de transmisión previene una reconstrucción costosa. El mantenimiento regular también preserva el valor de reventa de su vehículo."'
)

# Fix "Save on Tire Replacement" Why Choose Us item
content = content.replace(
    'description:"Proper alignment extends tire life by thousands of miles — a alignment can save $500+ in premature tire replacement"',
    'description:"Proper alignment extends tire life by thousands of miles — saving you significantly on premature tire replacement costs"'
)

# Fix Spanish version of Save on Tire Replacement
content = content.replace(
    'descriptionEs:"La alineación adecuada extiende la vida de las llantas por miles de millas — una alineación de puede ahorrar $500+ en reemplazo prematuro de llantas"',
    'descriptionEs:"La alineación adecuada extiende la vida de las llantas por miles de millas — ahorrándole significativamente en costos de reemplazo prematuro de llantas"'
)

# Final cleanup: remove any remaining $digit patterns that slipped through
import re
remaining = re.findall(r'\$\d', content)
print(f"Remaining price patterns: {len(remaining)}")
if remaining:
    # Show context
    for m in re.finditer(r'.{0,50}\$\d.{0,50}', content):
        print(f"  → {m.group()}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
