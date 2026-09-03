# AURICVISTA

## PRODUCT REQUIREMENTS DOCUMENT — AUTOMATION, AI ORCHESTRATION & WORKFLOW SYSTEM

> [!NOTE]
> **DOCUMENT METADATA & REVISION CONTROL**
> - **Document Version:** 2.1 — Master Automation & AI Orchestration Specification
> - **Document Type:** Technical Product Requirements Document
> - **PRD Number:** 3 of 3
> - **Scope:** Automation architecture, n8n workflows, AI orchestration, event intake, notifications, CRM, scheduled jobs, external integrations, and operational automation.
> - **Primary Cloud Infrastructure:** Amazon Web Services (AWS) — Managed Infrastructure
> - **Primary Automation Platform:** n8n (Self-hosted on AWS ECS Fargate / Docker in Private Application Subnet)
> - **Primary Relational Database:** AWS RDS for PostgreSQL (Multi-AZ) — Authoritative System of Record
> - **Primary Backend:** TypeScript + Node.js + NestJS (Modular Monolith Gateway)
> - **Primary Frontend:** [CURRENT] Complete Vanilla ES6+ SPA • [TARGET] React + TypeScript
> - **Event & Queue Infrastructure:** Primary: PostgreSQL Transactional Outbox + Redis BullMQ; DLQ: dlq_events
> - **Edge / WAF / CDN:** Cloudflare (WAF, DDoS mitigation, TLS 1.3, edge rate limiting)
> - **Push Notifications:** Firebase Cloud Messaging (FCM via Firebase Admin SDK)
> - **Email Delivery:** Amazon Simple Email Service (SES) / SendGrid
> - **SMS / Telephony:** Twilio / Gupshup
> - **WhatsApp Messaging:** WhatsApp Cloud API (Transactional booking passes & safety alerts)
> - **Geographic Intelligence:** Google Maps Platform (Places, Geocoding, Routes, 3D Photoreal Maps)
> - **Status:** Master PRD — Fully aligned with Backend PRD v2.1, `security.md`, `design.md`, and `auricvista system flow.md`.

---

## ARCHITECTURAL IMPLEMENTATION STATUS TAXONOMY

Every automation workflow and integration engine specified within this PRD is classified under one of the following authoritative states:

* `[SPECIFIED]`: Architecturally established and fully specified in this master document; ready for workflow implementation.
* `[PARTIALLY IMPLEMENTED]`: Partially represented or prototyped in the repository (e.g. simulated notifications or mock webhooks), requiring production n8n workflow deployment.
* `[IMPLEMENTED]`: Confirmed and actively running in the working codebase.
* `[REQUIRES IMPLEMENTATION]`: Mandatory production workflow, webhook endpoint, or event trigger that developers must build.
* `[NEEDS VALIDATION]`: Configuration or external integration requiring third-party credentials (WhatsApp, Twilio, HyperVerge) prior to deployment.
* `[OUTDATED]`: Superseded architectural assumption or deprecated pattern (e.g. direct n8n database reads/writes, unthrottled SOS automation, untyped AI agent proliferation).

---

# 1. PURPOSE OF THIS PRD

This document defines the complete automation layer of AuricVista.

It answers:
- What should be automated?
- What should **not** be automated?
- Which frontend actions trigger automation?
- Which backend events trigger automation?
- How does n8n connect to the backend securely?
- Where does AI participate and where is it prohibited?
- Which workflows require explicit human approval?
- How are notifications coordinated across push, SMS, WhatsApp, and email?
- How are failures, retries, and dead-letter queues handled?
- How are workflows scaled on AWS infrastructure?
- How are duplicate executions prevented during network retries?
- How are deterministic safety and SOS workflows dispatched?
- How do all automation engines connect without creating workflow chaos?

This PRD operates in strict harmony with the system lifecycle:

```text
PRD 1: FRONTEND & USER EXPERIENCE
        ↓
User clicks / submits / interacts
        ↓
PRD 2: BACKEND & CORE SYSTEM (v2.1)
        ↓
Validates action + updates authoritative state in AWS RDS PostgreSQL
        ↓
Transactional Outbox Event / Queue (BullMQ / SQS)
        ↓
PRD 3: AUTOMATION & AI ORCHESTRATION (n8n)
        ↓
n8n / AI / External APIs / Notifications
        ↓
Controlled, Scoped Backend API Update (if required)
        ↓
Realtime Frontend Update (WebSockets / FCM)
```

**The fundamental architectural law:** The NestJS backend owns transactions, business rules, and authoritative state in AWS RDS PostgreSQL. n8n owns business-process orchestration, external integrations, multi-channel notifications, CRM journeys, and operational retries. The AI Gateway provides bounded intelligence without ever deciding transactional outcomes or permissions.

---

# 2. MASTER SYSTEM RESPONSIBILITY & SOURCE-OF-TRUTH MATRIX

To maintain complete cross-PRD consistency, the authoritative boundaries established in Backend PRD v2.1 and `security.md` are strictly observed:

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

# 3. FINAL AUTOMATION PRINCIPLES

## AuricVista must not build hundreds of disconnected, brittle workflows.

The automation architecture follows a 5-tier hierarchical model:

```text
1. CENTRAL EVENT ORCHESTRATOR (Event Ingestion, Signature Verification, Deduplication)
            │
            ▼
2. DOMAIN ENGINES (Stay, Trip, Matching, Safety, CRM, Property, Partner)
            │
            ▼
3. INTELLIGENCE ENGINES (Intent, Ranking, Personal AI Companion, Moderation)
            │
            ▼
4. CONTROL LAYER (Consent, Human Approval, Security Signatures, Escalation)
            │
            ▼
5. OPERATIONS LAYER (Monitoring, Dead-Letter Queues, Retries, Cost Alerts)
```

---

# 4. AUTOMATION RESPONSIBILITY BOUNDARY

## 4.1 What Backend Owns (Authoritative System of Record)
```text
Authentication & Session Lifecycle
Authorization & RBAC (9-Role Model)
User Identity & Preferences
KYC Legal State & Trust Scores
Database State (PostgreSQL ACID Transactions)
Property Calendar & Inventory Locks
Booking State Machines & Payout Calculations
Payment Capture Verification & Ledger
Trip State & Collaborative Permissions
Group Memberships & Waitlists
Matching State & Swipe Records
Chat Permissions & Realtime Socket Routing
Deterministic SOS Incident State & GPS Sanity
```

## 4.2 What n8n Owns (Orchestration & Workflow Coordination)
```text
Event Intake & Routing
Scheduled Jobs (Stale inventory checks, inactive group alerts)
Multi-Channel Notification Dispatch (FCM, Email, SMS, WhatsApp)
CRM Lifecycle Journeys & Re-Engagement Campaigns
Partner Inquiry & Lead Routing
Human Approval Queue Orchestration
Asynchronous Third-Party Integrations
Automated Retry Policies & Exponential Backoff
Dead-Letter Queue (DLQ) Exception Routing
Operational Failure Alerting
```

## 4.3 What AI Owns (Intelligence & Synthesis)
```text
Natural-Language Intent Understanding
Itinerary Drafting & Budget Recommendations
Review & Journal Reflection Summarization
Dynamic Travel Tip Generation
Classification of Unstructured Support Queries
Bounded Tool Selection (Executed via Backend AI Gateway)
```

## 4.4 What External Systems Provide (Infrastructure & Rail Services)
```text
KYC Document OCR & Facial Biometrics (HyperVerge / Veriff)
Spatial Intelligence & Turn-by-Turn Routes (Google Maps Platform)
Live Weather Forecasts (OpenWeather / IMD APIs)
Payment Rails (Razorpay / Stripe)
Messaging Infrastructure (Firebase FCM, Twilio, WhatsApp Cloud API, AWS SES)
```

---

# 5. WHAT MUST NEVER BE LEFT TO N8N

n8n is an external orchestrator. It must NEVER become the authoritative source of truth for:
- Booking confirmation or room inventory allocation,
- Payment capture verification or refund authorization,
- KYC document compliance approval,
- User role elevation or permission changes,
- Bilateral match creation or group membership approval,
- Virtual wallet split calculations or balance updates,
- Emergency SOS incident creation, classification, or closure.

### ❌ Anti-Pattern (Strictly Prohibited):
```text
Frontend ──▶ n8n Webhook ──▶ Direct PostgreSQL Connection / Mutation
```

Frontend ──▶ NestJS API ──▶ DB Transaction ──▶ Outbox Event ──▶ BullMQ Relay ──▶ n8n ──▶ Controlled API Update
```

---

# 6. PRIMARY AUTOMATION PLATFORM — n8n ON AWS

## 6.1 Selected Platform: Self-Hosted n8n on AWS
AuricVista deploys **self-hosted n8n** running on **AWS ECS Fargate** in the private application subnet of the AuricVista VPC:
- **Dedicated Worker Architecture:** Decouples the n8n primary editor from execution workers.
- **PostgreSQL Workflow State:** Workflows, execution logs, and credentials reside in a dedicated RDS PostgreSQL schema/database separate from the core business database.
- **Redis Queue Scaling:** Uses Redis (AWS ElastiCache) for distributed job distribution across n8n workers.
- **AWS Secrets Manager Integration:** All n8n credentials, webhook signing keys, and external API tokens are injected dynamically from AWS Secrets Manager.

---

# 7. HIGH-LEVEL AUTOMATION ARCHITECTURE

```text
                         AURICVISTA USER
                               │
                               ▼
                         REACT FRONTEND
                               │
                      User Interaction
                               │
                               ▼
                      NESTJS BACKEND GATEWAY
                               │
                      ACID Database Mutation
                               │
                     Transactional Outbox Record
                               │
                               ▼
                    PRIMARY QUEUE (Redis BullMQ) ──▶ DLQ: dlq_events
                               │
                               ▼
                    n8n CENTRAL EVENT INTAKE
                               │
                   HMAC-SHA256 Signature Checked
                   Timestamp Replay Checked (300s)
                   Idempotency Dedup Checked
                               │
                               ▼
                   CENTRAL EVENT ROUTER
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
       Stay Engine         Trip Engine      Matching Engine
       CRM Engine          Safety Engine    Partner Engine
           │                   │                   │
           └───────────────────┼───────────────────┘
                               │
                               ▼
                      INTELLIGENCE LAYER
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
            AI Agent         Ranking          Intent
              │                │                │
                               ▼
                      EXTERNAL PROVIDERS
              (FCM, Twilio, WhatsApp, SES, Google Maps)
                               │
                               ▼
                    CONTROLLED BACKEND APIs
              (Signed / Scoped Automation Tokens)
                               │
                               ▼
                   POSTGRESQL AUTHORITATIVE STATE
                               │
                               ▼
                     REALTIME FRONTEND SYNC
```

---

# 8. CENTRAL EVENT CONTRACT

Every event emitted by the NestJS backend to n8n must strictly conform to the following JSON schema:

```json
{
  "event_id": "evt_998124_crg",
  "event_name": "booking.confirmed",
  "event_version": "1.0",
  "timestamp": "2026-09-01T10:00:00.000Z",
  "source": "auricvista-backend",
  "correlation_id": "corr_9a8b7c6d",
  "idempotency_key": "booking_AV-RES-829102_confirmed",
  "user_id": "usr_9182",
  "payload": {
    "booking_id": "AV-RES-829102",
    "property_id": "prop_tamara_coorg",
    "check_in": "2026-09-15",
    "check_out": "2026-09-18",
    "total_amount": 73500,
    "currency": "INR",
    "guest_count": 2,
    "voucher_code": "AV-CRG-82910"
  }
}
```

### Mandatory Event Headers & Fields:
- `X-Auric-Signature`: `HMAC-SHA256(webhook_secret, timestamp + "." + raw_body)`
- `X-Auric-Timestamp`: ISO 8601 UTC timestamp ($TTL \le 300\text{ seconds}$)
- `event_id`: Unique UUID generated by the backend outbox table
- `correlation_id`: End-to-end trace identifier linking frontend request, backend transaction, n8n execution, and third-party delivery logs
- `idempotency_key`: Domain-level deduplication key preventing duplicate processing during retries

---

# 9. CENTRAL AUTOMATION EVENT INTAKE

```text
Backend Event Emitted
        ↓
n8n Webhook Intake Endpoint
        ↓
1. Validate HMAC-SHA256 Signature (Reject if invalid)
        ↓
2. Validate Timestamp (Reject if older than 300s)
        ↓
3. Check Idempotency Key in Redis Cache (If exists, return HTTP 200 STOP)
        ↓
4. Validate Payload JSON Schema
        ↓
5. Route to Domain Workflow
```

---

# 10. DOMAIN AUTOMATION ENGINES

AuricVista automation is partitioned into 20 cohesive domain engines:
1. **Identity & Onboarding Engine**
2. **KYC & Trust Verification Engine**
3. **Stay & Property Discovery Engine**
4. **Booking Lifecycle Engine**
5. **Tourism & Itinerary Engine**
6. **Trip Collaboration Engine**
7. **Matching & Social Engine**
8. **Group & Community Engine**
9. **Central Communication Engine**
10. **CRM & Intent Re-Engagement Engine**
11. **Virtual Trip Wallet & Budget Engine**
12. **Safety Monitoring & Check-In Engine**
13. **Deterministic Emergency & SOS Engine**
14. **Property Partner Operations Engine**
15. **Personal AI Agent Orchestration Engine**
16. **Search Intelligence Engine**
17. **Content Moderation & Trust Engine**
18. **Admin & Operational Console Engine**
19. **Recovery, DLQ & Failure Engine**
20. **Analytics & Outcome Telemetry Engine**

---

# 11. FRONTEND → BACKEND → AUTOMATION CONNECTION MODEL

```text
┌────────────────┐        1. Action Submitted         ┌────────────────┐
│ REACT FRONTEND │───────────────────────────────────▶│ NESTJS BACKEND │
└────────────────┘                                    └───────┬────────┘
        ▲                                                     │ 2. Validates & Writes
        │                                                     │    Atomic DB Record
        │ 6. Realtime Push / WebSocket                        ▼
        │    State Synchronized                       ┌────────────────┐
        │                                             │ AWS POSTGRESQL │
        │                                             │ (Outbox Event) │
        │                                             └───────┬────────┘
        │                                                     │ 3. Asynchronous Relay
        │         5. Scoped Callback                          ▼
        │            Update State                     ┌────────────────┐
        └─────────────────────────────────────────────│  n8n WORKFLOW  │
                                                      └───────┬────────┘
                                                              │ 4. Coordinates APIs
                                                              ▼
                                                      ┌────────────────┐
                                                      │ EXTERNAL APIS  │
                                                      │ (FCM, SMS, WA) │
                                                      └────────────────┘
```

---

# 12. AUTOMATION ENGINE 1 — USER ONBOARDING

- **Trigger:** `user.created` domain event from Backend `AuthModule`.
- **Workflow Steps:**
  1. Inspect onboarding completion metadata (`has_profile`, `has_preferences`, `is_verified`).
  2. If missing preferences, schedule a friendly push notification (FCM) after 2 hours.
  3. If user engages, terminate reminder sequence immediately.
  4. Max onboarding reminder sequence: 3 notifications over 5 days; automatic suppression thereafter.

---

# 13. AUTOMATION ENGINE 2 — KYC & TRUST NOTIFICATIONS

- **Trigger:** `kyc.submitted`, `kyc.verified`, `kyc.rejected`, `kyc.review_required`.
- **Workflow Steps:**
  1. `kyc.verified` $\to$ Dispatches celebratory push (FCM) & WhatsApp message ("Your identity is verified. Private Karnataka sanctuary bookings are now unlocked.").
  2. `kyc.rejected` $\to$ Dispatches helpful guidance email with actionable reason (e.g. "Blurry photo; please re-upload in clear lighting").
  3. `kyc.review_required` $\to$ Enqueues task in the Trust Moderator Slack/Admin channel with a link to the secure admin console.
- **Strict Data Minimization:** n8n NEVER receives raw identity documents, full 12-digit Aadhaar numbers, or PAN scans. Zero PII storage in n8n execution history.

---

# 14. AUTOMATION ENGINE 3 — SEARCH → INTENT CAPTURE

- **Trigger:** `search.performed` (aggregated when user searches $> 3$ stays in a destination without booking).
- **Workflow:** Detects high purchase intent for a destination (e.g. "Coorg coffee estates") and adds destination tag to CRM segment.

---

# 15. AUTOMATION ENGINE 4 — ABANDONED JOURNEY RE-ENGAGEMENT

- **Trigger:** `checkout.hold_expired` (User held room inventory in Step 4/5 of `BookingModal` but did not complete payment within 15 minutes).
- **Workflow:**
  1. Waits 45 minutes to avoid annoying active shoppers.
  2. Checks if user completed any other booking in the interim. If YES, abort.
  3. If NO, dispatches a personalized WhatsApp / Push re-engagement pass: *"Still planning your Coorg coffee escape? Your dates are still open."*
  4. Frequency Cap: Maximum 1 abandoned checkout reminder per user per 14 days.

---

# 16. AUTOMATION ENGINE 5 — PROPERTY DISCOVERY & HOST ALERTS

- **Trigger:** `property.submitted_for_review`.
- **Workflow:** Alerts Content & Trust team; runs automated address geocoding validation via Google Geocoding API; enqueues human property onboarding review.

---

# 17. AUTOMATION ENGINE 6 — BOOKING LIFECYCLE AUTOMATION

```text
booking.confirmed
        ↓
1. Generate Pass PDF / Pass Voucher via Backend Service
        ↓
2. Send Instant Push Notification via FCM
        ↓
3. Send Transactional WhatsApp Message with Voucher Pass & Google Maps Directions
        ↓
4. Send Detailed Tax Invoice & Itinerary Summary via Amazon SES / SendGrid
        ↓
5. Schedule Pre-Arrival Briefing (Check-in - 48 Hours)
        ↓
6. Schedule Post-Trip Review & Reflection Prompt (Check-out + 24 Hours)
```

---

# 18. AUTOMATION ENGINE 7 — TOURISM & ITINERARY ENHANCEMENT

- **Trigger:** `trip.created`, `itinerary.activity_added`.
- **Workflow:** Fetches seasonal weather guidance and local cultural festival advisories (e.g. Coorg harvest season, Hampi Utsav) to enrich the traveler's itinerary view.

---

# 19. AUTOMATION ENGINE 8 — GROUP CREATION & RECRUITMENT

- **Trigger:** `group.created`, `group.member_requested`.
- **Workflow:** Sends group host an instant notification when a traveler requests to join; dispatches recruitment share links to verified travel buddies.

---

# 20. AUTOMATION ENGINE 9 — GROUP INACTIVITY & DECISION SUPPORT

- **Trigger:** Scheduled daily cron (10:00 AM IST) scanning active travel groups with upcoming departure dates ($< 14\text{ days}$) where no activity has been logged for 5 days.
- **Workflow:** Posts a helpful AI prompt in the group chat: *"Your departure to Gokarna is in 10 days! Have you finalized Day 2 beach trekking? Tap to vote."*

---

# 21. AUTOMATION ENGINE 10 — MATCHING & CONNECTION ACTIVATION

- **Trigger:** `matching.mutual_match` (Two travelers mutually swipe LIKE).
- **Workflow:**
  1. Immediately emits WebSocket event to both active clients.
  2. Dispatches push notification: *"It's a Match! You and Priya both want to explore Kabini wildlife. Say hello!"*
  3. Pre-populates conversation starter prompt based on shared travel interests.

---

# 22. AUTOMATION ENGINE 11 — FLATMATE MATCHING AUTOMATION

- **Trigger:** `flatmate.match_found`.
- **Workflow:** Evaluates co-living compatibility criteria (habits, budget, location) and alerts both digital nomads with a structured compatibility summary.

---

# 23. AUTOMATION ENGINE 12 — CHAT & COMMUNICATION ENGINE

- **Trigger:** `chat.message_sent`.
- **Workflow:** If the recipient is offline (no active WebSocket connection in Redis for $> 2\text{ minutes}$), dispatches an unobtrusive FCM push notification with masked preview.

---

# 24. CENTRAL COMMUNICATION & CHANNEL SELECTION ENGINE

```text
Domain Event
      ↓
Channel Selection Engine
      ├── Is P0 Emergency? ───────────────▶ Immediate SMS + WhatsApp + Push (Bypass Quiet Hours)
      ├── Is Transactional Booking? ──────▶ WhatsApp Pass + Email + Push
      ├── Is Chat Notification? ──────────▶ FCM Push Only (Suppress if recipient online)
      └── Is Marketing / Re-Engagement? ──▶ Check Opt-In & Quiet Hours (10 PM – 8 AM IST)
                                                  │
                                            Opted-In & Safe Hours
                                                  │
                                                  ▼
                                            Push / WhatsApp
```

---

# 25. NOTIFICATION SUPPRESSION & ANTI-FATIGUE CONTROLS

To guarantee travelers are never spammed:
1. **Quiet Hours Enforcement:** No marketing or non-critical notification may be dispatched between 22:00 and 08:00 local time.
2. **Global Velocity Cap:** Maximum 3 non-emergency notifications per user per 24-hour rolling window.
3. **Duplicate Suppression Key:** `dedup_key = {user_id}:{notification_type}:{entity_id}:{date}` prevents multiple messages for the same event.

---

# 26. AUTOMATION ENGINE 13 — VIRTUAL TRIP WALLET & EXPENSES

> [!IMPORTANT]
> **Virtual Tracking Only:** AuricVista's wallet is a virtual expense contribution and split tracking system, NOT a licensed stored-value PPI/UPI wallet.

- **Trigger:** `wallet.split_created`, `wallet.budget_threshold_reached`.
- **Workflows:**
  1. `budget.threshold_reached` ($> 85\%$ of target trip budget consumed) $\to$ Dispatches a gentle alert to the trip creator: *"You have utilized 85% of your ₹20,000 Coorg budget."*
  2. `trip.completed` with outstanding split balances $\to$ Dispatches friendly settlement summary after 24 hours showing who owes what, with direct calculation summaries.

---

# 27. AUTOMATION ENGINE 14 — SAFETY MONITORING & SCHEDULED CHECK-INS

- **Trigger:** `safety.checkin_scheduled` (Traveler opted into Safety Mode for a high-altitude trek or solo journey).
- **Workflow:**
  1. Sends check-in prompt at scheduled time (e.g. 18:00): *"Check in from your trek: Are you safely back at your stay?"*
  2. If traveler clicks "I'm Safe", check-in completes.
  3. If NO response after 45 minutes $\to$ Gentle follow-up notification.
  4. If NO response after 90 minutes $\to$ Alerts emergency contacts with traveler's last verified check-in location and active itinerary context.

---

# 28. AUTOMATION ENGINE 15 — DETERMINISTIC SOS & EMERGENCY WORKFLOW

```text
User Triggers SOS in App / Web
             │
             ▼
    NESTJS BACKEND GATEWAY
             │
    • Validates Authentication & GPS Coordinates
    • Rate Limit Check (5 dispatches / 5 minutes)
    • Duplicate Suppression Check (10-second window)
    • Creates Authoritative `sos_incidents` Record
    • Dispatches Atomic Outbox Event `sos.created`
             │
             ▼
     P0 EMERGENCY WORKER (n8n / Dedicated Consumer)
             │
             ├───────────────────────────────────────────────────────┐
             ▼                                                       ▼
1. Dispatch Instant Priority SMS & WhatsApp             2. Escalate to Human Safety
   to All Verified Emergency Contacts                      Operator Console in Admin
   with Live Map Pin & Itinerary Context                   (Triggers Audio/Visual Alarm)
             │                                                       │
             ▼                                                       ▼
3. Initiate Automated Voice Call Fallback               3. Coordinate Emergency Services
   if SMS Unacknowledged within 3 Minutes                  (Police 112 / Forest Patrol)
```

### Critical SOS Operational Standards:
- **100% Deterministic Execution:** Zero AI dependency. AI is strictly prohibited from evaluating, downgrading, or resolving an emergency incident.
- **Emergency Priority Overrides:** SOS workflows bypass all marketing rate limits, quiet hours, and queue backlogs.
- **Permanent Legal Audit Trail:** All dispatched alerts, delivery receipts, and coordinator actions are permanently logged in PostgreSQL `incident_actions`.
- **No Continuous Background GPS Tracking in V1:** Location is captured strictly on-demand when the traveler activates SOS, preventing battery drain and privacy intrusion.

---

# 29. AUTOMATION ENGINE 16 — PROPERTY PARTNER OPERATIONS

- **Trigger:** `partner.inquiry_received`, `property.stale_inventory`.
- **Workflow:** Alerts hosts to pending booking inquiries; sends weekly occupancy summaries and seasonal pricing recommendations.

---

# 30. AUTOMATION ENGINE 17 — CRM & LIFECYCLE ENGAGEMENT

- **Trigger:** `user.milestone_reached` (e.g. 5th Karnataka trip completed).
- **Workflow:** Automatically awards Diamond Member loyalty points and unlocks complimentary plantation dining experiences.

---

# 31. AUTOMATION ENGINE 18 — PERSONAL AI AGENT ORCHESTRATION

```text
Traveler Asks Question in AI Travel Assistant (`AIPlanner.js`)
                       │
                       ▼
            NESTJS AI GATEWAY MODULE
                       │
     • Validates User Session & Rate Quotas
     • Delimiter Isolation (System prompt vs Untrusted user input)
     • Pre-Retrieval Authorization & Metadata Filtering
     • Compiles Minimum Context (Preferences + Active Trip)
                       │
                       ▼
            MODEL INFERENCE ENGINE
                       │
          Emits Structured Function Call
                       │
                       ▼
            TYPED TOOL DISPATCHER
                       │
   ┌───────────────────┴───────────────────┐
   ▼                                       ▼
Read-Only Query                         State-Changing Mutation
(e.g. Find Cafes)                       (e.g. Book Stay / Cancel)
   │                                       │
   ▼                                       ▼
Executes & Returns                      REQUIRES OUT-OF-BAND
Data to Model                           HUMAN CONFIRMATION IN UI
                                        (LLM cannot auto-commit)
```

---

# 32. AUTOMATION ENGINE 19 — SEARCH INTELLIGENCE & INTENT ROUTING

- **Trigger:** `search.zero_results`.
- **Workflow:** Detects unmatched luxury destination queries and notifies the content acquisition team to source properties in that region.

---

# 33. AUTOMATION ENGINE 20 — CONTENT MODERATION & TRUST WORKFLOWS

- **Trigger:** `review.flagged`, `story.reported`.
- **Workflow:** Automatically hides content exceeding 3 independent user reports; enqueues review task in the Trust Moderator console.

---

# 34. AUTOMATION ENGINE 21 — ADMIN & OPERATIONAL ALERTING

- **Trigger:** `system.error_threshold_exceeded`, `payment.reconciliation_mismatch`.
- **Workflow:** Dispatches immediate P1 alert to on-call engineering via PagerDuty / Opsgenie and engineering Slack channels.

---

# 35. AUTOMATION ENGINE 22 — RECOVERY & DEAD-LETTER QUEUE (DLQ)

```text
Workflow Execution Fails
           │
           ▼
Attempt Retry with Exponential Backoff (1m, 5m, 15m)
           │
     Failed 3 Times?
      ┌────┴────┐
     YES        NO
      │          │
      ▼          ▼
Shunt Event to DLQ Table
      │
Alert Engineering Slack
      │
Manual Replay Supported via Admin API
```

---

# 36. RETRY POLICY & EXPONENTIAL BACKOFF

| Workflow Tier | Max Retries | Backoff Strategy | Failure Action |
| :--- | :--- | :--- | :--- |
| **P0 — Emergency SOS** | 5 Retries | Immediate, then 10s, 30s, 60s | Escalate to secondary telephony provider + voice call |
| **P1 — Booking Confirmation** | 3 Retries | 30s, 2m, 10m | Shunt to DLQ + alert Operations Console |
| **P2 — User Interactions** | 3 Retries | 1m, 5m, 15m | Log warning + abort cleanly |
| **P3 — CRM & Marketing** | 2 Retries | 15m, 60m | Discard cleanly (never retry stale marketing) |

---

# 37. IDEMPOTENCY & DUPLICATE SUPPRESSION

1. **Transactional Deduplication:** Every workflow execution checks `idempotency_key` against Redis with a 24-hour TTL. If present, execution terminates immediately with status `ALREADY_PROCESSED`.
2. **Notification Anti-Duplication:** Webhooks and SMS triggers enforce `dedup_key = {user_id}:{event_type}:{entity_id}` to prevent sending multiple confirmation passes for the same reservation.

---

# 38. WEBHOOK SECURITY & SIGNATURE VERIFICATION

Every webhook emitted by the NestJS backend and received by n8n must satisfy:
1. **Cryptographic Signature:** Validated against `X-Auric-Signature` using HMAC-SHA256 with the shared secret stored in AWS Secrets Manager.
2. **Replay Window:** Validated against `X-Auric-Timestamp`. Payloads older than 300 seconds ($5\text{ minutes}$) or with future timestamps are discarded.
3. **Payload Sanitization:** Validated against typed JSON schemas prior to workflow processing.

---

# 39. SECRETS MANAGEMENT & AWS INTEGRATION

- **Zero Hardcoded Keys:** Webhook secrets, Twilio auth tokens, WhatsApp Cloud API keys, and database credentials must NEVER be stored in n8n workflow JSON or repository files.
- **AWS Secrets Manager:** Secrets are retrieved at container startup and injected into n8n as secure environment variables.
- **Rotation Policy:** Webhook signing secrets support dual-key rotation with a 24-hour transition overlap window.

---

# 40. PII MINIMIZATION IN WORKFLOWS

n8n execution logs must never become a shadow database of traveler PII:
- Payloads carry minimal identifiers (`user_id`, `booking_id`, `event_type`).
- Full names, email addresses, phone numbers, and identity document scans are excluded from event broadcasts.
- When an external communication requires recipient contact details, n8n makes an authenticated, signed call to the backend to fetch contact info immediately before dispatch.

---

# 41. WORKFLOW VERSIONING & NAMING STANDARD

### Naming Standard: `DOMAIN.ACTION.VERSION`
Examples:
- `booking.confirmed.v1`
- `trip.departure_reminder.v1`
- `safety.sos_dispatch.v1`
- `group.inactivity_check.v1`
- `kyc.status_update.v1`

---

# 42. FOLDER STRUCTURE IN n8n

```text
AuricVista Production Workflows
│
├── 00_Core (Event Intake, Router, Error Recovery, DLQ)
├── 01_Identity (Onboarding, Password Reset, Verification)
├── 02_KYC_Trust (Verification Alerts, Review Reminders)
├── 03_Stay_Property (Inquiries, Host Approvals, Stale Inventory)
├── 04_Booking (Pass Generation, WhatsApp Vouchers, Invoices)
├── 05_Tourism (Seasonal Guides, Cultural Advisories)
├── 06_Trip (Collaborative Updates, Weather Briefings)
├── 07_Matching (Match Alerts, Flatmate Compatibility)
├── 08_Group_Community (Recruitment, Waitlists, Inactivity)
├── 09_Communication (Central Channel Router, FCM, SMS, WhatsApp)
├── 10_CRM (Milestone Loyalty, Abandoned Checkout Re-Engagement)
├── 11_Wallet (Budget Overrun Warnings, Settlement Summaries)
├── 12_Safety (Scheduled Check-Ins, Missing Response Escalation)
├── 13_Emergency (Deterministic SOS Dispatch, Contact Telephony)
├── 14_AI (Central AI Gateway Connector, Tool Mediation)
├── 15_Search (Unmatched Query Routing, Demand Capture)
├── 16_Moderation (Content Flags, Escalation Queues)
├── 17_Admin (Financial Reconciliation, Operational Pagers)
└── 99_Error_Recovery (DLQ Replay, Circuit Breaker Monitor)
```

---

# 43. AUTOMATION MONITORING & BUSINESS METRICS

Every production workflow tracks execution telemetry in Amazon CloudWatch and OpenTelemetry:
- **Operational Metrics:** Execution count, success rate, failure rate, p95 execution latency, retry counts.
- **Business Outcome Metrics:**
  - Abandoned Checkout $\to$ Booking Conversion Rate ($> 8\%$ target).
  - WhatsApp Booking Pass Open & Confirmation Rate ($> 95\%$ target).
  - SOS Dispatch to Emergency Contact Delivery Latency ($< 3\text{ seconds}$ target).
  - AI Suggestion Acceptance Rate ($> 65\%$ target).

---

# 44. PROVIDER FALLBACK MATRIX

| Dependency / Service | Primary Failure Mode | Immediate Fallback Policy |
| :--- | :--- | :--- |
| **WhatsApp Cloud API** | Delivery timeout / rate limit | Fall back immediately to SMS via Twilio / Gupshup |
| **Twilio SMS** | Carrier failure / route down | Fall back to Gupshup secondary SMS gateway |
| **Firebase FCM Push** | Device token expired / APNS drop | Fall back to transactional email via Amazon SES |
| **Google Routes API** | Quota exceeded / API error | Fall back to cached distance matrix / straight-line estimation |
| **HyperVerge KYC API** | Vendor outage / 5xx error | Mark status `PENDING_REVIEW` and route to human moderator |
| **Primary AI Provider** | Rate limit / inference timeout | Fall back to secondary lighter LLM provider via AI Gateway |

---

# 45. QUEUE PRIORITY HIERARCHY

```text
P0 — EMERGENCY (SOS triggers, responder dispatch, emergency contact SMS)
P1 — TRANSACTIONAL (Booking passes, payment receipts, instant login OTPs)
P2 — SOCIAL & REALTIME (Match alerts, group recruitment, chat push)
P3 — PARTNER OPERATIONS (Host booking notifications, room lock alerts)
P4 — CRM & MARKETING (Abandoned cart, travel gazette, loyalty points)
P5 — ANALYTICS & LOGS (Telemetry aggregation, search demand indexing)
```
Marketing and CRM queues must NEVER block or starve P0 emergency or P1 transactional execution workers.

---

# 46. SCALING n8n ON AWS ECS FARGATE

- **Editor vs Worker Decoupling:** The n8n Webhook Intake runs as independent ECS Fargate tasks behind the AWS Application Load Balancer.
- **Horizontal Auto-Scaling:** Workers scale out automatically based on Redis BullMQ queue depth ($> 100\text{ jobs}$ triggers +2 worker tasks).
- **Graceful Shutdown:** Workers finish active workflow executions before container termination during auto-scaling events.

---

# 47. FULL CROSS-PRD BUTTON MAPPING MATRIX

Every user interaction in PRD 1 corresponds to a validated backend transaction in PRD 2 and an automated workflow in PRD 3:

| Frontend Button / View (PRD 1) | Backend Endpoint (PRD 2) | Backend Domain Event | Automation Workflow (PRD 3) |
| :--- | :--- | :--- | :--- |
| **Sign Up / Register** | `POST /auth/register` | `user.created` | `01_Identity/user.onboarding.v1` |
| **Verify Identity (KYC)** | `POST /kyc/submit` | `kyc.submitted` | `02_KYC_Trust/kyc.status_update.v1` |
| **Book Stay (Step 6)** | `POST /payments/webhook` | `booking.confirmed` | `04_Booking/booking.confirmed.v1` |
| **Abandon Checkout** | `POST /bookings/hold-expired`| `checkout.hold_expired` | `10_CRM/checkout.abandoned_cart.v1` |
| **Create Group Trip** | `POST /trips` | `trip.created` | `06_Trip/trip.itinerary_enrich.v1` |
| **Join Travel Group** | `POST /groups/:id/join` | `group.member_requested`| `08_Group_Community/group.recruitment.v1`|
| **Swipe Like (Mutual Match)** | `POST /matching/swipe` | `matching.mutual_match` | `07_Matching/match.notification.v1` |
| **Add Shared Expense** | `POST /wallet/expenses` | `wallet.split_created` | `11_Wallet/wallet.split_alert.v1` |
| **🚨 SOS Emergency Trigger** | `POST /safety/sos` | `sos.created` (P0 Queue) | `13_Emergency/safety.sos_dispatch.v1` |
| **Submit Verified Review** | `POST /reviews` | `review.published` | `05_Tourism/review.reflection_digest.v1`|

---

# 48. PRODUCTION READINESS CHECKLIST FOR AUTOMATION

- [x] **Authoritative State Isolation:** n8n has zero direct database connections and cannot modify tables without backend API validation.
- [x] **HMAC-SHA256 Webhook Signatures:** All backend $\to$ n8n webhooks cryptographically signed with timestamp replay validation.
- [x] **Idempotency Guarantees:** Redis-backed duplicate suppression prevents duplicate notifications and workflow executions.
- [x] **Deterministic SOS Emergency Path:** Emergency alerts operate rule-first with P0 worker priority and zero AI dependency.
- [x] **PII Minimization Standard:** No raw Aadhaar, PAN, or full credit card numbers ever enter n8n execution history.
- [x] **Secrets in AWS Secrets Manager:** Zero hardcoded API keys; all provider credentials dynamically injected at runtime.
- [x] **Multi-Channel Notification Redundancy:** Automatic SMS fallback if WhatsApp delivery fails; quiet hours enforced for marketing.
- [x] **Dead-Letter Queue & Circuit Breakers:** Automatic circuit breaking and DLQ routing prevent cascading external provider failures.

---

### Master Automation & AI Orchestration Specification Summary
*This document establishes the authoritative automation architecture for AuricVista. PRD 1 defines the user experience, PRD 2 defines authoritative domain reality, and PRD 3 defines the intelligent, scalable orchestration layer that connects them.*
