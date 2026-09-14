# AURICVISTA — PROJECT ENGINEERING STANDARD OPERATING PROCEDURE (SOP)
## Engineering Constitution & Rules of Engagement for Human Developers and AI Agents

> **Document Status:** Authoritative Project Engineering Constitution  
> **Target System:** AuricVista / AuricVyom (`Vikhyath-thelazycoder/auricvyom`)  
> **Control Plane Location:** `/prd/engineering-control/agent-sop.md`  
> **Execution Context:** Project-Specific Knowledge & Governance (Independent of Execution OS)  
> **Related Control Documents:**  
> - [agent-loop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-loop.md) (Execution Lifecycle)  
> - [master-roadmap.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/master-roadmap.md) (Development Sequence)  
> - [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md) (Requirement Matrix)  
> - [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md) (Architectural Decision Register)  

---

# 1. PURPOSE & SCOPE

This document functions as the **supreme engineering constitution** for AuricVista. It governs all software engineering operations, automated agents, AI pair programmers, contractors, and human engineers contributing to this repository.

The guidelines defined herein are **binding**. Any modification to the codebase, configuration, schema, infrastructure, or documentation that violates this SOP must be rejected during code review and agent execution loops.

### Scope:
1. All client-side code (`index.html`, `js/`, `styles/`).
2. All backend services, APIs, domain models, and schemas (NestJS, Prisma, PostgreSQL).
3. All infrastructure, deployment, and container configurations (`Dockerfile`, `docker-compose.yml`, Nginx, AWS ECS/RDS/S3).
4. All automation workflows, event listeners, and webhooks (n8n, BullMQ).
5. All security boundaries, authentication flows, and data privacy mechanisms.
6. All engineering control documents and requirement specifications.

---

# 2. THE FOUNDATIONAL PRINCIPLE: THE EVIDENCE CHAIN

Every engineer and autonomous agent operating on AuricVista must uphold this axiomatic law:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               THE EVIDENCE CHAIN                                       │
│                                                                                        │
│   DOCUMENTED  ≠  IMPLEMENTED  ≠  TESTED  ≠  VERIFIED  ≠  PRODUCTION READY              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **`DOCUMENTED ≠ IMPLEMENTED`**: A feature described in a Product Requirements Document (PRD), architectural flow, or user story is merely a specification. It does not exist in reality until valid, executable source code exists in the repository.
2. **`IMPLEMENTED ≠ TESTED`**: Code written and committed is unproven until accompanied by automated tests (unit, integration, or end-to-end) that exercise its edge cases and assertions.
3. **`TESTED ≠ VERIFIED`**: Passing automated tests does not guarantee end-to-end runtime correctness across network boundaries, database locks, or external provider integrations. Verification requires dynamic runtime proof.
4. **`VERIFIED ≠ PRODUCTION READY`**: Working software is not ready for deployment until it satisfies all non-functional requirements: security hardening (XSS/BOLA defense), secret isolation, rate limiting, logging, and performance budgets.

### The No-False-Completion Policy:
- **Never claim a task is "complete" without supplying concrete verification evidence.**
- **Never infer implementation from documentation.** Always inspect the actual file tree, imports, and AST.
- If a mock connector or client simulation exists (e.g. `js/services/api.js` or `js/state.js`), explicitly report it as `[PARTIALLY IMPLEMENTED]` or `[SIMULATED]`. Never report it as a working production feature.

---

# 3. SOURCE OF TRUTH HIERARCHY

When analyzing requirements, resolving discrepancies, or executing code changes, you must strictly observe this descending order of precedence:

```text
 1. Actual implemented backend/domain behavior (Active source code & DB constraints)
 2. security.md (Authoritative master security specification)
 3. prd/auricvista system flow.md (Cross-system operational sequence)
 4. prd/prd 2 backend.md (Domain business rules, data models & API contracts)
 5. prd/prd 3 automation.md (n8n workflows, event schemas & retries)
 6. prd/prd1 frontend .md (Presentation logic, client routes & component trees)
 7. prd/design.md (Design system, luxury tokens & UX contracts)
 8. Existing repository code / configuration / tests (Vanilla SPA, Nginx, Docker)
 9. Existing documented architectural decisions (ADRs in decision-log.md)
10. Engineering control documents (master-roadmap.md, requirements-traceability.md)
11. Engineering OS execution conventions (Execution framework rules)
12. External inspiration / 3rd party design references (Unsplash, external apps)
```

### Discrepancy Resolution Protocol:
- If code contradicts documentation: **Do not silently rewrite documentation to match flawed code, and do not assume documentation is implemented.**
- Document the divergence explicitly using:
  - `[NEEDS VALIDATION]`: When behavior is ambiguous or unverified.
  - `[REQUIRES IMPLEMENTATION]`: When documentation specifies an authoritative requirement absent from code.
- Report discrepancies in [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md) and [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md).

---

# 4. CORE ARCHITECTURAL LAWS

All technical actions must preserve the platform's architectural invariants:

### Law A: Backend is Authoritative
The client application is completely untrusted. The backend (NestJS + PostgreSQL) is the sole gatekeeper of:
- Bookings, room inventory, and check-in dates
- Payment orders, webhook verification, and settlement status
- KYC verification, identity approval, and trust tiers
- Virtual expense ledger, bill splitting, and balance tracking
- Social matching permissions, swiping limits, and chat unlocks
- Content moderation and user report thresholds
- Emergency SOS alert dispatch and escalation logic
- Object-level authorization (BOLA/IDOR prevention)

### Law B: Unidirectional Operational Flow
Mutations must follow the established one-way pipeline:
```text
Client (Web/Mobile SPA)
  → Cloudflare Edge (WAF/DDoS)
    → AWS Application Load Balancer
      → NestJS Modular Monolith Gateway
        → AWS RDS PostgreSQL (ACID Commit)
          → Transactional Outbox Table (`outbox_events`)
            → Redis BullMQ Relay Worker
              → n8n Central Event Intake (Signed HMAC-SHA256)
                → Verified Provider Callback (Razorpay, HyperVerge)
                  → NestJS Domain Handler
                    → Database Update
                      → Client Sync (WebSockets / FCM)
```

### Law C: n8n is Orchestration, Not the System of Record
- n8n must **never** connect directly to the primary database (`DATABASE_URL`).
- n8n must **never** mutate domain tables directly.
- n8n coordinates notifications, external CRM journeys, scheduled cron triggers, and asynchronous API calls.
- n8n communicates back to the domain solely through authenticated, scoped NestJS internal API endpoints using HMAC signatures.

### Law D: AI is Bounded Intelligence
- AI models (GPT-4o, Claude 3.5, Gemini Pro) are stateless reasoning engines, **not** security or transactional authorities.
- AI may recommend, summarize, parse, draft itineraries, and retrieve contextual knowledge (RAG).
- AI **cannot** unilaterally authorize financial payments, confirm bookings, approve KYC documents, bypass permissions, or override safety escalation logic.
- High-consequence AI tool actions must be verified and executed by deterministic backend domain services.

### Law E: Security by Defense in Depth
- Authentication, object-level authorization, rate limiting, and cryptographic verification are non-negotiable prerequisites for every route.
- Zero private secrets in client code (no OpenAI keys, Razorpay secret keys, or service credentials).
- All user input rendered into the DOM must be sanitized via `DOMPurify` to eradicate Cross-Site Scripting (XSS).
- Strict Content Security Policy (CSP) and HTTP security headers must be enforced at the Nginx and Cloudflare layers.

### Law F: Deterministic Emergency Safety (SOS)
- The emergency SOS pipeline is zero-AI, rule-first, and deterministic.
- SOS requests bypass marketing rate limits and operate on dedicated P0 Redis BullMQ priority queues.
- Continuous background GPS tracking is strictly forbidden in V1. Location tracking is restricted to explicit user check-ins, trip stops, and emergency pin drops.

### Law G: Virtual Expense Ledger (Non-PPI Wallet)
- The "Wallet" is an internal accounting ledger for tracking shared trip costs, room splits, and platform reward points.
- It is **not** a Prepaid Payment Instrument (PPI), banking facility, or UPI wallet under RBI regulations.
- It cannot store fiat deposits, execute inter-user monetary transfers, or cash out to arbitrary bank accounts.

### Law H: Modular Monolith First
- Maintain strict domain module boundaries within a single NestJS application (modular monolith).
- Do not introduce microservices, gRPC meshes, or distributed orchestration in V1.
- Enforce inter-module decoupling via TypeScript domain interfaces and internal event emitters.

---

# 5. REPOSITORY INSPECTION PROTOCOL

Before modifying any file, an engineer or agent must execute the following discovery sequence:

```text
1. INSPECT DIRECTORY STRUCTURE
   • Verify where files reside. Check for monorepos, client directories, and docs.
   
2. EXAMINE RUNTIME CONFIGURATION
   • Inspect package.json, Dockerfile, docker-compose.yml, nginx.conf.
   • Determine the active build tool (Vite, Next.js, or Native Vanilla ES Modules).

3. DETECT IMPLEMENTATION VS SIMULATION
   • Read services/api.js, state.js, or mock handlers.
   • Determine if network calls hit real endpoints or simulate with setTimeout and localStorage.

4. CHECK EXISTING SECURITY GUARDS
   • Check innerHTML usage, input escaping, and auth guards.
   • Check if secrets or mock credentials are embedded in client code.

5. VERIFY TEST HARNESSES
   • Check for jest.config, vitest.config, cypress, or playwright.
   • Verify whether tests can be run locally before proposing code modifications.
```

---

# 6. HOW TO HANDLE AMBIGUITY & CONFLICTS

### 6.1 Unspecified Requirements:
- If a requirement is missing from the PRD, consult the domain authority:
  - If visual: follow [design.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/design.md).
  - If behavioral/transactional: follow [prd 2 backend.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/prd%202%20backend.md).
  - If security: follow [security.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/security.md).
- If still ambiguous, document the proposed solution as an assumption in [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md) with status `[PROPOSED]` or `[NEEDS VALIDATION]`.

### 6.2 Conflicting Requirements:
- Resolve the conflict using Section 3 (Source of Truth Hierarchy).
- If PRD 1 (Frontend) conflicts with PRD 2 (Backend) on data flow: **Backend PRD wins**.
- If a visual mock conflicts with `security.md` (e.g. requesting raw card storage or unauthenticated access): **`security.md` wins**.
- Document the conflict in [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md).

### 6.3 When to Stop and Ask vs When to Proceed:
- **STOP AND ASK WHEN:**
  - An action requires destructive schema migrations or dropping tables.
  - A proposed change alters the core payment or booking state machine.
  - A change would violate zero-exposure security rules (e.g. exposing provider secrets).
  - Modifying external infrastructure or deleting production resources.
- **PROCEED SAFELY WHEN:**
  - Hardening existing code against known vulnerabilities (e.g. adding `DOMPurify` to an `innerHTML` sink).
  - Implementing specified API endpoints strictly matching the DTO schemas in Backend PRD.
  - Creating missing unit or integration tests.
  - Refactoring styling or presentation within the bounds of `design.md`.

---

# 7. CODING & SECURITY STANDARDS

### 7.1 Frontend Engineering (Vanilla ES6 SPA & Target React Migration):
- **Sanitization:** Never assign unsanitized strings to `element.innerHTML`. Use `DOMPurify.sanitize()` or browser-native `textContent` / `innerText`.
- **Secret Isolation:** Never reference private environment variables or secrets in client scripts.
- **State Management:** Plaintext `localStorage` must not store sensitive PII (Aadhaar, PAN, passports, or full credit card numbers). Restrict client storage to non-sensitive preferences, session identifiers, and UI state.
- **Design Tokens:** Strict alignment with the AuricVista design tokens in `styles/main.css` (Cinzel, Playfair Display, Plus Jakarta Sans, Auric Gold `#E5A93C`, Deep Black `#080B10`).

### 7.2 Backend Engineering (NestJS Modular Monolith):
- **Validation:** All incoming request bodies must be validated with Class-Validator / Zod schemas (`ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })`).
- **Authorization:** Enforce BOLA/IDOR protection on all parameterized routes (`/stays/:id`, `/trips/:id`, `/bookings/:id`). Verify that the authenticated user (`req.user.id`) owns the requested resource or possesses admin privileges.
- **Concurrency:** Concurrency-sensitive inventory mutations (room holds, booking confirmations) must execute inside atomic PostgreSQL transactions utilizing `SELECT FOR UPDATE` row locks.
- **Idempotency:** Payment webhooks and financial mutations must enforce unique `idempotency_key` checks backed by Redis with a minimum 24-hour TTL.

### 7.3 Automation Engineering (n8n Workflows):
- **Signature Verification:** All backend $\to$ n8n webhooks must be verified using HMAC-SHA256 signatures with a 300-second timestamp freshness window to prevent replay attacks.
- **Payload Minimization:** Webhook payloads must contain only resource IDs and event types (e.g. `{ bookingId: "uuid", event: "booking.confirmed" }`). Never pass raw PII in webhook payloads.
- **Dead-Letter Queues:** Every production workflow must configure error triggers routing failed executions to `dlq_events` with exponential backoff.

---

# 8. CHANGE IMPACT ANALYSIS & ROLLBACK POLICY

Every pull request, refactor, or autonomous code execution must document:
1. **Affected Systems:** Which layers are touched (Frontend, API, DB, Queue, Automation)?
2. **Backward Compatibility:** Does this change break existing client versions, stored tokens, or active sessions?
3. **Database Migration Safety:** Is the migration reversible? Does it lock large tables?
4. **Rollback Strategy:** How can this modification be reverted cleanly without data corruption?

If a failure occurs during deployment or verification:
- Immediately execute the rollback procedure.
- Mark the requirement in [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md) as `[BLOCKED]` or `[REQUIRES IMPLEMENTATION]`.
- Log the post-mortem in [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md).

---

# 9. SUMMARY: THE AGENT OATH

> *"I will inspect the repository before assuming state.*  
> *I will never mistake documentation for working code.*  
> *I will never claim completion without dynamic evidence.*  
> *I will defend backend authority and user security at all boundaries.*  
> *I will leave the Engineering OS untouched and maintain the project control plane in the repository."*
