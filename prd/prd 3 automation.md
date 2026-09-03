# AURICVISTA

## PRODUCT REQUIREMENTS DOCUMENT — AUTOMATION, AI ORCHESTRATION & WORKFLOW SYSTEM

> [!NOTE]
> **DOCUMENT METADATA**
> - **Document Type:** Technical Product Requirements Document
> - **PRD Number:** 3 of 3
> - **Scope:** Automation architecture, n8n workflows, AI orchestration, webhooks, event routing, notifications, CRM, scheduled workflows, external integrations and operational automation
> - **Primary Automation Platform:** n8n
> - **Primary Backend:** TypeScript + NestJS
> - **Primary Frontend:** React + TypeScript
> - **Architecture Model:** Event-Driven + Backend-Controlled Automation
> - **Status:** Master PRD — Directly integrated with PRD 1 and PRD 2

# 1. PURPOSE OF THIS PRD

This document defines the complete automation layer of AuricVista.

It answers:

- What should be automated?
- What should **not** be automated?
- Which frontend actions trigger automation?
- Which backend events trigger automation?
- How does n8n connect to the backend?
- Where does AI participate?
- Which workflows require human approval?
- How are notifications controlled?
- How are failures handled?
- How are workflows scaled?
- How are duplicate executions prevented?
- How are safety and SOS workflows handled?
- How do all automation domains connect without creating workflow chaos?
This PRD must be implemented together with:

```text
PRD 1
FRONTEND & USER EXPERIENCE
        ↓
User clicks / submits / interacts
        ↓
PRD 2
BACKEND & CORE SYSTEM
        ↓
Validates action + updates authoritative state
        ↓
Event / Queue / Webhook
        ↓
PRD 3
AUTOMATION & AI ORCHESTRATION
        ↓
n8n / AI / External APIs / Notifications
        ↓
Controlled Backend Update
        ↓
Realtime Frontend Update
```

**The central architecture from the R&D is explicit: backend owns transactions and authoritative state; n8n owns business-process orchestration, integrations, notifications, CRM, approvals and retries; AI/external systems provide specialized capabilities. AuricVista_RnD_Automation_Master_v2_4_Professional.pdfPDF**

# 2. FINAL AUTOMATION PRINCIPLE

**AuricVista must not build hundreds of disconnected workflows.**

The automation architecture should be:

```text
CENTRAL EVENT ORCHESTRATOR
            │
            ▼
      DOMAIN ENGINES
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Stay      Trip      Matching
Safety    CRM       Property
            │
            ▼
INTELLIGENCE ENGINES
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Intent    Ranking    AI Agent
Fraud     Memory     Recommendations
            │
            ▼
       CONTROL LAYER
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Consent   Approval   Security
Admin     Audit      Escalation
            │
            ▼
     OPERATIONS LAYER
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Monitoring Retry     Cost
Analytics Recovery   Alerts
```

This structure directly follows the R&D architecture of a central orchestrator, domain engines, intelligence engines, control layer and operations layer.

# 3. AUTOMATION RESPONSIBILITY BOUNDARY

This is the most important rule in PRD 3.

## Backend owns

```text
Authentication
Authorization
Users
KYC state
Database state
Inventory
Booking transactions
Payments
Financial calculations
Trip state
Group membership
Matching state
Chat permissions
SOS incidents
Emergency state
```

## n8n owns

```text
Event orchestration
Scheduled workflows
Notifications
CRM
Re-engagement
Partner follow-ups
Approval routing
Async integrations
Retries
Operational workflows
Workflow escalation
```

## AI owns

```text
Intent understanding
Recommendations
Summaries
Planning
Natural-language interaction
Classification
Bounded tool selection
Explanations
```

## External systems provide

```text
KYC
Maps
Weather
Payments
Messaging
Speech
Moderation
```

The source architecture specifically states that transaction-critical, high-frequency and latency-sensitive operations remain in the backend, while n8n handles orchestration, asynchronous business processes, integrations, CRM, notifications, scheduled jobs and AI tool coordination. Auric_Travel_AI_Features.pdfPDF

# 4. WHAT MUST NEVER BE LEFT TO N8N

n8n must not become the authoritative source of truth for:

- booking confirmation,
- inventory availability,
- payment success,
- refund authority,
- KYC verification truth,
- user permissions,
- match ownership,
- group membership,
- financial calculations,
- SOS incident truth.
Bad architecture:

```text
User
 ↓
Frontend
 ↓
n8n
 ↓
Database directly
```

Correct architecture:

```text
User
 ↓
Frontend
 ↓
Backend API
 ↓
Validation
 ↓
Database Transaction
 ↓
Domain Event
 ↓
n8n
 ↓
Automation
```

The R&D conclusion is clear: AuricVista should not put the entire application inside n8n; the strongest production boundary keeps backend authoritative and uses n8n to coordinate meaningful business processes.

# 5. PRIMARY AUTOMATION PLATFORM

## Selected Platform: n8n

AuricVista will use:

**n8n as the primary business automation and integration orchestration layer.**

The R&D comparison selected n8n as the strongest primary fit because of integration capability, custom logic, self-hosting, webhook support and cost/control characteristics.

# 6. WHY n8n IS USED

n8n is appropriate for:

- webhook triggers,
- API orchestration,
- scheduled workflows,
- notifications,
- CRM,
- approval flows,
- external integrations,
- AI tool coordination,
- operational automation.
It is** not** selected as the core transactional engine.

# 7. HIGH-LEVEL AUTOMATION ARCHITECTURE

```text
                         AURICVISTA
                              │
                              ▼
                        REACT FRONTEND
                              │
                     User Interaction
                              │
                              ▼
                     NESTJS BACKEND
                              │
                  Domain Event Created
                              │
                    Transactional Outbox
                              │
                              ▼
                       EVENT QUEUE
                              │
                              ▼
                 AUTOMATION EVENT INTAKE
                              │
                              ▼
                 CENTRAL EVENT ORCHESTRATOR
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
                              │
                              ▼
                   CONTROLLED BACKEND APIs
                              │
                              ▼
                       STATE UPDATE
                              │
                              ▼
                    REALTIME FRONTEND
```

# 8. CENTRAL EVENT CONTRACT

Every automation-triggering event must have a standard structure.

```text
{
  "event_id": "evt_123456",
  "event_name": "booking.confirmed",
  "event_version": "1.0",
  "timestamp": "2026-09-01T10:00:00Z",
  "source": "booking-service",
  "correlation_id": "corr_abc123",
  "idempotency_key": "booking_123_confirmed",
  "user_id": "user_123",
  "payload": {}
}
```

Mandatory fields:

| Field | Purpose |
| --- | --- |
| event_id | Unique event identity |
| event_name | Stable event type |
| event_version | Payload compatibility |
| timestamp | Event timing |
| source | Originating backend domain |
| correlation_id | End-to-end tracing |
| idempotency_key | Duplicate prevention |
| payload | Domain-specific data |

The R&D production checklist explicitly requires stable event names, payload versions, timestamps, source, correlation IDs and idempotency keys. AuricVista_RnD_Automation_Master_v2_4_Professional.pdfPDF

# 9. CENTRAL AUTOMATION EVENT INTAKE

All events should enter through a controlled intake layer.

```text
Backend Event
      ↓
Webhook / Queue Consumer
      ↓
Authentication / Signature Check
      ↓
Schema Validation
      ↓
Duplicate Check
      ↓
Event Classification
      ↓
Domain Router
      ↓
Specific Workflow
```

The central orchestrator should not contain all business logic.

Its responsibility is:

- receive event,
- validate event,
- identify domain,
- route to the correct workflow.
# 10. DOMAIN AUTOMATION ENGINES

AuricVista automation will be organized into the following engines:

```text
01. Identity & Onboarding Engine
02. KYC & Trust Engine
03. Stay & Property Engine
04. Booking Lifecycle Engine
05. Tourism & Itinerary Engine
06. Trip Automation Engine
07. Matching Engine
08. Group & Community Engine
09. Communication Engine
10. CRM & Intent Engine
11. Wallet & Budget Engine
12. Safety Monitoring Engine
13. Emergency & SOS Engine
14. Partner Operations Engine
15. AI Agent Orchestration Engine
16. Search Intelligence Engine
17. Moderation & Trust Engine
18. Admin & Operations Engine
19. Recovery & Failure Engine
20. Analytics & Experimentation Engine
```

# 11. FRONTEND → BACKEND → AUTOMATION CONNECTION MODEL

Every automation must be traceable to a real product action.

The standard pattern:

```text
FRONTEND BUTTON
      ↓
BACKEND API
      ↓
VALIDATION
      ↓
DATABASE STATE
      ↓
DOMAIN EVENT
      ↓
AUTOMATION WORKFLOW
      ↓
EXTERNAL ACTION / AI / NOTIFICATION
      ↓
BACKEND UPDATE IF REQUIRED
      ↓
FRONTEND REALTIME UPDATE
```

There should never be an ambiguous workflow where developers cannot identify:

- what triggered it,
- who owns the state,
- what happens on failure,
- how it is retried.
# 12. AUTOMATION ENGINE 1 — USER ONBOARDING

## Frontend Trigger

User completes:

```text
Sign Up
        ↓
Account Created
```

## Backend Event

```text
user.created
```

## Automation Flow

```text
user.created
      ↓
Check onboarding state
      ↓
Determine missing steps
      ↓
Create onboarding journey
      ↓
Send appropriate next-step prompt
      ↓
Wait for action
      ↓
Check completion
      ↓
Stop completed reminders
```

## Possible Onboarding Steps

```text
Account Created
     ↓
Profile
     ↓
Preferences
     ↓
Verification if required
     ↓
First Intent Selection
     ↓
Feature Discovery
```

## Important Rule

Do not spam every user.

The automation must stop reminders when:

- onboarding completed,
- user explicitly dismissed,
- user becomes inactive beyond campaign window.
# 13. AUTOMATION ENGINE 2 — KYC & TRUST

## Frontend Trigger

```text
Complete Verification
```

## Backend

```text
POST /kyc/start
```

## Event

```text
kyc.submitted
```

## Workflow

```text
kyc.submitted
      ↓
Provider Processing
      ↓
Webhook Received by Backend
      ↓
Backend Validates Result
      ↓
KYC State Updated
      ↓
kyc.verified / kyc.requires_action
      ↓
Automation
      ↓
User Notification
```

## Exception Workflow

```text
KYC Failure
      ↓
Check Provider Error
      ↓
Temporary Failure?
   ┌──────┴──────┐
  YES           NO
   ↓             ↓
Retry        Create Review Case
   ↓             ↓
Success?     Human Review Queue
```

## Automation Responsibilities

- status notification,
- missing document reminders,
- exception routing,
- manual review alerts,
- retry scheduling.
The source responsibility matrix assigns KYC exception workflows and onboarding notifications to n8n, while the backend retains user identity and verification state.

# 14. AUTOMATION ENGINE 3 — SEARCH → INTENT

AuricVista should understand meaningful user intent.

Example:

```text
User searches:
"Affordable PG near Christ University"
```

Backend records:

```text
search.performed
```

Automation/intelligence may evaluate:

- query intent,
- repeat searches,
- filters,
- property views,
- saves,
- booking attempts.
## Intent Flow

```text
Search
  ↓
Event Log
  ↓
Intent Engine
  ↓
Intent Strength Score
  ↓
Eligible Recommendation?
  ↓
YES
  ↓
Relevant Result / Offer
```

The R&D defines intent detection as a reusable engine across Stay, Tourism, PG, Group, Booking and trip-planning journeys rather than separate abandonment logic for each product.

# 15. AUTOMATION ENGINE 4 — ABANDONED JOURNEY

Applicable to:

```text
Stay Search
PG Search
Booking
Group Join
Trip Planning
```

## Example

```text
User Searches
      ↓
Views Property
      ↓
Saves Property
      ↓
Starts Booking
      ↓
Leaves
      ↓
Intent Detection
      ↓
Wait Period
      ↓
Still Incomplete?
      ↓
YES
      ↓
Relevant Reminder
```

## Suppression Rules

Do not send if:

- booking completed,
- user explicitly rejected,
- property unavailable,
- notification limit reached,
- user opted out.
# 16. AUTOMATION ENGINE 5 — PROPERTY DISCOVERY

Frontend action:

```text
View Property
Save Property
Compare Property
Start Booking
```

Backend events:

```text
property.viewed
property.saved
property.compared
booking.started
```

Automation can:

- track intent,
- detect repeated interest,
- trigger relevant follow-up,
- notify partner about serious inquiry where appropriate.
Automation must not independently alter property inventory.

# 17. AUTOMATION ENGINE 6 — BOOKING LIFECYCLE

## Trigger

```text
booking.confirmed
```

## Workflow

```text
booking.confirmed
       ↓
Create Communication Plan
       ↓
Confirmation Notification
       ↓
Add Booking to Trip Context
       ↓
Schedule Check-In Reminder
       ↓
Schedule Departure Reminder
       ↓
After Stay → Review Request
```

## Booking Cancellation

```text
booking.cancelled
       ↓
Check Refund State
       ↓
Notify User
       ↓
Cancel Scheduled Reminders
       ↓
Trigger Waitlist if Applicable
       ↓
Update CRM State
```

The R&D responsibility mapping assigns booking transaction state to backend and sync, notifications, CRM and follow-up to automation. Auric_Travel_AI_Features.pdfPDF

# 18. AUTOMATION ENGINE 7 — TOURISM & ITINERARY

Frontend actions:

```text
Create Trip
Add Place
Save Place
Generate Plan
Confirm Day Plan
```

Backend events:

```text
trip.created
itinerary.item_added
itinerary.updated
```

## Scheduled Automation

```text
Trip Upcoming
      ↓
Weather Check
      ↓
Traffic / Route Context
      ↓
Important Change?
   ┌──────┴──────┐
  NO            YES
   ↓             ↓
Nothing      Notify User
```

## Example

```text
Trip: Coorg
Day: 2
Place: Abbey Falls
24 Hours Before
      ↓
Weather Check
      ↓
Heavy Rain?
      ↓
YES
      ↓
Send Contextual Alert
      ↓
Suggest Alternative
```

The automation layer schedules weather checks, traffic buffers and departure reminders, while itinerary CRUD and booking ties remain backend responsibilities.

# 19. AUTOMATION ENGINE 8 — GROUP CREATION

Frontend:

```text
Create Group
```

Backend:

```text
POST /groups
```

Event:

```text
group.created
```

## Automation

```text
group.created
      ↓
Check Required Information
      ↓
Check Group Readiness
      ↓
Generate Recruitment Plan
      ↓
Activate Discovery
      ↓
Monitor Membership
```

# 20. GROUP RECRUITMENT AUTOMATION

When group capacity is not filled:

```text
Group Created
      ↓
Recruitment Period
      ↓
Membership Progress
      ↓
Below Threshold?
      ↓
YES
      ↓
Discovery Boost / Reminder
```

The backend still owns:

- membership,
- eligibility,
- join requests.
Automation handles:

- recruitment alerts,
- reminders,
- waitlist escalation,
- inactivity checks.
# 21. AUTOMATION ENGINE 9 — GROUP INACTIVITY

Scheduled workflow:

```text
Every Defined Interval
      ↓
Check Group Activity
      ↓
Inactive Beyond Threshold?
      ↓
YES
      ↓
Check Suppression Rules
      ↓
Send Group Prompt
```

Example:

“Your Coorg group hasn't finalized Day 2 yet.”

Do not:

- spam inactive users,
- send duplicate reminders,
- trigger every day without policy.
# 22. AUTOMATION ENGINE 10 — GROUP DECISION SUPPORT

Frontend:

```text
Create Poll
Vote
Propose Activity
```

Backend events:

```text
proposal.created
vote.updated
```

Automation:

```text
Proposal Created
      ↓
Wait for Voting Window
      ↓
Enough Votes?
   ┌──────┴──────┐
  YES           NO
   ↓             ↓
Notify        Reminder
Decision
```

# 23. AUTOMATION ENGINE 11 — MATCHING

Frontend:

```text
Swipe Right
```

Backend:

```text
POST /matches/swipe
```

Backend decides:

```text
Mutual Match?
```

If yes:

```text
match.created
```

Automation:

```text
match.created
      ↓
Create Notification
      ↓
Check Communication Permissions
      ↓
Deliver Match Notification
      ↓
Optional Onboarding Prompt
```

Automation does not create the match.

# 24. MATCH CONVERSATION ACTIVATION

After a match:

```text
match.created
      ↓
No First Message?
      ↓
Wait
      ↓
Still No Interaction?
      ↓
Optional Low-Frequency Prompt
```

Example:

“You both share an interest in budget travel to the mountains.”

This must remain optional and suppression-controlled.

# 25. FLATMATE MATCHING AUTOMATION

Backend owns:

- profiles,
- preferences,
- swipe history,
- match state.
AI/intelligence can produce:

```text
Compatibility Score
Lifestyle Similarity
Budget Compatibility
Location Fit
```

Automation can:

- notify users,
- schedule reminders,
- follow up on pending conversations.
The source architecture explicitly places vibe compatibility and flatmate match scoring in the AI/external intelligence layer while matching state remains backend-owned.

# 26. AUTOMATION ENGINE 12 — CHAT & COMMUNICATION

The automation layer should not replace the realtime chat system.

Chat messages should flow directly:

```text
User
 ↓
Backend
 ↓
Database
 ↓
WebSocket
 ↓
Recipient
```

Automation is used for secondary events:

- unread reminders,
- group announcements,
- support escalation,
- safety communication.
# 27. CENTRAL COMMUNICATION ENGINE

All domains must use one communication policy.

Supported channels:

```text
IN_APP
PUSH
EMAIL
SMS
WHATSAPP
```

The R&D specifically defines a centralized communication layer for booking confirmations, trip reminders, itinerary changes, group updates, cancellations, KYC status, support and feedback, with duplicate suppression and quiet periods.

# 28. CHANNEL SELECTION ENGINE

The system should decide based on:

```text
Importance
Urgency
User Preference
Consent
Quiet Hours
Previous Delivery
Action Completed?
```

Example:

### Normal

```text
Trip Reminder
→ Push
```

### Important

```text
Booking Confirmation
→ In-App + Push + Email
```

### Critical opted-in escalation

```text
Safety Incident
→ Push + SMS / Emergency Contact
```

WhatsApp should remain reserved for important and opted-in communication.

# 29. NOTIFICATION SUPPRESSION ENGINE

Every automation must check:

```text
Has User Already Completed Action?
Has Notification Already Been Sent?
Is User in Quiet Period?
Has User Opted Out?
Has Notification Limit Been Reached?
```

Then:

```text
SEND
or
SUPPRESS
```

This prevents notification fatigue.

# 30. AUTOMATION ENGINE 13 — TRIP WALLET

Frontend actions:

```text
Add Expense
Split Expense
Set Budget
```

Backend events:

```text
expense.created
budget.updated
budget.threshold_reached
```

## Automation

```text
Expense Created
      ↓
Budget Recalculated by Backend
      ↓
Threshold Reached?
      ↓
YES
      ↓
Budget Alert
```

## Settlement Reminder

```text
Trip Completed
      ↓
Outstanding Balances?
      ↓
YES
      ↓
Settlement Reminder
```

AI may categorize expenses or parse voice, but split math remains deterministic backend logic.

# 31. AUTOMATION ENGINE 14 — SAFETY MONITORING

This is different from SOS.

Safety monitoring supports active trips.

Possible inputs:

```text
Trip Schedule
Check-In Time
User Response
Optional Location Context
Itinerary Progress
```

## Flow

```text
Safety Mode Enabled
      ↓
Scheduled Check-In
      ↓
User Responds?
   ┌──────┴──────┐
  YES           NO
   ↓             ↓
Update       Gentle Reminder
Status            ↓
              Still Missing?
                   ↓
              Controlled Escalation
```

The R&D explicitly states that normal delays should not automatically become emergencies and requires duplicate suppression and controlled escalation.

# 32. AUTOMATION ENGINE 15 — SOS & EMERGENCY

Frontend button:

```text
🚨 SOS
```

Backend:

```text
POST /safety/sos
```

Backend immediately creates:

```text
SOS INCIDENT
```

Then:

```text
sos.created
```

triggers automation.

# 33. SOS AUTOMATION FLOW

```text
SOS BUTTON
     ↓
BACKEND
     ↓
Create Incident
     ↓
Capture Authorized Context
     ↓
sos.created
     ↓
AUTOMATION
     ↓
Notify Admin Emergency Queue
     ↓
Notify Emergency Contacts
     ↓
Send Location Context Where Authorized
     ↓
Activate Communication Fallback
     ↓
Track Delivery
     ↓
Failure Escalation
```

# 34. EMERGENCY AI ASSISTANT

AI can assist with:

- concise guidance,
- emergency procedure retrieval,
- nearby resource information,
- speech-to-text.
AI must not:

- independently classify an emergency as resolved,
- decide whether official help is unnecessary,
- override human operators.
The R&D explicitly defines SOS as a deterministic rule-first pipeline where AI assists with information and official responders/human admins remain authoritative. AuricVista_RnD finallll.pdfPDF

# 35. LOCATION-BASED EMERGENCY AUTOMATION

Where authorized:

```text
SOS
 ↓
Location Context
 ↓
Active Trip / Stay Context
 ↓
Nearby Emergency Resources
 ↓
Authorized Contact Options
 ↓
Admin Queue
```

Fallback:

```text
Primary Provider Failure
        ↓
Secondary Contact Method
        ↓
Admin Alert
        ↓
Incident Remains Open
```

# 36. AUTOMATION ENGINE 16 — PROPERTY PARTNER OPERATIONS

Partner events:

```text
property.created
listing.submitted
inventory.stale
inquiry.created
booking.confirmed
guest.checkin_upcoming
review.pending
```

## Listing Workflow

```text
Partner Submits Listing
       ↓
Backend Creates Listing
       ↓
listing.submitted
       ↓
Automation
       ↓
Quality / Completeness Check
       ↓
Requires Human Review?
       ↓
Admin Queue
```

# 37. PROPERTY INQUIRY AUTOMATION

```text
Guest Inquiry
      ↓
Partner Notification
      ↓
AI Suggestion Optional
      ↓
Partner Approval
      ↓
Reply
```

AI may draft replies.

The partner or controlled backend workflow remains responsible for final actions.

# 38. STALE INVENTORY AUTOMATION

Scheduled:

```text
Inventory Last Updated
       ↓
Threshold Exceeded?
       ↓
YES
       ↓
Partner Reminder
       ↓
Still Stale?
       ↓
Escalation
```

The R&D explicitly includes stale inventory alerts, check-in reminders and review requests as automation responsibilities for the Stay/Property domain.

# 39. AUTOMATION ENGINE 17 — CRM & LIFECYCLE

The CRM engine receives meaningful events.

Examples:

```text
user.created
search.performed
property.saved
booking.started
booking.confirmed
trip.created
group.joined
match.created
```

It creates a controlled lifecycle state.

## Example Lifecycle

```text
NEW_USER
   ↓
ACTIVATED
   ↓
EXPLORING
   ↓
HIGH_INTENT
   ↓
CONVERTED
   ↓
ACTIVE_TRAVELER
   ↓
RETURNING_USER
```

These states should be event-derived, not manually guessed.

# 40. NEXT-BEST-ACTION ENGINE

The system may determine:

```text
User Context
      ↓
Intent Strength
      ↓
Eligibility
      ↓
Available Actions
      ↓
Best Relevant Action
```

Examples:

```text
Recommend Stay
Recommend Group
Remind Booking
Suggest Trip Planning
```

Do not automatically send an action without suppression and relevance checks.

# 41. AUTOMATION ENGINE 18 — PERSONAL AI AGENT

AuricVista should expose one coherent AI assistant.

Not:

```text
20 random visible AI bots
```

Instead:

```text
AURIC AI
   │
   ├── Travel Planning Capability
   ├── Stay Discovery Capability
   ├── Budget Capability
   ├── Navigation Capability
   ├── Group Capability
   ├── Support Capability
   └── Safety Assistance Capability
```

The R&D explicitly recommends one Personal AI Agent with multiple internal capabilities rather than uncontrolled agent proliferation. AuricVista_RnD finallll.pdfPDF

# 42. AI AGENT REQUEST FLOW

Frontend:

```text
AI Chat
```

***↓***

Backend:

```text
POST /ai/chat
```

***↓***

AI Gateway:

```text
Authenticate
```

***↓***

```text
Load Approved Context
```

***↓***

```text
Identify Intent
```

***↓***

```text
Select Allowed Tool
```

***↓***

```text
Call Backend Tool
```

***↓***

```text
Validate Result
```

***↓***

```text
Generate Response
```

# 43. AI CONTEXT SOURCES

Allowed context may include:

```text
User Preferences
Active Trip
Current Destination
Saved Places
Approved Booking Data
Group Context
Wallet Summary
```

The AI should receive only context necessary for the current request.

# 44. AI TOOL ORCHESTRATION

Example:

User:

“Plan a 3-day Coorg trip under** *₹***15,000.”

Flow:

```text
AI Request
    ↓
Intent = Trip Planning
    ↓
Retrieve Destination Context
    ↓
Weather / Places APIs
    ↓
Budget Constraint
    ↓
Generate Draft
    ↓
Return Proposal
```

Nothing is committed until user action.

# 45. AI ACTION CONFIRMATION

For consequential actions:

```text
AI Suggestion
      ↓
User Review
      ↓
Confirm
      ↓
Backend API
      ↓
State Change
```

Examples:

- booking,
- payment,
- trip modification,
- cancellation.
AI should not silently execute consequential actions.

# 46. AUTOMATION ENGINE 19 — SEARCH INTELLIGENCE

AI can parse:

```text
"cheap stay near Cubbon Park for two people"
```

into:

```text
{
  "location": "Cubbon Park",
  "budget": "low",
  "guests": 2,
  "category": "stay"
}
```

Then:

```text
AI Structured Output
        ↓
Backend Validation
        ↓
Search Service
        ↓
Results
```

The R&D defines Search Intelligence as parsing free-text into structured filters using intent understanding and external geocoding/vector capabilities. AuricVista_RnD finallll.pdfPDF

# 47. AUTOMATION ENGINE 20 — RANKING & RECOMMENDATION

V1 flow:

```text
Candidate Results
       ↓
Hard Constraints
       ↓
Deterministic Ranking
       ↓
Personalization Signals
       ↓
AI Explanation
```

AI should initially explain recommendations rather than become the sole authority deciding critical ranking.

# 48. AUTOMATION ENGINE 21 — FRAUD & MODERATION

Events:

```text
profile.created
media.uploaded
message.reported
listing.submitted
```

Workflow:

```text
Content Submitted
      ↓
Automated Screening
      ↓
Risk Score
      ↓
Low Risk → Continue
Medium Risk → Review Queue
High Risk → Restrict + Human Review
```

# 49. HUMAN APPROVAL WORKFLOWS

Certain decisions require humans.

Examples:

```text
KYC Exception
Fraud Case
Safety Incident
Commercial Promotion
Major Property Violation
High-Risk Account Action
```

Workflow:

```text
Automation Detects Case
        ↓
Create Review Request
        ↓
Admin Notification
        ↓
Human Decision
        ↓
Backend API
        ↓
State Updated
```

The R&D production controls specifically call for human approval in high-impact identity, commercial, fraud and safety decisions. AuricVista_RnD_Automation_Master_v2_4_Professional.pdfPDF

# 50. AUTOMATION ENGINE 22 — ADMIN & OPERATIONS

Automation should help operations teams with:

- incident alerts,
- workflow failures,
- KYC review queues,
- moderation queues,
- provider failures,
- retry scheduling.
# 51. ERROR WORKFLOW

Every production workflow requires a failure path.

```text
Workflow Failure
      ↓
Classify Error
      ↓
Retryable?
   ┌──────┴──────┐
  YES           NO
   ↓             ↓
Retry       Create Incident
   ↓             ↓
Success?    Admin Queue
```

Failed executions must never disappear silently.

The R&D explicitly requires failed executions to become visible incidents or retry work rather than silent loss. AuricVista_RnD_Automation_Master_v2_4_Professional.pdfPDF

# 52. RETRY POLICY

Use:

```text
Retry 1 → Short Delay
Retry 2 → Longer Delay
Retry 3 → Longer Delay
Final Failure → Incident Queue
```

Use exponential backoff.

Do not retry indefinitely.

# 53. IDEMPOTENCY

Every side-effect workflow requires protection.

Example:

```text
booking.confirmed
```

may arrive twice.

Automation checks:

```text
idempotency_key
```

If already processed:

```text
STOP
```

This prevents duplicate:

- notifications,
- coupons,
- messages,
- incidents.
# 54. DUPLICATE SUPPRESSION

Notification workflows require a separate duplicate key.

Example:

```text
user_id
+
notification_type
+
entity_id
+
time_window
```

Example:

```text
user_123
booking_confirmation
booking_999
```

must not produce multiple confirmations.

# 55. WEBHOOK SECURITY

Every backend** *→*** n8n or external webhook requires:

```text
Signature
Timestamp
Event ID
Idempotency Key
Correlation ID
Payload Version
```

Validation:

```text
Webhook Received
      ↓
Signature Valid?
      ↓
Timestamp Valid?
      ↓
Duplicate?
      ↓
Schema Valid?
      ↓
Process
```

# 56. SECRETS MANAGEMENT

Never:

```text
API_KEY = "hardcoded-key"
```

Use approved secret management.

Secrets include:

- KYC credentials,
- payment credentials,
- AI keys,
- messaging keys,
- database credentials.
The R&D explicitly requires approved credential/secret management and prohibits hard-coded secrets. AuricVista_RnD_Automation_Master_v2_4_Professional.pdfPDF

# 57. PII MINIMIZATION

n8n should not receive the entire user profile.

Only pass required information.

Bad:

```text
{
  "entire_user_record": {}
}
```

Better:

```text
{
  "user_id": "123",
  "notification_preference": "push",
  "trip_id": "456"
}
```

Sensitive data such as KYC, location and emergency context should be minimized.

# 58. WORKFLOW VERSIONING

Required environments:

```text
DEVELOPMENT
    ↓
STAGING
    ↓
PRODUCTION
```

Every major workflow must have:

- version,
- change history,
- rollback strategy.
Never directly experiment in production.

# 59. WORKFLOW NAMING STANDARD

Recommended:

```text
DOMAIN.ACTION.VERSION
```

Examples:

```text
booking.confirmed.v1
trip.departure-reminder.v1
group.inactivity-check.v1
kyc.exception-review.v1
safety.missed-checkin.v1
```

# 60. FOLDER STRUCTURE

```text
AuricVista Automation
│
├── 00_Core
│   ├── Event Intake
│   ├── Router
│   └── Error Handler
│
├── 01_Identity
├── 02_KYC_Trust
├── 03_Stay_Property
├── 04_Booking
├── 05_Tourism
├── 06_Trip
├── 07_Matching
├── 08_Group_Community
├── 09_Communication
├── 10_CRM
├── 11_Wallet
├── 12_Safety
├── 13_Emergency
├── 14_AI
├── 15_Search
├── 16_Moderation
├── 17_Admin
├── 18_Analytics
└── 99_Error_Recovery
```

# 61. AUTOMATION MONITORING

Every workflow should expose:

```text
Execution Count
Success Rate
Failure Rate
Average Latency
Retry Count
Provider Errors
Cost
Business Outcome
```

# 62. BUSINESS OUTCOME METRICS

Automation should not be evaluated only by:

Workflow succeeded.

It should measure:

### Booking Automation

```text
Reminder → Booking Completion Rate
```

### Group Automation

```text
Recruitment Reminder → Membership Conversion
```

### CRM

```text
Re-engagement → Return Rate
```

### AI

```text
Recommendation → Acceptance Rate
```

### Safety

```text
Check-in → Response Rate
False Escalation Rate
```

The R&D requires automation to expose success, failure, conversion, quality and operational impact. AuricVista_RnD finallll.pdfPDF

# 63. AI OBSERVABILITY

Log:

```text
AI Request ID
Feature
Model
Prompt Version
Latency
Token Usage
Cost
Tool Calls
Fallback
User Acceptance
User Rejection
```

This allows model evaluation without blindly assuming the AI is working.

# 64. PROVIDER FALLBACK MATRIX

| Provider | Primary Failure | Fallback |
| --- | --- | --- |
| AI | Timeout | Deterministic response / retry |
| Weather | API failure | Cached data / no enhancement |
| Maps | Failure | Secondary provider / basic location |
| KYC | Provider unavailable | Retry / manual review |
| Messaging | Delivery failure | Alternate channel |
| Payment | Provider issue | Preserve pending state |
| Moderation | API failure | Human review |

The R&D explicitly requires provider fallback behavior for KYC, maps, weather, messaging and AI failures. AuricVista_RnD_Automation_Master_v2_4_Professional.pdfPDF

# 65. AUTOMATION LATENCY REQUIREMENTS

Automation should be categorized.

## Real-Time Critical

```text
SOS
Safety Alert
Match Notification
```

Target:

```text
Immediate / Seconds
```

## Near Real-Time

```text
Booking Confirmation
Group Update
Chat Reminder
```

Target:

```text
Seconds
```

## Deferred

```text
CRM
Review Requests
Re-engagement
Analytics
```

Target:

```text
Minutes / Scheduled
```

# 66. QUEUE PRIORITY

Recommended priority:

```text
P0 — Emergency
P1 — Transaction Communication
P2 — User Interaction
P3 — Partner Operations
P4 — CRM
P5 — Analytics
```

Marketing workflows must never delay emergency workflows.

# 67. SCALING n8n

As traffic grows:

```text
Load Balancer
       ↓
Webhook Workers
       ↓
n8n Workers
       ↓
Queue
       ↓
External APIs
```

Requirements:

- concurrency limits,
- queue monitoring,
- worker scaling,
- webhook load testing.
The R&D explicitly requires webhook path load testing and appropriate concurrency/scaling architecture. AuricVista_RnD_Automation_Master_v2_4_Professional.pdfPDF

# 68. RATE LIMIT PROTECTION

External APIs have limits.

Automation must implement:

```text
Rate Limit Awareness
Queueing
Batching
Backoff
Circuit Breaking
```

Example:

```text
1000 notifications
```

should not trigger:

```text
1000 simultaneous provider calls
```

without provider capacity controls.

# 69. CIRCUIT BREAKERS

Example:

```text
Weather API
    ↓
Repeated Failure
    ↓
Circuit Opens
    ↓
Stop Requests Temporarily
    ↓
Fallback
    ↓
Health Check
    ↓
Circuit Closes
```

# 70. AUTOMATION AUDIT TRAIL

Every consequential workflow must store:

```text
Workflow ID
Execution ID
Trigger Event
User / Entity
Action
Result
Timestamp
Retry Count
Correlation ID
```

# 71. AUTOMATION → BACKEND WRITE RULE

n8n may call backend APIs.

It should not directly modify production tables.

Correct:

```text
n8n
 ↓
Authenticated Backend API
 ↓
Authorization
 ↓
Validation
 ↓
Domain Service
 ↓
Database
```

# 72. AUTOMATION API PERMISSIONS

Each automation credential should have limited scope.

Example:

```text
automation.notification.write
automation.trip.read
automation.crm.write
```

Do not use:

```text
SUPER_ADMIN_TOKEN
```

for all workflows.

# 73. FULL CROSS-PRD BUTTON MAPPING

## Authentication

```text
PRD 1
Login Button
      ↓
PRD 2
POST /auth/login
      ↓
PRD 3
Onboarding / Lifecycle Automation
```

## KYC

```text
PRD 1
Verify Identity
      ↓
PRD 2
KYC Service
      ↓
PRD 3
Status + Exception + Review Automation
```

## Booking

```text
PRD 1
Book Now
      ↓
PRD 2
Booking Transaction
      ↓
PRD 3
Confirmation + Reminder + Review
```

## Group

```text
PRD 1
Join Group
      ↓
PRD 2
Join Request
      ↓
PRD 3
Notification + Waitlist + Inactivity
```

## Matching

```text
PRD 1
Swipe
      ↓
PRD 2
Matching Engine
      ↓
PRD 3
Match Notification
```

## Trip

```text
PRD 1
Create Trip
      ↓
PRD 2
Trip State
      ↓
PRD 3
Weather + Reminder + Planning Automation
```

## Wallet

```text
PRD 1
Add Expense
      ↓
PRD 2
Ledger Calculation
      ↓
PRD 3
Budget Alert + Settlement Reminder
```

## SOS

```text
PRD 1
SOS Button
      ↓
PRD 2
SOS Incident Created
      ↓
PRD 3
Emergency Notification + Escalation
```

# 74. CORE WORKFLOW INVENTORY

## Priority 1 — Must Build First

- Central Event Intake
- Event Router
- Error Recovery Workflow
- User Onboarding
- KYC Status Workflow
- Search ***→*** Intent
- Search ***→*** Abandonment
- Booking ***→*** Communication
- Trip ***→*** Reminder
- Group ***→*** Recruitment
- Match ***→*** Notification
- Central Communication Engine
- Deterministic SOS Notification
- Admin Failure Alert
This directly aligns with the R&D's recommended first milestone: event contract, central routing, search recommendation/abandonment workflows, booking communication, property approval, deterministic SOS and production controls.

# 75. PRIORITY 2

- Property stale inventory
- Partner inquiry automation
- Group inactivity
- Waitlist escalation
- Budget overrun
- Settlement reminder
- Review request
- CRM lifecycle
- Safety check-ins
- Moderation workflow
# 76. PRIORITY 3

- Advanced AI recommendations
- Next-best-action engine
- Advanced fraud detection
- Predictive engagement
- Demand prediction
- Advanced personalization
# 77. PRODUCTION READINESS CHECKLIST

## Event Architecture

- Stable event names
- Versioned payloads
- Correlation IDs
- Idempotency keys
- Event validation
## Security

- Signed webhooks
- Scoped credentials
- Secret management
- PII minimization
## Reliability

- Retry policy
- Exponential backoff
- Circuit breakers
- Dead-letter/error path
## Operations

- Monitoring
- Alerting
- Execution history
- Failure dashboard
## Human Control

- Approval workflows
- Admin queues
- Escalation path
- Rollback capability
## AI

- Tool restrictions
- Context control
- Cost tracking
- Fallbacks
- Acceptance metrics
# 78. FINAL AUTOMATION ARCHITECTURE

```text
┌───────────────────────────────────────────────┐
│                 PRD 1 FRONTEND                │
│                                               │
│ React Mobile / Desktop                        │
│                                               │
│ Buttons • Forms • Swipe • Chat • SOS          │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                 PRD 2 BACKEND                 │
│                                               │
│ NestJS • PostgreSQL • Redis • WebSockets      │
│                                               │
│ Auth • Booking • Matching • Groups • Wallet   │
│ KYC • Safety • Permissions • Transactions     │
└───────────────────────┬───────────────────────┘
                        │
                  DOMAIN EVENTS
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             EVENT / AUTOMATION LAYER          │
│                                               │
│ Event Intake                                  │
│ Validation                                    │
│ Idempotency                                   │
│ Routing                                       │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                  n8n ENGINES                  │
│                                               │
│ Stay • Trip • Matching • CRM • Safety         │
│ Property • Notifications • Admin • Recovery   │
└───────────────────────┬───────────────────────┘
                        │
             ┌──────────┼───────────┐
             ▼          ▼           ▼
┌───────────────┐ ┌──────────┐ ┌──────────────┐
│ AI / RAG      │ │ External │ │ Human/Admin  │
│ Intelligence  │ │ Providers│ │ Approvals    │
└───────┬───────┘ └────┬─────┘ └──────┬───────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
               BACKEND CONTROLLED API
                       │
                       ▼
                 AUTHORITATIVE STATE
                       │
                       ▼
                 REALTIME FRONTEND
```

# 79. THE THREE PRDs — FINAL RELATIONSHIP

## PRD 1 — FRONTEND

Defines:

What the user sees and does.

Includes:

- mobile-first UX,
- onboarding,
- KYC,
- stays,
- trips,
- groups,
- swiping,
- matching,
- chat,
- wallet,
- safety,
- SOS.
## PRD 2 — BACKEND

Defines:

How AuricVista stores, validates and controls reality.

Includes:

- APIs,
- authentication,
- authorization,
- database,
- transactions,
- matching,
- bookings,
- KYC,
- realtime,
- security,
- scalability.
## PRD 3 — AUTOMATION

Defines:

What happens automatically after meaningful events.

Includes:

- event routing,
- n8n,
- AI orchestration,
- notifications,
- CRM,
- reminders,
- partner workflows,
- safety escalation,
- external APIs,
- retries,
- monitoring,
- approvals.
### 🔒 AURICVISTA — FINAL AUTOMATION & AI ORCHESTRATION PRINCIPLE

> AuricVista will implement automation as a controlled event-driven orchestration layer rather than a collection of disconnected workflows. React frontend actions will always pass through the authoritative NestJS backend, where permissions, transactions and application state are validated before meaningful domain events are emitted. n8n will act as the primary automation orchestrator for asynchronous workflows, notifications, CRM, scheduled jobs, external integrations, partner operations, retries and controlled escalation, but will never become the source of truth for bookings, payments, inventory, permissions, financial calculations or emergency state. AI will operate through a bounded gateway with approved context and typed backend tools, providing intelligence, planning, recommendations and assistance without owning critical decisions. Every workflow must be versioned, observable, idempotent, retry-safe, permission-scoped and recoverable. High-impact identity, commercial, fraud and safety actions will support human approval, while emergency workflows remain deterministic and rule-first. The final architecture ensures that PRD 1 defines the experience, PRD 2 defines the authoritative system, and PRD 3 defines the intelligent orchestration connecting both into one scalable AuricVista platform.
