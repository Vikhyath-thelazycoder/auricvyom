# AURICVISTA — MASTER ENGINEERING DEVELOPMENT ROADMAP
## Dependency-Driven Development Lifecycle, Milestone Tracking, and Repository Reality

> **Document Status:** Authoritative Master Engineering Roadmap  
> **Target System:** AuricVista / AuricVyom (`Vikhyath-thelazycoder/auricvyom`)  
> **Control Plane Location:** `/prd/engineering-control/master-roadmap.md`  
> **Related Control Documents:**  
> - [agent-sop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-sop.md) (Engineering Constitution)  
> - [agent-loop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-loop.md) (Execution Lifecycle)  
> - [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md) (Requirement Matrix)  
> - [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md) (Architectural Decision Register)  

---

# 1. EXECUTIVE SYSTEM STATUS & ACTIVE BASELINE

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                             AURICVISTA STATUS DASHBOARD                                │
├────────────────────────┬───────────────────────────────────────────────────────────────┤
│ CURRENT PROJECT PHASE  │ Phase 0 (Baseline Stabilization) & Phase 1 Preparation        │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ CODE REPOSITORY STATE  │ Complete Vanilla ES6+ SPA served via Alpine Nginx container;  │
│                        │ Running in Client Simulation / Demo Mode; Zero Backend Code.  │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ ARCHITECTURAL MATURITY │ PRDs (Frontend, Backend, Automation, Flow, Security) complete │
│                        │ and fully synchronized. Target architecture: NestJS + Prisma. │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ PRIMARY BLOCKERS       │ 1. Absence of backend repository / monorepo workspace.        │
│                        │ 2. Lack of PostgreSQL database & Prisma migration pipeline.   │
│                        │ 3. Lack of automated testing harnesses (unit/integration/e2e).│
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ HIGHEST-RISK ITEMS     │ 1. Client-side booking & payment simulation (double-booking). │
│                        │ 2. Unpurified innerHTML sinks in SPA (DOM XSS risk).          │
│                        │ 3. Plaintext localStorage sensitive data & mock credentials.  │
└────────────────────────┴───────────────────────────────────────────────────────────────┘
```

### NEXT 5 IMMEDIATE ENGINEERING ACTIONS:
1. **[ACTION 1] Frontend Sanitization & CSP Hardening:** Integrate `DOMPurify` into Vanilla ES6 rendering sinks (`AIPlanner.js`, `ReviewsSection.js`, `TravelJournalView.js`) and mount a custom `nginx.conf` with production CSP and security headers into the Alpine container.
2. **[ACTION 2] Monorepo & Backend Foundation Setup:** Initialize the backend workspace (`apps/backend` or dedicated repository) using NestJS with strict TypeScript and ESLint configurations.
3. **[ACTION 3] Database Schema & Prisma ORM Baseline:** Configure Prisma schema modeling core entities (`User`, `Property`, `Room`, `Booking`, `Payment`, `OutboxEvent`) and connect to an AWS RDS PostgreSQL development instance.
4. **[ACTION 4] Firebase Admin Auth Integration:** Implement `AuthModule` in NestJS to verify Firebase client ID tokens, manage refresh sessions in Redis, and establish user identity in PostgreSQL.
5. **[ACTION 5] Inventory Concurrency & Hold Engine:** Implement `PropertyModule` and `BookingModule` with atomic `SELECT FOR UPDATE` row locks and 15-minute Redis-backed temporary room holds.

---

# 2. MASTER DEVELOPMENT PHASING MATRIX

```text
  NOW (Phases 0 - 1)          NEXT (Phases 2 - 7)        LATER (Phases 8 - 13)      FUTURE (Phases 14 - 17)
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│ Phase 0: Baseline    │   │ Phase 2: Auth        │   │ Phase 8: Trips       │   │ Phase 14: React Migr │
│ Phase 1: Found/Infra │──▶│ Phase 3: Profiles/KYC│──▶│ Phase 9: Connect     │──▶│ Phase 15: Security/Perf
│                      │   │ Phase 4: Properties  │   │ Phase 10: AI Gateway │   │ Phase 16: Launch     │
│                      │   │ Phase 5: Search/Maps │   │ Phase 11: Automation │   │ Phase 17: V2/V3 Scale│
│                      │   │ Phase 6: Booking     │   │ Phase 12: Safety/SOS │   │                      │
│                      │   │ Phase 7: Payments    │   │ Phase 13: Partner/Adm│   │                      │
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

---

# 3. PHASE-BY-PHASE ENGINEERING ROADMAP

---

### Phase 0: Repository Baseline, Codebase Sanitization & Nginx Security
- **Objective:** Stabilize the active client SPA, eliminate high-severity client-side security debt, and prepare the repository structure for backend integration.
- **Prerequisites:** None. Active repository code available.
- **Dependencies:** None.
- **Current Status:** `[PARTIALLY IMPLEMENTED]` (SPA exists; security hardening pending).
- **Engineering Tasks:**
  - [x] Audit active frontend codebase (`index.html`, `js/components/*.js`, `styles/main.css`).
  - [ ] Remediate DOM XSS vulnerabilities in `AIPlanner.js`, `ReviewsSection.js`, `TravelJournalView.js` using `DOMPurify` sanitization.
  - [ ] Replace mock credentials (`password123` in `AuthModal.js`) with dynamic auth state.
  - [ ] Add custom `nginx.conf` in root to inject CSP, HSTS, X-Frame-Options, and nosniff headers.
  - [ ] Update `Dockerfile` to copy custom `nginx.conf`.
- **Affected Systems:** Client SPA, Alpine Nginx container.
- **APIs:** None (Static client hardening).
- **Database Implications:** None.
- **Security Implications:** Eliminates DOM-based XSS, clickjacking, and mime-sniffing vulnerabilities.
- **Testing:** Browser console inspection (zero CSP violations), XSS injection testing on search/chat inputs.
- **Definition of Done:** Zero unsanitized `innerHTML` assignments; Nginx serves valid defense-in-depth headers.
- **Blockers:** None.

---

### Phase 1: Foundation & Backend Infrastructure (NestJS Modular Monolith)
- **Objective:** Establish the production NestJS backend framework, container infrastructure, and relational persistence baseline.
- **Prerequisites:** Phase 0 complete.
- **Dependencies:** Node.js 20+, Docker, AWS account access (or local Docker compose stack).
- **Current Status:** `[SPECIFIED]` (Fully architected in PRD 2; code pending).
- **Engineering Tasks:**
  - [ ] Initialize NestJS application with TypeScript, ESLint, Prettier, and Jest.
  - [ ] Configure Dockerfile and docker-compose services for NestJS, PostgreSQL 16, and Redis 7.
  - [ ] Install and configure Prisma ORM with initial database migration scripts.
  - [ ] Configure global validation pipes (`ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })`).
  - [ ] Implement standardized API response envelopes and global HTTP exception filter.
  - [ ] Implement AWS Secrets Manager runtime injector for production environment secrets.
- **Affected Systems:** Backend API Gateway, PostgreSQL, Redis, Docker Compose.
- **APIs:** `GET /health`, `GET /health/ready`, `GET /metrics`.
- **Database Implications:** Initial PostgreSQL container configuration with UTF-8 encoding and UUID extensions.
- **Events:** None.
- **Automation:** Health check monitoring probes.
- **AI Implications:** None.
- **Security Implications:** Centralized exception handling prevents stack trace leaks; secret isolation enforced.
- **Testing:** Unit test for health controller; integration test for PostgreSQL connection.
- **Definition of Done:** NestJS boots cleanly, connects to PostgreSQL and Redis, passes health probes.
- **Blockers:** Workspace architecture decision (Monorepo vs dedicated backend repository).

---

### Phase 2: Authentication & Identity Management
- **Objective:** Deliver production-grade identity management using Firebase Authentication backed by PostgreSQL user persistence and Redis session caching.
- **Prerequisites:** Phase 1 complete.
- **Dependencies:** Firebase Admin SDK, Firebase Project credentials.
- **Current Status:** `[PARTIALLY IMPLEMENTED]` in client simulation; `[REQUIRES IMPLEMENTATION]` in backend.
- **Engineering Tasks:**
  - [ ] Build `AuthModule` in NestJS with Firebase ID token verification guard.
  - [ ] Create `User` and `Session` models in Prisma schema.
  - [ ] Implement `POST /auth/login` and `POST /auth/register` endpoints synchronizing Firebase UIDs with PostgreSQL records.
  - [ ] Implement `HttpOnly` cookie handling for secure session token delivery (deprecating localStorage tokens).
  - [ ] Implement Redis-backed session revoking and sliding-window rate limiting on auth routes.
  - [ ] Connect client `AuthModal.js` to call the authoritative backend endpoints.
- **Affected Systems:** `AuthModule`, `UserModule`, Client SPA, Firebase Auth, Redis.
- **APIs:** `POST /auth/login`, `POST /auth/register`, `POST /auth/logout`, `GET /auth/me`.
- **Database Implications:** `users` table created with `id (UUID)`, `firebase_uid`, `email`, `phone`, `role`, `status`.
- **Events:** Emits `user.created`, `user.logged_in` to outbox.
- **Automation:** Welcome notification workflow via n8n (`01_Identity/user.onboarding.v1`).
- **AI Implications:** None.
- **Security Implications:** Protection against session hijacking; BOLA defense foundation established.
- **Testing:** Auth guard unit tests, mock Firebase token integration tests, rate-limit threshold tests.
- **Definition of Done:** User can sign up/in via Firebase; verified session created in DB; client receives HttpOnly cookie.
- **Blockers:** Firebase project provisioning.

---

### Phase 3: User Profiles, Social Preferences & KYC Verification
- **Objective:** Enable rich traveler profiles, travel preferences, and secure, privacy-preserving KYC document verification.
- **Prerequisites:** Phase 2 complete.
- **Dependencies:** AWS S3 Private Bucket with KMS Encryption, HyperVerge / Veriff partner credentials.
- **Current Status:** `[SPECIFIED]` in PRD 2; client profile mocked in `js/state.js`.
- **Engineering Tasks:**
  - [ ] Implement `ProfileModule` and `KycModule` in NestJS.
  - [ ] Define Prisma models: `Profile`, `TravelPreferences`, `KycDocument`, `KycVerification`.
  - [ ] Create presigned S3 upload URL generator (`POST /kyc/upload-url`) targeting the private quarantine bucket ($TTL \le 15\text{ min}$).
  - [ ] Implement `POST /kyc/submit` initiating automated verification via HyperVerge webhook/callback.
  - [ ] Implement trust scoring algorithm ($0-100$) and verification badge state machine (`UNVERIFIED`, `PENDING`, `VERIFIED`, `REJECTED`).
  - [ ] Enforce strict PII masking on KYC responses (Aadhaar/PAN numbers masked to last 4 digits).
- **Affected Systems:** `UserModule`, `KycModule`, AWS S3 Quarantine, HyperVerge API.
- **APIs:** `PUT /users/profile`, `PUT /users/preferences`, `POST /kyc/upload-url`, `POST /kyc/submit`, `GET /kyc/status`.
- **Database Implications:** `profiles`, `travel_preferences`, and `kyc_verifications` tables.
- **Events:** `kyc.submitted`, `kyc.approved`, `kyc.rejected`.
- **Automation:** `02_KYC_Trust/kyc.status_update.v1` workflow in n8n.
- **AI Implications:** OCR confidence validation assistance (bounded).
- **Security Implications:** Zero public access to KYC documents; AES-256 KMS encryption; presigned inspection links expire in 5 minutes.
- **Testing:** Presigned URL generation tests, webhook signature validation tests, PII masking assertion tests.
- **Definition of Done:** User uploads identity document directly to S3; verification status updates automatically without exposing raw files.
- **Blockers:** Third-party KYC provider credentials.

---

### Phase 4: Properties, Homestays, Hotels & Inventory Engine
- **Objective:** Establish authoritative property listings, room categories, pricing matrices, and real-time inventory management.
- **Prerequisites:** Phase 1 complete.
- **Dependencies:** Amazon S3 Public CDN bucket for property imagery.
- **Current Status:** `[PARTIALLY IMPLEMENTED]` (Static mock data in `js/data/stays.js`; backend requires implementation).
- **Engineering Tasks:**
  - [ ] Implement `PropertyModule` and `InventoryModule` in NestJS.
  - [ ] Define Prisma models: `Property`, `RoomType`, `InventoryCalendar`, `Amenity`, `PropertyImage`.
  - [ ] Seed database with initial Karnataka luxury properties (Coorg, Hampi, Kabini, Gokarna).
  - [ ] Implement dynamic availability calendar calculation preventing overlapping reservations.
  - [ ] Connect client `StaysView.js` and `StayDetailModal.js` to live backend endpoints.
- **Affected Systems:** `PropertyModule`, `InventoryModule`, Client SPA, PostgreSQL, S3.
- **APIs:** `GET /stays`, `GET /stays/:id`, `GET /stays/:id/availability`, `POST /properties` (Partner/Admin).
- **Database Implications:** Relational schema with index on `(property_id, date, status)`.
- **Events:** `property.published`, `inventory.updated`.
- **Automation:** Image optimization and CDN invalidation workflows.
- **AI Implications:** Automated description enrichment (bounded suggestion).
- **Security Implications:** Strict ownership checks on property modification endpoints.
- **Testing:** Inventory overlap query tests, seed data integrity tests.
- **Definition of Done:** Stays catalog loads dynamically from PostgreSQL; room availability accurately reflects database inventory.
- **Blockers:** None.

---

### Phase 5: Search, Discovery & Google Geographic Services
- **Objective:** Provide high-speed multi-entity global search and location-aware spatial discovery using Google Maps Platform APIs.
- **Prerequisites:** Phase 4 complete.
- **Dependencies:** Google Maps Platform API key, Redis caching.
- **Current Status:** `[PARTIALLY IMPLEMENTED]` (Client-side keyword search in `GlobalSearchModal.js`).
- **Engineering Tasks:**
  - [ ] Implement `SearchModule` in NestJS with PostgreSQL full-text search and Trigram indexing (`pg_trgm`).
  - [ ] Implement backend proxy for Google Places Autocomplete and Geocoding APIs with Redis caching ($TTL = 24\text{ hours}$).
  - [ ] Restrict client-side Google Maps API key to production HTTP referrers and Maps JS only.
  - [ ] Implement multi-entity search endpoint aggregating Stays, Destinations, Experiences, and Tour Packages.
  - [ ] Connect client `GlobalSearchModal.js` and `FilterBar.js` to live search endpoint.
- **Affected Systems:** `SearchModule`, Client SPA, Google Maps Platform, Redis, PostgreSQL.
- **APIs:** `GET /search?q={query}&category={category}`, `GET /geo/places/autocomplete`, `GET /geo/geocode`.
- **Database Implications:** GIN indexes on property and destination name/description fields.
- **Events:** `search.queried` (for destination intent analytics).
- **Automation:** Low inventory / high intent destination alerting in n8n.
- **AI Implications:** Semantic search grounding via pgvector (Phase 10).
- **Security Implications:** API key leakage prevented via backend proxying; quota limits enforced via Redis.
- **Testing:** Search performance benchmarks ($< 100\text{ms}$), geocoding cache hit/miss tests.
- **Definition of Done:** Global search returns real-time matching entities with cached geographic autocomplete.
- **Blockers:** Google Maps Platform billing account setup.

---

### Phase 6: Booking Engine, Room Holds & Checkout State Machine
- **Objective:** Implement the authoritative booking state machine with atomic row-level locking and 15-minute temporary room inventory holds.
- **Prerequisites:** Phase 4 complete.
- **Dependencies:** Redis for hold timers, PostgreSQL ACID transactions.
- **Current Status:** `[PARTIALLY IMPLEMENTED]` (Client-side mock booking in `BookingModal.js` and `js/services/api.js`).
- **Engineering Tasks:**
  - [ ] Implement `BookingModule` with full state machine (`PENDING_HOLD`, `PAYMENT_PENDING`, `CONFIRMED`, `CANCELLED`, `EXPIRED`).
  - [ ] Implement `POST /bookings/hold` executing `SELECT FOR UPDATE` on `inventory_calendar` within a Prisma transaction.
  - [ ] Store active hold in Redis with a 900-second (15-minute) TTL and scheduled expiry event.
  - [ ] Implement `POST /bookings/quote` calculating dynamic pricing breakdown (base rate, taxes, platform fee, discounts).
  - [ ] Connect client `BookingModal.js` to hold endpoint, displaying live countdown timer.
- **Affected Systems:** `BookingModule`, `InventoryModule`, Redis, PostgreSQL, Client SPA.
- **APIs:** `POST /bookings/hold`, `POST /bookings/quote`, `GET /bookings/:id`, `POST /bookings/:id/cancel`.
- **Database Implications:** `bookings` table with status enum; row locks on `inventory_calendar`.
- **Events:** `booking.created`, `checkout.hold_expired`.
- **Automation:** Abandoned cart recovery workflow in n8n (`10_CRM/checkout.abandoned_cart.v1`).
- **AI Implications:** None.
- **Security Implications:** Absolute prevention of race conditions and double-booking under concurrent load.
- **Testing:** High-concurrency booking tests (10 simultaneous requests for 1 remaining room; exactly 1 must succeed).
- **Definition of Done:** Concurrent hold tests succeed; 15-minute hold auto-releases inventory on expiration.
- **Blockers:** None.

---

### Phase 7: Payments, Razorpay Webhooks & Virtual Expense Ledger
- **Objective:** Integrate Razorpay payment gateway with cryptographic webhook verification, idempotent settlement, and virtual bill-splitting ledger.
- **Prerequisites:** Phase 6 complete.
- **Dependencies:** Razorpay merchant account credentials, Redis.
- **Current Status:** `[SPECIFIED]` in PRD 2; client payments mocked in `js/state.js`.
- **Engineering Tasks:**
  - [ ] Implement `PaymentModule` and `WalletModule` in NestJS.
  - [ ] Implement `POST /payments/create-order` generating authentic Razorpay Order ID.
  - [ ] Implement `POST /payments/webhook/razorpay` validating HMAC-SHA256 signature and Redis `idempotency_key`.
  - [ ] In atomic transaction: transition booking to `CONFIRMED`, decrement inventory, generate PDF voucher, commit outbox event.
  - [ ] Build virtual expense ledger endpoints (`POST /wallet/expenses`) for tracking shared trip costs.
  - [ ] Connect client payment button to launch Razorpay Checkout Modal and listen for confirmation.
- **Affected Systems:** `PaymentModule`, `WalletModule`, `BookingModule`, Razorpay Gateway, Redis, PostgreSQL.
- **APIs:** `POST /payments/create-order`, `POST /payments/webhook/razorpay`, `POST /wallet/expenses`, `GET /wallet/balance`.
- **Database Implications:** `payments`, `payment_logs`, `wallet_ledgers`, `shared_expenses` tables.
- **Events:** `payment.succeeded`, `payment.failed`, `booking.confirmed`, `wallet.split_created`.
- **Automation:** WhatsApp and SMS booking pass delivery via n8n (`04_Booking/booking.confirmed.v1`).
- **AI Implications:** None.
- **Security Implications:** Webhook timing attack defense via `crypto.timingSafeEqual`; financial idempotency guarantee.
- **Testing:** Webhook replay attack tests, signature tampering tests, double-charge idempotency assertions.
- **Definition of Done:** Test payment completes successfully; webhook confirms booking; voucher code generated; zero double-credits.
- **Blockers:** Razorpay live/test API keys.

---

### Phase 8: Trips, Collaborative Itinerary Planning & Group Voting
- **Objective:** Enable travelers to create bespoke itineraries, invite companions, add activities, and vote on trip plans in real time.
- **Prerequisites:** Phase 2 and Phase 5 complete.
- **Dependencies:** WebSockets or polling for live collaborative sync.
- **Current Status:** `[PARTIALLY IMPLEMENTED]` (Client-side itinerary builder in `TripPlanner.js`).
- **Engineering Tasks:**
  - [ ] Implement `TripModule` and `ItineraryModule` in NestJS.
  - [ ] Define Prisma models: `Trip`, `TripMember`, `ItineraryDay`, `ItineraryActivity`, `ActivityVote`.
  - [ ] Implement activity drag-and-drop ordering API and member role permissions (`OWNER`, `EDITOR`, `VIEWER`).
  - [ ] Implement activity voting endpoints (`POST /trips/:id/activities/:actId/vote`).
  - [ ] Generate downloadable trip voucher PDF containing booking confirmations and itinerary overview.
- **Affected Systems:** `TripModule`, `ItineraryModule`, Client SPA, PostgreSQL.
- **APIs:** `POST /trips`, `GET /trips/:id`, `POST /trips/:id/activities`, `PUT /trips/:id/reorder`, `POST /trips/:id/export-pdf`.
- **Database Implications:** Hierarchical trip and itinerary activity models with composite foreign keys.
- **Events:** `trip.created`, `trip.updated`, `trip.member_invited`.
- **Automation:** Weather enrichment and local cultural alerts workflow in n8n (`06_Trip/trip.itinerary_enrich.v1`).
- **AI Implications:** AI itinerary generation tool integration (Phase 10).
- **Security Implications:** Strict RBAC preventing unauthorized users from editing or viewing private trips.
- **Testing:** Permission boundary tests, concurrent activity reordering tests.
- **Definition of Done:** Multiple users can collaborate on a single trip itinerary with verified permission enforcement.
- **Blockers:** None.

---

### Phase 9: Connect, Intentional Matching (Swipes) & Realtime Chat
- **Objective:** Implement the social discovery layer: travel buddy & flatmate matching with bilateral swipe consent and WebSocket chat.
- **Prerequisites:** Phase 3 (Verified KYC recommended for social matching).
- **Dependencies:** Redis Pub/Sub, Socket.io / NestJS WebSockets Gateway.
- **Current Status:** `[SPECIFIED]` in PRD 1 & PRD 2; not implemented in active client.
- **Engineering Tasks:**
  - [ ] Implement `MatchingModule`, `GroupModule`, and `ChatModule` in NestJS.
  - [ ] Implement swipe tracking endpoint (`POST /matching/swipe`) with bilateral match detection.
  - [ ] Implement NestJS WebSocket Gateway for 1-on-1 and group trip messaging with Redis Pub/Sub adapter.
  - [ ] Enforce chat permission lock: messaging disabled until mutual match or approved group membership.
  - [ ] Build new frontend views: Travel Buddy Swiping view and Realtime Chat modal.
- **Affected Systems:** `MatchingModule`, `ChatModule`, Redis Pub/Sub, WebSockets, Client SPA.
- **APIs:** `POST /matching/swipe`, `GET /matching/matches`, `WSS /chat` (events: `joinRoom`, `sendMessage`, `readReceipt`).
- **Database Implications:** `swipes`, `matches`, `chat_rooms`, `chat_messages` tables with compound unique indexes.
- **Events:** `matching.mutual_match`, `chat.message_sent`.
- **Automation:** FCM push notification on offline message via n8n (`07_Matching/match.notification.v1`).
- **AI Implications:** Automated content moderation scanning for abusive language (bounded).
- **Security Implications:** End-to-end authorization guards on chat rooms; strict prevention of unsolicited messaging.
- **Testing:** WebSockets load test (1,000 concurrent sockets), match generation unit tests.
- **Definition of Done:** Mutual swipe unlocks chat room; messages delivered in $< 100\text{ms}$ via WebSockets.
- **Blockers:** Frontend UI components for matching/chat must be created.

---

### Phase 10: Centralized AI Gateway, Bounded Tools & RAG Engine
- **Objective:** Build the secure AI Gateway proxying LLMs, dispatching bounded domain tools, and executing domain-grounded RAG via pgvector.
- **Prerequisites:** Phases 4, 5, 8 complete.
- **Dependencies:** OpenAI / Anthropic API keys, PostgreSQL `pgvector` extension.
- **Current Status:** `[PARTIALLY IMPLEMENTED]` (Mock client AI planner in `AIPlanner.js`).
- **Engineering Tasks:**
  - [ ] Enable `vector` extension in AWS RDS PostgreSQL; create `destination_embeddings` and `stay_embeddings` tables.
  - [ ] Implement `AiGatewayModule` in NestJS with prompt assembly, context filtering, and token rate limits.
  - [ ] Define bounded tool dispatcher with typed schemas: `searchStays`, `getItineraryRecommendations`, `calculateDistance`.
  - [ ] Prohibit authoritative tool execution: AI can propose itinerary activities, but cannot confirm bookings or charge cards.
  - [ ] Connect client `AIPlanner.js` to stream responses from `POST /ai/companion/chat`.
- **Affected Systems:** `AiGatewayModule`, PostgreSQL (pgvector), Client SPA, External LLMs.
- **APIs:** `POST /ai/companion/chat`, `POST /ai/itinerary/generate`.
- **Database Implications:** pgvector vector embeddings columns ($1536$-dimensional embeddings with HNSW indexing).
- **Events:** `ai.prompt_executed`.
- **Automation:** None.
- **AI Implications:** Core AI intelligence runtime.
- **Security Implications:** Prompt injection sanitization, egress data masking, per-user daily token budgets.
- **Testing:** Tool schema validation tests, prompt injection evasion test suite, semantic retrieval relevance benchmarks.
- **Definition of Done:** AI chatbot provides grounded recommendations using live repository stays; bounded tools execute safely.
- **Blockers:** Provider API credentials.

---

### Phase 11: Transactional Outbox, Redis BullMQ & n8n Automation Workflows
- **Objective:** Deploy production outbox event relay worker and configure self-hosted n8n workflows for multi-channel notifications and CRM.
- **Prerequisites:** Phases 2, 6, 7 complete.
- **Dependencies:** Self-hosted n8n container, Redis BullMQ, Twilio/SendGrid/WhatsApp Cloud credentials.
- **Current Status:** `[SPECIFIED]` in PRD 3; workflows pending deployment.
- **Engineering Tasks:**
  - [ ] Implement `OutboxEventModule` and BullMQ event publisher in NestJS.
  - [ ] Deploy self-hosted n8n on AWS ECS Fargate in private subnet connected to dedicated PostgreSQL schema.
  - [ ] Configure n8n Central Event Intake webhook with HMAC-SHA256 signature verification and replay prevention.
  - [ ] Implement primary n8n workflows: Booking Confirmation (`04_Booking/booking.confirmed.v1`), Onboarding (`01_Identity/user.onboarding.v1`), and SMS Fallback.
  - [ ] Configure Dead-Letter Queue (`dlq_events`) and automated circuit breaking on external provider failures.
- **Affected Systems:** `OutboxEventModule`, Redis BullMQ, n8n Automation Engine, Twilio, SendGrid, WhatsApp.
- **APIs:** `POST /webhooks/n8n/intake` (internal), `POST /outbox/replay`.
- **Database Implications:** `outbox_events` and `dlq_events` tables in PostgreSQL.
- **Events:** All platform domain events.
- **Automation:** Core n8n orchestration system.
- **AI Implications:** AI summarization nodes inside marketing workflows.
- **Security Implications:** Zero direct database access from n8n; secrets stored in AWS Secrets Manager; PII minimization in logs.
- **Testing:** Outbox polling benchmarks, simulated webhook delivery failure and DLQ recovery tests.
- **Definition of Done:** Database transaction commits outbox event; BullMQ relays to n8n; WhatsApp/Email notification received.
- **Blockers:** n8n ECS infrastructure provisioning.

---

### Phase 12: Safety Architecture, Deterministic SOS & Moderation Console
- **Objective:** Deploy the zero-AI, deterministic SOS emergency alert pipeline and trust & safety moderation console.
- **Prerequisites:** Phase 2 and Phase 11 complete.
- **Dependencies:** Twilio SMS / Voice API, P0 BullMQ priority queue.
- **Current Status:** `[SPECIFIED]` in PRD 2 & PRD 3; client SOS trigger pending.
- **Engineering Tasks:**
  - [ ] Implement `SafetyModule` in NestJS with dedicated P0 priority BullMQ worker.
  - [ ] Build emergency SOS endpoint (`POST /safety/sos`) capturing user ID, last-known pin, and emergency contacts.
  - [ ] Implement automated emergency alert dispatch: simultaneous SMS and voice calls to registered emergency contacts.
  - [ ] Implement trust moderation queue (`POST /moderation/reports`, `GET /admin/moderation/queue`).
  - [ ] Build client SOS trigger button with 5-second countdown cancel option.
- **Affected Systems:** `SafetyModule`, `AdminModule`, Twilio, Client SPA, PostgreSQL.
- **APIs:** `POST /safety/sos`, `POST /safety/sos/cancel`, `POST /moderation/reports`, `POST /moderation/resolve`.
- **Database Implications:** `sos_incidents`, `emergency_contacts`, `moderation_reports` tables.
- **Events:** `sos.created` (P0), `sos.cancelled`, `content.flagged`.
- **Automation:** `13_Emergency/safety.sos_dispatch.v1` in n8n (bypasses marketing quiet hours).
- **AI Implications:** None in SOS pipeline (strictly rule-first and deterministic).
- **Security Implications:** Rate-limit exemptions on emergency triggers; tamper-proof incident audit logs.
- **Testing:** Emergency dispatch latency test ($< 3\text{ seconds}$ from trigger to SMS dispatch), cancellation test.
- **Definition of Done:** SOS trigger fires; verified emergency SMS sent to contacts within 3 seconds; zero background GPS tracking.
- **Blockers:** Twilio account provisioning.

---

### Phase 13: Partner Operations, Host Portal & Admin Console
- **Objective:** Provide property partners and administrators with inventory management, payout reporting, and platform controls.
- **Prerequisites:** Phases 4, 6, 7 complete.
- **Dependencies:** Admin RBAC role enforcement.
- **Current Status:** `[SPECIFIED]` in PRD 2; not implemented in repo.
- **Engineering Tasks:**
  - [ ] Implement `AdminModule` and `PartnerModule` in NestJS with strict `@Roles('ADMIN', 'PARTNER')` guards.
  - [ ] Build partner dashboard APIs: inventory blocking, rate overrides, occupancy metrics, payout summaries.
  - [ ] Build admin APIs: platform commission margin adjustment, user suspensions, transaction audit logs.
  - [ ] Create partner portal and admin back-office UI views.
- **Affected Systems:** `AdminModule`, `PartnerModule`, Client SPA, PostgreSQL.
- **APIs:** `GET /partner/occupancy`, `POST /partner/inventory/block`, `GET /admin/users`, `PUT /admin/commissions`.
- **Database Implications:** `partner_payouts`, `admin_audit_logs`, `platform_settings` tables.
- **Events:** `partner.payout_generated`, `admin.setting_changed`.
- **Automation:** Weekly host occupancy digest in n8n (`14_Partner/partner.weekly_digest.v1`).
- **AI Implications:** None.
- **Security Implications:** Strict separation of admin privilege; MFA required for all administrative accounts.
- **Testing:** Admin RBAC evasion tests, payout calculation unit tests.
- **Definition of Done:** Partner can manage inventory availability; Admin can adjust platform margins with audited logging.
- **Blockers:** None.

---

### Phase 14: Frontend Architecture Migration (Vanilla ES6 SPA $\to$ React / Next.js)
- **Objective:** Migrate the client application from Vanilla ES6 modules to React + TypeScript / Next.js while preserving all design tokens and views.
- **Prerequisites:** Backend APIs (Phases 1-7) operational.
- **Dependencies:** Node.js, React 18+, TypeScript, TailwindCSS/Vanilla CSS tokens.
- **Current Status:** `[BLOCKED]` on Backend API availability; `[SPECIFIED]` in PRD 1.
- **Engineering Tasks:**
  - [ ] Initialize Next.js / Vite React TypeScript application in monorepo structure.
  - [ ] Port design tokens from `styles/main.css` into target React styling framework.
  - [ ] Migrate component hierarchy (`Navbar`, `Hero`, `DestinationsView`, `StaysView`, `BookingModal`, etc.) to typed TSX components.
  - [ ] Replace `js/state.js` localStorage simulation with React Query / Zustand connected to live NestJS APIs.
  - [ ] Port client-side routing to Next.js App Router or TanStack Router.
- **Affected Systems:** Entire Client Layer.
- **APIs:** Consumes all NestJS backend endpoints.
- **Database Implications:** None.
- **Events:** None.
- **Automation:** None.
- **AI Implications:** None.
- **Security Implications:** Native JSX escaping eliminates raw `innerHTML` risks; typed API contracts eliminate runtime schema bugs.
- **Testing:** Component unit tests with React Testing Library, end-to-end user journeys with Playwright.
- **Definition of Done:** Feature parity achieved between Vanilla ES6 SPA and React target; 100% of views load from live backend.
- **Blockers:** Backend APIs must be deployed and functional.

---

### Phase 15: Security Auditing, Performance Hardening & Load Testing
- **Objective:** Conduct rigorous pre-production security penetration testing, load testing, and database query optimization.
- **Prerequisites:** Phases 1-13 complete.
- **Dependencies:** k6 / Artillery, OWASP ZAP, AWS CloudWatch.
- **Current Status:** `[FUTURE / SPECIFIED]`.
- **Engineering Tasks:**
  - [ ] Run automated vulnerability scanning and OWASP ZAP dynamic penetration tests.
  - [ ] Execute k6 load tests simulating 10,000 concurrent active users browsing, searching, and holding inventory.
  - [ ] Optimize PostgreSQL query execution plans; tune Prisma connection pool size ($p95 \le 120\text{ms}$).
  - [ ] Verify Cloudflare WAF rate limiting rules and edge DDoS mitigation under simulated attack.
- **Affected Systems:** All systems.
- **Definition of Done:** Zero critical/high vulnerability findings; system handles 10k virtual users with $< 1\%$ error rate.

---

### Phase 16: Staging Validation & Production Launch
- **Objective:** Complete end-to-end user acceptance testing in AWS staging environment and execute zero-downtime production cutover.
- **Prerequisites:** Phase 15 passed.
- **Dependencies:** Production domain DNS, SSL certificates, live Razorpay/Firebase credentials.
- **Current Status:** `[FUTURE / SPECIFIED]`.
- **Engineering Tasks:**
  - [ ] Deploy production infrastructure via Terraform / AWS CDK.
  - [ ] Execute database production migration runbook.
  - [ ] Perform live end-to-end checkout with real Razorpay ₹1 transaction.
  - [ ] Switch Cloudflare DNS to live production application load balancer.
- **Definition of Done:** AuricVista live on production domain; bookings and payments fully operational.

---

### Phase 17: Post-Launch Scalability & V2/V3 Evolution
- **Objective:** Implement advanced multi-region scaling, Aurora Serverless migration, and V2/V3 features.
- **Prerequisites:** Production launch complete.
- **Current Status:** `[FUTURE / V2 / V3]`.
- **Scope:**
  - Database migration to Amazon Aurora PostgreSQL Multi-Region with read replicas.
  - AI Voice Travel Concierge with live speech-to-speech interaction.
  - International property expansion (Sri Lanka, Southeast Asia) with multi-currency settlement.
  - Predictive group travel matching algorithms.
