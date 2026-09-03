# AURICVISTA

## PRODUCT REQUIREMENTS DOCUMENT — BACKEND & SCALABLE TECHNICAL ARCHITECTURE

> [!NOTE]
> **DOCUMENT METADATA**
> - **Document Type:** Technical Product Requirements Document
> - **Scope:** Backend, APIs, databases, realtime systems, security, scalability, integrations and system architecture
> - **Primary Frontend:** React + TypeScript
> - **Recommended Backend:** TypeScript + Node.js + NestJS
> - **Primary Database:** PostgreSQL
> - **Cache / Realtime Support:** Redis
> - **Automation Layer:** n8n via controlled webhooks/events
> - **Status:** Master Backend PRD — Corresponds directly to PRD 1 Frontend

# 1. PURPOSE OF THIS PRD

This document defines how the AuricVista backend must support the complete frontend product defined in PRD 1.

The backend is responsible for authoritative application state.

That includes:

- identity,
- authentication,
- authorization,
- KYC status,
- profiles,
- stays,
- PGs,
- properties,
- inventory,
- bookings,
- payments,
- trips,
- itineraries,
- groups,
- memberships,
- matching,
- swipe history,
- chat permissions,
- expenses,
- wallets,
- notifications,
- safety,
- SOS incidents,
- moderation,
- reviews,
- search,
- ranking,
- analytics,
- consent,
- audit logs.
The R&D architecture explicitly separates backend/core responsibilities from workflow automation and AI/external engines. For example, matching databases and swipe history remain backend-owned, while recruitment alerts and inactive-group checks are workflow responsibilities; compatibility scoring is an AI/intelligence capability.

# 2. CORE BACKEND PRINCIPLE

## The backend is the source of truth.

The architecture must follow:

```text
React Frontend
      │
      ▼
API Gateway / Backend
      │
      ├── Authentication & Authorization
      ├── Domain Services
      ├── Database
      ├── Cache
      ├── Realtime Gateway
      │
      ▼
Domain Events
      │
      ├───────────────┐
      ▼               ▼
Queue / Outbox       Internal Consumers
      │
      ▼
n8n / Automation
      │
      ▼
External APIs / AI / Notifications
```

The critical principle is:

**Frontend requests actions. Backend validates and owns state. Events communicate meaningful state changes. Automation performs asynchronous orchestration. AI assists through bounded tools but never becomes the authoritative owner of critical product state.**

This matches the R&D's final architecture principle of central orchestration, reusable domain intelligence, controlled safety, observability and minimal workflow sprawl.

# 3. SYSTEM ARCHITECTURE DECISION

## 3.1 Recommended Initial Architecture

**AuricVista should not begin as dozens of microservices.**

Recommended V1 architecture:

**Modular Monolith + Event-Driven Architecture**

This means:

```text
One Deployable Backend
        │
        ├── Auth Module
        ├── User Module
        ├── Profile Module
        ├── KYC Module
        ├── Property Module
        ├── Inventory Module
        ├── Booking Module
        ├── Trip Module
        ├── Group Module
        ├── Matching Module
        ├── Chat Module
        ├── Wallet Module
        ├── Payment Module
        ├── Safety Module
        ├── Notification Module
        ├── Search Module
        ├── AI Gateway
        └── Admin Module
```

Each module has:

- clear domain boundaries,
- its own services,
- repositories,
- events,
- API contracts.
Later, high-load modules can be extracted independently.

# 4. WHY NOT START WITH MICROSERVICES?

AuricVista has many domains, but that does not automatically justify microservices.

Starting with microservices would introduce:

- distributed transactions,
- deployment complexity,
- service discovery,
- network failures,
- tracing complexity,
- duplicated infrastructure,
- difficult local development.
The better initial architecture is:

```text
MODULAR MONOLITH
        +
EVENT BOUNDARIES
        +
QUEUE / OUTBOX
        ↓
MEASURE BOTTLENECKS
        ↓
EXTRACT SERVICES ONLY WHEN REQUIRED
```

Likely future extraction candidates:

- Chat
- Search
- Notification
- AI Gateway
- Media Processing
- Safety Operations
- Matching/Recommendation
# 5. RECOMMENDED TECHNOLOGY STACK

## 5.1 Frontend

```text
React
TypeScript
```

As defined in PRD 1.

## 5.2 Backend

Recommended:

```text
Node.js
+
TypeScript
+
NestJS
```

### Why

- same TypeScript ecosystem as frontend,
- easier shared types/contracts,
- modular architecture,
- dependency injection,
- WebSocket support,
- background processing support,
- scalable team structure.
## 5.3 Primary Database

```text
PostgreSQL
```

PostgreSQL should be the authoritative transactional database.

Used for:

- users,
- profiles,
- properties,
- bookings,
- trips,
- groups,
- matches,
- expenses,
- payments,
- safety incidents,
- audit records.
## 5.4 ORM

Recommended:

```text
Prisma
```

or another strongly typed ORM.

Requirements:

- migrations,
- transaction support,
- typed schema,
- relation handling,
- audit-friendly database changes.
## 5.5 Cache

```text
Redis
```

Used for:

- caching,
- rate limiting,
- temporary sessions,
- realtime presence,
- distributed locks where justified,
- queue support.
Redis must not become the permanent source of business truth.

## 5.6 Object Storage

Use S3-compatible object storage.

Used for:

- profile images,
- property images,
- KYC documents,
- chat media,
- trip media.
The database stores metadata and access references.

## 5.7 Queue

Recommended architecture:

```text
Backend
   ↓
Transactional Outbox
   ↓
Event Publisher
   ↓
Queue
   ↓
Consumers / Automation
```

The queue prevents slow external dependencies from blocking user requests.

# 6. SYSTEM RESPONSIBILITY BOUNDARIES

This is one of the most important architectural decisions.

| Responsibility | Owner |
| --- | --- |
| Authentication | Backend |
| Authorization | Backend |
| User data | Backend |
| KYC state | Backend |
| Booking state | Backend |
| Inventory | Backend |
| Payment state | Backend |
| Matching state | Backend |
| Swipe history | Backend |
| Group membership | Backend |
| Chat permission | Backend |
| Expense calculations | Backend |
| SOS incident | Backend |
| Automation execution | n8n |
| Reminder scheduling | n8n |
| External integrations | Backend + n8n |
| AI reasoning | AI Gateway |
| AI tool access | Backend-controlled |
| Notifications | Backend-triggered / automation-delivered |
| Emergency decisions | Deterministic backend + human operations |

The R&D explicitly recommends that authentication, authorization, booking consistency, payments, inventory, calculations and emergency state remain deterministic application responsibilities rather than automation or LLM responsibilities. Auric_Travel_AI_Features.pdfPDF

# 7. DOMAIN ARCHITECTURE

AuricVista backend will contain the following primary domains.

```text
AURICVISTA BACKEND
│
├── Identity & Access
├── User & Profile
├── KYC & Trust
├── Stay & Property
├── Inventory & Availability
├── Booking
├── Payments
├── Tourism & Destination
├── Trip & Itinerary
├── Matching
├── Groups
├── Communication
├── Community
├── Wallet & Expenses
├── Search
├── Ranking & Recommendations
├── AI Gateway
├── Safety & SOS
├── Notifications
├── Reviews
├── Moderation
├── CRM & Intent
└── Admin & Operations
```

# 8. IDENTITY & AUTHENTICATION MODULE

## Responsibilities

- registration,
- login,
- OTP verification,
- password reset where applicable,
- session management,
- token generation,
- device/session control.
## Core Flow

```text
React App
   ↓
POST /auth/login
   ↓
Authentication Service
   ↓
Identity Verification
   ↓
Session Created
   ↓
Access Token + Refresh Token
```

## Requirements

Support:

- phone authentication,
- email authentication,
- OTP,
- social authentication if enabled.
## Security Requirements

- short-lived access tokens,
- refresh token rotation,
- device/session tracking,
- suspicious login detection,
- logout from all devices,
- brute-force protection,
- rate limiting.
# 9. AUTHORIZATION

Authentication answers:

Who are you?

Authorization answers:

What are you allowed to do?

## Role Model

Initial roles:

```text
USER
PARTNER
PROPERTY_MANAGER
MODERATOR
SUPPORT_AGENT
SAFETY_OPERATOR
ADMIN
SUPER_ADMIN
```

## Authorization Model

Use:

```text
RBAC
+
Resource Ownership Checks
+
Contextual Policies
```

Example:

A user may be allowed to:

```text
EDIT_TRIP
```

But only if:

```text
user_id == trip.creator_id
```

or they have collaborative edit permission.

# 10. USER & PROFILE DOMAIN

## Core Entities

```text
users
profiles
profile_preferences
travel_preferences
stay_preferences
privacy_settings
consent_records
```

## User Table

Contains:

- ID,
- authentication identity,
- account state,
- role,
- created date.
Avoid placing all profile information directly into the user table.

## Profile

Contains:

- display name,
- bio,
- profile image,
- location preferences,
- travel identity.
## Preferences

Should be modular.

A user may have:

```text
Travel Preferences
Stay Preferences
Matching Preferences
Notification Preferences
Privacy Preferences
```

# 11. USER BRAIN / PERSONALIZATION DATA

AuricVista should maintain a distinction between:

### Stable Preferences

Examples:

- budget preference,
- favorite travel style,
- accommodation preference.
### Current Intent

Examples:

- currently searching Bangalore PG,
- currently planning Goa trip.
### Session Behavior

Examples:

- viewed five properties,
- dismissed two groups.
The R&D specifically recommends maintaining stable preferences separately from current intent and session behavior so users can move between Stay, Travel Group, Couple and PG contexts without creating disconnected identities.

# 12. KYC & TRUST MODULE

## Purpose

Verification must support:

- flatmate matching,
- group organizers,
- property hosts/partners,
- other trust-sensitive features.
The R&D explicitly identifies identity verification as required for stay hosts, flatmates and group trip organizers, with step-up verification and manual review fallback.

## KYC Architecture

```text
Frontend
   ↓
Consent
   ↓
Backend Creates Verification Session
   ↓
Secure Upload
   ↓
KYC Provider
   ↓
Webhook
   ↓
Backend Validates Webhook
   ↓
KYC Status Updated
   ↓
Domain Event
   ↓
Frontend / Automation
```

## KYC States

```text
NOT_STARTED
IN_PROGRESS
SUBMITTED
UNDER_REVIEW
VERIFIED
REQUIRES_ACTION
REJECTED
EXPIRED
```

## Critical Rule

The frontend must never determine:

VERIFIED

The backend is authoritative.

# 13. KYC DOCUMENT SECURITY

KYC documents must:

- use encrypted storage,
- have restricted access,
- use signed URLs,
- avoid public storage,
- have retention policies,
- generate audit records.
Never expose raw KYC documents through normal user profile APIs.

# 14. TRUST ENGINE

The Trust Engine should aggregate signals.

Possible signals:

- KYC status,
- account age,
- verified contact,
- moderation history,
- cancellation patterns,
- reports.
The trust score must not be exposed as an unexplained public number.

Instead expose policy-approved trust states.

Example:

```text
Identity Verified
```

# 15. PROPERTY & STAY DOMAIN

Core entities:

```text
properties
property_units
property_rooms
property_images
property_amenities
property_policies
property_locations
property_availability
property_rates
```

# 16. PROPERTY STATE MACHINE

```text
DRAFT
  ↓
SUBMITTED
  ↓
UNDER_REVIEW
  ↓
APPROVED
  ↓
PUBLISHED
```

Alternative states:

```text
REQUIRES_ACTION
SUSPENDED
ARCHIVED
```

# 17. INVENTORY & AVAILABILITY

Inventory is transactional.

The backend must own:

- availability,
- blocked dates,
- reservations,
- cancellations.
Automation must never independently change confirmed inventory state.

## Availability Flow

```text
Search Request
      ↓
Availability Service
      ↓
Property Inventory
      ↓
Cache if valid
      ↓
Return Availability
```

# 18. BOOKING DOMAIN

Booking requires strict state management.

Recommended states:

```text
DRAFT
PENDING_PAYMENT
PAYMENT_PROCESSING
CONFIRMED
CANCELLED
COMPLETED
REFUND_PENDING
REFUNDED
FAILED
```

## Booking Flow

```text
User Selects Property
        ↓
Availability Check
        ↓
Temporary Hold
        ↓
Payment Initiation
        ↓
Payment Provider
        ↓
Verified Webhook
        ↓
Booking Confirmation
        ↓
booking.confirmed Event
```

# 19. BOOKING CONSISTENCY

Critical operations require:

- transactions,
- idempotency keys,
- verified payment webhooks,
- state machines.
Never trust:

frontend payment success screen

as authoritative confirmation.

The technical blueprint explicitly identifies duplicate transactions as a risk requiring idempotency keys, internal state machines and verified webhooks.

# 20. PAYMENT DOMAIN

Payment service responsibilities:

- payment order creation,
- provider integration,
- webhook verification,
- transaction records,
- refunds,
- reconciliation.
## Payment Principles

```text
Frontend
   ↓
Payment Intent
   ↓
Payment Provider
   ↓
Verified Webhook
   ↓
Backend State Update
```

The frontend should never directly update:

```text
payment_status = SUCCESS
```

# 21. TOURISM & DESTINATION DOMAIN

Core entities:

```text
destinations
destination_media
places
activities
experiences
saved_places
destination_guides
```

## Responsibilities

- destination discovery,
- place data,
- experiences,
- saved locations,
- itinerary integration.
The R&D assigns place databases, itinerary CRUD, saved places and booking ties to the backend/core layer.

# 22. TRIP DOMAIN

Core entities:

```text
trips
trip_members
trip_days
itinerary_items
trip_preferences
trip_bookings
trip_media
```

## Trip Types

```text
SOLO
COUPLE
GROUP
```

The backend must support different permissions according to trip type.

# 23. ITINERARY DOMAIN

Each itinerary item should support:

```text
SUGGESTED
PLANNED
CONFIRMED
COMPLETED
CANCELLED
```

This corresponds directly to the frontend requirement that suggestions must be visually distinct from confirmed bookings.

# 24. COLLABORATIVE TRIP PLANNING

Backend entities:

```text
trip_proposals
proposal_options
votes
decision_states
```

## Flow

```text
Member Creates Proposal
       ↓
Backend Validates Membership
       ↓
Proposal Created
       ↓
proposal.created Event
       ↓
Realtime Update
       ↓
Members Vote
       ↓
Decision State Updated
```

The R&D specifically assigns realtime trip state and voting CRUD to the backend, while reminder and consensus triggers belong to workflow automation. AuricVista_RnD finallll.pdfPDF

# 25. GROUP DOMAIN

Core entities:

```text
groups
group_members
group_join_requests
group_roles
group_preferences
```

## Membership States

```text
REQUESTED
PENDING
APPROVED
DECLINED
WAITLISTED
LEFT
REMOVED
```

# 26. JOIN GROUP API FLOW

```text
POST /groups/:groupId/join
        ↓
Authentication
        ↓
Eligibility Validation
        ↓
Join Request Created
        ↓
group.join_requested
        ↓
Return Pending State
```

Automation may later handle:

- reminders,
- waitlist escalation,
- inactive group notifications.
But the backend owns membership truth.

# 27. MATCHING DOMAIN

AuricVista has multiple matching contexts.

```text
TRAVEL_COMPANION
FLATMATE
SOCIAL
GROUP_COMPATIBILITY
```

These should not share one uncontrolled matching table without context.

## Core Tables

```text
matching_profiles
matching_preferences
swipes
matches
match_contexts
compatibility_snapshots
```

# 28. SWIPE ARCHITECTURE

```text
User A
   ↓
Swipe Right
   ↓
POST /matches/swipe
   ↓
Validate Eligibility
   ↓
Check Existing Reciprocal Interest
   ↓
Create Match if Mutual
   ↓
match.created
```

## Swipe States

```text
LIKE
PASS
BLOCK
REPORT
```

# 29. MATCH CREATION

A match should be atomic.

The backend must ensure:

- duplicate matches cannot occur,
- blocked users cannot match,
- invalid profile visibility is respected,
- matching policy is satisfied.
# 30. COMPATIBILITY ENGINE

The backend stores compatibility inputs.

Example:

```text
travel_style
budget_range
destination_interest
activity_preferences
schedule
lifestyle_preferences
```

Compatibility scoring should return structured factors.

Example:

```text
{
  "score": 82,
  "factors": [
    "similar_budget",
    "shared_destination_interest",
    "similar_travel_pace"
  ]
}
```

The AI/intelligence layer may calculate or explain compatibility, but matching state remains backend-owned.

# 31. FLATMATE MATCHING

Flatmate matching requires additional constraints.

Possible attributes:

- location,
- budget,
- occupation,
- student/professional,
- lifestyle,
- food preference,
- sleep schedule,
- cleanliness.
Policy constraints must be validated server-side.

Never trust frontend filtering for safety restrictions.

# 32. CHAT DOMAIN

Core entities:

```text
conversations
conversation_members
messages
message_media
message_reports
```

## Conversation Types

```text
DIRECT
MATCH
GROUP
SUPPORT
PARTNER
```

# 33. CHAT PERMISSION MODEL

Before sending a message:

```text
User
 ↓
Conversation Membership Check
 ↓
Block Check
 ↓
Moderation / Policy Check
 ↓
Message Stored
 ↓
Realtime Event
```

# 34. REALTIME ARCHITECTURE

Recommended:

```text
React
   ⇅
WebSocket Gateway
   ↓
Chat / Realtime Service
   ↓
Database
   ↓
Event Bus
```

Realtime updates required for:

- chat,
- group membership,
- trip voting,
- match creation,
- booking updates where appropriate,
- safety status.
# 35. COMMUNITY DOMAIN

Core entities:

```text
community_posts
community_comments
community_reactions
community_reports
```

## Requirements

Support:

- destination discussions,
- travel opportunities,
- group recruitment,
- recommendations.
Moderation state must be backend-controlled.

# 36. WALLET & EXPENSE DOMAIN

The trip wallet should be implemented as a planning and ledger system.

Core tables:

```text
trip_budgets
expenses
expense_splits
settlements
budget_categories
```

# 37. EXPENSE CALCULATION

All arithmetic must be deterministic.

```text
Expense Amount
       ↓
Split Rules
       ↓
Backend Calculation
       ↓
Ledger Entries
       ↓
Balances
```

AI may:

- explain,
- categorize,
- parse voice.
AI must not be the final authority for financial calculations.

This follows the technical blueprint's explicit principle that calculations remain deterministic backend responsibilities.

# 38. SEARCH DOMAIN

Search supports:

- destinations,
- properties,
- PGs,
- groups,
- experiences.
## Search Architecture

```text
User Query
   ↓
Query API
   ↓
Intent / Filter Parser
   ↓
Structured Query
   ↓
Search Index
   ↓
Candidate Results
   ↓
Ranking
   ↓
Response
```

# 39. SEARCH INTELLIGENCE

Example:

```text
Affordable PG near Christ University
```

Can become:

```text
{
  "category": "PG",
  "location": "Christ University",
  "price_intent": "affordable"
}
```

The AI/parser should not directly query the database.

It produces structured output.

The backend validates it.

# 40. RANKING ENGINE

V1 should use deterministic weighted ranking.

Potential signals:

```text
Hard Constraints
Availability
Location
Price
Quality
Trust
User Preference
Historical Feedback
```

The R&D recommends deterministic weighted ranking before learning-to-rank, with AI used for explanation rather than authoritative ranking.

# 41. SEARCH PERFORMANCE TARGET

Recommended targets:

```text
Cached search p95: < 300 ms
Search query p95: < 800 ms
AI interpretation: ≤ 1 second target
Ranking: ≤ 300 ms target
```

Search should degrade gracefully if AI interpretation is unavailable.

Fallback:

```text
Natural Language Parser Fails
        ↓
Deterministic Keyword Search
```

# 42. AI GATEWAY

AuricVista should have one controlled AI gateway.

```text
Frontend
   ↓
Backend AI API
   ↓
Authentication
   ↓
Context Assembly
   ↓
Permission Check
   ↓
AI Router
   ↓
Allowed Tool Gateway
   ↓
Validated Result
```

# 43. AI ROUTING PRINCIPLE

Auric should use:

**One central AI router with specialized capabilities and bounded tools.**

Do not create many permanently active autonomous agents without measurable justification.

The source architecture recommends one user-facing Personal AI Agent with multiple internal capabilities, while deterministic services retain authority over transactional functions.

# 44. AI TOOL GATEWAY

The AI should never receive:

- direct database credentials,
- unrestricted API access,
- payment credentials,
- admin privileges.
Instead:

```text
AI
 ↓
Typed Tool Request
 ↓
Tool Gateway
 ↓
Authorization
 ↓
Validation
 ↓
Domain Service
```

# 45. PERSONAL AI CONTEXT

The AI gateway may access:

- stable preferences,
- current session intent,
- active trip context,
- permitted bookings,
- group context.
Only minimum necessary context should be assembled.

# 46. AI ACTION FLOW

Example:

```text
User:
"Add Abbey Falls to Day 2"
AI
 ↓
Identify Intent
 ↓
Create Proposed Action
 ↓
Frontend Confirmation
 ↓
Backend Validation
 ↓
Trip Updated
```

The AI should not silently modify important data.

# 47. SAFETY & SOS DOMAIN

Safety requires a separate deterministic architecture.

Core tables:

```text
emergency_contacts
safety_sessions
safety_checkins
sos_incidents
location_events
incident_actions
```

# 48. SOS FLOW

```text
User Presses SOS
       ↓
POST /safety/sos
       ↓
Authentication
       ↓
Create Incident
       ↓
Capture Allowed Context
       ↓
Incident Event
       ↓
Emergency Workflow
       ↓
Admin / Human Operations
       ↓
Status Updates
```

# 49. SOS PRINCIPLE

Emergency architecture must be:

**Deterministic and rule-first.**

AI may assist with:

- structured information,
- transcription,
- guidance.
AI must not independently decide emergency outcomes.

The R&D explicitly requires a deterministic rule-first SOS pipeline with AI assisting information while official responders and human admins handle emergency actions.

# 50. SAFETY CHECK-IN

Core states:

```text
SCHEDULED
CHECKED_IN
MISSED
ESCALATED
RESOLVED
```

Backend creates the authoritative state.

Automation may handle scheduled reminders and escalation.

# 51. NOTIFICATION DOMAIN

Core notification types:

```text
IN_APP
PUSH
EMAIL
SMS
WHATSAPP
```

## Architecture

```text
Domain Event
    ↓
Notification Preference Check
    ↓
Notification Request
    ↓
Queue
    ↓
Delivery Provider
```

# 52. NOTIFICATION PREFERENCES

Backend stores:

- channel,
- category,
- consent,
- suppression state.
Example categories:

```text
BOOKING
TRIP
GROUP
MATCH
SAFETY
MARKETING
ACCOUNT
```

# 53. IMPORTANT CHANNEL RULE

The R&D direction recommends:

- in-app/push for normal re-engagement,
- WhatsApp reserved for important and opted-in cases.
# 54. CRM & INTENT DOMAIN

The backend should record meaningful events.

Examples:

```text
destination.viewed
stay.viewed
stay.saved
search.performed
group.viewed
group.joined
booking.started
booking.completed
```

# 55. ABANDONMENT DETECTION

Do not trigger abandonment automation from one page view.

Backend should capture:

- depth,
- duration,
- repeated interest,
- action attempts,
- explicit dismissal,
- conversion.
The R&D specifically emphasizes meaningful intent detection rather than treating every incomplete interaction as abandonment.

# 56. EVENT ARCHITECTURE

Every important domain action should emit an event.

Examples:

```text
user.created
user.verified
kyc.submitted
kyc.verified
property.created
property.published
booking.created
booking.confirmed
booking.cancelled
trip.created
trip.updated
group.created
group.join_requested
group.member_joined
match.created
message.sent
expense.created
budget.overrun
sos.created
safety.checkin_missed
```

# 57. TRANSACTIONAL OUTBOX PATTERN

Important.

Do not:

```text
Database Update
+
Webhook Call
```

inside one unreliable request without protection.

Instead:

```text
Database Transaction
        │
        ├── Business State Update
        │
        └── Outbox Event Insert
                ↓
         Transaction Commits
                ↓
          Event Publisher
                ↓
              Queue
```

This reduces lost events.

# 58. WEBHOOK ARCHITECTURE

External systems will communicate through webhooks.

Examples:

- payment providers,
- KYC providers,
- notification providers,
- external booking systems.
## Webhook Requirements

Every webhook must have:

- signature verification,
- timestamp validation,
- idempotency,
- replay protection,
- audit logging.
# 59. WEBHOOK FLOW

```text
External Provider
       ↓
Webhook Endpoint
       ↓
Signature Validation
       ↓
Idempotency Check
       ↓
Event Normalization
       ↓
Domain Service
       ↓
Database Update
       ↓
Domain Event
```

# 60. AUTOMATION INTEGRATION CONTRACT

The backend connects to n8n through controlled events/webhooks.

Not:

```text
React → n8n directly
```

Correct:

```text
React
 ↓
Backend API
 ↓
Validated State Change
 ↓
Domain Event
 ↓
Queue / Webhook
 ↓
n8n
```

The automation blueprint identifies n8n as the primary platform for asynchronous integrations, notifications, CRM, abandoned flows, partner follow-ups and scheduled processes, while core application workflows remain backend + database + queue/outbox. Auric_Travel_AI_Features.pdfPDF

# 61. AUTOMATION WEBHOOK SECURITY

Automation webhooks require:

- signed payloads,
- event IDs,
- correlation IDs,
- retry policy,
- idempotency.
n8n must never receive unrestricted database access.

# 62. EXAMPLE — MATCH AUTOMATION CONNECTION

```text
Swipe Right
    ↓
Backend
    ↓
Mutual Match?
    ↓ YES
Match Created
    ↓
match.created Event
    ↓
Automation Webhook
    ↓
Create Notification
    ↓
Realtime Event
    ↓
Frontend Match Screen
```

# 63. EXAMPLE — KYC CONNECTION

```text
User Upload
   ↓
Backend
   ↓
KYC Provider
   ↓
Provider Webhook
   ↓
Backend Verification
   ↓
kyc.verified
   ↓
Automation
   ↓
Welcome / Status Notification
```

# 64. EXAMPLE — GROUP INACTIVITY

```text
Group State
   ↓
Backend Event Log
   ↓
Scheduled Workflow
   ↓
Check Activity
   ↓
Still Inactive?
   ↓
Reminder
```

The workflow does not independently decide group membership or modify core state without calling controlled backend APIs.

# 65. DATABASE DESIGN

Recommended logical database organization.

```text
identity
users
profiles
trust
properties
inventory
bookings
destinations
places
experiences
trips
itineraries
groups
matching
communication
community
wallet
payments
safety
moderation
notifications
analytics
admin
```

These can initially exist within PostgreSQL schemas or clearly separated module ownership.

# 66. CORE RELATIONSHIP MODEL

```text
USER
 │
 ├── PROFILE
 ├── PREFERENCES
 ├── VERIFICATION
 ├── BOOKINGS
 ├── TRIPS
 ├── GROUPS
 ├── MATCHES
 ├── CONVERSATIONS
 ├── EXPENSES
 └── SAFETY CONTACTS
```

# 67. DATA OWNERSHIP RULE

Each domain owns its authoritative records.

Example:

```text
Booking Module
owns booking state
Matching Module
owns match state
Group Module
owns membership
Safety Module
owns SOS incident state
```

Other modules should not directly modify domain tables.

Use domain services or events.

# 68. CACHING STRATEGY

Use Redis for:

- popular destination results,
- property availability reads where safe,
- session data,
- rate limits,
- temporary state.
Do not cache indefinitely.

## Cache Pattern

```text
Request
 ↓
Cache Hit?
 ├── Yes → Return
 └── No
      ↓
    Database
      ↓
    Cache
```

# 69. CACHE INVALIDATION

Critical state changes should invalidate relevant cache keys.

Examples:

```text
booking.confirmed
→ invalidate property availability
property.updated
→ invalidate property detail
profile.updated
→ invalidate personalization context
```

# 70. RATE LIMITING

Protect:

- authentication,
- OTP,
- KYC,
- search,
- AI,
- chat,
- webhooks.
Different limits per endpoint.

Example:

```text
Login Attempt
Strict Limit
Search
Higher Limit
AI
User Budget + Rate Limit
SOS
Never blocked by ordinary rate limiting
```

# 71. API ARCHITECTURE

Recommended initial API style:

```text
REST
+
WebSockets for Realtime
```

GraphQL can be reconsidered later if frontend composition complexity justifies it.

# 72. API VERSIONING

Use versioning:

```text
/api/v1/
```

Breaking changes require:

- versioning,
- migration window,
- deprecation.
# 73. API RESPONSE STANDARD

Recommended format:

```text
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error:

```text
{
  "success": false,
  "error": {
    "code": "BOOKING_NOT_AVAILABLE",
    "message": "This property is no longer available."
  }
}
```

# 74. FRONTEND API CONTRACT

Use typed contracts.

Recommended:

```text
TypeScript DTOs
+
OpenAPI Specification
```

Benefits:

- frontend type generation,
- documentation,
- validation,
- integration consistency.
# 75. INPUT VALIDATION

Every external input requires validation.

Examples:

- IDs,
- dates,
- prices,
- files,
- coordinates,
- pagination,
- filter values.
Never trust frontend validation alone.

# 76. FILE UPLOAD ARCHITECTURE

For images and documents:

```text
Frontend
   ↓
Request Upload URL
   ↓
Backend Authorization
   ↓
Signed Upload URL
   ↓
Object Storage
   ↓
Upload Complete Event
   ↓
Backend Metadata
```

This prevents routing large files through the main application unnecessarily.

# 77. MEDIA PROCESSING

Media pipeline:

```text
Upload
  ↓
Virus / Security Scan
  ↓
Moderation
  ↓
Optimization
  ↓
Thumbnail
  ↓
Publish
```

The original file should not automatically become public.

# 78. MODERATION DOMAIN

Moderation covers:

- profiles,
- messages,
- community posts,
- reviews,
- property listings,
- media.
The AI blueprint recommends dedicated moderation systems rather than relying on a general-purpose conversational LLM as the primary enforcement engine.

# 79. MODERATION STATES

```text
PENDING
APPROVED
FLAGGED
UNDER_REVIEW
REMOVED
```

# 80. HUMAN REVIEW QUEUE

Certain actions must enter human review.

Examples:

- KYC exception,
- serious safety incident,
- high-risk fraud,
- moderation appeal.
The backend must create a case.

Automation can notify operators.

# 81. ADMIN & OPERATIONS BACKEND

Admin modules:

```text
User Management
KYC Review
Property Review
Moderation
Safety Incidents
Support Cases
Automation Failures
AI Observability
System Configuration
Audit Logs
```

# 82. AUDIT LOGGING

Important actions require audit records.

Examples:

```text
admin.user_suspended
booking.refunded
kyc.manually_approved
property.rejected
sos.status_changed
```

Audit records should include:

- actor,
- action,
- timestamp,
- target,
- before state,
- after state.
# 83. SECURITY ARCHITECTURE

Security layers:

```text
Network Security
      ↓
Authentication
      ↓
Authorization
      ↓
Input Validation
      ↓
Domain Policy
      ↓
Audit Logging
      ↓
Monitoring
```

# 84. AI SECURITY PRINCIPLE

The LLM is not a security boundary.

The technical blueprint explicitly requires deterministic enforcement of authentication, authorization, tenant isolation, minimum-context retrieval, typed tools, validation, idempotency and human confirmation. Auric_Travel_AI_Features.pdfPDF

# 85. AI TOOL SECURITY

Each AI tool should define:

```text
Tool Name
Allowed Roles
Required Permissions
Input Schema
Output Schema
Side Effect?
Confirmation Required?
Rate Limit
```

Example:

```text
create_booking
Role:
USER
Permission:
BOOKING_CREATE
Confirmation:
REQUIRED
Idempotency:
REQUIRED
```

# 86. DATA PRIVACY

The system must support consent for:

- location,
- marketing,
- analytics/tracking where applicable.
The R&D explicitly calls for consent management aligned with GDPR/DPDP direction and retention controls.

# 87. LOCATION DATA

Location is sensitive.

Rules:

- explicit permission,
- purpose limitation,
- configurable sharing,
- retention policy.
SOS location handling may have separate safety policy.

# 88. DATA RETENTION

Each domain should define retention policies.

Examples:

```text
Chat Data
→ Policy Based
KYC Documents
→ Legal/Provider Requirement
Analytics Events
→ Defined Retention
Temporary Location
→ Short Retention
SOS Evidence
→ Incident Policy
```

# 89. SOFT DELETE VS HARD DELETE

Use soft deletion where required for:

- audit,
- compliance,
- recovery.
Hard deletion must follow retention and legal requirements.

# 90. OBSERVABILITY

Every request should receive:

```text
correlation_id
```

This ID travels through:

```text
Frontend
 → API
 → Database
 → Queue
 → Automation
 → AI
 → External API
```

# 91. APPLICATION OBSERVABILITY

Monitor:

- API latency,
- error rate,
- database latency,
- queue depth,
- WebSocket connections,
- cache hit rate,
- external API failures.
# 92. AI OBSERVABILITY

Record:

- feature,
- model/provider,
- prompt version,
- latency,
- token usage,
- tool calls,
- failures,
- fallback,
- acceptance.
The R&D explicitly requires AI prompts/completions, latency, cost and user acceptance/rejection feedback to be observable.

# 93. COST OBSERVABILITY

Track:

```text
Cost / Request
Cost / Successful Outcome
Cost / User
Cost / Feature
Fallback Cost
External API Cost
```

The technical blueprint emphasizes that cost per successful outcome is more useful than cost per request alone.

# 94. FAILURE HANDLING

External dependencies will fail.

Every integration requires:

- timeout,
- retry,
- exponential backoff,
- circuit breaker.
The R&D explicitly requires external API/webhook calls to implement exponential backoff and circuit breakers.

# 95. RETRY RULES

Not every operation can be blindly retried.

Safe retry:

```text
Notification delivery
Read-only external API
Idempotent webhook processing
```

Dangerous retry:

```text
Payment charge
Refund
Booking creation
```

These require idempotency.

# 96. CIRCUIT BREAKERS

Example:

```text
Weather API Fails Repeatedly
        ↓
Circuit Opens
        ↓
Fallback Data / No Weather Enhancement
        ↓
Retry Later
```

The entire application should not fail because one provider fails.

# 97. SCALABILITY STRATEGY

Scale layers independently.

```text
CDN
 ↓
Load Balancer
 ↓
Stateless API Instances
 ↓
Cache
 ↓
Database
 ↓
Queue Workers
 ↓
External Services
```

# 98. HORIZONTAL SCALING

Backend API must be stateless where possible.

This allows:

```text
1 Instance
```

***↓***

```text
5 Instances
```

***↓***

```text
20 Instances
```

without session inconsistency.

# 99. DATABASE SCALING ROADMAP

## V1

Single PostgreSQL primary.

## V2

- read replicas,
- improved indexes,
- partitioning selected tables.
## V3

Consider domain extraction or specialized storage based on actual bottlenecks.

# 100. SEARCH SCALING

Do not overload PostgreSQL with all full-text discovery workloads indefinitely.

Future search architecture:

```text
Database
   ↓
Search Index
   ↓
Candidate Retrieval
   ↓
Ranking
```

# 101. REALTIME SCALING

WebSocket infrastructure should support:

- horizontal instances,
- Redis pub/sub or equivalent,
- connection tracking.
# 102. DEPLOYMENT ENVIRONMENTS

Required:

```text
LOCAL
DEVELOPMENT
STAGING
PRODUCTION
```

Production credentials must never be used in development.

# 103. CI/CD

Pipeline:

```text
Code
 ↓
Lint
 ↓
Type Check
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
Security Scan
 ↓
Build
 ↓
Staging
 ↓
Production Approval
```

# 104. DATABASE MIGRATIONS

Database changes require:

- versioned migrations,
- backward compatibility where required,
- rollback strategy.
Never manually modify production schema without controlled migration.

# 105. FEATURE FLAGS

Feature flags required for:

- AI features,
- matching experiments,
- ranking changes,
- automation rollout,
- emergency enhancements.
This allows independent disabling.

The source architecture explicitly recommends independently disableable AI/automation behavior. Auric_Travel_AI_Features.pdfPDF

# 106. BACKUP & DISASTER RECOVERY

Requirements:

- automated backups,
- point-in-time recovery,
- restore testing,
- documented RPO/RTO.
Critical domains:

```text
Users
Bookings
Payments
Safety
KYC Metadata
```

must receive higher recovery priority.

# 107. V1 BACKEND MODULES

Mandatory:

```text
Auth
Users
Profiles
Preferences
KYC
Properties
Inventory
Bookings
Trips
Groups
Matching
Chat
Wallet
Notifications
Safety
Search
Admin
Event System
Automation Gateway
```

# 108. V2 BACKEND EXPANSION

```text
Advanced Recommendation
Partner Intelligence
Voice
Multilingual
Advanced CRM
Dynamic Pricing Suggestions
Review Intelligence
```

# 109. V3 BACKEND EXPANSION

```text
Learning to Rank
Predictive Risk
Demand Forecasting
Advanced Personalization
Predictive Operations
```

The AI roadmap similarly recommends starting with a reliable deterministic/AI spine and introducing data-driven optimization only after sufficient clean data and governance exist. Auric_Travel_AI_Features.pdfPDF

# 110. FRONTEND → BACKEND MAPPING

| Frontend Action | Backend Domain |
| --- | --- |
| Login | Auth |
| Profile Edit | Profile |
| KYC Upload | KYC |
| Search | Search |
| View Stay | Property |
| Book Stay | Booking |
| Create Trip | Trip |
| Join Group | Group |
| Vote | Trip/Group |
| Swipe | Matching |
| Match | Matching |
| Send Message | Chat |
| Add Expense | Wallet |
| SOS | Safety |
| Report Content | Moderation |
| Notification Settings | Notification |
| Partner Listing | Property |

# 111. BACKEND → AUTOMATION MAPPING

| Backend Event | Automation Example |
| --- | --- |
| user.created | Onboarding |
| kyc.submitted | Review status monitoring |
| booking.confirmed | Confirmation workflow |
| booking.cancelled | Waitlist workflow |
| group.join_requested | Organizer notification |
| group.inactive | Reminder |
| match.created | Connection notification |
| trip.upcoming | Departure reminder |
| budget.overrun | Budget alert |
| safety.checkin_missed | Escalation |
| review.created | Sentiment workflow |
| property.inventory_stale | Partner alert |

This follows the R&D responsibility matrix: backend owns transactional/domain data while n8n handles reminders, escalation triggers, scheduled checks and other asynchronous workflow behavior. AuricVista_RnD finallll.pdfPDF

# 112. BACKEND ACCEPTANCE CRITERIA

## Architecture

- Modular domain boundaries exist.
- Backend is authoritative for critical state.
- No direct frontend ***→*** automation critical workflow exists.
## Authentication

- Secure token/session lifecycle exists.
- Rate limiting exists.
- Device/session controls exist.
## Authorization

- RBAC implemented.
- Resource ownership validated server-side.
- Sensitive operations audited.
## KYC

- Verification state is backend-authoritative.
- Provider webhooks verified.
- Manual review supported.
## Booking

- Inventory consistency protected.
- Payment webhooks verified.
- Idempotency implemented.
## Matching

- Swipe history persists.
- Mutual matching is atomic.
- Block/report constraints enforced.
## Chat

- Conversation permission checked.
- Realtime updates supported.
- Moderation integration possible.
## Safety

- SOS is deterministic.
- Incident state auditable.
- Automation cannot independently fabricate emergency state.
## Automation

- Events are emitted reliably.
- Webhooks signed.
- Idempotency supported.
- Retries controlled.
## Scalability

- APIs stateless.
- Cache implemented selectively.
- Queue isolates slow workloads.
- Horizontal scaling possible.
# 113. FINAL BACKEND ARCHITECTURE

```text
                         AURICVISTA
                              │
                    ┌─────────┴─────────┐
                    │   REACT CLIENTS   │
                    │ Mobile + Desktop  │
                    └─────────┬─────────┘
                              │
                         API Gateway
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
     REST API            WebSocket              AI Gateway
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    MODULAR BACKEND CORE
                              │
 ┌──────────┬──────────┬──────┼──────┬──────────┬──────────┐
 │ Identity │ Property │ Trip │ Group│ Matching │ Safety   │
 │ Profile  │ Booking  │      │ Chat │ Wallet   │ Payments │
 └──────────┴──────────┴──────┴──────┴──────────┴──────────┘
                              │
                     PostgreSQL Database
                              │
                    Transactional Outbox
                              │
                         Event / Queue
                              │
             ┌────────────────┼────────────────┐
             │                │                │
           n8n          AI / External     Notifications
             │                │                │
        Async Workflows    Bounded Tools    Delivery Systems
```

### 🔒 AURICVISTA — FINAL BACKEND TECHNICAL PRINCIPLE

> AuricVista will use a modular, TypeScript-based backend architecture that begins as a scalable modular monolith with explicit domain boundaries and event-driven integration points. PostgreSQL will remain the authoritative transactional source of truth, while Redis, queues, realtime infrastructure and object storage provide supporting scalability layers. The backend will own identity, authorization, KYC state, inventory, booking consistency, payments, matching, group membership, financial calculations and emergency state. Every meaningful domain change will produce controlled events through an outbox/queue pattern, allowing n8n to handle asynchronous automation without becoming the owner of business truth. AI capabilities will operate through a permission-scoped gateway with typed tools, minimum context and deterministic backend validation. The architecture will prioritize idempotency, auditability, observability, circuit breakers, controlled retries, privacy and progressive service extraction only when measurable scale justifies it.
