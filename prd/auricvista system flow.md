# AURICVISTA — MASTER END-TO-END SYSTEM FLOW

## Version 2.1 — Master End-to-End System Architecture & Operational Lifecycle

> [!NOTE]
> **DOCUMENT METADATA & REVISION CONTROL**
> - **Document Version:** 2.1 — Master End-to-End System Flow Specification
> - **Document Type:** Production Architecture Integration & Operational Flow Document
> - **Scope:** Complete end-to-end operational lifecycle connecting Frontend User Actions, Cloudflare Edge, AWS Infrastructure, NestJS Modular Monolith, PostgreSQL State, Transactional Outbox, Redis/BullMQ Queues, n8n Automation Workflows, External Providers (Google Maps, Razorpay, Firebase, HyperVerge), and Realtime Client Synchronization.
> - **Status:** Authoritative Master System Flow — Synchronized with Backend PRD v2.1, Automation PRD v2.1, Frontend PRD v1.0, `design.md`, and `security.md`.

---

# 1. DOCUMENT RELATIONSHIP & ARCHITECTURAL AUTHORITY

To eliminate ambiguity across engineering teams, the 6 core architecture documents of AuricVista possess distinct, non-overlapping authorities:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               DOCUMENT HIERARCHY & AUTHORITY                           │
├────────────────────────┬───────────────────────────────────────────────────────────────┤
│ `design.md`            │ **Visual & UX Authority:** Component styling, luxury tokens,  │
│                        │ design system, modal layouts, and user interface contracts.   │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ `prd/prd1 frontend .md`│ **Frontend Authority:** Client-side routing, state stores,    │
│                        │ presentation logic, and view lifecycle management.            │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ `prd/prd 2 backend.md` │ **System of Record Authority:** Domain business rules, data   │
│ *(Version 2.1)*        │ models, PostgreSQL ACID transactions, API routes, and RBAC.   │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ `prd/prd 3 automation.md`│ **Orchestration Authority:** n8n workflow DAGs, event intake, │
│ *(Version 2.1)*        │ multi-channel notifications, CRM journeys, and retries.       │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ `security.md`          │ **Security & Governance Authority:** Threat models, token     │
│                        │ crypto, KMS encryption, BOLA defense, and rate limiting.      │
├────────────────────────┼───────────────────────────────────────────────────────────────┤
│ `auricvista system flow.md`│ **End-to-End Operational Authority:** The dynamic, cross-system│
│ *(This Document)*      │ connection tracking state transitions across all 5 layers.    │
└────────────────────────┴───────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Conflict Resolution Law:** If a conflict arises regarding visual components, `design.md` prevails. If a conflict arises regarding transactional truth or data models, `prd/prd 2 backend.md` prevails. If a conflict arises regarding workflow nodes, `prd/prd 3 automation.md` prevails. If a conflict arises regarding access control or encryption, `security.md` prevails. This System Flow document governs the **unidirectional sequence and data transfer between layers**.

---

# 2. NON-NEGOTIABLE ARCHITECTURAL LAWS

AuricVista enforces a strict unidirectional operational pipeline. State mutations flow downward from user actions through authoritative gateways to relational persistence, and subsequently outward through transactional outboxes to asynchronous orchestration:

```text
USER ACTION (Web / Mobile SPA)
      │
      ▼
CLOUDFLARE EDGE (WAF / DDoS / Bot Defense / Anycast TLS 1.3)
      │
      ▼
AWS APPLICATION LOAD BALANCER (ALB)
      │
      ▼
NESTJS MODULAR MONOLITH GATEWAY (AWS ECS Fargate)
      │
      ├── 1. Authentication & Session Assertion (PostgreSQL + Redis)
      ├── 2. Authorization & Resource Ownership Check (BOLA / IDOR Defense)
      ├── 3. Input DTO Validation (Strict Whitelist / Anti-Mass Assignment)
      ├── 4. Central AI Gateway Mediation (If AI requested)
      ├── 5. Domain Business Logic Execution
      │
      ▼
AWS RDS POSTGRESQL (Authoritative System of Record + pgvector)
      │ (ACID Transaction Commits: Domain State + Outbox Event)
      ▼
TRANSACTIONAL OUTBOX TABLE (`outbox_events`)
      │
      ▼
EVENT RELAY WORKER (Redis BullMQ ──▶ DLQ: dlq_events)
      │
      ▼
n8n CENTRAL EVENT INTAKE (HMAC-SHA256 Signature + 300s Timestamp Validated)
      │
      ├── Multi-Channel Notification Router (FCM Push, WhatsApp, SMS, SES)
      ├── Asynchronous Partner & CRM Workflows
      ├── External Service Coordination
      │
      ▼
EXTERNAL THIRD-PARTY PROVIDERS (Razorpay, HyperVerge, Google Maps, Twilio)
      │
      ▼
VERIFIED WEBHOOK / SCOPED BACKEND CALLBACK (mTLS / Signed Tokens)
      │
      ▼
NESTJS DOMAIN SERVICE (Final State Transition Validated)
      │
      ▼
AWS RDS POSTGRESQL (State Updated)
      │
      ▼
REALTIME NOTIFICATION GATEWAY (WebSockets + Firebase FCM)
      │
      ▼
FRONTEND USER INTERFACE UPDATED
```

### 🚫 Prohibited Architectural Anti-Patterns:
1. **NO `Frontend ──▶ n8n ──▶ Database`:** Clients never trigger n8n directly; n8n never connects directly to PostgreSQL.
2. **NO `Frontend ──▶ Firebase ──▶ Database`:** Firebase is not an authoritative store. Clients cannot read/write domain records in Firestore or RTDB.
3. **NO `AI ──▶ Database Directly`:** LLM models never receive SQL credentials or unrestricted execution access. All queries pass through the Central AI Gateway and typed tool handlers.
4. **NO `LLM ──▶ Authorization Decisions`:** AI models never decide permissions, grant access, approve payments, or downgrade SOS emergencies.
5. **NO `Frontend Payment Success Assumption`:** UI callbacks are treated as visual transitions. Bookings confirm ONLY when the backend verifies cryptographic gateway webhook signatures against the raw request buffer.

---

# 3. PRIMARY CLOUD INFRASTRUCTURE FLOW (AWS)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              AWS CLOUD COMPONENT ROLES                                 │
├──────────────────────┬─────────────────────────────────────────────────────────────────┤
│ **Edge Layer**       │ Cloudflare: Anycast DNS, TLS 1.3, DDoS L3/L4/L7, WAF, CDN.       │
│ **Ingress Layer**    │ AWS ALB: Terminates origin TLS; forwards to ECS private subnets.│
│ **Compute Layer**    │ AWS ECS Fargate: Serverless containers running NestJS Monolith. │
│ **Database Layer**   │ AWS RDS for PostgreSQL (Multi-AZ): Authoritative transactional  │
│                      │ store with `pgvector`, `postgis`, and continuous WAL archiving.  │
│ **Cache Layer**      │ AWS ElastiCache for Redis: Rate limiting, sessions, BullMQ.     │
│ **Object Storage**   │ Amazon S3: `public-media` (CDN) vs `private-kyc` (KMS Vault).   │
│ **Key Management**   │ AWS KMS: Customer-managed keys (CMK) for envelope encryption.   │
│ **Secrets Vault**    │ AWS Secrets Manager: Dynamic database credentials, API keys.    │
│ **Automation Host**  │ AWS ECS Fargate: Self-hosted n8n instance in private VPC subnet. │
│ **Queue Layer**      │ Primary: PostgreSQL Outbox + Redis BullMQ; DLQ: dlq_events       │
│ **Observability**    │ Amazon CloudWatch + OpenTelemetry: Traces, logs, AI metrics.    │
└──────────────────────┴─────────────────────────────────────────────────────────────────┘
```

### Infrastructure Boundary Rules:
- **Modular Monolith Discipline:** The application runs as a modular monolith on AWS ECS Fargate. No Kubernetes (EKS), service meshes, or microservices are introduced in V1.
- **Isolated VPC Subnets:** RDS PostgreSQL and Redis reside in private, non-routable subnets with zero internet ingress. Only ECS tasks in application subnets may open database connections.

---

# 4. MASTER DATA OWNERSHIP & SYSTEM-OF-RECORD MATRIX

```text
┌───────────────────────────┬───────────────────────────────────────────┬─────────────────────────┐
│ System / Component        │ Primary Architectural Responsibility      │ Source of Truth?        │
├───────────────────────────┼───────────────────────────────────────────┼─────────────────────────┤
│ **AWS RDS PostgreSQL**    │ Authoritative business state, bookings,   │ **YES (AUTHORITATIVE)** │
│                           │ room inventory, wallets, users, SOS cases │                         │
│ **Amazon S3**             │ Media assets, property photos, documents  │ **YES (Object Store)**  │
│ **Redis (ElastiCache)**   │ Session cache, rate limits, BullMQ, locks │ **NO (Ephemeral)**      │
│ **Firebase Auth**         │ Supporting social/phone identity provider │ **Identity Provider**   │
│ **Firebase FCM**          │ Web and mobile push notification delivery │ **NO (Transport)**      │
│ **Firebase Realtime/DB**  │ [DEFERRED IN V1] — WebSockets + Redis Pub/Sub owns live state │ **NO (Deferred)**       │
│ **Cloudflare**            │ Edge WAF, DDoS mitigation, DNS, static CDN│ **NO (Edge Gate)**      │
│ **Google Maps Platform**  │ Geographic search, geocoding, routes, ETA │ **NO (External Intel)** │
│ **Google Photoreal 3D**   │ 3D terrain and landscape visualization    │ **NO (Visualization)**  │
│ **n8n Automation Engine** │ Event-driven workflow orchestration       │ **NO (Orchestration)**  │
│ **Central AI Gateway**    │ LLM prompt compilation & tool mediation   │ **NO (Intelligence)**   │
│ **Razorpay / Stripe**     │ Payment execution & banking rails         │ **Provider Transaction  │
│                           │                                           │ + Backend Auth Ledger** │
│ **HyperVerge / Veriff**   │ Identity document verification engine     │ **Provider Result       │
│                           │                                           │ + Backend KYC State**   │
└───────────────────────────┴───────────────────────────────────────────┴─────────────────────────┘
```

---

# 5. FIREBASE INTEGRATION FLOW & BOUNDARY LAWS

Firebase serves strictly as an auxiliary identity and messaging mechanism:

```text
                     FIREBASE AUTHENTICATION FLOW
                     ────────────────────────────
User Browser / Mobile
       │
       ▼ 1. User Authenticates with Google / Apple / Phone SMS
Firebase Client SDK
       │
       ▼ 2. Obtains Signed Firebase ID Token (JWT)
User Browser / Mobile
       │
       ▼ 3. POST /api/v1/auth/firebase-login { id_token }
NestJS Backend Gateway (AuthModule)
       │
       ▼ 4. Validates ID Token via `firebase-admin` SDK (Signature, Expiry, Audience)
PostgreSQL Database
       │
       ▼ 5. Resolves or Creates Authoritative `users` Record
NestJS Backend Gateway
       │
       ▼ 6. Issues Authoritative Session (`user_sessions` table in PostgreSQL)
       │    Issues Short-Lived JWT (15m) + Rotating Refresh Token (7d)
User Browser / Mobile
       │
       ▼ 7. Tokens Received via `HttpOnly`, `Secure`, `SameSite=Strict` Cookies
All Subsequent API Calls Validated via Backend Session (Firebase Token Discarded)
```

### Strict Firebase Rules:
- **Zero Authorization Bypass:** A Firebase ID token cannot be used to read or mutate AuricVista domain endpoints.
- **No Duplicate Datastores:** Bookings, room inventory, trips, wallets, KYC, and SOS incidents exist EXCLUSIVELY in PostgreSQL.

---

# 6. AUTHENTICATION & SESSION LIFECYCLE FLOWS

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        COMPLETE AUTHENTICATION & SESSION FLOWS                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Registration / Login ──▶ Validates Credentials ──▶ Creates DB Session Record         │
│ • Token Pair ──▶ Short-Lived JWT (15m) + Rotating Refresh Token (7d)                   │
│ • Cookie Standards ──▶ HttpOnly, Secure, SameSite=Strict, Path=/api                    │
│ • Refresh (`POST /auth/refresh`) ──▶ Validates Hash ──▶ Issues New Pair + Rotates Hash  │
│ • Reuse Attack Detected ──▶ Immediately Revokes Entire Token Family & Session Pool     │
│ • Logout (`POST /auth/logout`) ──▶ Sets `is_revoked = TRUE` in DB & Blacklists Redis   │
│ • Logout-All (`POST /auth/logout-all`) ──▶ Revokes All Active Sessions for User       │
│ • Remote Session Revocation ──▶ `DELETE /auth/sessions/:sessionId` (Ownership Checked) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

Session state is permanently tracked in the PostgreSQL `user_sessions` table:
`id`, `user_id`, `device_id`, `refresh_token_family`, `current_token_hash`, `ip_address`, `user_agent`, `created_at`, `last_seen_at`, `expires_at`, `is_revoked`, `revocation_reason`.

---

# 7. CORE BUSINESS FLOWS (A THROUGH Z)

Every primary operation in AuricVista is executed via an explicit 13-stage operational cycle:

---

### Flow A: User Onboarding
1. **User Trigger:** User finishes sign-up.
2. **Frontend Action:** Submits travel style and dietary tags in `OnboardingModal`.
3. **Backend Endpoint:** `PUT /api/v1/users/preferences`.
4. **Authoritative State Change:** User status updated to `ONBOARDED`.
5. **Database Interaction:** Inserts record into `user_preferences`.
6. **Domain Event:** `user.onboarding_completed`.
7. **Outbox Behavior:** Appends event to `outbox_events`.
8. **Queue / Worker:** Outbox relay publishes to Redis BullMQ.
9. **n8n Workflow:** `01_Identity/user.onboarding.v1`.
10. **External Provider:** Dispatches welcome push notification via Firebase FCM.
11. **Callback Behavior:** FCM acknowledges message receipt.
12. **Final Backend State:** Updates `user_devices.last_notified_at`.
13. **Frontend Response:** Displays customized destination feed.

---

### Flow B: KYC Verification
1. **User Trigger:** Traveler clicks "Verify Identity" in Profile.
2. **Frontend Action:** Uploads government ID image via presigned S3 PUT URL.
3. **Backend Endpoint:** `POST /api/v1/kyc/submit`.
4. **Authoritative State Change:** KYC record status set to `PENDING_REVIEW`.
5. **Database Interaction:** Writes metadata reference to `kyc_verifications`.
6. **Domain Event:** `kyc.submitted`.
7. **Outbox Behavior:** Enqueues payload to `outbox_events`.
8. **Queue / Worker:** BullMQ worker triggers KYC verification adapter.
9. **n8n Workflow:** `02_KYC_Trust/kyc.status_update.v1` (Monitors SLA).
10. **External Provider:** Calls HyperVerge/Veriff identity verification API.
11. **Callback Behavior:** Vendor webhook hits `POST /api/v1/kyc/webhook` with cryptographic signature.
12. **Final Backend State:** Backend verifies signature, updates `kyc_verifications.status = VERIFIED`, masks data (`XXXXXXXX1234`), recalculates `users.trust_score`.
13. **Frontend Response:** Profile displays gold "Verified Traveler" shield badge.

---

### Flow C: Search & Discovery
1. **User Trigger:** Traveler types "luxury coffee plantation Coorg" in search bar.
2. **Frontend Action:** Debounced input triggers `GlobalSearchModal`.
3. **Backend Endpoint:** `GET /api/v1/search?q=luxury+coffee+plantation+Coorg`.
4. **Authoritative State Change:** None (Read-only discovery).
5. **Database Interaction:** Executes hybrid SQL query: Trigram text search (`pg_trgm`) + vector semantic similarity (`pgvector` on property descriptions).
6. **Domain Event:** `search.performed` (Aggregated periodically).
7. **Outbox Behavior:** None for immediate query.
8. **Queue / Worker:** Async telemetry aggregation.
9. **n8n Workflow:** `15_Search/search.demand_capture.v1`.
10. **External Provider:** None (Self-hosted search).
11. **Callback Behavior:** N/A.
12. **Final Backend State:** Increments search query count in analytics store.
13. **Frontend Response:** Renders ranked stay cards with availability indicators.

---

### Flow D: Google Geographic Services & Route Optimization
1. **User Trigger:** Traveler explores Day 2 itinerary in Coorg.
2. **Frontend Action:** Opens interactive `ItineraryMap.js`.
3. **Backend Endpoint:** `POST /api/v1/geo/route-preview`.
4. **Authoritative State Change:** None (Read-only calculation).
5. **Database Interaction:** Queries cached destination coordinates from `destinations` and `attractions`.
6. **Domain Event:** None.
7. **Outbox Behavior:** None.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** Backend queries Google Routes API / Distance Matrix via server-side API key from AWS Secrets Manager. Frontend renders interactive pins via Google Maps JS SDK using HTTP-referrer restricted client key.
11. **Callback Behavior:** Returns driving duration and polyline geometry.
12. **Final Backend State:** Caches route geometry in Redis ($TTL \le 24\text{ hours}$).
13. **Frontend Response:** Renders polyline with travel time estimates on map.

---

### Flow E: Property & Stay Discovery
1. **User Trigger:** Traveler clicks on "The Tamara Coorg" card.
2. **Frontend Action:** Navigates to `/stay/the-tamara-coorg`.
3. **Backend Endpoint:** `GET /api/v1/properties/the-tamara-coorg`.
4. **Authoritative State Change:** None.
5. **Database Interaction:** Queries `properties`, `property_rooms`, `property_amenities`, and host baseline contracts.
6. **Domain Event:** None.
7. **Outbox Behavior:** None.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** Images served via Amazon S3 / Cloudflare CDN.
11. **Callback Behavior:** Edge cache delivers static media.
12. **Final Backend State:** None.
13. **Frontend Response:** Displays luxury property details, room configurations, and verified host credentials.

---

### Flow F: Inventory & Temporary Room Hold
1. **User Trigger:** Traveler selects dates and clicks "Reserve Stay".
2. **Frontend Action:** Opens Step 1 of `BookingModal`.
3. **Backend Endpoint:** `POST /api/v1/bookings/hold`.
4. **Authoritative State Change:** Ephemeral room hold created ($15\text{ minutes}$ expiry).
5. **Database Interaction:** Executes PostgreSQL transaction: checks `inventory_units` using `SELECT ... FOR UPDATE` row-level locks, increments `locked_units`.
6. **Domain Event:** `inventory.hold_acquired`.
7. **Outbox Behavior:** Writes hold event to `outbox_events`.
8. **Queue / Worker:** BullMQ schedules an auto-release job for $T+15\text{ minutes}$.
9. **n8n Workflow:** `10_CRM/checkout.abandoned_cart.v1` (Observes hold lifecycle).
10. **External Provider:** None.
11. **Callback Behavior:** N/A.
12. **Final Backend State:** Redis stores lock `hold:room:{id}:{date}` ($TTL = 900\text{s}$).
13. **Frontend Response:** Displays 15-minute countdown timer in checkout header.

---

### Flow G: Checkout Price Breakdown & Quote
1. **User Trigger:** Traveler reviews guests and applies coupon `AURICFIRST`.
2. **Frontend Action:** Advances to Step 3 in `BookingModal`.
3. **Backend Endpoint:** `POST /api/v1/bookings/quote`.
4. **Authoritative State Change:** Quote calculated server-side.
5. **Database Interaction:** Validates room base price, host baseline payout, platform margin, GST tax brackets, and verifies single-use coupon in `discount_coupons`.
6. **Domain Event:** None.
7. **Outbox Behavior:** None.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** None.
11. **Callback Behavior:** N/A.
12. **Final Backend State:** Stores signed quote hash in checkout session.
13. **Frontend Response:** Displays verified price breakdown: Base ₹64,000 + Taxes ₹9,500 - Discount ₹5,000 = Total ₹68,500.

---

### Flow H: Booking Order Creation
1. **User Trigger:** Traveler clicks "Proceed to Payment".
2. **Frontend Action:** Step 5 of `BookingModal` initiates order.
3. **Backend Endpoint:** `POST /api/v1/payments/create-order`.
4. **Authoritative State Change:** Booking record created in state `PAYMENT_PENDING`.
5. **Database Interaction:** Inserts record into `bookings` with unique `booking_number` (`AV-RES-829102`).
6. **Domain Event:** `booking.initiated`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** Calls Razorpay Orders API to create gateway order.
11. **Callback Behavior:** Razorpay returns `razorpay_order_id`.
12. **Final Backend State:** Updates `bookings.gateway_order_id`.
13. **Frontend Response:** Launches Razorpay Checkout Modal with official order ID.

---

### Flow I: Payment Execution (Gateway Rails)
1. **User Trigger:** Traveler completes payment via UPI / Netbanking in Razorpay modal.
2. **Frontend Action:** Razorpay SDK captures transaction.
3. **Backend Endpoint:** Client sends client callback to `POST /api/v1/payments/verify-client-state` (Treated purely as UI hint; DOES NOT CONFIRM BOOKING).
4. **Authoritative State Change:** None (Awaiting signed webhook).
5. **Database Interaction:** Sets status to `PAYMENT_AUTHORIZING`.
6. **Domain Event:** None.
7. **Outbox Behavior:** None.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** Razorpay banking network processes funds.
11. **Callback Behavior:** Gateway queues server-to-server webhook.
12. **Final Backend State:** None.
13. **Frontend Response:** Shows progress spinner: "Confirming payment with banking network...".

---

### Flow J: Payment Webhook Verification & Booking Confirmation
1. **User Trigger:** Razorpay server dispatches webhook `order.paid`.
2. **Frontend Action:** None (Asynchronous server event).
3. **Backend Endpoint:** `POST /api/v1/payments/webhook/razorpay`.
4. **Authoritative State Change:** Booking status transitioned to `CONFIRMED`.
5. **Database Interaction:**
   - Reads raw request buffer before JSON parsing.
   - Verifies cryptographic HMAC-SHA256 signature against webhook secret.
   - Checks `payment_webhook_events` for duplicate `event_id` (Idempotency).
   - Atomic PostgreSQL Transaction: Inserts payment ledger entry, transitions `bookings.status = CONFIRMED`, converts temporary hold in `inventory_units` to `booked_units = booked_units + 1`, burns coupon in `discount_coupons`, generates cryptographic voucher pass `booking_vouchers` (`AV-CRG-82910`).
6. **Domain Event:** `booking.confirmed`.
7. **Outbox Behavior:** Appends `booking.confirmed` to `outbox_events`.
8. **Queue / Worker:** BullMQ outbox relay picks up event and sends signed webhook to n8n.
9. **n8n Workflow:** `04_Booking/booking.confirmed.v1`.
10. **External Provider:** n8n coordinates:
    - Generates branded PDF voucher pass via backend pass service.
    - Sends WhatsApp message with pass attachment via WhatsApp Cloud API.
    - Sends transactional confirmation email with GST invoice via Amazon SES.
    - Dispatches instant FCM push notification to device.
11. **Callback Behavior:** Messaging providers report delivery status.
12. **Final Backend State:** Updates `bookings.notification_sent_at = NOW()`.
13. **Frontend Response:** Realtime WebSocket pushes confirmation; `BookingModal` transitions to Step 6 Success Screen displaying the Gold Pass QR code.

---

### Flow K: Trip Creation
1. **User Trigger:** Traveler clicks "Plan New Trip" on home dashboard.
2. **Frontend Action:** Submits destination, dates, and budget in `TripCreationModal`.
3. **Backend Endpoint:** `POST /api/v1/trips`.
4. **Authoritative State Change:** New trip entity created.
5. **Database Interaction:** Inserts into `trips` (`creator_id`, `destination_id`, `status = DRAFT`) and inserts creator as `OWNER` in `trip_members`.
6. **Domain Event:** `trip.created`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** Outbox worker triggers itinerary setup.
9. **n8n Workflow:** `06_Trip/trip.itinerary_enrich.v1`.
10. **External Provider:** Fetches seasonal destination weather from Weather API.
11. **Callback Behavior:** Returns 5-day weather forecast.
12. **Final Backend State:** Attaches destination weather briefing to trip summary.
13. **Frontend Response:** Opens Collaborative Itinerary Studio view.

---

### Flow L: Collaborative Itinerary Planning & Group Voting
1. **User Trigger:** Collaborator adds "White Water Rafting, Barapole" to Day 2.
2. **Frontend Action:** Clicks "Add Activity" in Itinerary View.
3. **Backend Endpoint:** `POST /api/v1/trips/:tripId/activities`.
4. **Authoritative State Change:** Activity added in `PROPOSED` state.
5. **Database Interaction:** Validates `TripOwnershipGuard` (User is member with `can_edit = TRUE`), inserts into `itinerary_activities`.
6. **Domain Event:** `itinerary.activity_proposed`.
7. **Outbox Behavior:** None (Internal realtime event).
8. **Queue / Worker:** Dispatches in-memory Socket.io broadcast to room `trip:{tripId}`.
9. **n8n Workflow:** None.
10. **External Provider:** None.
11. **Callback Behavior:** Connected clients receive event.
12. **Final Backend State:** Updates `trips.updated_at = NOW()`.
13. **Frontend Response:** Activity appears dynamically on all collaborators' screens with a "Vote 👍 / 👎" chip.

---

### Flow M: Matching & Travel Buddy Discovery (Swipes)
1. **User Trigger:** Traveler swipes right on a compatible traveler card.
2. **Frontend Action:** Swipe gesture triggers `POST /api/v1/matching/swipe`.
3. **Backend Endpoint:** `MatchingController.recordSwipe`.
4. **Authoritative State Change:** Swipe recorded; evaluates bilateral mutual like.
5. **Database Interaction:** Inserts into `swipes` (`swiper_id`, `target_id`, `direction = LIKE`). Queries if reciprocal swipe exists:
   ```sql
   SELECT * FROM swipes WHERE swiper_id = $target_id AND target_id = $swiper_id AND direction = 'LIKE';
   ```
6. **Domain Event:** If mutual: `matching.mutual_match`.
7. **Outbox Behavior:** Writes match event to `outbox_events`.
8. **Queue / Worker:** BullMQ worker triggers match activation.
9. **n8n Workflow:** `07_Matching/match.notification.v1`.
10. **External Provider:** Dispatches push notifications to both travelers via Firebase FCM.
11. **Callback Behavior:** FCM acknowledges message.
12. **Final Backend State:** Inserts match record into `matches`, creates active 1-on-1 thread in `conversations`, grants mutual messaging permissions.
13. **Frontend Response:** Displays celebratory "It's a Match!" modal with "Say Hello" quick-action.

---

### Flow N: Flatmate & PG Discovery
1. **User Trigger:** Digital nomad filters for "Flatmate in Indiranagar, Bengaluru".
2. **Frontend Action:** Sets budget ₹25,000 and move-in date in Connect View.
3. **Backend Endpoint:** `GET /api/v1/matching/flatmates?location=indiranagar&budget=25000`.
4. **Authoritative State Change:** None (Search query).
5. **Database Interaction:** Queries `flatmate_profiles` filtered by lifestyle tags (vegan, night owl, remote work), verified KYC status, and budget overlap.
6. **Domain Event:** None.
7. **Outbox Behavior:** None.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** None.
11. **Callback Behavior:** N/A.
12. **Final Backend State:** None.
13. **Frontend Response:** Displays compatibility-scored digital nomad flatmate cards.

---

### Flow O: Travel Groups & Community Cohorts
1. **User Trigger:** Traveler clicks "Join Group" on "Karnataka Heritage Explorers".
2. **Frontend Action:** Submits join request with introduction note.
3. **Backend Endpoint:** `POST /api/v1/groups/:groupId/join`.
4. **Authoritative State Change:** Group membership set to `PENDING_APPROVAL`.
5. **Database Interaction:** Inserts into `group_members` (`group_id`, `user_id`, `role = MEMBER`, `status = PENDING`).
6. **Domain Event:** `group.member_requested`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** BullMQ worker delivers host alert.
9. **n8n Workflow:** `08_Group_Community/group.recruitment.v1`.
10. **External Provider:** Sends push notification to group host via Firebase FCM.
11. **Callback Behavior:** FCM acknowledges.
12. **Final Backend State:** Updates host pending notifications badge.
13. **Frontend Response:** Button updates to "Request Sent (Pending Host Review)".

---

### Flow P: 1-on-1 Realtime Chat
1. **User Trigger:** Traveler sends message "What time are we meeting at the coffee estate?".
2. **Frontend Action:** Chat input emits WebSocket event `sendMessage`.
3. **Backend Endpoint:** WebSocket Gateway (`ChatGateway`).
4. **Authoritative State Change:** Message stored and broadcast.
5. **Database Interaction:** Validates sender has active match or booking permission; inserts message into `messages` (`conversation_id`, `sender_id`, `content`, `status = SENT`).
6. **Domain Event:** `chat.message_sent`.
7. **Outbox Behavior:** If recipient is offline (no active socket in Redis), enqueues notification.
8. **Queue / Worker:** BullMQ notification queue.
9. **n8n Workflow:** `09_Communication/chat.offline_push.v1`.
10. **External Provider:** Sends FCM push notification with masked preview.
11. **Callback Behavior:** FCM delivers message.
12. **Final Backend State:** Sets message `delivery_status = DELIVERED`.
13. **Frontend Response:** Recipient client renders message with double gold checkmark.

---

### Flow Q: Group Chat & Realtime Synchronization
1. **User Trigger:** Group leader shares trek meeting coordinates.
2. **Frontend Action:** Posts pinned message in group channel.
3. **Backend Endpoint:** WebSocket Gateway (`ChatGateway.sendGroupMessage`).
4. **Authoritative State Change:** Group message persisted.
5. **Database Interaction:** Verifies membership in `group_members`, writes to `group_messages`.
6. **Domain Event:** Redis Pub/Sub distributes message across horizontal backend nodes.
7. **Outbox Behavior:** None for connected active sockets.
8. **Queue / Worker:** Offline members receive batched notifications.
9. **n8n Workflow:** None for online chat.
10. **External Provider:** None.
11. **Callback Behavior:** N/A.
12. **Final Backend State:** Increments unread message counters for offline members.
13. **Frontend Response:** All connected group members see the pinned location banner instantly.

---

### Flow R: Virtual Trip Expense Split & Wallet Ledger
1. **User Trigger:** Traveler logs dinner expense: "Dinner at Coorg Cuisine — ₹4,200".
2. **Frontend Action:** Enters amount and selects "Split Equally (3 People)" in `TripWalletModal`.
3. **Backend Endpoint:** `POST /api/v1/wallet/expenses`.
4. **Authoritative State Change:** Virtual expense ledger updated.
5. **Database Interaction:**
   - Enforces double-entry ledger discipline (NO direct balance updates).
   - Inserts record into `trip_expenses` (`trip_id`, `payer_id`, `amount = 4200.00`, `currency = INR`).
   - Inserts 3 split records into `expense_splits` (Each owed ₹1,400.00).
6. **Domain Event:** `wallet.split_created`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** BullMQ worker evaluates budget threshold.
9. **n8n Workflow:** `11_Wallet/wallet.split_alert.v1`.
10. **External Provider:** Sends summary push notification to participants via Firebase FCM.
11. **Callback Behavior:** FCM delivers push.
12. **Final Backend State:** Evaluates trip total spend against `trips.budget_target`. If spend $> 85\%$, emits `wallet.budget_threshold_reached`.
13. **Frontend Response:** Wallet updates dynamically showing who paid and net individual balances.

---

### Flow S: Multi-Channel Notification Coordination
1. **User Trigger:** Scheduled departure reminder (Check-in - 24 hours).
2. **Frontend Action:** None (Scheduled cron job).
3. **Backend Endpoint:** Scheduled cron service in NestJS.
4. **Authoritative State Change:** None.
5. **Database Interaction:** Queries active bookings departing tomorrow.
6. **Domain Event:** `booking.departure_reminder_due`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** BullMQ passes event to n8n.
9. **n8n Workflow:** `09_Communication/channel.router.v1`.
10. **External Provider:**
    - Checks user quiet hours (22:00 – 08:00 IST) and velocity limits (max 3/day).
    - Checks user preferences in `user_preferences`.
    - Dispatches WhatsApp message with chauffeur pickup details and check-in pass.
11. **Callback Behavior:** WhatsApp webhook confirms message read.
12. **Final Backend State:** Updates `notifications_log.read_at = NOW()`.
13. **Frontend Response:** Active trip banner appears on mobile home screen.

---

### Flow T: Reviews & Community Reflections
1. **User Trigger:** Verified guest completes stay at "The Tamara Coorg".
2. **Frontend Action:** Submits 5-star rating and plantation reflection in `ReviewsSection`.
3. **Backend Endpoint:** `POST /api/v1/reviews`.
4. **Authoritative State Change:** Review created in `PUBLISHED` state.
5. **Database Interaction:** Validates traveler has completed booking (`status = COMPLETED`), inserts into `reviews`, marks `is_verified_stay = TRUE`, recalculates property average rating.
6. **Domain Event:** `review.published`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** BullMQ worker triggers host notification.
9. **n8n Workflow:** `05_Tourism/review.reflection_digest.v1`.
10. **External Provider:** Sends congratulatory notification to property host via WhatsApp.
11. **Callback Behavior:** Provider acknowledges message.
12. **Final Backend State:** Increases host trust ranking metric.
13. **Frontend Response:** Review appears instantly with verified gold checkmark badge.

---

### Flow U: Content Moderation & Human Review Queue
1. **User Trigger:** Community member flags an inappropriate photo in a travel story.
2. **Frontend Action:** Clicks "Report Story" selecting "Misleading / Inappropriate".
3. **Backend Endpoint:** `POST /api/v1/moderation/reports`.
4. **Authoritative State Change:** Report created in `moderation_reports`.
5. **Database Interaction:** Inserts report; if report count on entity $\ge 3$, automatically transitions entity status to `SHADOW_HIDDEN`.
6. **Domain Event:** `moderation.flag_threshold_exceeded`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** Enqueues high-priority review task for Trust & Safety operators.
9. **n8n Workflow:** `16_Moderation/moderation.operator_alert.v1`.
10. **External Provider:** Dispatches alert to internal Trust & Safety Slack channel.
11. **Callback Behavior:** Operator reviews in Admin Console.
12. **Final Backend State:** Admin confirms removal or reinstatement via `POST /admin/moderation/:id/resolve`.
13. **Frontend Response:** Content is removed from public feed with confirmation toast to reporter.

---

### Flow V: Partner Operations & Inventory Updates
1. **User Trigger:** Coffee estate host blocks out 3 rooms for a private wedding.
2. **Frontend Action:** Host toggles calendar blackout dates in Partner Console.
3. **Backend Endpoint:** `PUT /api/v1/partner/properties/:id/inventory`.
4. **Authoritative State Change:** Room inventory locked.
5. **Database Interaction:** Verifies `PROPERTY_PARTNER` ownership, executes `UPDATE inventory_units SET locked_units = locked_units + 3`.
6. **Domain Event:** `inventory.updated`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** In-memory Redis cache invalidation.
9. **n8n Workflow:** None.
10. **External Provider:** None.
11. **Callback Behavior:** N/A.
12. **Final Backend State:** Purges Redis cache key `stay:availability:{id}:{date}`.
13. **Frontend Response:** Calendar immediately reflects blocked dates.

---

### Flow W: Admin Operations & Platform Margin Adjustments
1. **User Trigger:** Platform Administrator updates seasonal platform markup.
2. **Frontend Action:** Updates commission rate from 12% to 15% in Admin Console.
3. **Backend Endpoint:** `PUT /api/v1/admin/pricing-rules/:ruleId`.
4. **Authoritative State Change:** Platform fee schedule updated.
5. **Database Interaction:** Validates caller has `SUPER_ADMIN` role via `RolesGuard`, inserts immutable audit entry into `audit_logs` (`user_id`, `action`, `old_value`, `new_value`, `ip_address`), updates `pricing_rules`.
6. **Domain Event:** `admin.pricing_updated`.
7. **Outbox Behavior:** Enqueued to `outbox_events`.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** None.
11. **Callback Behavior:** N/A.
12. **Final Backend State:** Audit log permanently sealed.
13. **Frontend Response:** Admin console displays timestamped confirmation badge.

---

### Flow X: AI Personal Travel Assistant (Conversational Planning)
1. **User Trigger:** Traveler prompts AI companion: *"Add Abbey Falls and a private coffee tasting to my Day 2 Coorg itinerary."*
2. **Frontend Action:** Submits prompt in `AIPlanner.js` chat drawer.
3. **Backend Endpoint:** `POST /api/v1/ai/companion/chat`.
4. **Authoritative State Change:** None (Draft proposal generated).
5. **Database Interaction:**
   - Central AI Gateway verifies active user session and hourly rate quota.
   - Compiles minimum context: traveler preferences, destination ID, active trip summary (PII stripped).
   - Assembles prompt with strict XML delimiters isolating user input from system instructions.
6. **Domain Event:** None.
7. **Outbox Behavior:** None.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** Calls LLM model provider via Central AI Gateway. Model identifies intent and emits typed function call: `tool_propose_itinerary_activity({ day: 2, activity: "Abbey Falls Visit", category: "Nature" })`.
11. **Callback Behavior:** Model response received by Backend Tool Gateway.
12. **Final Backend State:** Backend validates tool input schema via Zod; marks proposal with `requires_confirmation = TRUE`.
13. **Frontend Response:** Displays proposed activity card in chat with explicit interactive buttons: **[Confirm & Add to Trip]** and **[Dismiss]**. *(LLM CANNOT auto-commit to the database).*

---

### Flow Y: RAG & Knowledge Retrieval
1. **User Trigger:** Traveler asks: *"What are the dress code guidelines for Virupaksha Temple in Hampi?"*
2. **Frontend Action:** Submits question in Destination Guide view.
3. **Backend Endpoint:** `POST /api/v1/ai/companion/ask-guide`.
4. **Authoritative State Change:** None.
5. **Database Interaction:**
   - Central AI Gateway runs vector search in PostgreSQL `pgvector`:
     ```sql
     SELECT content, 1 - (embedding <=> $query_embedding) AS similarity
     FROM destination_knowledge
     WHERE destination_id = 'hampi' AND visibility = 'PUBLIC'
     ORDER BY similarity DESC LIMIT 3;
     ```
   - Pre-query metadata authorization ensures only approved public knowledge is retrieved.
6. **Domain Event:** None.
7. **Outbox Behavior:** None.
8. **Queue / Worker:** None.
9. **n8n Workflow:** None.
10. **External Provider:** Passes retrieved context chunks to LLM for synthesis.
11. **Callback Behavior:** Model synthesizes natural-language response.
12. **Final Backend State:** Logs AI telemetry in CloudWatch (prompt tokens, completion tokens, latency).
13. **Frontend Response:** Displays authoritative cultural guidance with verified temple citation tags.

---

### Flow Z: Deterministic SOS Emergency Pipeline
```text
TRAVELER IN DISTRESS ACTIVATES 🚨 SOS BUTTON (Long-Press 1.5s in Mobile/Web App)
                                │
                                ▼
                     CLOUDFLARE EDGE & AWS ALB
                                │
                                ▼
                     NESTJS BACKEND GATEWAY
                                │
   • Validates Authentication & User Identity
   • Idempotency Check (`Idempotency-Key` Header)
   • 10-Second Duplicate Suppression Check:
     Rapid taps within 10s update the existing active incident without creating duplicates
   • Rate Limit Quota Check: Max 5 dispatches per 5 minutes per device
   • GPS Sanity Verification: Validates coordinate velocity against plausible bounds
   • Atomic PostgreSQL Transaction:
     - Creates Authoritative Record in `sos_incidents` (`status = ACTIVE`, `severity = CRITICAL`)
     - Inserts Incident Snapshot into `incident_actions`
     - Commits Transactional Outbox Record `sos.created`
                                │
                                ▼
                    P0 EMERGENCY WORKER QUEUE
                                │
   ┌────────────────────────────┴────────────────────────────┐
   ▼                                                         ▼
DISPATCH TO EMERGENCY CONTACTS                            ESCALATE TO HUMAN SAFETY CONSOLE
   • Bypasses All Quiet Hours & Velocity Caps                • Audio & Visual Alarm in Safety Console
   • Instant Priority SMS via Twilio                         • Live Location Pin & Itinerary Rendered
   • WhatsApp Alert with Map Link & Itinerary Context        • Safety Operator Coordinates with Police (112)
   • If SMS Fails, Automatically Triggers Voice Call           or Forest Ranger Checkpoints
```
### Critical SOS Architectural Standards:
- **100% Deterministic Execution:** Zero AI dependency. AI is completely prohibited from classifying, resolving, or downgrading an emergency incident.
- **No Continuous Background GPS Tracking in V1:** Location is captured strictly on-demand when the traveler activates SOS. Background continuous tracking is omitted in V1.
- **Permanent Legal Audit Trail:** Dispatches, delivery receipts, and coordinator actions are permanently logged in PostgreSQL `incident_actions`.

---

# 8. BOOKING & INVENTORY CONSISTENCY ARCHITECTURE

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        BOOKING & INVENTORY STATE MACHINE                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ INITIATED ──▶ HOLD_ACQUIRED ──▶ PAYMENT_PENDING ──▶ CONFIRMED ──▶ COMPLETED            │
│      │               │                  │                                              │
│      ▼               ▼                  ▼                                              │
│   EXPIRED         RELEASED           CANCELLED / REFUNDED                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Row-Level Locking & Double-Booking Prevention:
During checkout hold acquisition and confirmation, the NestJS `BookingModule` executes explicit row-level locking:
```sql
SELECT * FROM inventory_units 
WHERE room_type_id = $1 AND date BETWEEN $2 AND $3 
FOR UPDATE;
```
This serializes concurrent attempts to reserve the final room, guaranteeing that zero race conditions or overbookings can occur.

---

# 9. PAYMENT PROCESSING & WEBHOOK VERIFICATION

1. **Frontend Isolation:** The frontend client NEVER possesses the authority to confirm a payment.
2. **Raw Request Buffer Validation:** Incoming webhooks from Razorpay or Stripe are validated against raw request byte buffers before JSON parsing to prevent encoding attacks:
   ```typescript
   const expectedSignature = crypto
     .createHmac('sha256', process.env.PAYMENT_WEBHOOK_SECRET)
     .update(rawPayloadBuffer)
     .digest('hex');
   if (expectedSignature !== req.headers['x-razorpay-signature']) {
     throw new UnauthorizedException('Invalid payment signature');
   }
   ```
3. **Deduplication:** Every incoming gateway event checks `payment_webhook_events` by `event_id`. Duplicate deliveries return HTTP 200 without executing side effects.

---

# 10. CENTRALIZED AI GATEWAY & BOUNDED TOOLS

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CENTRALIZED AI GATEWAY ARCHITECTURE                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Client Prompt ──▶ NestJS AI Gateway (`POST /api/v1/ai/companion/chat`)              │
│ 2. Pre-Retrieval Authorization & Tenant Isolation Checks                               │
│ 3. Minimum-Context Stripping (PII, credit cards, full addresses removed)               │
│ 4. System Prompt Isolation using Rigid XML Delimiters (`<system>`, `<user_input>`)    │
│ 5. Model Inference (Claude 3.5 Sonnet / GPT-4o)                                        │
│ 6. Model Emits Typed Function Call (Validated with Zod Schema)                         │
│ 7. Backend Domain Service Executes Read or Stages Mutation                             │
│ 8. High-Impact Mutations (Booking, Payment, Cancellation) REQUIRE EXPLICIT UI ACTION   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

> [!WARNING]
> **Static RAG vs Live Dynamic State:** RAG vector search provides static cultural guides, policies, and destination history. **RAG is strictly prohibited from serving live room availability, live prices, wallet balances, or SOS incident state.** Dynamic state must be queried live from PostgreSQL.

---

# 11. GOOGLE MAPS PLATFORM ARCHITECTURE

```text
┌───────────────────────────┬─────────────────────────────────────────────────────────────┐
│ Google Geographic Service │ Specific AuricVista System Flow Responsibility              │
├───────────────────────────┼─────────────────────────────────────────────────────────────┤
│ **Places API (New)**      │ Destination discovery, points of interest, cafe discovery,  │
│                           │ nearby attractions, and address autocomplete in search.     │
│ **Geocoding API**         │ Converting property street addresses to latitude/longitude.  │
│ **Reverse Geocoding API** │ Resolving GPS coordinates from user check-ins or emergency  │
│                           │ SOS triggers into human-readable landmark addresses.        │
│ **Routes API**            │ Multi-stop travel itineraries, driving route calculation,    │
│                           │ turn-by-turn routing between destinations and coffee estates│
│ **Distance Matrix API**   │ Distance and travel ETA estimations between airport, stays, │
│                           │ and sightseeing locations for budget/time planning.         │
│ **Maps JavaScript SDK**   │ Interactive frontend map views (`ItineraryMap.js`) rendered  │
│                           │ with custom Auric luxury dark-gold styling pins.            │
│ **Photorealistic 3D Maps**│ 3D globe / terrain visualization of Karnataka Western Ghats │
│ *(Google Maps Platform)*  │ and Hampi boulder heritage landscapes for immersive trips.  │
└───────────────────────────┴─────────────────────────────────────────────────────────────┘
```

### Geographic Security Standards:
- **Client-Side Restrictions:** Web maps utilize public API keys restricted in Google Cloud Console strictly by **HTTP Referrer** (`https://auricvista.com/*`) and limited exclusively to Maps JavaScript SDK.
- **Server-Side Proxying:** All Distance Matrix and Routes calculations route through the NestJS backend using server keys stored in AWS Secrets Manager. Travel distances submitted directly by clients are rejected.

---

# 12. AUTOMATION & n8n ORCHESTRATION PIPELINE

```text
PostgreSQL Transaction BEGIN
  ├── Mutate Domain State (`bookings`, `users`, `trips`)
  └── Insert Outbox Record (`outbox_events` table)
PostgreSQL Transaction COMMIT
              │
              ▼
    OUTBOX RELAY WORKER (Redis BullMQ ──▶ DLQ: dlq_events)
              │
              ▼
    n8n CENTRAL WEBHOOK INTAKE
              │
   • HMAC-SHA256 Signature Checked (`X-Auric-Signature`)
   • Replay Window Checked (`X-Auric-Timestamp` <= 300s)
   • Idempotency Deduplication Checked (`event_id`)
              │
              ▼
    n8n DOMAIN WORKFLOW DAG
              │
   • Calls External Delivery Services (FCM, WhatsApp, Twilio, SES)
   • Implements Exponential Backoff (1m, 5m, 15m)
   • Failed Executions Routed to Dead-Letter Queue (DLQ)
              │
              ▼
    OPTIONAL SCOPED BACKEND CALLBACK
   (Calls `/api/v1/internal/automation/*` with scoped service token)
```

---

# 13. MULTI-CHANNEL NOTIFICATION FLOW

```text
Domain Event Emitted
        │
        ▼
Channel Selection Engine
        ├── Emergency Alert (P0) ──────────▶ Instant SMS + WhatsApp + Push (Bypasses Quiet Hours)
        ├── Booking Pass (P1) ─────────────▶ WhatsApp Pass + Email + Push
        ├── Chat Message (P2) ─────────────▶ FCM Push Only (Suppressed if user active on socket)
        └── Marketing / CRM (P4) ──────────▶ Check Opt-In & Quiet Hours (10 PM – 8 AM IST)
                                                    │
                                              Opted-In & Safe Hours
                                                    │
                                                    ▼
                                              Push / WhatsApp
```

### Fallback Matrix:
If WhatsApp Cloud API delivery fails $\to$ immediate fallback to SMS via Twilio. If Twilio route fails $\to$ fallback to Gupshup secondary gateway.

---

# 14. FAILURE RECOVERY & RESILIENCE ARCHITECTURE

```text
┌────────────────────────────────┬───────────────────────────────────────────────────────┐
│ Failure Scenario               │ Automated Architectural Recovery Flow                 │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ **Third-Party API Downtime**   │ Circuit breaker trips after 5 consecutive failures.   │
│ *(e.g. WhatsApp / Weather)*    │ Traffic rerouted to secondary provider or cached data.│
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ **Duplicate Webhook Delivery** │ Idempotency check on `event_id` in Redis terminates   │
│ *(Network Retry)*              │ processing immediately with HTTP 200 OK.              │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ **Delayed Payment Webhook**    │ Scheduled reconciliation job queries Razorpay API for │
│ *(Webhook Arrives Late)*       │ unconfirmed orders $> 20\text{ minutes}$ old.         │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ **Outbox Worker Failure**      │ Unprocessed records in `outbox_events` remain intact; │
│ *(Redis / Worker Crash)*       │ worker resumes polling from last committed offset.    │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ **Cascading n8n Failure**      │ Exhausted retries shunt payloads to `dlq_events`      │
│ *(Repeated 5xx Errors)*        │ table; alerts on-call engineer via PagerDuty.         │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

# 15. V1 SCOPE BOUNDARIES & PROHIBITED CAPABILITIES

The following constraints are permanently enforced in Version 2.1:
- ❌ **NO Continuous Background GPS Tracking:** Location is captured strictly on-demand during active SOS triggers or manual check-ins.
- ❌ **NO Active-Trip Anomaly Monitoring:** The system does not continuously calculate live ETAs or interrogate travelers with automated "Why are you delayed?" prompts.
- ❌ **NO AI-Controlled Emergency Outcomes:** AI models never classify, downgrade, or resolve emergency incidents.
- ❌ **NO Stored-Value / UPI Payment Wallet:** The trip wallet is strictly a virtual shared expense calculation and contribution ledger.
- ❌ **NO Guide Marketplace or Insurance Marketplace at Launch:** Omitted in V1.

---

# 16. MASTER CROSS-SYSTEM VERIFICATION STATUS

Every flow defined in this master document has been cross-verified against the active codebase and architectural specifications:

```text
[x] Source-of-Truth Ownership: Verified in Section 4 (PostgreSQL authoritative; n8n/AI non-authoritative)
[x] Frontend / Backend Boundary: Verified in Section 2 (Unidirectional REST / WebSocket APIs)
[x] AWS Cloud Architecture: Verified in Section 3 (RDS Multi-AZ, ECS Fargate, S3, Secrets Manager, KMS)
[x] Firebase Boundary: Verified in Section 5 (Identity Provider + FCM push only; zero business state)
[x] Cloudflare Edge Boundary: Verified in Section 2 & 3 (WAF, DDoS, zero caching on private endpoints)
[x] Google Maps Architecture: Verified in Section 11 (Places, Routes, Geocoding, Photoreal 3D Maps)
[x] Authentication & Session Lifecycle: Verified in Section 6 (15m JWT, 7d rotating refresh, family reuse)
[x] Booking & Inventory Consistency: Verified in Section 7 (Flow F/H/J) & Section 8 (Row-level locks)
[x] Payment & Webhook Verification: Verified in Section 7 (Flow I/J) & Section 9 (Raw buffer HMAC-SHA256)
[x] KYC & Data Minimization: Verified in Section 7 (Flow B) (KMS encrypted S3, zero PII in n8n)
[x] Central AI Gateway: Verified in Section 7 (Flow X/Y) & Section 10 (Typed tools, confirmation gates)
[x] RAG Architecture: Verified in Section 7 (Flow Y) & Section 10 (Static RAG vs live dynamic data)
[x] n8n Orchestration Boundary: Verified in Section 2 & 12 (Transactional Outbox, signed webhooks, DLQ)
[x] Multi-Channel Notifications: Verified in Section 7 (Flow S) & Section 13 (FCM, WhatsApp, SMS, SES)
[x] Social Matching & Swipes: Verified in Section 7 (Flow M/N) (Bilateral matching, chat unlocks)
[x] Realtime Chat & Communities: Verified in Section 7 (Flow P/Q/O) (Socket.io + Redis Pub/Sub)
[x] Virtual Trip Wallet: Verified in Section 7 (Flow R) (Double-entry ledger, contribution tracking)
[x] Deterministic Safety & SOS: Verified in Section 7 (Flow Z) (10s dedup, 5/5m limits, P0 queue, zero AI)
[x] Moderation & Trust Queues: Verified in Section 7 (Flow U) (Automated threshold hiding, admin audit)
[x] Failure, Retries & Idempotency: Verified in Section 14 (Redis duplicate keys, exponential backoff, DLQ)
[x] V1 Scope Constraints: Verified in Section 15 (No continuous GPS tracking, no PPI wallet)
[x] Security Architecture Alignment: Verified throughout (Strict adherence to security.md)
```

---

### Master End-to-End System Flow Summary
*This document constitutes the definitive operational roadmap for AuricVista. By connecting presentation, edge protection, serverless container execution, relational persistence, outbox streaming, and asynchronous workflow orchestration into one cohesive pipeline, AuricVista achieves enterprise-grade resilience, auditability, and scale.*
