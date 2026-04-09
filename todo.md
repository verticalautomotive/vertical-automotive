# Call Now Button Popup - Task List

- [x] Review all components that display phone numbers
- [x] Create reusable CallNowPopup component with location selection
- [x] Update Navigation header - replace dual phone numbers with Call Now button
- [x] Update Footer component - kept phone numbers (context-specific location cards)
- [x] Update MobileFooterBar - replaced with single Call Now button + dialog
- [x] Update FloatingActions - already uses location picker popup (no change needed)
- [x] Update Contact page - replaced Call Us card with Call Now button + dialog
- [x] Update Home page sticky bar - replaced with Call Now button + dialog
- [x] Add bilingual support (EN/ES) for popup text
- [x] Test and save checkpoint (FAQ page also updated)

# Ask Shift AI Chatbot
- [x] Upgrade project to full-stack (web-db-user)
- [x] Add Gemini API key as secret
- [x] Create chatbot tRPC router with Gemini AI integration
- [x] Build Ask Shift frontend chat UI component
- [x] Add floating Ask Shift button (desktop: bottom-right, mobile: next to Text/Directions)
- [x] Integrate pricing data from spreadsheet into chatbot system prompt
- [x] Add bilingual EN/ES support to chatbot
- [x] Add scheduling link (Kukui) in chatbot responses
- [x] Test chatbot and save checkpoint

# Talk to a Human Fallback
- [x] Update chatbot backend to detect unanswerable questions and include fallback signal
- [x] Build HumanFallbackCard component with call/text options (bilingual)
- [x] Render fallback card in Shift chat when AI signals it cannot answer
- [x] Add "Talk to a human" quick-action button always visible at bottom of chat
- [x] Test and save checkpoint

# Shift Chatbot Bug Fixes
- [x] Fix truncated price ranges (spark plugs cut off mid-sentence)
- [x] Fix oil change question triggering error/NEEDS_HUMAN instead of giving price
- [x] Increase maxOutputTokens to prevent cut-off responses
- [x] Strengthen system prompt: never truncate prices, never escalate simple pricing questions
- [x] Add retry logic for transient Gemini API errors

# Shift Auto-Sync from Website
- [x] Add knowledge_base table to DB schema
- [x] Run pnpm db:push to migrate
- [x] Build website crawler that scrapes verticalautomotive.com key pages
- [x] Use Gemini to extract structured knowledge from crawled HTML
- [x] Store extracted knowledge in DB with timestamp
- [x] Update Shift chatbot to read knowledge from DB
- [x] Add sync trigger tRPC endpoint (admin-only)
- [x] Schedule daily auto-refresh cron job
- [x] Test end-to-end crawl and chat with DB knowledge
- [x] Change sync schedule from daily to weekly, remove startup auto-sync
- [x] Restrict Shift sync panel to owner-only (hide settings icon from regular visitors)

# Shift Chat Scroll & Contrast Fix
- [x] Fix chat scroll to show welcome message at top when opened
- [x] Improve selected quick question button contrast (bright blue + white text)

# Conversation Logging
- [x] Add conversation_logs DB table to store chat history
- [x] Create tRPC endpoint to save conversations when "Talk to a Human" is clicked
- [x] Update HumanFallbackCard to log entire conversation to DB
- [x] Test end-to-end logging

# Admin Dashboard for Conversations
- [x] Create tRPC endpoints to fetch and search conversations (list, stats)
- [x] Build admin dashboard page with conversation list
- [x] Add search and filter UI (by date, language, keywords)
- [x] Add conversation detail view modal
- [x] Restrict dashboard to owner-only access
- [x] Write and run vitest tests for conversation queries
- [ ] Save checkpoint

# Service Guide Page (SEO + LLM Training)
- [x] Create comprehensive service guide page at /service-guide
- [x] Include all company information (locations, hours, contact, warranty)
- [x] Add complete service catalog with pricing ranges
- [x] Include vehicle specialties (Tesla, European, Asian, Domestic)
- [x] Add service intervals and maintenance recommendations
- [x] Optimize for SEO (meta tags, structured data, headings)
- [x] Optimize for LLM training (clear structure, comprehensive data)
- [x] Test page loads and is publicly accessible
- [ ] Save checkpoint

# Replace Shift with AI Studio Chatbot
- [x] Remove current Shift chatbot component and logic
- [x] Embed AI Studio chatbot iframe (https://ais-dev-q73kw5kw7gnfswdjstsrpe-629206854967.us-east1.run.app)
- [x] Style iframe to match website design
- [x] Test chatbot responses are fast and accurate
- [ ] Verify conversation logging still works for escalations
- [ ] Save checkpoint
