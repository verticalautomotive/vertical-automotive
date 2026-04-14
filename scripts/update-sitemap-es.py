#!/usr/bin/env python3
"""
Update sitemap.xml to:
1. Add hreflang links to existing 32 English city pages
2. Add 32 new Spanish city page entries with hreflang links
"""

SERVICES = [
    "tesla-ev-repair",
    "european-vehicle-repair",
    "asian-vehicle-repair",
    "domestic-vehicle-repair",
    "brake-repair",
    "transmission-service",
    "ac-repair",
    "engine-oil-service",
    "complete-diagnostics",
    "routine-maintenance",
    "steering-suspension",
    "fuel-system-service",
    "hybrid-ev-service",
    "wheel-alignment",
    "battery-charging-systems",
    "fleet-services",
]

CITIES = ["fort-lauderdale", "wilton-manors"]

sitemap_path = "/home/ubuntu/vertical-automotive/client/public/sitemap.xml"

with open(sitemap_path, "r") as f:
    content = f.read()

# Remove existing city page entries (they don't have hreflang)
# We'll replace them with proper hreflang versions
import re

# Remove all existing city page <url> blocks
for city in CITIES:
    for service in SERVICES:
        pattern = rf'  <url><loc>https://verticalautomotive\.com/{city}/{service}</loc>.*?</url>\n'
        content = re.sub(pattern, '', content, flags=re.DOTALL)

# Remove the closing </urlset> tag — we'll add it back at the end
content = content.rstrip()
if content.endswith('</urlset>'):
    content = content[:-len('</urlset>')].rstrip()

# Build city page entries with hreflang
city_entries = []
for city in CITIES:
    for service in SERVICES:
        en_url = f"https://verticalautomotive.com/{city}/{service}"
        es_url = f"https://verticalautomotive.com/es/{city}/{service}"
        
        # English entry
        city_entries.append(f"""  <url>
    <loc>{en_url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{en_url}" />
    <xhtml:link rel="alternate" hreflang="es" href="{es_url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{en_url}" />
    <lastmod>2026-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")
        
        # Spanish entry
        city_entries.append(f"""  <url>
    <loc>{es_url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{en_url}" />
    <xhtml:link rel="alternate" hreflang="es" href="{es_url}" />
    <lastmod>2026-04-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")

# Append city entries and close
content += "\n\n  <!-- City-Specific Service Pages (EN + ES with hreflang) -->\n"
content += "\n".join(city_entries)
content += "\n</urlset>\n"

with open(sitemap_path, "w") as f:
    f.write(content)

# Validate
import xml.etree.ElementTree as ET
tree = ET.parse(sitemap_path)
root = tree.getroot()
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = root.findall('.//s:url', ns)
print(f"Total URLs: {len(urls)}")

# Count city pages
en_city = sum(1 for u in urls if any(f"/{c}/" in u.find('s:loc', ns).text for c in CITIES) and '/es/' not in u.find('s:loc', ns).text)
es_city = sum(1 for u in urls if any(f"/es/{c}/" in u.find('s:loc', ns).text for c in CITIES))
print(f"English city pages: {en_city}")
print(f"Spanish city pages: {es_city}")
print("XML is valid!")
