#!/usr/bin/env python3
"""
Strip specific dollar price ranges from city-pages-content.ts prose text.
Keeps competitive comparison messaging like "save 30-50%" or "save $500-$2,000 per year".
Removes patterns like ($89.99–$185), ($550–$950 per axle), $200–$275, etc.
"""

import re

file_path = "/home/ubuntu/vertical-automotive/client/src/data/city-pages-content.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

original_count = len(re.findall(r'\$\d', content))
print(f"Price patterns before: {original_count}")

# Pattern 1: Remove parenthetical price ranges like ($89.99–$185) or ($550–$950 per axle)
# These appear in intro text and FAQ answers
content = re.sub(r'\s*\(\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?\)', '', content)

# Pattern 2: Remove inline price ranges like "$89.99–$185" or "$550–$950 per axle" 
# when preceded by "runs" or "costs" or similar verbs
content = re.sub(r'\s+runs\s+\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?', '', content)
content = re.sub(r'\s+costs?\s+\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?', '', content)

# Pattern 3: Remove "from $X–$Y" patterns
content = re.sub(r'\s+from\s+\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?', '', content)

# Pattern 4: Remove "at $X–$Y" patterns
content = re.sub(r'\s+at\s+\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?', '', content)

# Pattern 5: Remove standalone price ranges in FAQ answers like "an oil change runs $89.99–$185,"
# More aggressive: remove any "$X–$Y" or "$X-$Y" patterns that aren't part of "save $X" comparisons
# But keep "save $500-$2,000 per year" style comparisons
# Strategy: remove price ranges that appear after service names
content = re.sub(r'(\w+\s+change\s+)\$[\d,.]+(–|-)\$[\d,.]+', r'\1', content)
content = re.sub(r'(brake\s+\w+\s+(?:and\s+\w+\s+)?replacement\s+)\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?', r'\1', content)
content = re.sub(r'(transmission\s+\w+\s+(?:exchange\s+)?)\$[\d,.]+(–|-)\$[\d,.]+', r'\1', content)
content = re.sub(r'(diagnostic\s+scan\s+)\$[\d,.]+(–|-)\$[\d,.]+', r'\1', content)
content = re.sub(r'(services?\s+(?:from\s+)?)\$[\d,.]+(–|-)\$[\d,.]+(?:\s+depending\s+on[^"]*)?', r'\1', content)
content = re.sub(r'(caliper\s+clean\s+and\s+lube\s+service\s+)\$[\d,.]+(–|-)\$[\d,.]+', r'\1', content)
content = re.sub(r'(coolant\s+flush\s+service\s+)\$[\d,.]+(–|-)\$[\d,.]+', r'\1', content)
content = re.sub(r'(filter\s+replacement\s+)\$[\d,.]+(–|-)\$[\d,.]+', r'\1', content)

# Pattern 6: Remove FAQ answer price lists like "an oil change runs X, brake pad and rotor replacement X"
# These are structured as "service name $X–$Y, service name $X–$Y"
content = re.sub(r',\s+\w[\w\s]+\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?(?=,|\.|")', '', content)

# Pattern 7: Remove remaining standalone price ranges not part of "save" comparisons
# Match $digits–$digits or $digits-$digits that aren't preceded by "save" or "average"
def remove_non_comparison_prices(m):
    # Get some context before the match
    start = max(0, m.start() - 30)
    context = content[start:m.start()].lower()
    # Keep if it's a comparison/savings context
    if any(word in context for word in ['save', 'saving', 'average', 'compared']):
        return m.group(0)
    return ''

content = re.sub(r'\$[\d,.]+(–|-)\$[\d,.]+(?:\s+per\s+\w+)?', remove_non_comparison_prices, content)

# Clean up double spaces and trailing spaces before punctuation
content = re.sub(r'  +', ' ', content)
content = re.sub(r' ([,.])', r'\1', content)
content = re.sub(r' (["\'`])', r'\1', content)

# Clean up "— " at end of sentences before period/comma
content = re.sub(r'\s*—\s*([,.])', r'\1', content)

remaining_count = len(re.findall(r'\$\d', content))
print(f"Price patterns after: {remaining_count}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done! File updated.")
