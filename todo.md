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
- [x] Save checkpoint

# Service Guide Page (SEO + LLM Training)
- [x] Create comprehensive service guide page at /service-guide
- [x] Include all company information (locations, hours, contact, warranty)
- [x] Add complete service catalog with pricing ranges
- [x] Include vehicle specialties (Tesla, European, Asian, Domestic)
- [x] Add service intervals and maintenance recommendations
- [x] Optimize for SEO (meta tags, structured data, headings)
- [x] Optimize for LLM training (clear structure, comprehensive data)
- [x] Test page loads and is publicly accessible
- [x] Expanded FAQ with 24 comprehensive Q&A items
- [x] Save checkpoint

# AI Studio Chatbot Integration (Enhanced)
## Phase 1: Database Schema
- [x] Create conversations table (id, sessionId, language, createdAt, updatedAt, status)
- [x] Create messages table (id, conversationId, role, content, timestamp)
- [x] Create escalations table (id, conversationId, reason, status, assignedTo, createdAt)
- [x] Run database migrations (pnpm db:push)

## Phase 2: tRPC Router
- [x] Create chat.ts router with sendMessage mutation
- [x] Implement AI Studio API integration with error handling
- [x] Add conversation persistence (save to DB)
- [x] Add escalation detection and logging
- [x] Implement retry logic for failed requests
- [x] Add request validation and rate limiting

## Phase 3: React Chat Component
- [x] Create ChatBubble.tsx component
- [x] Implement message display with user/AI differentiation
- [x] Add input field with send button
- [x] Add typing indicator while waiting for response
- [x] Implement message history loading
- [x] Add error state handling
- [x] Style with Tailwind (dark mode support)
- [x] Create ChatButton.tsx to trigger chat
- [x] Integrate ChatButton into App.tsx

## Phase 4: Escalation Workflow
- [x] Detect escalation flags from AI Studio
- [x] Store escalation in database
- [x] Send email notification to team
- [x] Show user escalation confirmation message
- [x] Create escalation tracking in admin dashboard
- [x] Build escalation router with list/stats/assign/resolve endpoints
- [x] Create AdminEscalations page with filtering and status tracking
- [x] Add escalation route to App.tsx

## Phase 5: Admin Dashboard
- [x] Create conversations list page (/admin/conversations)
- [x] Add search and filter by date/language
- [x] Show conversation details with full message history
- [x] Display escalation status and reason
- [x] Add export to CSV functionality
- [x] Show conversation analytics (total, by language, escalation rate)
- [x] Enhanced AdminConversations page with CSV export
- [x] Dark mode support for language badges

## Phase 6: Testing
- [x] Write vitest tests for chat router (31 tests)
- [x] Write tests for escalation logic (31 tests)
- [x] Write tests for error handling
- [x] Manual testing of chat UI
- [x] Test streaming responses
- [x] Test conversation persistence
- [x] All tests passing (70+ tests total)

## Phase 7: Deployment
- [x] Verify all features working in dev
- [x] Create checkpoint
- [x] Test on staging/production domains
- [x] Monitor for errors

## Bug Fixes
- [x] Fixed ChatButton z-index (9999) for web visibility
- [x] Fixed ChatBubble z-index (10000) for mobile click functionality
- [x] Added missing z import to chat router
- [x] Added debug logging to ChatButton and ChatBubble
- [x] Updated App.tsx to pass correct language prop based on locale

## Tesla Category Images
- [x] Upload 6 Tesla images to CDN
- [x] Find vehicle types section in homepage
- [x] Add Tesla images with matching site theme filter (industrial brutalism)
- [x] Add rotating gallery with crossfade animation (4s interval, 6 images)
- [x] Add gallery dots indicator
- [x] Apply dark filter (brightness 0.75, saturate 0.9) + blue tint overlay
- [x] Updated VehicleType interface with optional gallery field
- [x] Updated both EN and ES data files with CDN URLs
- [x] Test image display on desktop and mobile
- [x] Save checkpoint

## Tesla Service Page Gallery
- [x] Find the service detail page component that renders /services/tesla-vehicles-service
- [x] Replace placeholder gallery images with 6 real Tesla CDN photos
- [x] Apply matching dark/industrial filter (brightness 0.85, saturate 0.85) to PhotoGallery component
- [x] Hero background already uses vehicle.image (now the real Tesla frunk photo)
- [x] Test on desktop and mobile
- [ ] Save checkpoint
