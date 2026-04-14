#!/usr/bin/env python3
"""Final targeted cleanup of remaining price mentions"""

import re

file_path = "/home/ubuntu/vertical-automotive/client/src/data/city-pages-content.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix "Brake jobs that cost $1,200+ at the dealer" comparison
content = content.replace(
    "Brake jobs that cost $1,200+ at the dealer are at our shop.",
    "Brake jobs that cost significantly more at the dealer are handled at our shop for far less."
)

# Fix Spanish version
content = content.replace(
    "Trabajos de frenos que cuestan $1,200+ en el concesionario son por eje en nuestro taller.",
    "Trabajos de frenos que cuestan mucho más en el concesionario se realizan en nuestro taller por mucho menos."
)

# Fix "Save $500-$2,000/Year vs. Dealers" title - keep the comparison concept but remove dollar amounts
content = content.replace(
    'title:"Save $500-$2,000/Year vs. Dealers"',
    'title:"Save Significantly vs. Dealers"'
)
content = content.replace(
    'titleEs:"Ahorre /Año vs. C',
    'titleEs:"Ahorre Significativamente vs. C'
)

# Fix the description with $500-$2,000
content = content.replace(
    'description:"Our Wilton Manors customers save an average of $500-$2,000 per year compared to dealership pricing"',
    'description:"Our Wilton Manors customers save significantly each year compared to dealership pricing — same quality work, lower cost"'
)

# Fix oil change starting price in intro
content = re.sub(
    r'we provide complete engine oil service starting at \$89\.99 for conventional oil and up to \$185 for full [a-z]+',
    'we provide complete engine oil service for conventional, synthetic blend, and full synthetic oils',
    content
)

# Also fix any titleEs that got truncated
content = re.sub(r'titleEs:"Ahorre /Año vs\. C([^"]*)"', 
    lambda m: 'titleEs:"Ahorre Significativamente vs. Concesionarios"', 
    content)

remaining = re.findall(r'\$\d', content)
print(f"Remaining price patterns: {len(remaining)}")
if remaining:
    for m in re.finditer(r'.{0,60}\$\d.{0,60}', content):
        print(f"  → {m.group()}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
