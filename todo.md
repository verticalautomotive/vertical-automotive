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
- [x] Save checkpoint

## Google Ads Tag Integration
- [x] Add Google Ads gtag (AW-17913524206) to client/index.html head
- [x] Save checkpoint

## Google Ads Get Directions Conversion Tracking
- [x] Find all Get Directions links in the codebase
- [x] Add gtag conversion event (AW-17913524206/PjP3CMKCp4ocEO7f6t1C) to each Get Directions click (via centralized trackDirections in gtm.ts)
- [x] Save checkpoint

## Performance Optimization (PageSpeed Mobile 45 → target 70+)
- [ ] Audit live site via PageSpeed API to identify top bottlenecks
- [ ] Defer/async render-blocking third-party scripts (GTM, Google Ads gtag)
- [ ] Optimize LCP hero image (proper preload, correct size hints)
- [ ] Lazy-load below-fold images
- [ ] Reduce unused JavaScript (code splitting / dynamic imports)
- [ ] Fix font loading (font-display: swap, preconnect)
- [ ] Save checkpoint

## Logo Fix (Broken after CDN migration)
- [x] Diagnose broken logo CDN URL (CDN served SVG as application/octet-stream)
- [x] Fix logo: moved SVG to client/public, served via app with correct MIME type
- [ ] Save checkpoint

## European Cars Gallery
- [x] Copy 6 Euro car photos to webdev-static-assets and upload to CDN
- [x] Update data.ts European vehicle type with gallery images
- [x] Update data-es.ts Spanish version
- [x] Updated VehicleDetail.tsx to use vehicle.gallery when available (not just Tesla)
- [x] Verify gallery on /services/european-vehicles-service page
- [x] Save checkpoint

## Asian Cars Gallery
- [x] Upload 6 Asian car photos to CDN
- [x] Update data.ts Asian vehicle type with gallery images
- [x] Update data-es.ts Spanish version
- [x] Verify gallery on /services/asian-vehicles-service page and homepage card
- [x] Save checkpoint

## Domestic Cars Gallery
- [x] Upload 6 domestic car photos to CDN (7 uploaded, best 6 used)
- [x] Update data.ts Domestic vehicle type with gallery images
- [x] Update data-es.ts Spanish version
- [x] Verify gallery on /services/domestic-vehicles-service page and homepage card
- [x] Save checkpoint

## Blog Post Image Updates
- [x] Replace fleet-vehicle-maintenance-schedules image with white pickups/minivans fleet photo
- [x] Replace dashboard-warning-lights-guide image with dashboard warning lights photo
- [x] Upload new images to CDN
- [x] Update blog-articles.ts for both EN and ES versions
- [x] Save checkpoint

## Tesla LDU Blog Post
- [x] Research Tesla LDU rebuild vs replacement topic
- [x] Write EN article object (tesla-ldu-rebuild-vs-replacement)
- [x] Write ES article object (reconstruccion-vs-reemplazo-ldu-tesla)
- [x] Find and upload hero image to CDN
- [x] Insert both articles into blog-articles.ts
- [x] Register slug mapping in useTranslation.ts
- [x] Verify TypeScript compiles cleanly (0 errors)
- [x] Save checkpoint

## Tesla LDU Blog Post - Real Hero Image
- [x] Upload 2 real LDU shop photos to CDN
- [x] Update blog-articles.ts hero image (EN + ES) with real LDU photo
- [x] Save checkpoint

## Tesla Battery Degradation Blog Post
- [x] Write EN article object (tesla-battery-degradation-range-loss)
- [x] Write ES article object (degradacion-bateria-tesla-perdida-autonomia)
- [x] Find and upload hero image to CDN
- [x] Insert both articles into blog-articles.ts
- [x] Register slug mapping in useTranslation.ts
- [x] Verify TypeScript compiles cleanly (0 errors)
- [x] Save checkpoint

## Homepage Hero Video
- [x] Upload hero video to CDN
- [x] Replace homepage hero background image with autoplay background video
- [x] Save checkpoint

## Payment Authorization Form
- [x] DB schema: payment_authorizations table with all fields + immutable flag
- [x] Backend: submit procedure (create record, generate ref number, store IP/UA)
- [x] Backend: PDF generation with signature image, all fields, timestamp, IP
- [x] Backend: email delivery to customer + both shop inboxes on submit (SMTP env vars required)
- [x] Backend: list/get/CSV export procedures for admin
- [x] Backend: mark-as-dispute procedure
- [x] Frontend: 3-step form at /payment-authorization (Info → Authorization → Signature)
- [x] Frontend: digital signature pad (touch + mouse)
- [x] Frontend: URL pre-fill from query params (invoice, amount, service, location)
- [x] Frontend: confirmation page with reference number
- [x] Frontend: admin dashboard at /admin/authorizations (search, filter, CSV, dispute flag)
- [x] Route registration in App.tsx for both pages

## RO URL Extraction for Payment Authorization
- [ ] Analyze Shop-Ware RO page structure and available data fields
- [ ] Backend: tRPC procedure to fetch RO URL, scrape HTML, extract fields with Gemini AI
- [ ] DB schema: add roSourceUrl and roExtractedData columns to payment_authorizations
- [ ] Backend: re-extract endpoint to re-run extraction from stored RO URL
- [ ] Frontend: RO URL paste field at top of payment authorization form
- [ ] Frontend: auto-fill form fields from extracted data with preview
- [ ] Admin dashboard: show RO URL link and re-extract button per record

## Send Payment Form Link via SMS
- [x] Add Twilio credentials (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER)
- [x] Install Twilio SDK
- [x] Add sendFormLink tRPC procedure: generate pre-filled URL, send SMS via Twilio
- [x] Add Send Link button to admin dashboard with phone number display and confirmation

## Send Payment Form Staff Page
- [x] Build /send-payment-form page with RO URL input, data preview, editable fields, and Send SMS button
- [x] Register route in App.tsx

## Payment Form Fixes
- [ ] Remove Driver's License field from PaymentAuthorization customer form
- [ ] Fix phone number extraction mapping in SendPaymentForm (extractRo response shape)
- [ ] Fix SMS link to pre-fill ALL extracted fields into the customer form via URL params

## Slack Notification + Email Fix
- [x] Add Slack notification on payment authorization form submission (SLACK_CCAUTH_WEBHOOK_URL)
- [x] Fix email delivery — replaced SMTP with SendGrid (@sendgrid/mail)

## Payment Form Customer UX
- [x] Remove auto-fill from customer-facing PaymentAuthorization form (customers fill in themselves)
- [x] Install @sendgrid/mail package (was missing, causing server ERR_MODULE_NOT_FOUND)
- [x] Clean up unused imports (Sparkles, AlertCircle, Link2) from PaymentAuthorization.tsx

## Email Delivery Fix
- [x] Diagnose SendGrid email failure — noreply@ was not a verified sender
- [x] Fix root cause — switched from address to service@verticalautomotive.com
- [ ] Save checkpoint

## Email From Address Fix
- [x] Change SendGrid from address from noreply@ to service@verticalautomotive.com (verified sender)
- [x] Test email delivery end-to-end — HTTP 202 confirmed
- [ ] Save checkpoint

## Customer Form Auto-Fill (Complete Removal)
- [x] Confirmed: PaymentAuthorization.tsx has zero URL param reading
- [x] Confirmed: form state initialises with empty strings only
- [x] Fixed: server sendFormLink now sends clean URL with no query params
- [ ] Save checkpoint

## Payment Form UX Improvements (Round 2)
- [x] Pre-fill amount, customer info, and vehicle from URL params (read-only display, not editable)
- [x] Center the Next/Back button on mobile so it does not clash with floating icons
- [x] Remove the service description field from the authorization form
- [x] Update server sendFormLink to pass amount, name, vehicle, invoice in URL
- [ ] Save checkpoint

## Payment Form Bug Fixes (Round 3)
- [x] Fix server: serviceDescription made optional with default empty string
- [x] Fix amount: server now always passes amount param; staff can manually enter/edit amount before sending SMS
- [x] Add editable amount field on /send-payment-form step 3 with amber warning when RO has no total
- [ ] Save checkpoint

## RO Total Extraction Fix
- [x] Expanded WO type to include all financial fields
- [x] Added dedicated /work_order_financial API call with debug logging
- [x] Resolution chain now checks 10 possible locations in priority order
- [ ] Save checkpoint

## Estimate Route Fix
- [ ] Diagnose /estimate-comparison/new not loading
- [ ] Fix the route
- [ ] Save checkpoint

## 3-Phase SEO Improvement (9 Service Pages)
- [x] Phase 1: Applied exact title/meta/H1/canonical to all 9 pages (ServiceDetail + VehicleDetail + Offers)
- [x] Phase 2: Optimized titles under 60 chars, unique H1s, improved meta descriptions
- [x] Phase 3: LocalBusiness JSON-LD schema in ServiceDetail, VEHICLE_FAQS added for 4 vehicle pages, ServiceFAQ wired into VehicleDetail, Offers SEO updated with near-me keywords
- [x] Final validation: TypeScript 0 errors, vehicle slugs match FAQ keys
- [ ] Save checkpoint

## Cookie Consent Banner (GDPR/CCPA Compliance)
- [x] Build CookieConsentBanner component with bilingual support (EN/ES)
- [x] Add localStorage persistence for user preferences (analytics, marketing, essential)
- [x] Wire banner into App.tsx (fixed bottom, dismissible)
- [x] Add consent-aware analytics tracking (respect user preferences in gtag config)
- [x] Update index.html gtag to check localStorage on load
- [ ] Save checkpoint

## SEO Refinement Improvements (Phase 2)
- [x] Rewrite all title tags: [Primary Keyword] Fort Lauderdale | [Value] | Vertical Automotive (max 60 chars)
- [x] Rewrite all H1s with varied structure (no repetition, removed "& Wilton Manors")
- [x] Add Related Services sections (3-5 links per page, keyword anchors) — RelatedServices component created
- [x] Add FAQ sections (3-5 questions per page with schema) — ServiceFAQ already renders with FAQPage schema
- [x] Add "near me" keywords naturally in FAQ answers
- [x] Upgrade Offers page with SEO intro paragraph (bilingual, targets "auto repair deals near me")
- [x] TypeScript validation: 0 errors
- [ ] Save checkpoint

## 32 City-Specific Local SEO Pages (Fort Lauderdale + Wilton Manors)
- [x] Design data structure for 32 pages (16 services × 2 locations)
- [x] Create city-pages.ts with all service/location combinations
- [x] Generate unique content for each page using Gemini AI (intro, FAQ, why choose us)
- [x] Build CityServicePage component with dynamic routing
- [x] Fix routing: derive city from pathname instead of route params
- [x] Wire city routes into App.tsx (before generic :slug routes)
- [x] Test city pages load correctly with proper content
- [x] Add LocalBusiness JSON-LD schema (location-specific address, phone, hours)
- [x] Add FAQPage schema with location-specific questions
- [x] Add BreadcrumbList schema for navigation
- [x] Add Related Services section with internal linking
- [x] Update sitemap.xml with all 32 city service pages
- [x] Validate schemas with browser console (6 schemas found: 4 AutoRepair, 1 FAQPage, 1 BreadcrumbList)
- [ ] Save checkpoint

## Navigation Integration for 32 City Pages
- [x] Update SERVICE dropdown with two-column mega menu (Fort Lauderdale + Wilton Manors)
- [x] Add location buttons to homepage service cards
- [x] Update footer with two-column location-specific service links
- [x] Update sitemap.xml with all 32 city page URLs
- [x] Add cross-location banners to city service pages
- [x] Test all navigation updates
- [x] Mobile accordion: two location buttons with smooth expand/collapse animation
- [x] Save checkpoint

## Rewrite All 32 City Service Pages (Content Quality Upgrade)
- [x] Scrape pricing data from /service-guide page
- [x] Update CityServicePage component to support expanded content (10-12 items, descriptions, pricing)
- [x] Rewrite Tesla & EV pages (Fort Lauderdale + Wilton Manors)
- [x] Rewrite European Vehicle pages (Fort Lauderdale + Wilton Manors)
- [x] Rewrite Domestic Vehicle pages (Fort Lauderdale + Wilton Manors)
- [x] Rewrite Brake pages (Fort Lauderdale + Wilton Manors)
- [x] Rewrite A/C pages (Fort Lauderdale + Wilton Manors)
- [x] Rewrite remaining 22 pages (all other services × both cities)
- [x] Fix: Remove phone number from Why Choose Us bullets
- [x] Fix: Expand intros to 150-200 words, unique per city
- [x] Fix: Rewrite FAQs as genuinely helpful answers with pricing
- [x] Test all 32 pages and save checkpoint

## Remove Prices from City Service Pages
- [x] Remove price field from ServiceItem objects in city-pages.ts
- [x] Remove price ranges from intro text in city-pages-content.ts
- [x] Remove price ranges from FAQ answers in city-pages-content.ts
- [x] Remove price badge rendering from CityServicePage component
- [x] Remove pricing disclaimer note from What's Included section
- [x] Keep competitive comparison messaging (e.g., "save 30-50% vs. dealership")
- [x] Save checkpoint

## Sitemap.xml Fix (XML Error)
- [x] Read current sitemap.xml and identify extra content after </urlset>
- [x] Rewrite sitemap.xml with all required URLs and proper XML structure
- [x] Ensure all 32 city pages, homepage, about, contacts, offers, gallery, blog, service-guide, payment-authorization, and service pages are included
- [x] Validate XML is well-formed (starts with <?xml>, ends with </urlset>, nothing after)
- [x] Save checkpoint

## Resubmit Sitemap to Google
- [x] Ping Google with sitemap URL (deprecated since 2023 - Google auto-discovers via robots.txt)

## Spanish Translations for 32 City Pages
- [x] Create Spanish content data (introText, whyChooseUs, faq) for all 32 pages (already embedded in data files)
- [x] Add Spanish routing (/es/fort-lauderdale/... and /es/wilton-manors/...)
- [x] Update CityServicePage to support Spanish language (path detection + link prefixing)
- [x] Update sitemap.xml with 32 Spanish city page URLs + hreflang (145 total URLs)
- [x] Test Spanish city pages (both cities verified)
- [x] Fix hero/CTA buttons to show Spanish text on /es/ pages
- [ ] Save checkpoint

## Fix Homepage LocalBusiness JSON-LD Schema (Google Search Console Error)
- [x] Remove old combined LocalBusiness schema blocks from index.html (lines 79-145)
- [x] Two separate JSON-LD blocks now rendered by Home.tsx with unique @id per location
- [x] Verified: exactly 2 blocks — #wilton-manors (954-565-1518) and #fort-lauderdale (645-216-2266)
- [x] Each block has: unique @id, unique telephone, unique address, hasOfferCatalog, foundingDate
- [x] Save checkpoint

## 301 Redirects from Old Service URLs to City Pages
- [x] Add server-side 301 redirects for 14 old /services/ URLs → /fort-lauderdale/ pages
- [x] Verify all 14 redirects return HTTP 301 with correct Location header
- [x] Check page existence: /services/faq, /payment-authorization, /services (all return 200)
- [x] Remove old /services/[service] URLs from sitemap.xml (28 redirected URLs removed, 117 remaining)
- [x] /services/faq returns 200 — kept in sitemap
- [x] All /fort-lauderdale/ and /wilton-manors/ pages already have lastmod 2026-04-14
- [x] Save checkpoint

## Consolidate All Tracking Through GTM (Remove Hardcoded Google Ads gtag)
- [x] Remove hardcoded Google Ads gtag script (AW-17913524206) from index.html
- [x] Remove hardcoded click-to-call conversion snippet from index.html
- [x] Remove direct gtag() conversion calls from client code (use dataLayer.push only)
- [x] Keep GTM container (GTM-5Q5RPRR4) as the sole tag manager
- [x] Keep all dataLayer.push() events intact for GTM to consume
- [x] Verify site loads without errors after removal (115 tests pass, 0 TS errors)
- [ ] Provide GTM setup instructions for recreating tags inside GTM
- [x] Save checkpoint

## Fix Homepage Services Section (3 Issues)
- [x] ISSUE 1: Fix all service tile default links to point to correct /fort-lauderdale/ URLs
- [x] ISSUE 2: Fix Fort Lauderdale and Wilton Manors button slugs to use exact specified URLs
- [x] ISSUE 3: Replace two-button layout with location picker modal (logo, two location buttons, close X)
- [x] Verify all tiles link correctly and modal works on desktop/mobile (176 tests pass, 0 TS errors)
- [x] Save checkpoint

## Fix Homepage Issues (3 More)
- [x] ISSUE 1: Vehicle carousel sections already wired to location picker modal — verified working (Tesla, Asian, European, Domestic all open modal correctly)
- [x] ISSUE 2: Only 1 offers section in DOM; 24 CLAIM OFFER buttons are correct (12 mobile hidden + 12 desktop visible, responsive CSS working)
- [x] ISSUE 3: All 16 service tiles trigger location picker modal; Car Wash/Tires/Powertrain Restoration → / (homepage fallback)
- [x] Verify all changes work correctly (178 tests pass, 0 TS errors)
- [x] Save checkpoint

## Add 301 Redirects for Old Service URLs (34 total)
- [x] Add 20 /services/* redirects to city pages
- [x] Add 14 /slug-vertical-automotive/ redirects to city pages
- [x] Test 3 sample URLs confirm 301 (not 404): /services/transmission → 301, /brake-system-vertical-automotive/ → 301, /services/tesla-vehicles-service → 301
- [x] Update vitest redirect tests (185 tests pass, 0 TS errors)
- [x] Save checkpoint

## Fix /services/* URLs — Must 301 Redirect, Not Load as SPA Pages
- [x] Add client-side Redirect components in App.tsx for all 20 old /services/* paths
- [x] Verify /services/transmission redirects to /fort-lauderdale/transmission-service in browser (confirmed)
- [x] Save checkpoint (185 tests pass, 0 TS errors)

## Local SEO + Backlink Authority System
### Part 1 — Linkable Authority Pages
- [ ] /community — Community & Partnerships page
- [ ] /press — Press & Media page with logo download, story angles
- [ ] /fort-lauderdale-auto-repair-guide — Complete Guide to Auto Repair in Fort Lauderdale
- [ ] /car-maintenance-south-florida — Ultimate Car Maintenance Guide for South Florida
- [ ] /ev-hybrid-repair-fort-lauderdale — Hybrid & EV Repair in Fort Lauderdale

### Part 2 — City Landing Pages
- [ ] /fort-lauderdale/auto-repair — Fort Lauderdale auto repair landing page
- [ ] /wilton-manors/auto-repair — Wilton Manors auto repair landing page

### Part 3 — Admin Backlink Tracker
- [ ] DB schema: backlinks table (website, contact, email, date, status, link_acquired, link_url, target_page, domain_authority, notes)
- [ ] /admin/backlinks — CRUD table with add/edit/delete, protected by admin role
- [ ] Outreach email templates section

### Part 4 — Admin GBP Checklist
- [ ] /admin/gbp-checklist — GBP optimization checklist for both locations

### Wire all routes in App.tsx
- [ ] Add routes for all new pages
- [ ] Save checkpoint

## Admin Dashboard with Manus OAuth (Email Whitelist)
- [x] Whitelist verticalauto89@gmail.com and verticalautoft@gmail.com as admin users
- [x] Auto-promote whitelisted emails to admin role on first login (db.ts upsertUser)
- [x] Block non-whitelisted users from admin routes (role check in AdminDashboard)
- [x] Build /admin dashboard landing page with links to all admin tools
- [x] Add login page/redirect for /admin when not authenticated (Sign In with Manus screen)
- [x] Test auth flow end-to-end (210 tests pass, 0 TS errors)
- [x] Save checkpoint

## Add Photo Galleries to Vehicle City Pages
- [x] Tesla pages: 6 gallery images added from CDN library
- [x] Asian pages: 6 gallery images added from CDN library
- [x] European pages: 6 gallery images added from CDN library
- [x] Domestic pages: 6 gallery images added from CDN library
- [x] Verify all 4 vehicle type pages render galleries correctly (210 tests pass, 0 TS errors)
- [x] Save checkpoint

## Add Photo Galleries to Vehicle City Pages
- [x] Tesla pages: 6 gallery images added from CDN library
- [x] Asian pages: 6 gallery images added from CDN library
- [x] European pages: 6 gallery images added from CDN library
- [x] Domestic pages: 6 gallery images added from CDN library
- [x] Verify all 4 vehicle type pages render galleries correctly (210 tests pass, 0 TS errors)
- [x] Save checkpoint

## Add Photo Galleries to 6 Missing Service Pages
- [x] ac-repair: 4 CDN gallery images added with alt text
- [x] engine-oil-service: 4 CDN gallery images added with alt text
- [x] complete-diagnostics: 4 CDN gallery images added with alt text
- [x] routine-maintenance: 4 CDN gallery images added with alt text
- [x] steering-suspension: 4 CDN gallery images added with alt text
- [x] fuel-system-service: 4 CDN gallery images added with alt text
- [x] All 210 tests still passing, 0 TypeScript errors
- [x] Save checkpoint

## Add 5 Authority Pages to Sitemap.xml
- [x] /community added to sitemap (priority 0.7)
- [x] /press added to sitemap (priority 0.7)
- [x] /fort-lauderdale-auto-repair-guide added to sitemap (priority 0.8)
- [x] /car-maintenance-south-florida added to sitemap (priority 0.8)
- [x] /ev-hybrid-repair-fort-lauderdale added to sitemap (priority 0.8)
- [x] Sitemap now has 122 total URLs
- [x] Save checkpoint
