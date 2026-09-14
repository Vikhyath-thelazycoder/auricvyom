# AURICVISTA — REQUIREMENTS TRACEABILITY MATRIX
## End-to-End Requirement Tracking: PRD to Code, Data, Event, Automation, and Verification

> **Document Status:** Authoritative Requirements Traceability Matrix  
> **Target System:** AuricVista / AuricVyom (`Vikhyath-thelazycoder/auricvyom`)  
> **Control Plane Location:** `/prd/engineering-control/requirements-traceability.md`  
> **Related Control Documents:**  
> - [agent-sop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-sop.md) (Engineering Constitution)  
> - [agent-loop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-loop.md) (Execution Lifecycle)  
> - [master-roadmap.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/master-roadmap.md) (Development Sequence)  
> - [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md) (Architectural Decision Register)  

---

# 1. TRACEABILITY TAXONOMY & STATUS DEFINITIONS

Every requirement in this matrix is systematically tracked across 18 distinct dimensions. Status classifications adhere strictly to the repository evidence:

- **`[IMPLEMENTED]`**: Verified working source code exists in the repository.
- **`[PARTIALLY IMPLEMENTED]`**: Prototyped or simulated in the active client (e.g. `js/state.js`, `js/services/api.js`), requiring production backend implementation.
- **`[SPECIFIED]`**: Fully specified in PRD / architectural documentation; code not yet created in repository.
- **`[REQUIRES IMPLEMENTATION]`**: Mandatory production component that engineers must build.
- **`[NEEDS VALIDATION]`**: Claimed in documentation or configuration but lacking runtime verification evidence.
- **`[BLOCKED]`**: Execution is blocked on an upstream prerequisite.

---

# 2. MASTER REQUIREMENTS TRACEABILITY MATRIX

---

### 2.1 Identity, Authentication & Sessions (`REQ-AUTH`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-AUTH-001** | User registration via Email/Phone/Social | PRD 2 §6, PRD 1 §4 | P0 / V1 | `AuthModal.js` | `AuthModule` | `POST /auth/register` | `users`, `profiles` | `user.created` | `01_Identity/user.onboarding.v1` | None | Password hashing (Argon2id), Email validation | Unit test user creation, unique constraint test | `js/components/AuthModal.js:L50` | `[PARTIALLY IMPLEMENTED]` | Active client simulates registration in `js/state.js`; NestJS backend requires implementation. |
| **REQ-AUTH-002** | User login with Firebase token verification | PRD 2 §6, Flow §6 | P0 / V1 | `AuthModal.js` | `AuthModule` | `POST /auth/login` | `users`, `sessions` | `user.logged_in` | None | None | Firebase Admin SDK verification, brute-force rate limit | Mock token verification test, rate limit test | `js/components/AuthModal.js:L90` | `[PARTIALLY IMPLEMENTED]` | Client currently uses mock credentials (`password123`); backend auth guard specified. |
| **REQ-AUTH-003** | Secure session management via HttpOnly cookies | `security.md` §2.3 | P0 / V1 | App Root (`app.js`) | `AuthModule` | `GET /auth/me`, `POST /auth/refresh` | `sessions` in Redis | `session.refreshed` | None | None | `HttpOnly`, `Secure`, `SameSite=Lax` cookies; zero localStorage tokens | Cookie attribute assertion test, CSRF protection test | `[REQUIRES IMPLEMENTATION]` | `[REQUIRES IMPLEMENTATION]` | Current code stores session state in localStorage (`auricvista_user_profile`). |
| **REQ-AUTH-004** | User logout & session invalidation | PRD 2 §6 | P0 / V1 | `Navbar.js`, `UserDashboardView.js` | `AuthModule` | `POST /auth/logout` | `sessions` (Redis delete) | `user.logged_out` | None | None | Redis token revocation, cookie wiping | Logout integration test | `js/components/Navbar.js:L180` | `[PARTIALLY IMPLEMENTED]` | Client wipes localStorage key; backend session invalidation requires implementation. |
| **REQ-AUTH-005** | Role-Based Access Control (RBAC: USER, HOST, ADMIN) | PRD 2 §4, `security.md` §1 | P0 / V1 | Dynamic View Guards | Core Guards | `@Roles('ADMIN')` | `users.role` | None | None | None | NestJS RolesGuard, unauthorized 403 response | RBAC bypass evasion tests | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Fully architected in PRD 2 §4; backend guard code pending. |

---

### 2.2 User Profiles & KYC Verification (`REQ-KYC`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-KYC-001** | User profile update (travel style, dietary, preferences) | PRD 1 §5, PRD 2 §16 | P1 / V1 | `UserDashboardView.js` | `UserModule` | `PUT /users/profile`, `PUT /users/preferences` | `profiles`, `travel_preferences` | `profile.updated` | None | None | Strict DTO validation, XSS escaping on text inputs | Schema validation unit test | `js/components/UserDashboardView.js:L240` | `[PARTIALLY IMPLEMENTED]` | Client UI exists; persists to `localStorage`. Backend requires implementation. |
| **REQ-KYC-002** | Direct-to-Quarantine KYC document upload | `security.md` §6, PRD 2 §17 | P0 / V1 | Profile KYC Modal | `KycModule` | `POST /kyc/upload-url` | `kyc_documents` | `kyc.upload_initiated` | None | None | S3 Private Bucket, KMS AES-256, Presigned URL $TTL \le 15\text{ min}$ | Presigned URL expiration test, direct upload test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Architecture prevents raw documents from touching backend server directly. |
| **REQ-KYC-003** | Automated identity verification via HyperVerge | PRD 2 §17, Flow Flow B | P0 / V1 | KYC Status Badge | `KycModule` | `POST /kyc/submit`, `POST /kyc/webhook` | `kyc_verifications` | `kyc.submitted`, `kyc.approved` | `02_KYC_Trust/kyc.status_update.v1` | OCR score verification | Webhook HMAC verification, quarantine isolation | Webhook replay test, status state machine test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | HyperVerge provider integration specified. |
| **REQ-KYC-004** | PII minimization & sensitive data masking | `security.md` §6.2, PRD 3 §40 | P0 / V1 | `UserDashboardView.js` | `KycModule` | `GET /kyc/status` | `kyc_verifications` | None | None | None | Aadhaar/PAN masked to `XXXX-XXXX-1234`; zero raw numbers in API responses | Serialization test asserting zero plaintext IDs | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Required for Indian DPDP Act compliance. |
| **REQ-KYC-005** | Ephemeral KYC inspection for Trust moderators | `security.md` §6.3, Flow Flow U | P1 / V1 | Admin Trust Console | `AdminModule` | `GET /admin/kyc/:id/inspect` | `kyc_documents`, `audit_logs` | `kyc.inspected` | None | None | Presigned download URL $TTL \le 5\text{ min}$, immutable audit log | Audit trail assertion test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Raw document viewing strictly audited. |

---

### 2.3 Stays, Properties & Inventory Engine (`REQ-STAY`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-STAY-001** | Browse luxury stays catalog with destination filters | PRD 1 §6, `design.md` §5 | P0 / V1 | `StaysView.js`, `FilterBar.js` | `PropertyModule` | `GET /stays` | `properties`, `room_types` | None | None | None | Public read-only, edge cached via Cloudflare | Query parameter validation test | `js/components/StaysView.js:L1` | `[PARTIALLY IMPLEMENTED]` | Active client loads static data from `js/data/stays.js`. |
| **REQ-STAY-002** | View stay details (rooms, amenities, gallery, reviews) | PRD 1 §6, `design.md` §6 | P0 / V1 | `StayDetailModal.js` | `PropertyModule` | `GET /stays/:id` | `properties`, `property_images`, `amenities` | None | None | Semantic similarity search | UUID path validation, sanitized rich text | Route parameter 404 test | `js/components/StayDetailModal.js:L1` | `[PARTIALLY IMPLEMENTED]` | Client UI complete; backend endpoint requires implementation. |
| **REQ-STAY-003** | Real-time room availability calendar calculation | PRD 2 §8, Flow Flow F | P0 / V1 | `StayDetailModal.js`, `BookingModal.js` | `InventoryModule` | `GET /stays/:id/availability` | `inventory_calendar`, `room_types` | None | None | None | Date range bounds validation (max 90 days query) | Overlapping date exclusion test | `js/services/api.js:L19` | `[PARTIALLY IMPLEMENTED]` | Client currently uses mock filter; backend query requires implementation. |
| **REQ-STAY-004** | Dynamic pricing quote with breakdown (taxes, fees) | PRD 2 §11, Flow Flow G | P0 / V1 | `BookingModal.js` | `BookingModule` | `POST /bookings/quote` | `pricing_rules`, `room_types` | None | None | None | Server-side pricing calculation; client values untrusted | Pricing formula accuracy assertion test | `js/components/BookingModal.js:L150` | `[PARTIALLY IMPLEMENTED]` | Client calculates price locally; backend quote endpoint requires implementation. |

---

### 2.4 Booking State Machine & Inventory Locking (`REQ-BOOK`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-BOOK-001** | Atomic 15-minute temporary room inventory hold | PRD 2 §8, Flow Flow F | P0 / V1 | `BookingModal.js` | `BookingModule` | `POST /bookings/hold` | `inventory_calendar`, `bookings` | `booking.hold_created` | None | None | `SELECT FOR UPDATE` row lock inside Prisma transaction | High concurrency race condition test (10 reqs / 1 room) | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Core concurrency control preventing double-booking. |
| **REQ-BOOK-002** | Automatic hold expiry & inventory release after 900s | PRD 2 §8, Flow Flow F | P0 / V1 | `BookingModal.js` (Timer) | `BookingModule` | `POST /bookings/hold-expired` (Internal) | `inventory_calendar`, `bookings` | `checkout.hold_expired` | `10_CRM/checkout.abandoned_cart.v1` | None | Redis key expiration listener / BullMQ delayed job | Hold expiry timeline verification test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Restores room availability if user abandons checkout. |
| **REQ-BOOK-003** | User booking history & downloadable voucher | PRD 1 §9, PRD 2 §12 | P1 / V1 | `MyBookingsView.js` | `BookingModule` | `GET /users/me/bookings`, `GET /bookings/:id/voucher` | `bookings`, `vouchers` | None | None | None | BOLA defense: assert `booking.userId === req.user.id` | Cross-user voucher access rejection test | `js/components/MyBookingsView.js:L1` | `[PARTIALLY IMPLEMENTED]` | Client loads from `localStorage.auricvista_bookings`. |

---

### 2.5 Payments, Webhooks & Virtual Ledger (`REQ-PAY`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-PAY-001** | Razorpay payment order generation | PRD 2 §13, Flow Flow H | P0 / V1 | `BookingModal.js` | `PaymentModule` | `POST /payments/create-order` | `payments`, `bookings` | `payment.order_created` | None | None | Order amount verified against backend quote; zero client price trust | Amount integrity assertion test | `js/services/api.js:L97` | `[PARTIALLY IMPLEMENTED]` | Client simulates confirmation locally (`status: "CONFIRMED"`). |
| **REQ-PAY-002** | Cryptographic webhook verification with timing safety | `security.md` §4.1, PRD 2 §13 | P0 / V1 | None (Backend Gateway) | `PaymentModule` | `POST /payments/webhook/razorpay` | `payments`, `payment_logs` | `payment.succeeded`, `payment.failed` | `04_Booking/booking.confirmed.v1` | None | HMAC-SHA256 signature verification via `crypto.timingSafeEqual` | Webhook signature tampering test, invalid key rejection | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Sole authoritative trigger for booking confirmation. |
| **REQ-PAY-003** | Payment webhook idempotency enforcement | `security.md` §4.2, PRD 3 §39 | P0 / V1 | None (Backend Gateway) | `PaymentModule` | `POST /payments/webhook/razorpay` | `payments` (Redis key) | None | None | None | Redis `idempotency_key` lock with 24-hour TTL | Duplicate webhook submission test (must process once) | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Eliminates duplicate credits during gateway network retries. |
| **REQ-PAY-004** | Virtual expense ledger & group bill splitting | PRD 2 §15, Flow Flow R | P1 / V1 | Trip Expense View | `WalletModule` | `POST /wallet/expenses`, `GET /wallet/splits` | `wallet_ledgers`, `shared_expenses` | `wallet.split_created` | `11_Wallet/wallet.split_alert.v1` | None | Non-PPI compliance: ledger tracking only, zero fiat banking | Split balance calculation unit tests | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Virtual accounting ledger, not a regulated wallet. |

---

### 2.6 Trips, Collaborative Planning & Maps (`REQ-TRIP`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-TRIP-001** | Create and customize bespoke travel itinerary | PRD 1 §7, `design.md` §7 | P0 / V1 | `TripPlanner.js` | `TripModule` | `POST /trips`, `PUT /trips/:id` | `trips`, `itinerary_days` | `trip.created` | `06_Trip/trip.itinerary_enrich.v1` | AI Itinerary generator integration | RBAC: Trip Owner / Editor validation | Trip lifecycle integration test | `js/components/TripPlanner.js:L1` | `[PARTIALLY IMPLEMENTED]` | Rich client planner exists; persists to `localStorage`. |
| **REQ-TRIP-002** | Add, reorder, and remove itinerary activities | PRD 1 §7, PRD 2 §14 | P0 / V1 | `TripPlanner.js` | `ItineraryModule` | `POST /trips/:id/activities`, `PUT /trips/:id/reorder` | `itinerary_activities` | `itinerary.updated` | None | None | Input sanitization, activity schedule conflict checks | Activity ordering integrity test | `js/components/TripPlanner.js:L300` | `[PARTIALLY IMPLEMENTED]` | Interactive UI active in client; backend requires implementation. |
| **REQ-TRIP-003** | Collaborative activity voting for group travelers | PRD 2 §14, Flow Flow L | P1 / V1 | `TripPlanner.js` | `ItineraryModule` | `POST /trips/:id/activities/:actId/vote` | `activity_votes` | `activity.voted` | None | None | Member authorization check; duplicate vote prevention | One-vote-per-user constraint test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Allows groups to reach consensus on itinerary stops. |
| **REQ-TRIP-004** | Geographic route visualization & distance calculation | PRD 2 §10, Flow Flow D | P0 / V1 | `ItineraryMap.js` | `SearchModule` | `GET /geo/routes` | None (Google Maps Platform) | None | None | None | Google Maps API key restricted; server-side caching in Redis | Route calculation cache hit test | `js/components/ItineraryMap.js:L1` | `[PARTIALLY IMPLEMENTED]` | Client renders interactive map; routes require live backend proxy. |

---

### 2.7 Connect, Matching & Realtime Chat (`REQ-MATCH` / `REQ-CHAT`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-MATCH-001** | Travel buddy swipe discovery & bilateral consent | PRD 1 §8, PRD 2 §18 | P1 / V1 | Travel Buddy View | `MatchingModule` | `POST /matching/swipe`, `GET /matching/feed` | `swipes`, `matches` | `matching.mutual_match` | `07_Matching/match.notification.v1` | Compatibility scoring vector | Daily swipe limit enforcement, anti-harassment rate limit | Mutual match triggering test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Unlocks chat only upon bilateral mutual "like". |
| **REQ-CHAT-001** | Realtime 1-on-1 messaging for matched travelers | PRD 2 §19, Flow Flow P | P1 / V1 | Chat Modal | `ChatModule` | `WSS /chat` (`sendMessage`) | `chat_rooms`, `chat_messages` | `chat.message_sent` | Push notification if recipient offline | Profanity/Harassment filter | Chat room permission check; verify mutual match state | Unauthorized chat connection rejection test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Built on NestJS WebSockets + Redis Pub/Sub adapter. |

---

### 2.8 AI Gateway & Grounded RAG (`REQ-AI` / `REQ-RAG`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-AI-001** | AI Travel Companion conversational planning | PRD 1 §11, PRD 2 §21 | P0 / V1 | `AIPlanner.js` | `AiGatewayModule` | `POST /ai/companion/chat` | `ai_conversations`, `ai_messages` | `ai.prompt_executed` | None | LLM context assembly, bounded tools | No direct provider keys in browser; per-user token rate limits | Prompt injection evasion test | `js/components/AIPlanner.js:L1` | `[PARTIALLY IMPLEMENTED]` | Active client simulates responses locally; live AI Gateway specified. |
| **REQ-AI-002** | Bounded tool execution without transactional authority | PRD 2 §21, `security.md` §7 | P0 / V1 | `AIPlanner.js` | `AiGatewayModule` | Internal Tool Dispatcher | None | None | None | Typed tool execution (`searchStays`, `calcRoute`) | AI prohibited from confirming bookings, charging cards, or approving KYC | Unauthorized tool dispatch rejection test | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Enforces strict boundaries on LLM autonomy. |
| **REQ-RAG-001** | Domain-grounded knowledge retrieval via pgvector | PRD 2 §21, Flow Flow Y | P1 / V1 | `AIPlanner.js` | `AiGatewayModule` | Internal RAG Pipeline | `destination_embeddings`, `stay_embeddings` | None | None | Vector cosine similarity search ($1536$-d) | Pre-filtered retrieval strictly within user's permissions | Embedding retrieval relevance benchmark | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Prevents hallucinated property and route information. |

---

### 2.9 Safety Architecture & Deterministic SOS (`REQ-SAFETY`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-SAFETY-001** | Deterministic emergency SOS dispatch pipeline | PRD 2 §20, `security.md` §10 | P0 / V1 | SOS Button / Modal | `SafetyModule` | `POST /safety/sos` | `sos_incidents`, `emergency_contacts` | `sos.created` (P0 Priority) | `13_Emergency/safety.sos_dispatch.v1` | **ZERO AI** (Deterministic rule-first) | High-priority BullMQ worker, rate-limit exemption | End-to-end SMS alert latency test ($< 3\text{ seconds}$) | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Rule-first emergency escalation with zero AI dependency. |
| **REQ-SAFETY-002** | Location privacy: On-demand check-in (No continuous GPS) | PRD 2 §20, Flow Flow Z | P0 / V1 | Itinerary / Safety View | `SafetyModule` | `POST /safety/check-in` | `user_checkins` | `safety.checkin_created` | None | None | Continuous background GPS tracking strictly forbidden in V1 | Battery and permissions compliance check | `[REQUIRES IMPLEMENTATION]` | `[SPECIFIED]` | Preserves user privacy and battery life. |

---

### 2.10 Client-Side Security & Quality (`REQ-SEC` / `REQ-DESIGN`)

| Req ID | Requirement Summary | Source PRD | Pri / Hor | Frontend View | Backend Module | API Route | DB Table | Domain Event | Automation (n8n) | AI / RAG | Security Control | Verification / Test | Code Reference | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-SEC-001** | Cross-Site Scripting (XSS) eradication via DOMPurify | `security.md` §2.1 | P0 / V1 | Entire Client SPA | None (Client/Build) | None | None | None | None | None | Mandatory sanitization of all `innerHTML` assignments | XSS payload injection test into chat and review forms | `js/components/AIPlanner.js:L280` | `[REQUIRES IMPLEMENTATION]` | Unsanitized `innerHTML` sinks detected in current code; hardening required. |
| **REQ-SEC-002** | Nginx defense-in-depth security headers (CSP, HSTS) | `security.md` §2.2 | P0 / V1 | Nginx Container | Nginx Proxy | None | None | None | None | None | Content-Security-Policy, HSTS, X-Frame-Options: DENY | Securityheaders.com rating A+ compliance check | `Dockerfile` | `[REQUIRES IMPLEMENTATION]` | Dockerfile uses vanilla `nginx:alpine`; custom `nginx.conf` required. |
| **REQ-DESIGN-001** | Luxury typography and responsive token architecture | `design.md` §3, PRD 1 §3 | P0 / V1 | Global Styles | None (Static Assets) | None | None | None | None | None | Strict adherence to Cinzel, Playfair, Auric Gold tokens | Visual inspection across mobile (390px) and desktop | `styles/main.css:L1` | `[IMPLEMENTED]` | Master design system fully established in active CSS. |
| **REQ-SHELL-001** | Core Application Shell & Deep-Link Router | Phase 2 Prompt, `design.md` §16-17 | P0 / V1 | `app.js`, `DesktopTopNav.js`, `MobileBottomNav.js` | None (Client Shell) | Deep-link hash router | None | None | None | None | Strict client-side boundaries; no faked backend transactions | 22/22 automated test suite pass; 7/7 responsive viewports pass | `js/router.js:L1`, `js/app.js:L1` | `[IMPLEMENTED]` | All 26+ PRD routes, parameter extraction, and desktop/mobile swapping verified. |
| **REQ-SHELL-002** | Reusable Accessible Overlays & Feedback System | Phase 2 Prompt, `design.md` §18 | P0 / V1 | `AuricModal.js`, `AuricBottomSheet.js`, `MobileNavDrawer.js`, `AuricToast.js` | None (Client Shell) | None | None | None | None | None | Focus trapping, focus restoration, Esc key handling, ARIA dialog semantics | Programmatic focus trap test, overlay escape dismissal test | `js/components/primitives/AuricModal.js:L1` | `[IMPLEMENTED]` | Fully verified across mobile and desktop. |

