# AURICVISTA

## PRODUCT REQUIREMENTS DOCUMENT — BACKEND & SCALABLE TECHNICAL ARCHITECTURE

> [!NOTE]
> **DOCUMENT METADATA & REVISION CONTROL**
> - **Document Version:** 2.1 — Master Backend Technical Specification
> - **Document Type:** Production Backend Product Requirements & Architecture Document
> - **Scope:** Backend services, domain models, authoritative state management, APIs, databases, realtime systems, cloud infrastructure, AI gateway, security, scalability, and external integration boundaries.
> - **Primary Cloud Infrastructure:** Amazon Web Services (AWS) — Managed Infrastructure
> - **Primary Relational Database:** AWS-Managed PostgreSQL (Amazon RDS for PostgreSQL Multi-AZ V1 / Aurora Scaling Path)
> - **Primary Backend Framework:** TypeScript + Node.js + NestJS (Modular Monolith)
> - **ORM / Data Access:** Prisma ORM (Strongly typed schemas, migrations, and ACID transactions)
> - **Cache / Ephemeral Store:** Redis (AWS ElastiCache for Redis — Rate limiting, sessions, queues, caching)
> - **Object Storage:** Amazon S3 (Public CDN Media Bucket vs Private KMS-Encrypted KYC Quarantine Bucket)
> - **Edge / WAF / CDN:** Cloudflare (DNS, TLS 1.3, DDoS protection, Bot Management, Edge rate limits)
> - **Supporting Identity & Push:** Firebase (Firebase Authentication for Social/Phone identity provider + Firebase Cloud Messaging for push)
> - **Geographic Intelligence:** Google Maps Platform (Places, Geocoding, Routes, Distance Matrix, Maps JS, 3D Photorealistic Maps)
> - **Automation Layer:** n8n via controlled, signed asynchronous outbox events (Orchestration only; never authoritative)
> - **AI Infrastructure:** Centralized AI Gateway + Bounded Tool Dispatcher + LLM Model Providers
> - **Status:** Master Backend PRD — Fully aligned with `design.md`, `security.md`, `prd/auricvista system flow.md`, `prd/prd 3 automation.md`, and `prd/prd1 frontend .md`.

---

## ARCHITECTURAL IMPLEMENTATION STATUS TAXONOMY

Every technical component and capability specified within this PRD is classified under one of the following authoritative states:

* `[SPECIFIED]`: Architecturally established and fully specified in this master document; ready for engineering execution.
* `[PARTIALLY IMPLEMENTED]`: Partially represented or prototyped in the repository (e.g. client-side state simulation in `js/state.js` and mock connectors in `js/services/api.js`), requiring full production backend implementation.
* `[IMPLEMENTED]`: Confirmed and actively running in the working repository codebase.
* `[REQUIRES IMPLEMENTATION]`: Mandatory production backend service, table, endpoint, or infrastructure component that developers must implement.
* `[NEEDS VALIDATION]`: Configuration or external cloud capability requiring account-level or environment-specific verification prior to deployment.
* `[OUTDATED]`: Superseded architectural assumption or deprecated pattern (e.g. microservices sprawl, unthrottled SOS, direct n8n database writes).

---

# 1. PURPOSE OF THIS PRD

This document defines the production backend architecture and domain engineering requirements for AuricVista (`Vikhyath-thelazycoder/auricvyom`).

The backend is the **sole authoritative owner of application state**.

This encompasses:
- Identity, authentication, and token lifecycles,
- Authorization, RBAC, and object-level ownership checks (BOLA/IDOR defense),
- KYC compliance, document security, and trust scoring,
- User profiles, social preferences, and personalization vectors,
- Properties, homestays, hotels, PGs, and rental inventories,
- Real-time availability, pricing baseline contracts, and room locks,
- Booking state machines, confirmations, and voucher generation,
- Payment capture, webhook signatures, idempotency, and reconciliation,
- Trips, collaborative itineraries, voting, and activity schedules,
- Groups, memberships, recruitment, and flatmate compatibility,
- Matching algorithms, swipe history, and bilateral connection states,
- Chat permissions, conversation threads, and realtime message routing,
- Virtual trip expense contributions and split settlements (ledger-based),
- Search indexes, ranking intelligence, and geographic spatial queries,
- Safety architecture, incident workflows, and deterministic SOS dispatch,
- Centralized AI Gateway, prompt assembly, and typed tool execution,
- Asynchronous domain event outbox and automation orchestration,
- Moderation queues, content flagging, and administrative operations,
- Immutable audit trails, telemetry, and observability pipelines.

The technical architecture strictly decouples authoritative domain logic from asynchronous automation and AI intelligence. Domain persistence remains in AWS-managed PostgreSQL, while external actions (communications, reminders, partner syncing) are orchestrated via event outbox streams to n8n and notification workers.

---

# 2. CORE BACKEND PRINCIPLES

## 2.1 The Backend is the Single Source of Truth
The platform architecture enforces the following unidirectional operational flow:

```text
React / Web Frontend (Untrusted)
      │
      ▼
Cloudflare Edge (WAF / DDoS / Bot Defense / TLS)
      │
      ▼
AWS Application Load Balancer
      │
      ▼
Backend Gateway (NestJS Modular Monolith)
      │
      ├── Authentication & Session Validation (PostgreSQL + Redis)
      ├── Authorization & Resource Ownership Guards
      ├── Domain Services & ACID Business Logic
      ├── Central AI Gateway & Typed Tool Execution
      │
      ▼
AWS RDS PostgreSQL (Authoritative Relational Database + pgvector)
      │
      ▼
Transactional Outbox Table
      │
      ▼
Event Publisher / Queue Layer (Redis BullMQ / AWS SQS)
      │
      ├───────────────────────────────┬───────────────────────────────┐
      ▼                               ▼                               ▼
n8n Automation Engine           Firebase FCM Push               Internal Consumers
(External Orchestration)        (Device Notifications)         (Search / Analytics)
```

## 2.2 Core Architectural Laws
1. **Frontend Requests Actions; Backend Validates and Owns State:** The client is an untrusted presentation layer. All prices, discounts, permissions, and availability must be calculated and validated server-side.
2. **The LLM is NOT a Security Boundary:** AI models provide intelligence and unstructured text synthesis; they never decide permissions, authorize transactions, mutate balances, or classify life-safety emergencies.
3. **RAG is NOT an Authorization Mechanism:** Knowledge retrieval must be pre-filtered by user permissions and tenant boundaries at the database/vector query level. Live transactional data (pricing, inventory, SOS) is never retrieved from stale vector stores.
4. **Automation is NOT the System of Record:** n8n coordinates external workflows. It never connects directly to the database or bypasses backend API validation.
5. **Deterministic Emergency Rule:** The SOS safety pipeline is 100% deterministic and operates independently of AI models or LLM availability.

---

# 3. SYSTEM ARCHITECTURE DECISION

## 3.1 Architecture Model: Modular Monolith + Event-Driven Boundaries
**AuricVista shall NOT begin as dozens of distributed microservices.**

Recommended V1 Architecture: **Modular Monolith with Event-Driven Outbox Integration**

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        AURICVISTA BACKEND MODULAR MONOLITH (NestJS)                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  • AuthModule             • UserModule             • ProfileModule                     │
│  • KycModule              • PropertyModule         • InventoryModule                   │
│  • BookingModule          • PaymentModule          • TripModule                        │
│  • ItineraryModule        • GroupModule            • MatchingModule                    │
│  • ChatModule             • WalletModule           • SearchModule                      │
│  • AiGatewayModule        • SafetyModule           • NotificationModule                │
│  • OutboxEventModule      • AdminModule            • AuditModule                       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Architectural Benefits
- **Zero Network Latency Between Modules:** In-process TypeScript function calls and dependency injection instead of brittle internal HTTP/gRPC overhead.
- **ACID Transaction Integrity:** Cross-entity operations (e.g. Booking + Room Lock + Payment Intent + Outbox Event) run within single database transactions without distributed two-phase commit complexity.
- **Rapid Feature Velocity:** Unified codebase, shared DTOs, and single deployment pipeline.
- **Future Extraction Readiness:** Strict domain module boundaries ensure that high-throughput components (e.g. Chat Realtime or Search) can be extracted into independent microservices later if scaling metrics warrant.

---

# 4. WHY NOT START WITH MICROSERVICES?

Microservices introduce severe operational friction for early-stage and growth platforms:
1. **Distributed Transaction Failures:** Booking a stay while locking inventory and updating a trip wallet requires complex saga orchestrators or distributed rollback logic.
2. **Operational Overhead:** Monitoring, networking, service meshes, and deployment pipelines multiply exponentially.
3. **Premature Optimization:** AuricVista's anticipated V1 traffic is easily handled by a horizontally scaled modular monolith running on AWS managed container infrastructure.

---

# 5. RECOMMENDED TECHNOLOGY STACK

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               MASTER TECHNOLOGY STACK                                  │
├──────────────────────┬─────────────────────────────────────────────────────────────────┤
│ Frontend             │ [CURRENT] Complete Vanilla ES6+ SPA • [TARGET] React + TypeScript │
│ Backend Runtime      │ Node.js (LTS) + TypeScript + NestJS Framework                  │
│ Primary Database     │ AWS RDS for PostgreSQL (Multi-AZ) + pgvector Extension          │
│ ORM / Data Layer     │ Prisma ORM (Typed client, migrations, relation management)      │
│ Cache & Ephemeral    │ Redis (AWS ElastiCache for Redis — Caching, locks, rate limits) │
│ Object Storage       │ Amazon S3 (Dedicated Public Media Bucket vs Private KYC Bucket) │
│ Edge / WAF / CDN     │ Cloudflare (DNS, TLS 1.3, DDoS, WAF, Bot Management)            │
│ Supporting Identity  │ Firebase Authentication (Social & Phone identity provider)       │
│ Push Notifications   │ Firebase Cloud Messaging (FCM — Web and mobile push delivery)   │
│ Geographic Services  │ Google Maps Platform (Places, Geocoding, Routes, 3D Photoreal)  │
│ Automation           │ n8n (External orchestration via HMAC-SHA256 signed webhooks)    │
│ AI Layer             │ Centralized AI Gateway + Bounded Tool Dispatcher + LLM APIs     │
│ Secrets & Keys       │ AWS Secrets Manager + AWS Key Management Service (KMS)          │
│ Queue / Outbox       │ Primary: PostgreSQL Outbox + Redis BullMQ; DLQ: dlq_events       │
│ Observability        │ OpenTelemetry + Amazon CloudWatch (Logs, Metrics, Traces)       │
└──────────────────────┴─────────────────────────────────────────────────────────────────┘
```

---

# 6. PRIMARY CLOUD INFRASTRUCTURE — AMAZON WEB SERVICES (AWS)

## 6.1 AWS as the Primary Cloud Provider
AWS provides the managed, highly available infrastructure backbone for AuricVista. All database, compute, object storage, encryption, and secret management resources reside in AWS.

## 6.2 Relational Database Evaluation: Amazon RDS for PostgreSQL vs. Amazon Aurora PostgreSQL

| Evaluation Dimension | Amazon RDS for PostgreSQL (Multi-AZ) | Amazon Aurora PostgreSQL |
| :--- | :--- | :--- |
| **V1 Recommendation** | **RECOMMENDED FOR V1 [SPECIFIED]** | **FUTURE SCALING PATH [SPECIFIED]** |
| **Operational Simplicity** | Standard PostgreSQL engine; identical to local development; zero engine surprises. | Proprietary distributed storage engine; more complex telemetry and tuning. |
| **Transaction Integrity** | Native PostgreSQL ACID engine; full support for row locks (`SELECT FOR UPDATE`). | Full ACID support; specialized distributed replication. |
| **Extension Compatibility** | 100% standard compatibility with `pgvector`, PostGIS, and `uuid-ossp`. | High compatibility, but requires validation of specific extension versions. |
| **ORM / Prisma Behavior** | Completely seamless with Prisma migrations, connection pooling, and introspection. | Requires Prisma connection pool tuning to prevent connection exhaustion. |
| **Cost Predictability** | Predictable instance-hour and provisioned GP3 storage pricing ($< \$150\text{/mo}$ V1). | Variable I/O request costs; higher baseline instance costs. |
| **High Availability** | Synchronous Multi-AZ standby replica with automatic DNS failover in $< 60\text{s}$. | Multi-AZ storage with 6 copies across 3 AZs; sub-30s replica promotion. |
| **Migration Trigger** | Baseline for launch through 100,000 active users and 1,000 write TPS. | Migrate when read-replica auto-scaling demands exceed 5 RDS read nodes. |

### V1 Decision: Amazon RDS for PostgreSQL (Multi-AZ)
AuricVista shall launch on **Amazon RDS for PostgreSQL (Multi-AZ)** utilizing PostgreSQL 16+, provisioned GP3 storage, and `pgvector`. This guarantees maximum operational reliability, deterministic pricing, full Prisma compatibility, and instant failover without the unnecessary cost and complexity of Aurora in V1.

## 6.3 Core AWS Footprint & Service Boundaries

```text
AWS CLOUD INFRASTRUCTURE FOOTPRINT
│
├── Networking: Amazon VPC
│   ├── Public Subnets: Internet Gateway, Application Load Balancer (ALB), NAT Gateway
│   ├── Private Application Subnets: AWS ECS Fargate Tasks (NestJS Modular Monolith)
│   └── Isolated Data Subnets: Amazon RDS PostgreSQL (Multi-AZ) & ElastiCache Redis
│
├── Compute: AWS ECS Fargate
│   ├── Purpose: Serverless container execution for the NestJS application
│   ├── Scaling: Auto-scaling based on CPU (70%) and HTTP request count
│   └── Security: Read-only container root filesystems, unprivileged container user
│
├── Database: Amazon RDS for PostgreSQL (Multi-AZ)
│   ├── Purpose: Authoritative system of record for all business entities
│   ├── Extensions: pgvector (AI embeddings), uuid-ossp, postgis (spatial coordinates)
│   └── Backups: Automated daily snapshots + continuous WAL archiving (35-day retention)
│
├── Object Storage: Amazon S3
│   ├── auricvista-public-media: Destination images, property photos, user avatars (via Cloudflare CDN)
│   └── auricvista-private-kyc: Identity documents (encrypted with KMS, zero public access)
│
├── Security & Key Management:
│   ├── AWS Secrets Manager: Dynamic database credentials, third-party API keys, JWT secrets
│   └── AWS KMS: Customer-managed keys (CMKs) for S3 KYC encryption, RDS storage, and secrets
│
└── Queue & Asynchronous Processing:
    ├── Primary Queue: Redis BullMQ (In-memory delayed jobs, 15m room hold expiry, P0 emergency dispatch, outbox relay)
    ├── Durable Outbox Log: PostgreSQL outbox_events table (Committed atomically with business state)
    └── Dead-Letter Queue (DLQ): PostgreSQL dlq_events table (Exhausted retry quarantine + CloudWatch alerting)
```

## 6.4 AWS Infrastructure Does Not Change Domain Ownership
AWS hosts and protects the infrastructure, but **AWS does not own the business rules**. The NestJS backend application layer remains the sole gatekeeper of business logic, validations, permissions, and entity state machines.

---

# 7. FIREBASE INTEGRATION ARCHITECTURE & BOUNDARIES

## 7.1 Supporting Role Definition
Firebase is incorporated strictly as a **supporting client, authentication, and notification delivery service**. It is NOT the system of record.

```text
               ┌───────────────────────────────┐
               │  AWS PostgreSQL (AUTHORITY)   │
               │  Single Source of Truth       │
               └──────────────┬────────────────┘
                              │ Domain Events
                              ▼
               ┌───────────────────────────────┐
               │    NESTJS BACKEND GATEWAY     │
               └──────┬─────────────────┬──────┘
                      │                 │
                      ▼                 ▼
          ┌───────────────────────┐ ┌───────────────────────┐
          │  FIREBASE AUTHENTIC.  │ │  FIREBASE CLOUD MSG.  │
          │  (Identity Provider)  │ │  (Push Delivery)      │
          └───────────────────────┘ └───────────────────────┘
```

## 7.2 Firebase Authentication (Identity Provider Flow)
Firebase Authentication may be utilized to simplify client-side social login (Google, Apple) and phone SMS authentication.

### The Verification Flow:
1. Client completes identity authentication with Firebase SDK on the frontend.
2. Firebase returns a cryptographically signed Firebase ID token to the client.
3. Client submits the token to the backend: `POST /api/v1/auth/firebase-login`.
4. **Backend Token Verification:** The NestJS Auth Module validates the token using the `firebase-admin` SDK (verifying signature, expiration, and audience).
5. **PostgreSQL User Mapping:** The backend extracts the verified phone/email/UID, queries PostgreSQL, and maps it to an internal `user_id`. If the user is new, an authoritative user record is created in PostgreSQL.
6. **Backend Session Issuance:** The backend generates its own authoritative session, issuing short-lived JWT access tokens and rotating refresh tokens via `HttpOnly` cookies.
7. **Zero Authorization Bypass:** The client CANNOT use a Firebase ID token to interact with AuricVista domain endpoints. All subsequent API calls require the backend's authoritative session.

## 7.3 Firebase Cloud Messaging (FCM)
FCM is the transport channel for web and mobile push notifications:
- The backend Notification Service formats the message payload.
- It calls FCM via the Firebase Admin SDK.
- FCM handles delivery to Android, iOS, and Web clients.
- FCM stores NO business state; message history and read receipts reside in PostgreSQL.

## 7.4 Strict Prohibition on Duplicate Business State
To prevent state synchronization nightmares, the following boundaries are absolute:
- **NO Firebase Booking Database:** Bookings exist ONLY in PostgreSQL.
- **NO Firestore Wallet:** Expenses and splits exist ONLY in PostgreSQL.
- **NO Firebase Property Inventory:** Availability exists ONLY in PostgreSQL.
- **NO Firebase KYC Store:** Identity verification metadata exists ONLY in PostgreSQL.
- **Firebase Realtime Database / Firestore [DEFERRED IN V1]:** Not used for business state or messaging. Live application state is owned strictly by NestJS WebSockets + Redis Pub/Sub. No client shall connect to Firebase Realtime Database.

---

# 8. CLOUDFLARE EDGE & SECURITY ARCHITECTURE

## 8.1 Edge Defense Architecture
Cloudflare serves as the edge proxy in front of the AWS Application Load Balancer:

```text
User / Browser / Mobile App
            │
            ▼
┌────────────────────────────────────────────────────────┐
│                    CLOUDFLARE EDGE                     │
│  • Anycast DNS & Edge TLS 1.3 Termination              │
│  • Web Application Firewall (WAF — OWASP Core Rules)   │
│  • DDoS Mitigation (L3/L4/L7 volumetric scrubbing)     │
│  • Bot Management (Mitigating automated scrapers)      │
│  • Edge Rate Limiting (Throttling abusive IP bursts)   │
│  • Static Asset CDN Caching (Images, JS, CSS)          │
└───────────────────────────┬────────────────────────────┘
                            │ Authenticated Origin Pull
                            ▼
┌────────────────────────────────────────────────────────┐
│              AWS APPLICATION LOAD BALANCER             │
│  (Accepts traffic ONLY from Cloudflare IP ranges)      │
└────────────────────────────────────────────────────────┘
```

## 8.2 Strict Edge Caching Boundary
Cloudflare CDN caching is strictly segmented into safe public content versus zero-cache private data:

| Content Category | Cloudflare Edge Caching Policy | HTTP Headers Enforced |
| :--- | :--- | :--- |
| **Static Frontend Assets** | **CACHED AT EDGE** (1 year) | `Cache-Control: public, max-age=31536000, immutable` |
| **Public Destination Media** | **CACHED AT EDGE** (30 days) | `Cache-Control: public, max-age=2592000, stale-while-revalidate=86400` |
| **Public Stay / Tour Catalog** | **CACHED AT EDGE** (5 minutes) | `Cache-Control: public, max-age=300, stale-while-revalidate=60` |
| **Authenticated API Calls** | **NEVER CACHED [STRICT]** | `Cache-Control: private, no-store, no-cache, must-revalidate` |
| **Live Room Inventory & Rates** | **NEVER CACHED [STRICT]** | `Cache-Control: private, no-store, no-cache, must-revalidate` |
| **Booking & Payment States** | **NEVER CACHED [STRICT]** | `Cache-Control: private, no-store, no-cache, must-revalidate` |
| **KYC Documents & Verification**| **NEVER CACHED [STRICT]** | `Cache-Control: private, no-store, no-cache, must-revalidate` |
| **Trip Wallet & Expenses** | **NEVER CACHED [STRICT]** | `Cache-Control: private, no-store, no-cache, must-revalidate` |
| **Safety & SOS Dispatches** | **NEVER CACHED [STRICT]** | `Cache-Control: private, no-store, no-cache, must-revalidate` |
| **Admin & Moderation Data** | **NEVER CACHED [STRICT]** | `Cache-Control: private, no-store, no-cache, must-revalidate` |

---

# 9. GOOGLE MAPS PLATFORM & GEOGRAPHIC SERVICES ARCHITECTURE

## 9.1 Geographic Service Mapping
AuricVista integrates Google Maps Platform APIs for spatial intelligence, destination discovery, and itinerary routing:

```text
┌───────────────────────────┬─────────────────────────────────────────────────────────────┐
│ Google Geographic Service │ Specific AuricVista Product Responsibility                  │
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

## 9.2 Backend Integration Boundary & Key Security
1. **No Sensitive Keys on Client:** Web map rendering uses a public client API key strictly restricted in Google Cloud Console by **HTTP Referrer** (`https://auricvista.com/*`) and API scope (restricted to Maps JavaScript SDK only).
2. **Backend Proxying for Server APIs:** Distance Matrix, Routes optimization, and server Geocoding requests must route through the NestJS backend using a secure, server-side API key stored in AWS Secrets Manager.
3. **Caching Compliance:** Route geometries, ETAs, and Geocoding results may be cached in Redis only for the durations permitted by Google's Terms of Service (e.g. up to 30 days for intermediate geocodes; real-time ETAs must remain ephemeral).
4. **Authoritative Distance Calculation:** The frontend cannot submit self-calculated travel distances or transfer rates. The backend recalculates distances via the Routes API to determine chauffeur and transfer pricing.

---

# 10. SYSTEM RESPONSIBILITY & SOURCE-OF-TRUTH MATRIX

```text
┌───────────────────────────┬───────────────────────────────────────────┬─────────────────────────┐
│ System / Component        │ Primary Architectural Responsibility      │ Source of Truth?        │
├───────────────────────────┼───────────────────────────────────────────┼─────────────────────────┤
│ **AWS RDS PostgreSQL**    │ All core business state, transactions,    │ **YES (AUTHORITATIVE)** │
│                           │ bookings, inventory, wallets, users, SOS  │                         │
│ **Amazon S3**             │ Media files, property photos, documents   │ **YES (Object Assets)** │
│ **Redis (ElastiCache)**   │ Session cache, rate limits, queues, locks │ **NO (Ephemeral)**      │
│ **Firebase Auth**         │ Social/phone identity provider            │ **Identity Provider**   │
│ **Firebase FCM**          │ Mobile/web push notification delivery     │ **NO (Transport)**      │
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

# 11. SYSTEM RESPONSIBILITY BOUNDARIES

```text
┌────────────────────────────┐
│      AURIC BACKEND         │
│  Authoritative State       │
│  Validates Business Rules  │
│  Enforces Policies         │
│  Persists Core Records     │
└─────────────┬──────────────┘
              │
       Domain Events (Outbox)
              │
              ▼
┌────────────────────────────┐
│      AUTOMATION (n8n)      │
│  Orchestrates Workflows    │
│  Calls External APIs       │
│  Dispatches Notifications  │
│  Reacts to State Changes   │
└─────────────┬──────────────┘
              │
        Tool Requests
              ▼
┌────────────────────────────┐
│         AI LAYER           │
│  Synthesizes Insights      │
│  Understands User Intent   │
│  Generates Itineraries     │
│  Requests Bounded Tools    │
└────────────────────────────┘
```

---

# 12. DOMAIN ARCHITECTURE

The modular monolith is partitioned into clean, cohesive domains:
1. **Identity & Authentication Domain:** Registration, sessions, tokens, MFA.
2. **User & Profile Domain:** Profiles, traveler preferences, loyalty tiers.
3. **KYC & Trust Domain:** Identity documents, verification status, trust scoring.
4. **Property & Stay Domain:** Stays, homestays, hotels, PGs, rentals, amenities.
5. **Inventory & Availability Domain:** Room calendars, locks, capacity management.
6. **Booking Domain:** Reservations, state machines, guest passes, vouchers.
7. **Payment Domain:** Orders, gateway webhooks, captures, refund policies.
8. **Tourism & Destination Domain:** Curated guides, places of interest, culture.
9. **Trip & Itinerary Domain:** Multi-day itineraries, activities, collaborative planning.
10. **Group & Community Domain:** Travel groups, chat permissions, voting.
11. **Matching & Social Domain:** Travel buddy discovery, flatmates, swipe state.
12. **Chat & Communication Domain:** 1-on-1 and group messaging, realtime delivery.
13. **Wallet & Expense Domain:** Virtual trip expenses, contribution ledger, splits.
14. **Search & Intelligence Domain:** Geographic queries, filters, AI search.
15. **Central AI Gateway Domain:** Context assembly, prompt routing, tool mediation.
16. **Safety & SOS Domain:** Deterministic emergency dispatch, incident tracking.
17. **Notification Domain:** Push, SMS, WhatsApp, Email delivery coordination.
18. **Admin & Operations Domain:** Internal consoles, pricing overrides, audit logs.

---

# 13. IDENTITY, AUTHENTICATION & SESSION LIFECYCLE

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION LIFECYCLE (NestJS + Redis)                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Registration: Email / Phone / Password / Social via Firebase Auth                   │
│ 2. Credentials Verified → Session Created in PostgreSQL (`sessions` table)             │
│ 3. Short-lived Access Token (JWT, 15m) + Rotating Refresh Token (7d) Issued           │
│ 4. Tokens Delivered via HttpOnly, Secure, SameSite=Strict Cookies                      │
│ 5. Refresh Endpoint (`POST /auth/refresh`) Rotates Refresh Token Family                │
│ 6. Token Reuse Detected → Instant Revocation of Entire Token Family (Anti-Theft)       │
│ 7. Logout / Logout-All → Immediate Database Revocation & Redis Blacklisting            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

## 13.1 Authentication Endpoints Contract
* `POST /api/v1/auth/register`: Create new traveler or partner account.
* `POST /api/v1/auth/login`: Authenticate with email/password; returns session cookies.
* `POST /api/v1/auth/request-otp`: Request 6-digit cryptographic phone/email OTP (rate-limited).
* `POST /api/v1/auth/verify-otp`: Validate OTP and authenticate session.
* `POST /api/v1/auth/firebase-login`: Exchange verified Firebase ID token for Auric session.
* `POST /api/v1/auth/refresh`: Exchange current refresh token for a new token pair.
* `POST /api/v1/auth/logout`: Revoke current active session and invalidate refresh token.
* `POST /api/v1/auth/logout-all`: Invalidate all active sessions for the user identity.
* `POST /api/v1/auth/forgot-password`: Dispatch password reset link (uniform timing/message).
* `POST /api/v1/auth/reset-password`: Update password and revoke all existing sessions.
* `POST /api/v1/auth/verify-email`: Confirm email ownership via secure token.
* `POST /api/v1/auth/verify-phone`: Confirm mobile number ownership via SMS OTP.
* `GET /api/v1/auth/sessions`: List active devices/sessions for the authenticated user.
* `DELETE /api/v1/auth/sessions/:sessionId`: Remotely revoke a specific active session.

## 13.2 Real Backend Session State in PostgreSQL
Session state is permanently tracked in the `sessions` table:

```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_id VARCHAR(128) NOT NULL,
    refresh_token_family UUID NOT NULL,
    current_token_hash VARCHAR(64) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    revocation_reason VARCHAR(64)
);
CREATE INDEX idx_user_sessions_lookup ON user_sessions(user_id, is_revoked);
CREATE INDEX idx_user_sessions_family ON user_sessions(refresh_token_family);
```

## 13.3 Token Security & Cookie Standard
* **Access Tokens:** Short-lived JWTs ($15\text{ minutes}$ expiry) signed via RS256 with key rotation support (`kid`).
* **Refresh Tokens:** Cryptographically random 256-bit tokens hashed (SHA-256) at rest.
* **Token Family Tracking:** Each login creates a `refresh_token_family`. Every refresh exchange issues a new token and updates `current_token_hash`. If an old token is presented, the system detects **token theft/replay**, immediately revokes all sessions in that family, and blacklists active JWTs in Redis.
* **Delivery:** Delivered strictly via `HttpOnly`, `Secure`, `SameSite=Strict`, `Path=/api` cookies. JavaScript cannot access tokens via `document.cookie`. Plaintext `localStorage` storage is prohibited.

---

# 14. AUTHORIZATION, RBAC & RESOURCE INTEGRITY

## 14.1 Nine-Role Access Control Matrix
Aligned strictly with `security.md`:

```text
┌───────────────────┬────────────────────────────────────────────────────────────────────┐
│ Role              │ Permitted Capabilities                                             │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ GUEST             │ Public discovery, view stays/packages, read reviews.               │
│ VERIFIED_USER     │ Book stays, create trips, use AI companion, join groups, SOS.      │
│ PROPERTY_PARTNER  │ Manage owned properties, manage room inventory, view reservations. │
│ SUPPORT_AGENT     │ View assigned user bookings, issue policy-bounded refunds ($< ₹5k).│
│ SAFETY_OPERATOR   │ Monitor live SOS console, coordinate emergency responder dispatch. │
│ TRUST_MODERATOR   │ Review flagged community posts, evaluate KYC compliance exceptions.│
│ PRICING_MANAGER   │ Adjust platform margin markups, approve host baseline payout rates.│
│ CONTENT_MANAGER   │ Manage destination guides, editorial stories, homepage banners.   │
│ SUPER_ADMIN       │ Global platform configuration, role assignments, system audits.   │
└───────────────────┴────────────────────────────────────────────────────────────────────┘
```

## 14.2 Broken Object-Level Authorization (BOLA / IDOR) Defense
Every endpoint accepting a resource identifier (`booking_id`, `trip_id`, `story_id`, `group_id`) must verify server-side that `session.userId` owns the resource or has an explicit collaborative role:

```typescript
// Authoritative NestJS Resource Ownership Guard Pattern
@Injectable()
export class TripOwnershipGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const tripId = request.params.tripId;

    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');

    const isOwner = trip.creatorId === user.id;
    const isCollaborator = await this.prisma.tripMember.findFirst({
      where: { tripId, userId: user.id, canEdit: true }
    });

    if (!isOwner && !isCollaborator && user.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException('You do not have permission to modify this trip.');
    }
    return true;
  }
}
```

## 14.3 Mass Assignment Defense
All NestJS incoming payloads must pass through global `ValidationPipe` with:
```typescript
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
})
```
Clients cannot inject protected administrative fields (`role`, `isVerified`, `discountAmount`, `payoutRate`).

---

# 15. USER & PROFILE DOMAIN

Authoritative tables:
- `users`: Core credentials, verified email, verified phone, role, status.
- `user_profiles`: Display name, bio, avatar URL, tier, social badges.
- `user_preferences`: Travel styles, dietary preferences, budget habits, currency.
- `user_devices`: FCM push tokens, app version, last seen timestamp.

---

# 16. USER BRAIN / PERSONALIZATION DATA

The "User Brain" stores structured behavioral intent and long-term travel preferences to personalize search, itineraries, and AI suggestions:
- Stored in PostgreSQL as structured metadata and optional `pgvector` preference embeddings.
- **Privacy Standard:** Travelers may view, edit, or clear their personalization memory at any time (`design.md:149`).
- AI personalization never overrides user-selected discovery filters.

---

# 17. KYC & TRUST MODULE

## 17.1 Verification Architecture
KYC verifies traveler authenticity for private villa rentals, PG co-living, and safety-conscious group trips:
```text
User Submits Document
        ↓
POST /kyc/upload (Presigned S3 PUT URL)
        ↓
Upload to Private Quarantine S3 Bucket (KMS AES-256-GCM)
        ↓
Backend Triggers KYC Provider (HyperVerge / Veriff)
        ↓
Provider Webhook Callback (Verified with Signature)
        ↓
Backend Updates PostgreSQL `kyc_verifications` Status
        ↓
Trust Engine Recomputes User Trust Score
```

## 17.2 KYC Document Security & Data Minimization
1. **Zero Raw Cleartext Aadhaar / PAN Storage:** Raw 12-digit Aadhaar numbers are NEVER stored. The backend stores only the last 4 masked digits (`XXXXXXXX1234`) and provider reference tokens.
2. **KMS Envelope Encryption:** Documents reside in a private S3 bucket encrypted with AWS KMS customer-managed keys.
3. **Ephemeral Staff Access:** Trust & Safety staff review documents exclusively via short-lived presigned URLs ($TTL \le 5\text{ minutes}$).
4. **Access Audit Logging:** Every view of an identity document generates an immutable audit record containing staff ID, purpose, and timestamp.
5. **Statutory Retention Scrubbing:** Document binaries are permanently deleted after the legally mandated verification period, retaining only the verified metadata.

---

# 18. TRUST ENGINE

The Trust Engine generates an internal confidence score ($0 - 100$) based on:
- Government ID verification (+40),
- Verified phone number (+20),
- Verified corporate/personal email (+15),
- Successful completed bookings (+15),
- Positive community reflections and reviews (+10).
The trust score gates booking of high-end private coffee estates and solo traveler matching.

---

# 19. PROPERTY & STAY DOMAIN

The Property Domain models all accommodation types across Karnataka and India:
- **Hotels & Luxury Resorts:** (e.g. The Tamara Coorg, The Serai Chikmagalur).
- **Homestays & Coffee Estates:** Heritage planter bungalows with host baselines.
- **PGs & Co-Living Spaces:** Monthly stay models for digital nomads and students.
- **Rentals & Villas:** Entire private sanctuaries.

Core tables:
- `properties`: Title, slug, description, property_type, coordinates, address, host_id, rules.
- `property_rooms`: Room category, capacity, bed configuration, base_price.
- `property_amenities`: Structured tags (Wi-Fi, Pool, Coffee Plantation Tour, EV Charger).
- `property_contracts`: Host baseline locked payout rate, platform commission tier.

---

# 20. PROPERTY STATE MACHINE

```text
DRAFT ──▶ PENDING_VERIFICATION ──▶ VERIFIED ──▶ ACTIVE ──▶ SUSPENDED / ARCHIVED
```
Only properties in the `ACTIVE` state appear in public search and accept bookings.

---

# 21. INVENTORY & AVAILABILITY

Availability is managed deterministically via room calendar units:
- `inventory_units`: `property_id`, `room_type_id`, `date`, `total_units`, `booked_units`, `locked_units`, `price_override`.
- Availability query: `available = total_units - (booked_units + locked_units)`.
- **Pre-Booking Temporary Hold:** During checkout (Step 1 to 5), the system acquires an ephemeral 15-minute lock on inventory stored in Redis and synchronized in PostgreSQL to prevent double-booking.

---

# 22. BOOKING DOMAIN

## 22.1 Booking State Machine
```text
INITIATED ──▶ HOLD_ACQUIRED ──▶ PAYMENT_PENDING ──▶ CONFIRMED ──▶ COMPLETED
     │               │                    │
     ▼               ▼                    ▼
   EXPIRED        RELEASED            CANCELLED / REFUNDED
```

## 22.2 Core Booking Tables
- `bookings`: Unique `booking_id` (`AV-RES-XXXXXX`), `user_id`, `property_id`, `check_in`, `check_out`, `guests_count`, `currency`, `base_amount`, `discount_amount`, `tax_amount`, `grand_total`, `status`.
- `booking_vouchers`: Cryptographic QR/voucher code (`AV-CRG-XXXXX`), pass metadata, entry instructions.

---

# 23. BOOKING CONSISTENCY & ROW-LEVEL LOCKING

## 23.1 Concurrency & ACID Integrity
To prevent race conditions where two travelers simultaneously book the last remaining coffee villa:
1. The checkout finalization initiates a PostgreSQL transaction with row-level locks:
   ```sql
   SELECT * FROM inventory_units 
   WHERE room_type_id = $1 AND date BETWEEN $2 AND $3
   FOR UPDATE;
   ```
2. The transaction verifies `booked_units < total_units`.
3. It increments `booked_units` and writes the `booking` record atomically.
4. If unavailable, the transaction rolls back immediately with `ROOM_UNAVAILABLE`.

---

# 24. PAYMENT DOMAIN

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PAYMENT PROCESSING & WEBHOOK PIPELINE                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Client Requests Booking → Backend Validates Rates & Creates Razorpay Order          │
│ 2. Backend Returns `order_id` → Client Opens Razorpay Checkout Modal                   │
│ 3. Traveler Completes Payment → Razorpay Dispatches Webhook to Backend                 │
│ 4. Backend Verifies Cryptographic Signature (`X-Razorpay-Signature`) on Raw Buffer     │
│ 5. Event Deduplication Checked against `payment_webhook_events` Table                  │
│ 6. Atomic Transaction: Payment Marked Captured → Booking Marked Confirmed             │
│ 7. Outbox Domain Event Dispatched: `booking.confirmed`                                │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

## 24.1 Never Trust Frontend Payment Success
Frontend callbacks are treated purely as UI transitions. A booking is NEVER confirmed until the backend validates the payment gateway webhook signature against the raw payload buffer.

## 24.2 Single-Use User-Bound Coupon Engine
Promotional discounts are cryptographically bound to specific `user_id`s and redeemed atomically:
```sql
UPDATE discount_coupons 
SET is_used = TRUE, used_at = NOW(), used_booking_id = $1
WHERE code = $2 AND assigned_user_id = $3 AND is_used = FALSE AND expires_at > NOW();
```
Concurrent double-spend attempts return HTTP 409 `COUPON_ALREADY_REDEEMED`.

---

# 25. TOURISM & DESTINATION DOMAIN

Authoritative tables:
- `destinations`: Identifier (`coorg`, `hampi`, `kabini`), title, state, coordinates, overview, cinematic images, best time to visit, weather profiles.
- `attractions`: Destination attractions, operating hours, ticket costs, cultural tags.
- `curated_itineraries`: Pre-packaged luxury circuits and heritage routes.

---

# 26. TRIP DOMAIN

Trips organize personal or group travel plans:
- `trips`: `id`, `creator_id`, `title`, `destination_id`, `start_date`, `end_date`, `budget_target`, `estimated_total`, `is_group`, `status`.
- `trip_members`: `trip_id`, `user_id`, `role` (`OWNER`, `EDITOR`, `VIEWER`), `joined_at`.

---

# 27. ITINERARY DOMAIN

- `itinerary_days`: `id`, `trip_id`, `day_number`, `date`, `title`, `summary`.
- `itinerary_activities`: `id`, `day_id`, `time_slot` (`Morning`, `Afternoon`, `Evening`), `title`, `cost`, `category` (`Adventure`, `Culture`, `Dining`), `location_coordinates`.

---

# 28. COLLABORATIVE TRIP PLANNING

When multiple travelers plan a trip:
- Changes generate domain events (`itinerary.activity_added`).
- WebSockets broadcast updates to connected collaborators.
- Voting: `activity_votes` records thumbs-up/down from group members before finalizing an activity.

---

# 29. GROUP & COMMUNITY DOMAIN

- `groups`: Community travel cohorts (e.g. "Karnataka Heritage Explorers", "Solo Women Trekkers").
- `group_members`: `group_id`, `user_id`, `status` (`PENDING`, `APPROVED`, `MUTED`, `BANNED`).
- `group_posts`: Community updates, trip proposals, shared photos.

---

# 30. MATCHING & SOCIAL DOMAIN

Travel matching connects compatible travelers:
- `swipes`: `swiper_id`, `target_id`, `direction` (`LIKE`, `PASS`), `intent` (`TRAVEL_BUDDY`, `FLATMATE`), `created_at`.
- `matches`: Bilateral mutual likes (`user_a_id`, `user_b_id`, `match_score`, `created_at`).
- **Compatibility Engine:** Evaluates travel pace, budget alignment, dietary choices, and destination interests to compute match percentages.

---

# 31. CHAT & REALTIME COMMUNICATION DOMAIN

- `conversations`: 1-on-1 matches or group trip chats.
- `messages`: `conversation_id`, `sender_id`, `content`, `media_url`, `created_at`, `is_read`.
- **Realtime Gateway:** NestJS WebSocket Gateway (Socket.io) backed by Redis Pub/Sub for multi-node horizontal scaling.

---

# 32. WALLET & EXPENSE DOMAIN

> [!IMPORTANT]
> **Virtual Tracking Ledger Only:** AuricVista's wallet is a virtual expense contribution and split tracking system, NOT a licensed stored-value PPI/UPI wallet. It tracks shared expenses, split contributions, and settlement balances among travel group members.

- `trip_expenses`: `trip_id`, `payer_id`, `amount`, `currency`, `category`, `split_method` (`EQUAL`, `PERCENTAGE`, `EXACT`).
- `expense_splits`: `expense_id`, `user_id`, `owed_amount`, `is_settled`.
- **Double-Entry Ledger:** All balance calculations are derived from verified transaction records. Direct balance updates (`UPDATE wallet SET balance = ...`) are prohibited.

---

# 33. SEARCH & INTELLIGENCE DOMAIN

Multi-entity search across destinations, stays, experiences, packages, and flights:
- **Spatial Queries:** Uses PostgreSQL `PostGIS` / earthdistance for radius searches ("Stays within 10km of Om Beach").
- **Keyword Search:** Trigram indexes (`pg_trgm`) for typo-tolerant fast autocomplete.
- **AI Semantic Search:** `pgvector` embeddings for unstructured queries ("peaceful coffee plantation with private pool").

---

# 34. CENTRALIZED AI GATEWAY ARCHITECTURE

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CENTRALIZED AI GATEWAY ARCHITECTURE                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Client Request → NestJS Backend Gateway (`POST /api/v1/ai/companion`)               │
│ 2. Pre-Retrieval User Authentication & Tenant Boundary Assertion                       │
│ 3. Minimum-Context Assembly (User preferences, active trip summary; PII stripped)      │
│ 4. Vector Metadata Retrieval via pgvector (Pre-filtered by authorization)              │
│ 5. Model Inference with Rigid XML Delimiters (Prompt injection defense)                │
│ 6. Model Emits Typed Structured Function Call (Zod validated)                          │
│ 7. Backend Tool Dispatcher Verifies Resource Ownership & Executes Mutation             │
│ 8. High-Impact Mutations (Bookings, Payments) Require Explicit Out-of-Band User Action │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

## 34.1 The LLM is NOT a Security Boundary
The AI Gateway mediates all LLM interactions. The model cannot execute arbitrary code, query the database directly, or authorize transactions.

## 34.2 Typed AI Tools Contract
Tools exposed to the model must define:
- `tool_name`: Unique string identifier (e.g. `tool_optimize_trip_budget`).
- `input_schema`: Strict Zod schema.
- `is_mutation`: Boolean.
- `requires_confirmation`: Boolean (Mandatory for booking, payment, cancellation).
- `rate_limit`: Per-user hourly budget limit.

---

# 35. RAG ARCHITECTURE & RETRIEVAL AUTHORIZATION

1. **Pre-Query Authorization Filtering:** Vector searches in `pgvector` must filter by `owner_id` or `visibility = 'PUBLIC'` *at query time*.
2. **Real-Time Deletion Propagation:** When a property, review, or travel story is deleted, its embeddings are purged immediately.
3. **Live Data Must Be Queried Live:** Room availability, prices, active booking status, and SOS state must NEVER be fetched from vector indexes. They are queried live from PostgreSQL.

---

# 36. SAFETY & DETERMINISTIC SOS DOMAIN

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        DETERMINISTIC SOS EMERGENCY PIPELINE                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ZERO AI INTERVENTION: 100% deterministic code. No LLM emergency evaluation.         │
│ 2. DEDICATED RATE LIMITING: 5 dispatches / 5 minutes per device; 10s deduplication.    │
│ 3. IDEMPOTENCY KEYING: Safe mobile network retries without spawning duplicate cases.   │
│ 4. GPS VELOCITY SANITY: Validates coordinates against plausible travel speeds.         │
│ 5. P0 WORKER QUEUE: Highest-priority worker execution pool.                            │
│ 6. PERMANENT LEGAL AUDIT: Immutable, cryptographically signed log of all dispatches.  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Core Tables:** `sos_incidents`, `emergency_contacts`, `safety_checkins`, `incident_actions`.
- **No Continuous Tracking in V1:** Location capture occurs strictly on-demand during check-ins and active SOS triggers. Background battery-draining continuous GPS tracking is omitted in V1.

---

# 37. NOTIFICATION DOMAIN & CHANNELS

The Notification Service delivers updates across multiple channels:
- **Push Notifications:** Firebase Cloud Messaging (FCM).
- **Email:** Amazon Simple Email Service (SES) / SendGrid.
- **SMS:** Twilio / Gupshup.
- **WhatsApp:** WhatsApp Cloud API (Transactional booking and safety passes only).

**The Golden Rule:** Notifications react to domain events; they never own or modify business state.

---

# 38. EVENT ARCHITECTURE & TRANSACTIONAL OUTBOX PATTERN

To guarantee that state mutations and event notifications remain 100% consistent without distributed transaction failures, AuricVista implements the **Transactional Outbox Pattern**:

```text
PostgreSQL Transaction BEGIN
  ├── 1. Insert Booking Record (`bookings` table)
  ├── 2. Update Room Inventory (`inventory_units` table)
  └── 3. Insert Domain Event (`outbox_events` table)
PostgreSQL Transaction COMMIT

                      │
                      ▼ Asynchronous Outbox Relay (Polling / Debezium)
             Event Publisher
                      │
                      ▼
         Redis BullMQ (Primary Queue) ──▶ DLQ: dlq_events
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
      n8n Webhook         Firebase FCM
```

---

# 39. AUTOMATION (n8n) INTEGRATION & SECURITY BOUNDARIES

## 39.1 The Authoritative Boundary Law
$$\text{Frontend} \longrightarrow \text{Backend} \longrightarrow \text{DB} \longrightarrow \text{Outbox Event} \longrightarrow \text{n8n} \longrightarrow \text{External API} \longrightarrow \text{Callback} \longrightarrow \text{Backend}$$

n8n is an orchestration tool. Under NO circumstances shall n8n connect directly to PostgreSQL or mutate business tables without backend validation.

## 39.2 Webhook Security & Replay Defense
- **HMAC-SHA256 Signatures:** Webhooks sent to n8n carry `X-Auric-Signature` calculated from the shared secret and raw payload.
- **Timestamp Validation:** Requests older than 300 seconds ($5\text{ minutes}$) are rejected.
- **Idempotency:** Every payload contains a unique `event_id`. Duplicate event deliveries terminate with HTTP 200 without executing side effects.
- **Dead-Letter Queues:** Repeatedly failing workflows are shunted to a DLQ for operator investigation.

---

# 40. DATABASE DESIGN & PRISMA DATA MODELS

```prisma
// Core Prisma Schema Architecture (Extract)
datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [pgvector(map: "vector"), postgis, uuid_ossp]
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

enum Role {
  GUEST
  VERIFIED_USER
  PROPERTY_PARTNER
  SUPPORT_AGENT
  SAFETY_OPERATOR
  TRUST_MODERATOR
  PRICING_MANAGER
  CONTENT_MANAGER
  SUPER_ADMIN
}

enum BookingStatus {
  INITIATED
  HOLD_ACQUIRED
  PAYMENT_PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  REFUNDED
}

model User {
  id            String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email         String?        @unique
  phone         String?        @unique
  passwordHash  String?
  role          Role           @default(VERIFIED_USER)
  isVerified    Boolean        @default(false)
  trustScore    Int            @default(20)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  profile       UserProfile?
  sessions      UserSession[]
  bookings      Booking[]
  trips         TripMember[]
  createdTrips  Trip[]
  reviews       Review[]
}

model Booking {
  id              String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  bookingNumber   String        @unique // e.g. AV-RES-829102
  userId          String        @db.Uuid
  propertyId      String        @db.Uuid
  checkIn         DateTime      @db.Date
  checkOut        DateTime      @db.Date
  guestsCount     Int
  totalAmount     Decimal       @db.Decimal(10, 2)
  status          BookingStatus @default(INITIATED)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  user            User          @relation(fields: [userId], references: [id])
  voucher         BookingVoucher?
}

model OutboxEvent {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  aggregateId String    @db.Uuid
  eventType   String    // e.g. booking.confirmed, user.registered
  payload     Json
  createdAt   DateTime  @default(now())
  processedAt DateTime?
  error       String?
}
```

---

# 41. CACHING STRATEGY & REDIS ARCHITECTURE

Redis (AWS ElastiCache) provides high-speed ephemeral operations:
1. **Rate Limiting:** Sliding-window counters for auth, search, AI, and emergency triggers.
2. **Session Revocation:** Fast in-memory token blacklist checking.
3. **Queue Infrastructure:** BullMQ backing for outbox relays and notifications.
4. **Cache Invalidation:** State mutations actively purge stale cache keys (e.g. `booking.confirmed` purges `stay:availability:{id}:{date}`).

---

# 42. FILE UPLOAD ARCHITECTURE & S3 SECURITY

```text
Client ──▶ POST /media/presigned-url ──▶ Backend Generates Signed S3 PUT URL (15m TTL)
Client ──▶ PUT Direct to S3 Quarantine Bucket
S3 Event ──▶ Async Media Processor (Magic-Byte Inspection + EXIF Stripping + AV Scan)
Verified Asset ──▶ Stored with Random UUID in Public CDN Bucket or Private KYC Vault
```
- **Magic-Byte Inspection:** Validates real binary signatures, rejecting disguised scripts.
- **EXIF Stripping:** Removes GPS coordinates and camera metadata from traveler photos.
- **UUID Filenames:** Replaces user filenames with `uuidv4.webp` to prevent path traversal.

---

# 43. OBSERVABILITY, TELEMETRY & AUDIT TRAILS

1. **Correlation IDs:** Every incoming HTTP request and WebSocket connection receives a `trace_id` and `correlation_id` propagated across backend services, database queries, outbox events, and AI calls.
2. **OpenTelemetry + CloudWatch:** Collects distributed traces, p95/p99 latencies, error counts, and database query durations.
3. **AI Telemetry:** Records prompt tokens, completion tokens, model latency, tool calls, and fallback triggers.
4. **Strict Redaction:** Telemetry filters strip passwords, OTPs, session tokens, full credit card numbers, and raw Aadhaar IDs before logging.

---

# 44. DEPLOYMENT ENVIRONMENTS & CI/CD PIPELINE

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               CI/CD & DEPLOYMENT STAGES                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Git Push / PR ──▶ GitHub Actions                                                    │
│ 2. Linting & Formatting Check (ESLint / Prettier)                                      │
│ 3. Static Type Checking (`tsc --noEmit`)                                               │
│ 4. Unit & Integration Tests (`jest --runInBand`)                                       │
│ 5. Automated Security Scan (TruffleHog secret scanning + Snyk dependency CVE scan)     │
│ 6. Docker Container Build (Pinned digest `node:20-alpine`)                             │
│ 7. Deploy to Staging (AWS ECS Fargate Staging Cluster)                                 │
│ 8. Automated E2E & Smoke Verification Suite                                            │
│ 9. Production Approval Gate ──▶ Blue/Green Deployment to Production ECS Cluster         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

Environments: `LOCAL`, `DEVELOPMENT`, `STAGING`, `PRODUCTION`. Production credentials never mix with development.

---

# 45. BACKUP & DISASTER RECOVERY

- **Automated Snapshots:** AWS RDS daily automated snapshots retained for 35 days.
- **Point-in-Time Recovery (PITR):** Continuous Write-Ahead Log (WAL) archiving to S3 enables restoration to any second within the retention window.
- **Offsite S3 Replication:** Private KYC documents and media are cross-region replicated (CRR) to a secondary AWS disaster recovery region.
- **RTO / RPO Targets:**
  - Recovery Time Objective (RTO): $< 2\text{ hours}$ for full database and application recovery.
  - Recovery Point Objective (RPO): $< 5\text{ minutes}$ of transactional data.

---

# 46. FRONTEND → BACKEND MAPPING MATRIX

| Frontend Action / View | Primary Backend Endpoint | Backend Domain Module |
| :--- | :--- | :--- |
| **User Sign In / Sign Up** | `POST /auth/login`, `POST /auth/register` | `AuthModule` |
| **OTP Verification** | `POST /auth/verify-otp` | `AuthModule` |
| **Profile & Preferences Update** | `PUT /users/profile`, `PUT /users/preferences` | `UserModule` |
| **KYC Document Submission** | `POST /kyc/upload-url`, `POST /kyc/submit` | `KycModule` |
| **Global Multi-Entity Search** | `GET /search?q={query}&category={cat}` | `SearchModule` |
| **View Stay / Room Inventory** | `GET /stays/{id}`, `GET /stays/{id}/availability` | `PropertyModule` |
| **Price Breakdown & Quote** | `POST /bookings/quote` | `BookingModule` |
| **Initiate Checkout Hold** | `POST /bookings/hold` | `BookingModule` |
| **Create Payment Order** | `POST /payments/create-order` | `PaymentModule` |
| **Payment Gateway Webhook** | `POST /payments/webhook/razorpay` | `PaymentModule` |
| **AI Travel Assistant Prompt** | `POST /ai/companion/chat` | `AiGatewayModule` |
| **Apply AI Itinerary Suggestion**| `POST /trips/{id}/activities` | `TripModule` |
| **Create Collaborative Trip** | `POST /trips` | `TripModule` |
| **Swipe Travel Buddy / Flatmate**| `POST /matching/swipe` | `MatchingModule` |
| **Realtime Chat Message** | `WSS /chat` (`sendMessage` event) | `ChatModule` |
| **Record Virtual Expense Split** | `POST /wallet/expenses` | `WalletModule` |
| **Trigger Emergency SOS** | `POST /safety/sos` (P0 high-priority queue) | `SafetyModule` |
| **Submit Verified Review** | `POST /reviews` | `ReviewModule` |

---

# 47. BACKEND ACCEPTANCE CRITERIA

Before promoting the AuricVista backend to production, the engineering team must satisfy the following acceptance criteria:
1. **Authoritative State:** 100% of booking, pricing, wallet, and user states are computed and persisted in PostgreSQL; the frontend never dictates prices or confirmations.
2. **Zero Client Secret Exposure:** Zero production API keys, service credentials, or database connection strings exist in frontend bundles or repository code.
3. **Session & Token Hardening:** JWT access tokens expire in 15 minutes; refresh token rotation enforces family reuse detection and instant session revocation.
4. **BOLA / IDOR Verification:** All entity endpoints verify that `session.userId` owns the requested resource or possesses administrative authorization.
5. **Deterministic SOS Pipeline:** SOS triggers dispatch within $< 500\text{ms}$ through P0 workers with 10-second duplicate suppression and zero AI dependency.
6. **AI Gateway Sandboxing:** AI tools are strictly typed, server-side validated, and require explicit out-of-band user confirmation for mutations.
7. **Transactional Outbox Integrity:** All asynchronous side-effects (n8n, emails, push) are dispatched via atomic outbox events without double-delivery.
8. **Disaster Recovery:** Automated RDS snapshots and WAL archiving verified with a successful staging point-in-time restoration test.

---

### Master Backend Technical Specification Summary
*This document serves as the supreme technical architecture specification for the AuricVista backend. All subsequent engineering tasks, database migrations, API controllers, and cloud deployments must strictly adhere to the standards, boundaries, and models defined herein.*
