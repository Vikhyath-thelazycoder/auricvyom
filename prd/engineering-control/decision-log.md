# AURICVISTA — ARCHITECTURAL DECISION REGISTER (ADR)
## Canonical Architectural Decision Register, Design Rationale, and System Invariants

> **Document Status:** Authoritative Architectural Decision Register (ADR)  
> **Target System:** AuricVista / AuricVyom (`Vikhyath-thelazycoder/auricvyom`)  
> **Control Plane Location:** `/prd/engineering-control/decision-log.md`  
> **Related Control Documents:**  
> - [agent-sop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-sop.md) (Engineering Constitution)  
> - [agent-loop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-loop.md) (Execution Lifecycle)  
> - [master-roadmap.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/master-roadmap.md) (Development Sequence)  
> - [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md) (Requirement Matrix)  

---

# 1. REGISTER SUMMARY & STATUS TAXONOMY

The Architectural Decision Register (ADR) captures all foundational technical decisions governing AuricVista. Every decision is evidence-backed, drawn directly from the approved PRD specifications (`prd/prd 2 backend.md`, `prd/prd 3 automation.md`, `prd/auricvista system flow.md`, `prd/prd1 frontend .md`, `prd/design.md`, and `security.md`).

Statuses:
- **`ACCEPTED`**: Firm architectural law; mandatory for all engineering implementations.
- **`PROPOSED`**: Under active architectural review; awaiting technical validation.
- **`SUPERSEDED`**: Replaced by a subsequent ADR.
- **`DEPRECATED`**: Explicitly prohibited as an architectural anti-pattern.
- **`NEEDS VALIDATION`**: Documented pattern requiring infrastructure or third-party verification.

```text
┌───────────┬────────────────────────────────────────────────────────┬──────────┬──────────────────────────┐
│ ADR-ID    │ Title                                                  │ Status   │ Implementation Status    │
├───────────┼────────────────────────────────────────────────────────┼──────────┼──────────────────────────┤
│ ADR-001   │ AWS Managed Infrastructure as Primary Cloud            │ ACCEPTED │ [SPECIFIED]              │
│ ADR-002   │ PostgreSQL Multi-AZ with pgvector & Aurora Path        │ ACCEPTED │ [SPECIFIED]              │
│ ADR-003   │ NestJS Modular Monolith over Microservices             │ ACCEPTED │ [SPECIFIED]              │
│ ADR-004   │ Prisma ORM for Data Access & Migrations                │ ACCEPTED │ [SPECIFIED]              │
│ ADR-005   │ AWS ElastiCache for Redis (Cache, Rate Limits, Queues) │ ACCEPTED │ [SPECIFIED]              │
│ ADR-006   │ Dual-Bucket S3 Architecture (Public Media vs Private)  │ ACCEPTED │ [SPECIFIED]              │
│ ADR-007   │ Cloudflare Edge (WAF, DDoS Mitigation, Anycast TLS)    │ ACCEPTED │ [SPECIFIED]              │
│ ADR-008   │ Firebase Auth with Backend Session Enforcement         │ ACCEPTED │ [PARTIALLY IMPLEMENTED]  │
│ ADR-009   │ Google Maps Platform Backend Proxying & Key Restrict   │ ACCEPTED │ [PARTIALLY IMPLEMENTED]  │
│ ADR-010   │ Transactional Outbox Pattern with Redis BullMQ Relay   │ ACCEPTED │ [SPECIFIED]              │
│ ADR-011   │ n8n As Non-Authoritative Orchestration Engine          │ ACCEPTED │ [SPECIFIED]              │
│ ADR-012   │ Centralized Backend AI Gateway with Bounded Tools      │ ACCEPTED │ [PARTIALLY IMPLEMENTED]  │
│ ADR-013   │ Prohibited AI Authority Over Financial/Safety Mutat.   │ ACCEPTED │ [SPECIFIED]              │
│ ADR-014   │ Domain-Filtered Hybrid RAG via pgvector                │ ACCEPTED │ [SPECIFIED]              │
│ ADR-015   │ Razorpay Webhook Authority & Idempotency Rails         │ ACCEPTED │ [SPECIFIED]              │
│ ADR-016   │ Concurrency: SELECT FOR UPDATE & 15-Minute Room Holds  │ ACCEPTED │ [SPECIFIED]              │
│ ADR-017   │ Virtual Expense & Bill-Splitting Ledger (Non-PPI)      │ ACCEPTED │ [SPECIFIED]              │
│ ADR-018   │ Zero-Exposure KYC Privacy & Ephemeral Presigned URLs   │ ACCEPTED │ [SPECIFIED]              │
│ ADR-019   │ Deterministic Rule-First SOS Pipeline (Zero AI)        │ ACCEPTED │ [SPECIFIED]              │
│ ADR-020   │ On-Demand Location Pins (Zero Continuous GPS)          │ ACCEPTED │ [SPECIFIED]              │
│ ADR-021   │ Phased Frontend Evolution (Vanilla SPA to React/TS)    │ ACCEPTED │ [PARTIALLY IMPLEMENTED]  │
│ ADR-022   │ Client-Side Defense (DOMPurify, Strict CSP, No PII)    │ ACCEPTED │ [REQUIRES IMPLEMENTATION]│
└───────────┴────────────────────────────────────────────────────────┴──────────┴──────────────────────────┘
```

---

# 2. ARCHITECTURAL DECISION RECORDS (ADR-001 THROUGH ADR-022)

---

### ADR-001: AWS Managed Infrastructure as Primary Cloud Provider
- **Status:** `ACCEPTED`
- **Baseline Version:** System Flow v2.1, Backend PRD v2.1
- **Context:** AuricVista requires high availability, compliance with Indian data residency norms, low-latency relational persistence, and managed scaling for containerized workloads.
- **Decision:** Select Amazon Web Services (AWS) as the primary cloud provider (specifically AWS ECS Fargate, RDS PostgreSQL Multi-AZ, ElastiCache Redis, S3, Secrets Manager, and CloudWatch in the `ap-south-1` Mumbai region).
- **Why (Rationale):** Comprehensive managed service ecosystem; native Multi-AZ replication; high security compliance; zero infrastructure maintenance overhead via serverless containers (ECS Fargate).
- **Alternatives Considered:** Google Cloud Platform (GCP), Self-hosted bare metal.
- **Consequences:** Vendor dependency on AWS managed primitives; cost governance required on egress.
- **Security Impact:** IAM least-privilege roles, VPC private subnets for persistence, KMS encryption at rest.
- **Affected Components:** Entire infrastructure plane.
- **Implementation Status:** `[SPECIFIED]` (Deployment pending Phase 1).

---

### ADR-002: Relational Persistence via AWS RDS PostgreSQL Multi-AZ with pgvector & Aurora Path
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §3, System Flow v2.1 §4
- **Context:** Core business entities (bookings, room inventory, payments, user identities) demand strict ACID guarantees and foreign key referential integrity. In addition, AI companion features require vector similarity search.
- **Decision:** Use AWS RDS for PostgreSQL 16+ Multi-AZ with the `pgvector` extension for V1. Establish an architectural migration path to Amazon Aurora PostgreSQL Serverless v2 for post-launch scaling.
- **Why (Rationale):** Uncompromising transactional integrity for inventory and financial ledgers; native vector search eliminates the operational overhead of managing a separate vector database (e.g. Pinecone/Milvus).
- **Alternatives Considered:** MongoDB (rejected due to weak multi-document ACID guarantees in early scaling), DynamoDB (rejected due to complex relational query needs).
- **Consequences:** Demands diligent connection pooling (via Prisma / PgBouncer) and index optimization.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-003: NestJS Modular Monolith Architecture over Microservices
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §2, System Flow v2.1 §2
- **Context:** AuricVista comprises 18 domain areas (Auth, Properties, Bookings, Payments, Trips, Social Matching, Chat, Safety). Premature microservice decomposition introduces severe distributed transaction complexity, network latency, and operational fragility.
- **Decision:** Structure the backend as a **Modular Monolith** using TypeScript + Node.js + NestJS. Enforce strict domain module boundaries with in-process dependency injection and event-driven decoupled interfaces.
- **Why (Rationale):** Zero network latency between modules; single atomic deployments; simple shared database transactions; seamless future extraction of high-scale modules if needed.
- **Alternatives Considered:** Distributed Microservices with gRPC mesh (rejected as premature and complex).
- **Consequences:** Developers must maintain discipline against circular module dependencies.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-004: Prisma ORM for Data Access, Type Safety & Schema Migrations
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §3
- **Context:** Complex relational models require robust schema synchronization, compile-time type safety across TypeScript layers, and repeatable database migration tracking.
- **Decision:** Adopt Prisma ORM as the sole authoritative data access layer in the NestJS application.
- **Why (Rationale):** Auto-generated end-to-end TypeScript types matching database schemas; declarative schema syntax (`schema.prisma`); migration tracking and rollback safety.
- **Alternatives Considered:** TypeORM (erratic migration handling), Drizzle ORM (less mature ecosystem for large modular architectures).
- **Consequences:** Raw SQL optimization occasionally required for complex CTE spatial queries.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-005: AWS ElastiCache for Redis (Caching, Rate Limiting & Queue Backbone)
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §3, `security.md` §3
- **Context:** High-throughput temporary data (user sessions, 15-minute room hold locks, API rate limits, BullMQ event queues) must be decoupled from the primary relational database.
- **Decision:** Deploy AWS ElastiCache for Redis as an in-memory ephemeral store.
- **Why (Rationale):** Sub-millisecond latency; atomic counters and sliding-window primitives for rate limiting; native support for BullMQ queue runners.
- **Alternatives Considered:** In-memory application RAM (rejected: fails on multi-container deployments).
- **Security Impact:** Redis isolated within private VPC subnet; AUTH token enabled; zero persistent PII stored.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-006: Dual-Bucket S3 Architecture (Public CDN Media vs Private KMS KYC Quarantine)
- **Status:** `ACCEPTED`
- **Baseline Version:** `security.md` §1.1, §6.1, Backend PRD v2.1 §3
- **Context:** Media assets (property photos, destination galleries) must be publicly accessible via global CDN with low latency. In contrast, sensitive identity documents (Aadhaar, passports) must remain strictly private and encrypted under Indian privacy regulations.
- **Decision:** Split object storage into two isolated S3 buckets:
  1. `auricvista-public-media`: Public read access fronted by Cloudflare CDN.
  2. `auricvista-private-kyc-quarantine`: Zero public access; AWS KMS customer-managed encryption key (CMK); accessible solely via short-lived presigned URLs ($TTL \le 15\text{ min}$ for uploads, $TTL \le 5\text{ min}$ for moderator inspection).
- **Why (Rationale):** Eliminates accidental public exposure of KYC documents by physical infrastructure segregation.
- **Alternatives Considered:** Single bucket with path-based bucket policies (rejected: high risk of misconfiguration).
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-007: Cloudflare Edge (WAF, DDoS Mitigation & Anycast TLS 1.3)
- **Status:** `ACCEPTED`
- **Baseline Version:** System Flow v2.1 §2, Backend PRD v2.1 §3
- **Context:** AuricVista web and API endpoints require defense against volumetric DDoS attacks, automated bots, and malicious payload injection before traffic reaches AWS load balancers.
- **Decision:** Route all DNS through Cloudflare with Anycast DNS, TLS 1.3 termination, managed WAF rulesets, Bot Management, and edge rate limiting.
- **Why (Rationale):** Unmatched global edge network; absorbs massive volumetric attacks without AWS egress bills; automated SSL management.
- **Alternatives Considered:** AWS CloudFront + AWS WAF (higher operational complexity and cost).
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-008: Firebase Authentication with Backend Session Enforcement
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §6, System Flow v2.1 §5
- **Context:** Fast social login (Google, Apple) and Indian SMS OTP phone authentication are essential for consumer adoption, but the internal backend must retain authoritative control over user authorization and roles.
- **Decision:** Use Firebase Authentication strictly as the external Identity Provider (IdP). The NestJS backend verifies Firebase ID tokens using the `firebase-admin` SDK, creates a corresponding user record in PostgreSQL, and issues secure, HttpOnly session cookies.
- **Why (Rationale):** Eliminates the burden of building custom OTP infrastructure and social OAuth integrations while maintaining complete backend ownership of roles and user state.
- **Alternatives Considered:** NextAuth / Auth0 (Auth0 pricing prohibitive at scale; custom OTP setup complex).
- **Implementation Status:** `[PARTIALLY IMPLEMENTED]` (Mock client authentication in `AuthModal.js`).

---

### ADR-009: Google Maps Platform Backend Proxying & Restricted Client Keys
- **Status:** `ACCEPTED`
- **Baseline Version:** System Flow v2.1 §11, Backend PRD v2.1 §10
- **Context:** Rich interactive maps, destination geocoding, route calculations, and photorealistic 3D maps are core to AuricVista. However, unmanaged client-side Google Maps API usage exposes keys to quota theft and runaway billing.
- **Decision:** Proxy high-cost Google Maps APIs (Places Autocomplete, Geocoding, Routes Matrix) through the NestJS backend with Redis caching ($TTL = 24\text{ hours}$). Restrict client-side Maps JavaScript SDK keys strictly to production HTTP referrers.
- **Why (Rationale):** Slashes external API billing by up to $70\%$ via aggressive server-side caching; prevents API key abuse.
- **Alternatives Considered:** OpenStreetMap / Mapbox (insufficient POI and route coverage in rural Karnataka).
- **Implementation Status:** `[PARTIALLY IMPLEMENTED]` (Interactive maps rendered in `ItineraryMap.js`; backend proxy pending).

---

### ADR-010: Transactional Outbox Pattern with Redis BullMQ Relay Worker
- **Status:** `ACCEPTED`
- **Baseline Version:** System Flow v2.1 §2, Backend PRD v2.1 §2
- **Context:** When domain state mutates (e.g. booking confirmed), asynchronous events must be delivered to automation engines (n8n, FCM). Dual-writing directly to both PostgreSQL and a message queue inside the same API request leads to data inconsistency if one write fails.
- **Decision:** Implement the **Transactional Outbox Pattern**. In a single atomic PostgreSQL transaction, the domain record is saved and an event record is written to the `outbox_events` table. A background BullMQ relay worker polls/subscribes to this table and dispatches events to external queues with guaranteed at-least-once delivery.
- **Why (Rationale):** Guarantees zero lost events; completely decouples synchronous API response latency from asynchronous external notifications.
- **Alternatives Considered:** Direct HTTP webhook firing in request handlers (rejected: brittle and error-prone).
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-011: n8n As Non-Authoritative Orchestration Engine
- **Status:** `ACCEPTED`
- **Baseline Version:** PRD 3 §2, System Flow v2.1 §12
- **Context:** Business process automation (multi-channel notifications, drip marketing, partner reminders) requires an agile workflow editor, but allowing an automation tool to modify database tables directly causes schema chaos and bypasses domain validation rules.
- **Decision:** Deploy self-hosted n8n on AWS ECS Fargate strictly as an **Orchestration Layer**. n8n has zero direct database credentials (`DATABASE_URL`). It receives cryptographically signed outbox webhooks from the backend, executes workflows, and updates the backend solely via scoped, authenticated internal API endpoints.
- **Why (Rationale):** Preserves the single source of truth in the NestJS backend; empowers marketing and ops workflows without risking database corruption.
- **Alternatives Considered:** Temporal.io (steeper learning curve for non-engineers), Camunda.
- **Security Impact:** HMAC-SHA256 signature verification on intake; PII minimization in workflow logs.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-012: Centralized Backend AI Gateway with Bounded Tools
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §21, `security.md` §7
- **Context:** Generative AI powers conversational itinerary planning and destination discovery. Calling LLM APIs directly from the browser leaks API keys, precludes rate limiting, and invites prompt injection exploits.
- **Decision:** All AI interactions must terminate at the NestJS `AiGatewayModule`. The gateway handles prompt assembly, context filtering, token budget enforcement, and dispatches only strictly typed, read-only tools.
- **Why (Rationale):** Centralized observability and token cost accounting; complete isolation of provider credentials; defense against prompt injection attacks.
- **Alternatives Considered:** Client-side LangChain / direct browser calls (rejected: massive security violation).
- **Implementation Status:** `[PARTIALLY IMPLEMENTED]` (Mock chat in `AIPlanner.js`).

---

### ADR-013: Prohibited AI Authority Over Financial, Safety & KYC Mutations
- **Status:** `ACCEPTED`
- **Baseline Version:** System Flow v2.1 §10, `security.md` §7
- **Context:** LLM models are non-deterministic reasoning engines vulnerable to jailbreaks, hallucinations, and logic inversion.
- **Decision:** The AI Gateway and LLM agents are **strictly prohibited** from unilaterally executing high-impact state mutations. Specifically, AI cannot:
  1. Authorize payments or execute refunds.
  2. Confirm bookings or alter inventory availability.
  3. Approve or reject KYC documents.
  4. Escalate, modify, or suppress emergency SOS alerts.
  5. Elevate user privileges or alter database permissions.
  High-impact actions proposed by AI require deterministic backend validation and explicit user confirmation.
- **Why (Rationale):** Non-negotiable defense against financial fraud, compliance violations, and life-safety failures.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-014: Domain-Filtered Hybrid RAG via pgvector
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §21, System Flow v2.1 §7 (Flow Y)
- **Context:** The AI Travel Companion must ground its recommendations in AuricVista's real inventory (verified Karnataka homestays, Coorg coffee tours, Hampi guides) rather than generic web hallucinations.
- **Decision:** Implement Retrieval-Augmented Generation (RAG) using PostgreSQL's native `pgvector` extension. Embeddings are generated for destinations, stays, and curated stories. Retrieval queries apply strict pre-filtering (availability, budget, user travel style) before vector cosine similarity matching.
- **Why (Rationale):** Prevents recommending sold-out or non-existent stays; single database stack simplifies data freshness.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-015: Razorpay Webhook Authority & Idempotency Rails
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §13, `security.md` §4
- **Context:** Client-side checkout redirection (e.g. browser callback after payment) cannot be trusted to confirm financial transactions due to network drops, tab closures, and client tampering.
- **Decision:** The backend Razorpay webhook handler (`POST /payments/webhook/razorpay`) is the **sole authoritative trigger** for transitioning a booking from `PAYMENT_PENDING` to `CONFIRMED`. The handler verifies HMAC-SHA256 signatures via `crypto.timingSafeEqual` and enforces a 24-hour Redis `idempotency_key` lock.
- **Why (Rationale):** Eliminates double-booking, unpaid confirmations, and replay attacks.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-016: Concurrency Control via Database Row Locks & 15-Minute Temporary Holds
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §8, System Flow v2.1 §8
- **Context:** High-demand luxury villas (e.g. single presidential suites in Kabini) experience simultaneous checkout attempts from multiple users, creating race conditions.
- **Decision:** Implement a two-phase concurrency model:
  1. Temporary Hold: User initiates checkout; backend executes `SELECT FOR UPDATE` on `inventory_calendar` inside a Prisma transaction, transitions status to `HELD`, and sets a 15-minute Redis expiration timer.
  2. Final Confirmation: Webhook confirms payment within 15 minutes $\to$ inventory permanently booked. If timer expires, scheduled worker auto-releases inventory back to `AVAILABLE`.
- **Why (Rationale):** Completely prevents double-booking while giving users a friction-free, guaranteed checkout window.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-017: Virtual Expense & Bill-Splitting Ledger (Non-PPI Wallet)
- **Status:** `ACCEPTED`
- **Baseline Version:** Backend PRD v2.1 §15, System Flow v2.1 §7 (Flow R)
- **Context:** Travel groups need to track shared expenses (cabs, meals, guides) and split balances. Operating a true digital wallet that holds customer fiat deposits requires a Prepaid Payment Instrument (PPI) license from the Reserve Bank of India (RBI).
- **Decision:** The "Wallet" feature is architected strictly as a **virtual expense tracking and accounting ledger**. It records who paid what and calculates settlement debts. Actual money settlement occurs peer-to-peer via external UPI deep links. The platform holds zero customer fiat balances.
- **Why (Rationale):** Delivers full group utility while maintaining 100% compliance with RBI non-banking regulations.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-018: Zero-Exposure KYC Privacy & Ephemeral Presigned Inspection
- **Status:** `ACCEPTED`
- **Baseline Version:** `security.md` §6, PRD 2 §17
- **Context:** Storing sensitive identity documents (Aadhaar, passport scans) on backend web servers creates severe data breach liability under the Digital Personal Data Protection (DPDP) Act.
- **Decision:** Clients upload KYC documents directly to the private S3 quarantine bucket via temporary presigned URLs. Trust moderators inspect documents solely through short-lived presigned download URLs ($TTL \le 5\text{ min}$) with immutable audit logging. API responses mask identity numbers to the last 4 digits.
- **Why (Rationale):** Zero PII rests on backend application servers; minimal attack surface for data breaches.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-019: Deterministic Rule-First SOS Emergency Pipeline (Zero AI Dependency)
- **Status:** `ACCEPTED`
- **Baseline Version:** PRD 2 §20, `security.md` §10
- **Context:** In emergency scenarios (traveler stranded or unsafe), alert dispatch must operate with zero latency, 100% predictability, and zero chance of model hallucination or timeout.
- **Decision:** The SOS pipeline (`POST /safety/sos`) is strictly deterministic and rule-first. It bypasses all marketing rate limits, operates on a dedicated P0 Redis BullMQ priority queue, and immediately dispatches simultaneous SMS and voice alerts to verified emergency contacts. AI is entirely excluded from the SOS execution path.
- **Why (Rationale):** Life safety demands infallible, low-latency execution ($< 3\text{ seconds}$).
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-020: On-Demand Location Pins & Check-Ins (Zero Continuous GPS Tracking)
- **Status:** `ACCEPTED`
- **Baseline Version:** PRD 2 §20, Flow Flow Z
- **Context:** Continuous background GPS tracking drains traveler smartphone batteries, requires heavy location-streaming infrastructure, and triggers user surveillance concerns.
- **Decision:** For V1, AuricVista forbids continuous background GPS tracking. Location intelligence is strictly based on explicit traveler actions: manual check-ins at itinerary stops, trip start/end events, and single-point emergency pin drops during an SOS trigger.
- **Why (Rationale):** Protects user battery life and privacy while satisfying all safety requirements.
- **Implementation Status:** `[SPECIFIED]`.

---

### ADR-021: Phased Frontend Evolution (Active Vanilla ES6 SPA $\to$ React / Next.js Target)
- **Status:** `ACCEPTED`
- **Baseline Version:** PRD 1 §0, `design.md` §0
- **Context:** The repository currently contains a complete, working client SPA built in native Vanilla ES6 modules. While functional for demonstration, scaling to complex collaborative state (WebSockets, React Query caching, complex forms) benefits from a structured component framework.
- **Decision:** Maintain and harden the existing Vanilla ES6 SPA in Phase 0. Plan a phased migration to React + TypeScript / Next.js in Phase 14, strictly preserving the design system tokens, visual hierarchy, and component contracts established in `design.md`.
- **Why (Rationale):** Avoids throwing away working presentation code while preparing an orderly path to modern enterprise frontend architecture.
- **Implementation Status:** `[PARTIALLY IMPLEMENTED]` (Vanilla ES6 SPA active; React migration planned).

---

### ADR-022: Client-Side Defense Baseline (DOMPurify Sanitization, Strict CSP & No Plaintext Storage)
- **Status:** `ACCEPTED`
- **Baseline Version:** `security.md` §2
- **Context:** The active client prototype contains security debt: unsanitized `innerHTML` assignments in chat and reviews, mock credentials in `AuthModal.js`, sensitive data in plaintext `localStorage`, and default Nginx container headers.
- **Decision:** Enforce mandatory client-side hardening in Phase 0:
  1. Wrap all dynamic DOM rendering in `DOMPurify.sanitize()`.
  2. Eliminate mock credentials from client code.
  3. Restrict `localStorage` to non-sensitive UI preferences; migrate session tokens to `HttpOnly` cookies.
  4. Serve defense-in-depth security headers (CSP, HSTS, X-Frame-Options: DENY) from the Nginx container.
- **Why (Rationale):** Establishes an uncompromised security posture before connecting to live production backends.
- **Implementation Status:** `[REQUIRES IMPLEMENTATION]` (Remediation scheduled in Phase 0).
