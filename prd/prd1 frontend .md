# AURICVISTA

## PRODUCT REQUIREMENTS DOCUMENT — FRONTEND & MOBILE-FIRST PRODUCT EXPERIENCE

> [!NOTE]
> **DOCUMENT METADATA & IMPLEMENTATION TAXONOMY**
> - **Document Type:** Product Requirements Document + UX/Product Specification
> - **Scope:** Frontend, Mobile-First UX, User Journeys, Product Screens and Interaction Requirements
> - **Current Working Implementation:** Complete production client Single Page Application (SPA) built in Vanilla ES6+ modules (`index.html`, `js/app.js`, `js/components/*.js`, `styles/main.css`) served via Alpine Nginx container (`Dockerfile`).
> - **Target Architecture Direction:** React + TypeScript (Next.js-compatible modular component hierarchy).
> - **Migration Requirement:** The typed contracts, component states, and data models defined in this PRD serve as the strict specification for the React + TypeScript target architecture while governing the active Vanilla ES6 implementation.
> - **Primary Experience:** Mobile-first responsive application
> - **Secondary Experience:** Desktop responsive web experience
> - **Status:** Master Frontend PRD — Version 2.1 Synchronized
> - **Version:** 2.1


# 1. PRODUCT DEFINITION

## 1.1 What is AuricVista?

AuricVista is a connected travel, stay, tourism, community and compatibility platform.

It should not feel like:

- only a hotel booking website,
- only a travel planner,
- only a dating application,
- only a social network,
- or only a property marketplace.
It combines these experiences into one product ecosystem.

A user should be able to:

- discover destinations,
- find stays,
- search PGs,
- find compatible flatmates,
- discover local experiences,
- plan solo trips,
- plan couple trips,
- create group trips,
- join travel groups,
- discover compatible travel companions,
- match through a controlled swipe experience,
- chat after valid matching,
- collaboratively plan trips,
- manage shared expenses,
- discover community opportunities,
- receive travel assistance,
- manage bookings,
- access safety features,
- request emergency assistance,
- interact with property partners,
- review experiences and stays.
The product model is:

**Discover *→* Connect *→* Plan *→* Book *→* Travel *→* Stay Safe *→* Share *→* Return**

AuricVista should create continuity between these stages instead of forcing the user to move between unrelated applications.

# 2. PRODUCT VISION

## 2.1 Vision

Create a premium, elegant travel ecosystem where discovering a destination, finding people, finding accommodation, planning a trip and managing the actual travel experience happen inside one connected product.

The experience should feel:

- premium,
- calm,
- intentional,
- human,
- visually immersive,
- safe,
- practical,
- modern without looking futuristic for the sake of it.
The product should combine the strengths of:

### Travel platforms

For:

- destination discovery,
- stays,
- travel planning,
- bookings,
- property information,
- itinerary utility.
### Social and matching applications

For:

- profile discovery,
- compatibility,
- intentional matching,
- swiping,
- conversation initiation,
- community interaction.
### Productivity applications

For:

- collaborative planning,
- voting,
- expense splitting,
- reminders,
- trip coordination.
But AuricVista must not visually copy any one product.

The final product language must feel like one original ecosystem.

# 3. CORE PRODUCT PRINCIPLE

AuricVista has three visible product layers.

## Layer 1 — Explore

The user discovers:

- destinations,
- stays,
- PGs,
- activities,
- communities,
- people,
- travel opportunities.
## Layer 2 — Connect

The user connects with:

- travel groups,
- compatible travelers,
- flatmates,
- communities,
- property partners.
## Layer 3 — Experience

The user manages:

- trips,
- bookings,
- itineraries,
- expenses,
- communication,
- safety,
- reviews.
The frontend must make these layers feel connected.

A user should not feel that they have entered three separate products.

# 4. DESIGN DIRECTION

## 4.1 Primary Design Philosophy

The UI must feel like a professionally designed consumer travel product.

Avoid:

- excessive glowing effects,
- neon gradients,
- floating glass cards everywhere,
- generic AI-generated dashboard layouts,
- oversized rounded containers for every element,
- excessive animations,
- fake futuristic interfaces,
- visible “AI-generated” aesthetic patterns.
Use:

- strong photography,
- editorial typography,
- controlled spacing,
- premium dark surfaces,
- restrained gold accents,
- clear hierarchy,
- real-world visual context,
- intentional motion.
# 5. VISUAL IDENTITY

## 5.1 Primary Color Palette

### Primary Background

**Deep Black / Charcoal**

Used for:

- navigation,
- premium sections,
- immersive hero areas,
- overlays,
- high-focus screens.
### Primary Accent

**Auric Gold**

Used selectively for:

- important CTAs,
- active states,
- premium highlights,
- selected actions,
- compatibility indicators,
- progress states.
Gold must not be used everywhere.

If everything is gold, nothing feels premium.

### Supporting Background

**Warm White / Off-White**

Used for:

- reading-heavy screens,
- forms,
- property details,
- reviews,
- itinerary planning,
- settings.
### Neutral Colors

Use a restrained neutral scale for:

- borders,
- secondary text,
- disabled states,
- dividers,
- form surfaces.
## 5.2 Visual Ratio

Recommended visual balance:

- 55–65% dark/black visual identity
- 25–35% warm white/light surfaces
- 5–10% gold accents
Gold is an accent, not a background system.

# 6. TYPOGRAPHY

Typography should feel editorial and premium.

Use two conceptual layers:

### Display Typography

Used for:

- destinations,
- hero titles,
- important section headings,
- emotional travel storytelling.
Characteristics:

- elegant,
- confident,
- high contrast.
### Interface Typography

Used for:

- navigation,
- cards,
- forms,
- buttons,
- metadata.
Characteristics:

- highly readable,
- modern,
- compact,
- neutral.
The interface must prioritize readability over visual experimentation.

# 7. DESIGN INSPIRATION MODEL

AuricVista should combine interaction patterns from multiple product categories.

## Travel Experience Inspiration

Use travel marketplace conventions for:

- destination imagery,
- search,
- filters,
- stay cards,
- availability,
- booking flows,
- itinerary information.
## Matching Experience Inspiration

Use modern compatibility app conventions for:

- profile cards,
- controlled swipe gestures,
- match moments,
- profile prompts,
- compatibility indicators,
- chat entry.
## Community Experience Inspiration

Use community product conventions for:

- groups,
- discussions,
- events,
- member lists,
- join requests.
## Important Rule

Do not combine all patterns on one screen.

The user experience should change according to context.

Example:

### Travel Discovery

Should feel immersive and exploratory.

### Swipe Matching

Should feel focused and personal.

### Group Planning

Should feel collaborative and organized.

### Booking

Should feel deterministic and trustworthy.

### SOS

Should feel extremely simple and urgent.

# 8. MOBILE-FIRST DESIGN REQUIREMENT

AuricVista must be designed** mobile-first**.

Desktop is an adaptation of the product.

Mobile is not a reduced version of desktop.

## 8.1 Mobile Priorities

Every primary screen must answer:

- Can this be used with one hand?
- Is the primary action visible without excessive scrolling?
- Is important information understandable in a few seconds?
- Can the user recover from mistakes?
- Are destructive actions protected?
- Is the bottom navigation sufficient for primary movement?
## 8.2 Mobile Navigation Model

Recommended primary navigation:

```text
Explore | Trips | Connect | Inbox | Profile
```

Alternative context-specific actions can appear inside these areas.

## 8.3 Bottom Navigation

### Explore

Destination, stays, experiences and recommendations.

### Trips

Current trips, saved trips and planning.

### Connect

Travel groups, matching, community and flatmate discovery.

### Inbox

Messages, group chat, requests and important activity.

### Profile

User profile, verification, settings, preferences and safety.

# 9. RESPONSIVE EXPERIENCE

## Mobile

Primary design target.

## Tablet

Adaptive layout.

Use:

- wider cards,
- split content panels,
- expanded itinerary views.
## Desktop

Use:

- larger editorial hero imagery,
- multi-column discovery,
- richer property comparison,
- side panels for planning.
Desktop must not simply stretch the mobile interface.

# 10. INFORMATION ARCHITECTURE

```text
AURICVISTA
│
├── Explore
│   ├── Destinations
│   ├── Stays
│   ├── PG & Student Stay
│   ├── Experiences
│   ├── Local Discovery
│   └── Search
│
├── Trips
│   ├── Create Trip
│   ├── My Trips
│   ├── Solo
│   ├── Couple
│   ├── Group
│   ├── Itinerary
│   ├── Budget
│   └── Trip Wallet
│
├── Connect
│   ├── Travel Groups
│   ├── Travel Matching
│   ├── Swipe Discovery
│   ├── Flatmate Matching
│   ├── Community
│   └── Opportunities
│
├── Inbox
│   ├── Direct Messages
│   ├── Match Requests
│   ├── Group Chat
│   ├── Partner Messages
│   └── Support
│
├── Profile
│   ├── Personal Profile
│   ├── Verification
│   ├── Travel Preferences
│   ├── Stay Preferences
│   ├── Safety
│   ├── Notifications
│   ├── Privacy
│   └── Settings
│
└── Partner Portal
    ├── Dashboard
    ├── Listings
    ├── Calendar
    ├── Reservations
    ├── Inbox
    ├── Reviews
    ├── Analytics
    └── Settings
```

# 11. USER TYPES

The frontend must support different user contexts.

## 11.1 Traveler

Primary consumer user.

Can:

- discover,
- plan,
- book,
- join groups,
- match,
- communicate.
## 11.2 Solo Traveler

Primary needs:

- safety,
- compatible people,
- destination discovery,
- group opportunities.
## 11.3 Couple Traveler

Primary needs:

- shared trip planning,
- couple itineraries,
- budget planning,
- romantic experiences.
## 11.4 Group Traveler

Primary needs:

- members,
- group chat,
- planning,
- voting,
- expenses.
## 11.5 Student

Primary needs:

- PG,
- affordable stays,
- flatmates,
- commute comparison.
## 11.6 Property Guest

Primary needs:

- property discovery,
- booking,
- check-in information,
- support.
## 11.7 Property Partner

Primary needs:

- property management,
- inquiries,
- reservations,
- availability,
- reviews.
# 12. LANDING / HOME EXPERIENCE

# 12.1 Home Screen Concept

The homepage is a major brand experience.

It should immediately communicate:

AuricVista is about places, journeys and people.

The homepage should not start with:

- a generic dashboard,
- a giant search form,
- a collection of cards.
It should start with a visually immersive destination.

# 13. CINEMATIC DESTINATION HERO

## 13.1 Hero Structure

Full-screen or near-full-screen background imagery.

Example:

```text
┌──────────────────────────────┐
│                              │
│      DESTINATION IMAGE       │
│                              │
│                              │
│        BANGALORE             │
│        Karnataka             │
│                              │
│   Explore the unexpected     │
│                              │
│ [Explore]   [Plan a Trip]    │
│                              │
│  ● ○ ○ ○ ○                   │
└──────────────────────────────┘
```

## 13.2 Dynamic Destination Slides

The homepage should rotate between destination scenes.

Examples:

- Bangalore — Karnataka
- Coorg — Karnataka
- Jaipur — Rajasthan
- Goa — India
- Manali — Himachal Pradesh
- Kashmir — India
- Pondicherry — India
Each slide should contain:

### Background

Real destination image/video.

### Primary Title

Destination.

### Secondary Title

State / Region.

### Optional Context

Short editorial line.

Example:

Where heritage meets movement.

# 14. HERO IMAGE CONTENT MAPPING

The text should adapt to the image.

Example:

### Image

Vidhan Soudha

### Text

- **Bangalore**
- ***Karnataka***

### Image

Cubbon Park

### Text

- ***Bangalore***
- *Garden City*

### Image

Beach

### Text

- ***Goa***
- *India*

The system should not use unrelated text over arbitrary travel images.

Each hero slide must have structured destination metadata.

# 15. HERO SLIDE TIMING

Recommended default behavior:

### Static Image

6–8 seconds.

### Video

8–12 seconds.

### Transition

600–900ms.

Use:

- crossfade,
- subtle image scale movement,
- minimal text transition.
Avoid:

- aggressive sliding,
- spinning,
- excessive parallax.
## 15.1 User Control

Users should be able to:

- swipe between slides on mobile,
- use arrows on desktop,
- select pagination dots.
Automatic rotation pauses during manual interaction.

# 16. HERO PRIMARY ACTIONS

Recommended actions:

### Explore Destination

Navigates to destination detail.

### Plan Your Trip

Starts trip creation.

### Find Your Stay

Opens contextual stay search.

### Meet Travelers

Opens relevant community/matching discovery.

Do not place all actions simultaneously.

Show contextual primary action based on slide or user state.

# 17. HOME SCREEN STRUCTURE

After the hero:

## Section 1

**Where do you want to go?**

Destination search.

## Section 2

**Explore Your Way**

Cards:

- Stay
- Travel
- Groups
- Experiences
## Section 3

**Popular Near You**

Location-aware discovery.

## Section 4

**Find Your Travel Vibe**

Entry into compatibility discovery.

## Section 5

**Trips Happening Now**

Travel groups and recruitment.

## Section 6

**Stay Smarter**

PG and accommodation discovery.

## Section 7

**Made for Your Journey**

Personalized recommendations.

# 18. GLOBAL SEARCH EXPERIENCE

Search should be a central product primitive.

The user may search for:

- destination,
- stay,
- PG,
- hotel,
- group,
- activity,
- college,
- office location.
Example:

Affordable PG near Christ University

or:

Weekend trip from Bangalore under** *₹***10,000

The frontend should support natural language input but visually return understandable structured filters.

Example:

```text
Search:
Weekend trip from Bangalore under ₹10,000
Interpreted as:
From: Bangalore
Duration: Weekend
Budget: ₹10,000
Category: Trip
```

The user must be able to edit any interpreted filter.

# 19. AUTHENTICATION EXPERIENCE

Authentication should be low-friction but secure.

## Supported Entry

- Phone
- Email
- Social login where supported
## Initial Flow

```text
Welcome
   ↓
Sign Up / Log In
   ↓
OTP / Authentication
   ↓
Basic Profile
   ↓
Preference Onboarding
   ↓
Verification Status
   ↓
Home
```

Do not force every user through full KYC before basic exploration unless required by the action.

# 20. PROGRESSIVE VERIFICATION MODEL

Verification should be contextual.

## Level 0 — Guest

Can browse selected public content.

## Level 1 — Registered

Can:

- save,
- plan,
- personalize.
## Level 2 — Basic Verified

Phone/email verified.

Can access standard social features.

## Level 3 — Identity Verified

Required for selected trust-sensitive features.

Examples:

- flatmate matching,
- group organizer privileges,
- selected hosting/partner functions.
## Level 4 — Enhanced Verification

Used where additional trust requirements exist.

# 21. KYC FRONTEND EXPERIENCE

KYC must not feel like an unexplained form wall.

The user should see:

### Why verification is required

Example:

Verification helps create safer stays, groups and connections.

### Progress

```text
Identity Verification
✓ Basic details
✓ Phone verification
○ Identity document
○ Verification review
```

### Status

Possible states:

- Not Started
- In Progress
- Submitted
- Under Review
- Verified
- Requires Action
- Rejected
The frontend must never invent verification success.

All status is backend-authoritative.

# 22. KYC FLOW

```text
Start Verification
        ↓
Consent
        ↓
Personal Information
        ↓
Document Upload
        ↓
Optional Liveness
        ↓
Submission
        ↓
Under Review
        ↓
Verified / Requires Action
```

## Frontend Requirements

The UI must support:

- camera upload,
- gallery upload,
- document quality feedback,
- upload progress,
- retry,
- status refresh,
- manual review messaging.
The frontend should not determine KYC eligibility.

It displays backend state.

# 23. ONBOARDING

Onboarding should collect enough context for personalization without becoming exhausting.

Use progressive questions.

## Step 1 — Identity Basics

- Name
- Date of birth where required
- Gender where relevant to matching preferences and safety policies
## Step 2 — Travel Identity

Ask:

- What kind of traveler are you?
- Budget style?
- Preferred destinations?
- Solo / Couple / Group?
- Activities?
## Step 3 — Stay Preferences

Optional initially:

- PG
- Hotel
- Homestay
- Budget
- Amenities
- Commute
## Step 4 — Social Preferences

For users opting into matching:

- travel style,
- social preferences,
- matching intent.
This must be separate from normal travel preferences.

# 24. PROFILE EXPERIENCE

The profile should feel like a modern identity card, not a corporate settings page.

## Profile Sections

### Identity

- photo,
- name,
- verification badge.
### About

- short introduction.
### Travel Personality

Examples:

- Explorer
- Planner
- Food Lover
- Adventure
- Slow Traveler
### Preferences

- destinations,
- budget,
- activities.
### Travel History

Optional privacy-controlled summary.

### Trust

- verification,
- reputation indicators where applicable.
# 25. PROFILE PRIVACY

Users must control visibility.

Example:

```text
Profile Visibility
Public
Connections Only
Private
```

Separate controls for:

- profile,
- travel history,
- location,
- group participation.
# 26. EXPLORE — DESTINATION DISCOVERY

Destination cards should prioritize imagery.

Each card:

- destination image,
- name,
- location,
- short contextual label.
Example:

```text
COORG
Karnataka
Coffee estates, hills & slow mornings
Explore →
```

Avoid filling every card with ratings and metadata.

Show information progressively.

# 27. DESTINATION DETAIL PAGE

Sections:

- Hero
- Overview
- Best Time
- Things To Do
- Experiences
- Food
- Stays
- Local Tips
- Travel Groups
- Suggested Itineraries
- Safety Information
- Nearby Destinations
# 28. STAY DISCOVERY

Users can discover:

- hotels,
- lodges,
- resorts,
- homestays,
- PGs.
The visual system should adapt according to property type.

## Stay Search Filters

- Location
- Dates
- Guests
- Budget
- Property type
- Amenities
- Distance
- Rating
- Availability
Additional contextual filters:

- Student friendly
- Couple suitable
- Solo suitable
- Work commute
- Group stay
# 29. PROPERTY CARD

Each card should show:

- primary image,
- property name,
- location,
- key attribute,
- price context,
- availability indicator.
Avoid information overload.

Example:

```text
[IMAGE]
The Auric Residency
Koramangala, Bangalore
4.7 ★
From ₹2,400/night
View Stay →
```

# 30. PROPERTY DETAIL EXPERIENCE

Structure:

## Hero Gallery

Swipeable media.

## Property Identity

- name,
- location,
- verification/trust indicators.
## Key Facts

- rooms,
- amenities,
- rules,
- check-in.
## Availability

Date-driven availability.

## Map

Location context.

## Reviews

Authentic review interface.

## Booking CTA

Persistent on mobile where appropriate.

Example:

```text
₹2,400 / night
[Reserve]
```

# 31. STUDENT & OFFICE LOCATION STAY

Dedicated experience for practical accommodation search.

Entry questions:

### Looking near?

- College
- University
- Office
- Landmark
The product should show:

- distance,
- commute,
- estimated travel time,
- price,
- facilities.
The interface should support trade-off comparison.

Example:

```text
Cheaper
```

***↓***

```text
Longer Commute
More Expensive
```

***↓***

```text
5 min from Campus
```

# 32. PG DISCOVERY

PG should be treated differently from hotels.

Users need:

- monthly pricing,
- gender suitability,
- meals,
- occupancy,
- sharing type,
- curfew/policies,
- distance,
- amenities.
# 33. PG DETAIL SCREEN

Important information:

- room type,
- occupancy,
- monthly cost,
- deposit,
- food,
- amenities,
- rules,
- commute,
- availability.
Primary CTAs:

- Contact
- Schedule Visit
- Save
- Find Flatmate
# 34. FLATMATE MATCHING

This is a dedicated product flow.

The user may search for:

### PG Only

No matching required.

### PG + Flatmate

Matching experience enabled.

The frontend must make this distinction clear.

# 35. FLATMATE MATCHING SAFETY RULE

The R&D direction specifies same-gender matching for this feature.

Therefore:

```text
Male → Male matching
Female → Female matching
```

subject to the final backend policy and jurisdictional requirements.

The frontend must not expose an unsafe unrestricted flatmate discovery model.

# 36. FLATMATE PROFILE

Show:

- first name,
- verification status,
- preferred location,
- budget,
- work/student status,
- food preference,
- sleep schedule,
- cleanliness preference,
- lifestyle compatibility.
Do not expose unnecessary personal information.

# 37. FLATMATE SWIPE EXPERIENCE

Gesture model:

```text
Swipe Left → Not Interested
Swipe Right → Interested
```

Optional actions:

- View Full Profile
- Report
- Block
A match should occur only after mutual interest.

# 38. TRAVEL MATCHING

Travel matching is distinct from dating.

The product must ask the user what type of connection they are seeking.

Examples:

- Travel companion
- Travel group
- Activity partner
- Couple travel discovery
- Social connection
The frontend should not assume every match is romantic.

# 39. MATCHING ENTRY SCREEN

Example:

```text
Who would you like to meet?
○ Travel Companions
○ Join a Travel Group
○ Find a Flatmate
○ Social Connections
```

Each mode should explain:

- purpose,
- visibility,
- matching logic,
- safety expectations.
# 40. VIBE MATCHING & SWIPE

The product can use a swipe-based interaction model inspired by modern matching applications.

However, the card should communicate compatibility rather than superficial appearance alone.

Profile card may contain:

- image,
- name,
- destination interest,
- travel style,
- budget style,
- short prompt.
Example:

```text
Ananya, 24
Planning:
Bangalore → Coorg
Travel Style:
Slow • Food • Nature
Prompt:
"My perfect trip starts after breakfast."
[✕]              [♡]
```

# 41. FULL MATCH PROFILE

Tapping a profile should reveal deeper context.

Sections:

- About
- Travel preferences
- Upcoming interests
- Compatibility factors
- Conversation prompts
This is where the product should take inspiration from profile-depth interaction patterns rather than relying entirely on swipe cards.

# 42. COMPATIBILITY DISPLAY

Avoid showing:

97.42% Compatible

without explanation.

Instead show meaningful factors:

```text
Why you may connect
✓ Similar travel budget
✓ Interested in weekend trips
✓ Both prefer nature destinations
✓ Similar travel pace
```

The frontend should present compatibility as contextual information.

# 43. MATCH EVENT

When mutual interest occurs:

```text
You Connected
You both enjoy:
Nature Trips
Weekend Travel
Budget Exploration
[Start Conversation]
```

Do not overuse animations.

A simple premium match moment is sufficient.

# 44. CHAT CREATION

Chat becomes available only after an allowed connection state.

The frontend should never independently create a relationship state.

Flow:

```text
Interest
   ↓
Backend Validation
   ↓
Mutual Match
   ↓
Connection Created
   ↓
Chat Enabled
```

# 45. ICEBREAKERS

Instead of an empty chat:

Suggested prompts:

- Where would you travel this weekend?
- Mountains or beaches?
- What is your ideal travel budget?
These should be optional.

# 46. GROUP TRAVEL DISCOVERY

Users should discover travel groups through cards.

Each card:

- destination,
- date,
- group size,
- remaining capacity,
- travel style,
- organizer trust indicator.
Example:

```text
BANGALORE → COORG
14–16 September
8 Travelers
Nature • Budget • Weekend
[View Group]
```

# 47. GROUP DETAIL SCREEN

Sections:

## Header

Destination and dates.

## Organizer

Trust and verification context.

## About

Trip description.

## Members

Visible according to privacy policy.

## Itinerary

Draft/confirmed.

## Budget

Estimated.

## Discussion

Preview.

## Join

Primary CTA.

# 48. JOIN GROUP FLOW

```text
View Group
     ↓
Join Request
     ↓
Eligibility Check
     ↓
Organizer/System Review
     ↓
Approved
     ↓
Group Access
```

Possible frontend states:

- Open Join
- Request Sent
- Pending
- Approved
- Declined
- Group Full
# 49. GROUP CHAT

Group chat is a core product experience.

The interface should feel familiar but purpose-built for travel.

Support:

- text,
- media,
- replies,
- itinerary links,
- polls,
- location sharing where authorized,
- expense references.
# 50. GROUP CHAT STRUCTURE

Top navigation:

```text
← Coorg Weekend
   8 Members
```

Tabs or contextual shortcuts:

- Chat
- Plan
- Members
- Budget
Do not bury core trip collaboration inside a generic chat.

# 51. COLLABORATIVE TRIP PLANNING

A group trip should support shared planning.

Members can propose:

- stay,
- activity,
- restaurant,
- transport option.
Example:

```text
Suggested Stay
The Misty Hills Resort
₹2,500/person
[Vote]
```

# 52. GROUP VOTING

Voting states:

- Pending
- Approved
- Rejected
- Expired
Example:

```text
Where should we stay?
○ Resort A — 5 votes
○ Resort B — 2 votes
2 members haven't voted
```

The frontend must display current backend-authoritative decision status.

# 53. GROUP DECISION EXPERIENCE

For unresolved decisions:

```text
Decision Pending
4 / 8 Members Responded
[Remind Members]
```

The button may trigger a backend request that later enters an automation workflow.

The frontend itself does not send uncontrolled reminders directly.

# 54. GROUP TRIP CREATION

Steps:

- Destination
- Dates
- Travel type
- Budget
- Group size
- Description
- Visibility
- Join policy
Visibility:

- Public
- Request to Join
- Invite Only
# 55. SOLO TRAVEL EXPERIENCE

Dedicated entry.

The user can:

- create a solo itinerary,
- discover safe stays,
- find experiences,
- optionally discover compatible groups.
The UI should never pressure a solo traveler into social matching.

# 56. COUPLE TRAVEL EXPERIENCE

Couple trip planning should support:

- shared itinerary,
- shared budget,
- stay recommendations,
- experiences,
- collaborative editing.
This is a planning mode, not necessarily a dating mode.

# 57. COMMUNITY

Community is broader than matching.

Community can include:

- travel opportunities,
- destination discussions,
- trip recruitment,
- experiences,
- travel questions.
# 58. COMMUNITY FEED

Cards may contain:

- author,
- destination/topic,
- post content,
- images,
- discussion count.
Avoid turning the interface into a generic social media clone.

The feed should remain travel-contextual.

# 59. COMMUNITY CONTENT TYPES

Examples:

### Trip Opportunity

Looking for 3 people for a weekend trip to Gokarna.

### Travel Question

Best month for Spiti?

### Local Recommendation

Hidden cafes around Indiranagar.

### Experience

Weekend trekking group.

# 60. COMMUNITY SAFETY UX

Every relevant content item should support:

- Report
- Block
- Hide
The frontend should not expose moderation reasoning.

If content is removed:

```text
This content is no longer available.
```

Do not expose sensitive moderation details publicly.

# 61. CREATE TRIP EXPERIENCE

The trip creation flow is a major product flow.

```text
Create a Trip
Where?
When?
Who are you traveling with?
What's your budget?
What matters most?
```

# 62. TRAVEL TYPE SELECTION

```text
How are you traveling?
○ Solo
○ Couple
○ Group
```

The next screens adapt according to selection.

# 63. TRIP PREFERENCES

Budget:

- Economy
- Balanced
- Premium
- Custom
Priorities:

- Stay
- Food
- Activities
- Comfort
- Adventure
# 64. ITINERARY EXPERIENCE

The itinerary should feel like a timeline.

Example:

```text
DAY 1
09:00
Departure
12:30
Check-in
14:00
Lunch
16:00
Local Experience
20:00
Dinner
```

Each item can show:

- status,
- location,
- booking,
- cost,
- notes.
# 65. ITINERARY EDITING

Users should be able to:

- drag items,
- add items,
- remove items,
- lock bookings.
Booked items should have visual protection.

Example:

```text
🔒 Confirmed Booking
```

The frontend must distinguish:

- suggestion,
- planned item,
- confirmed booking.
# 66. LIVE TRIP EXPERIENCE

During an active trip, the Trips section changes context.

Show:

- current day,
- next activity,
- weather status,
- important booking,
- safety access.
Example:

```text
DAY 2 — COORG
Next:
Abbey Falls
10:30 AM
Weather:
Light Rain
[View Today's Plan]
```

# 67. WEATHER & CONDITIONS

The UI should not constantly show weather noise.

Only meaningful changes should become prominent.

Example:

```text
Rain expected during your planned activity.
Suggested:
Move activity to 4:00 PM
```

The user should understand:

- what changed,
- what is affected,
- what alternative exists.
# 68. MAPS & TRANSPORT

Maps should be contextual.

Possible uses:

- stay location,
- destination,
- itinerary,
- commute,
- emergency.
Do not place a map on every screen.

# 69. TRIP WALLET

AuricVista's trip wallet is a planning and tracking interface, not automatically a real-money stored-value wallet.

Sections:

- Total Budget
- Planned
- Actual
- Remaining
# 70. EXPENSE SPLITTING

For groups:

```text
Dinner
₹4,000
Paid by:
Vikhyath
Split between:
4 Members
₹1,000 each
```

Actions:

- Mark Paid
- Edit
- Add Member
- Settle
All financial truth must come from backend state.

# 71. BUDGET EXPERIENCE

Show category distribution:

- Stay
- Food
- Transport
- Activities
- Other
Use:

- economy,
- balanced,
- premium comparison.
Example:

```text
Your Trip
Planned: ₹20,000
Actual: ₹17,400
Remaining: ₹2,600
```

# 72. AI ASSISTANT EXPERIENCE

The AI assistant should be integrated naturally.

Do not design it as:

"SUPER AI COMMAND CENTER"

The user should simply feel that AuricVista can help.

## Entry Points

### Global

Assistant icon.

### Contextual

Examples:

- “Help plan this trip”
- “Compare these stays”
- “Help us decide”
- “Explain this budget”
# 73. AI CHAT DESIGN

Simple conversational interface.

Example:

```text
How can I help?
• Plan a trip
• Find a stay
• Compare options
• Help with my budget
```

The interface should clearly distinguish:

- AI suggestions,
- confirmed bookings,
- actual system actions.
# 74. AI ACTION CONFIRMATION

If AI proposes an action:

```text
Suggested Action
Add Abbey Falls to Day 2?
[Cancel] [Add to Plan]
```

The AI should not silently mutate important state.

# 75. NOTIFICATIONS

Notification center categories:

- Trips
- Messages
- Groups
- Bookings
- Safety
- Account
Important notifications should have clear priority.

# 76. NOTIFICATION PREFERENCES

Users can control:

- Push
- Email
- SMS where applicable
- WhatsApp where applicable
Categories:

- Booking
- Trip
- Community
- Marketing
- Safety
Safety and legally required communications may follow separate policy rules.

# 77. SAFETY MODE

Safety should be visible but not constantly alarming.

Entry:

Profile** *→*** Safety

and contextual active trip access.

# 78. ACTIVE TRIP SAFETY SCREEN

Display:

- current trip,
- emergency contacts,
- location sharing status,
- check-in status.
Primary action:

```text
EMERGENCY SOS
```

Must be visually distinct.

# 79. SOS UX

The emergency screen must be extremely simple.

```text
EMERGENCY
Are you in immediate danger?
[SEND SOS]
Share:
✓ Current Location
✓ Active Trip Information
✓ Emergency Contacts
```

No complex navigation.

# 80. EMERGENCY STATUS

After activation:

```text
SOS ACTIVE
Location shared
Emergency contacts notified
Status:
Connecting assistance
[Update Status]
```

The UI must show actual backend status.

Never fake successful emergency delivery.

# 81. BOOKING FLOW

Booking must be deterministic.

Steps:

```text
Select
   ↓
Review
   ↓
Guest Details
   ↓
Payment
   ↓
Processing
   ↓
Confirmed
```

# 82. PAYMENT UI STATES

Required:

- Ready
- Processing
- Successful
- Failed
- Pending Confirmation
The frontend must not show “Booking Confirmed” before authoritative confirmation.

# 83. BOOKING DETAIL

Show:

- booking ID,
- property/activity,
- dates,
- guests,
- payment status,
- cancellation policy.
Actions:

- Contact Support
- Modify where supported
- Cancel where supported
# 84. CANCELLATION FLOW

Before cancellation:

```text
Cancel Booking?
Refund Estimate:
₹X
Policy:
...
[Keep Booking] [Continue]
```

Final cancellation requires explicit confirmation.

# 85. REVIEWS

Review flow should be contextual.

After completed stay/trip:

- rating,
- written review,
- optional category ratings.
Categories may include:

- Cleanliness
- Location
- Experience
- Accuracy
Users should see submission state.

# 86. SUPPORT EXPERIENCE

Support entry points:

- Profile
- Booking
- Active Trip
- Property
Categories:

- Booking issue
- Payment
- Property
- Safety
- Account
- Other
Safety issues receive visually distinct routing.

# 87. INBOX

The Inbox is the communication center.

Tabs:

```text
Messages | Groups | Requests | Support
```

Avoid mixing every notification into one endless list.

# 88. DIRECT MESSAGE

Features:

- text,
- media,
- reply,
- report,
- block.
The interface should expose connection context when useful.

Example:

```text
You matched through:
Weekend Travel — Coorg
```

# 89. PROPERTY PARTNER FRONTEND

Although primarily operational, the partner portal must be part of the overall frontend ecosystem.

Desktop-first with mobile-responsive support.

# 90. PARTNER DASHBOARD

Primary dashboard widgets:

- Today's arrivals
- Active reservations
- New inquiries
- Occupancy
- Pending actions
# 91. PARTNER NAVIGATION

```text
Dashboard
Listings
Calendar
Reservations
Inbox
Reviews
Analytics
Settings
```

# 92. PROPERTY LISTING MANAGEMENT

Partner can manage:

- property details,
- rooms,
- photos,
- amenities,
- policies.
Listing status:

- Draft
- Under Review
- Published
- Requires Action
# 93. AVAILABILITY CALENDAR

Calendar should support:

- availability,
- blocked dates,
- reservations,
- occupancy.
The frontend must display backend-authoritative inventory.

# 94. PARTNER INQUIRY INBOX

Show:

- inquiry,
- guest context,
- property,
- status.
AI-assisted replies may be available as drafts.

Never automatically present an AI draft as a sent message.

# 95. PARTNER REVIEWS

Partner can:

- view reviews,
- filter,
- respond.
Potential AI summary should remain clearly optional.

# 96. ADMIN UX BOUNDARY

The consumer frontend should not expose admin operations.

Admin systems should be separate role-protected experiences.

Admin areas include:

- moderation,
- KYC exceptions,
- fraud,
- safety,
- incidents,
- AI operations.
# 97. FRONTEND STATE REQUIREMENTS

Every major screen must support:

## Loading

Skeletons preferred over unnecessary spinners.

## Empty

Example:

No trips yet.

With meaningful CTA.

## Error

Explain:

- what failed,
- whether retry is possible.
## Offline / Degraded

Where applicable:

```text
You're offline.
Some information may be unavailable.
```

## Permission Denied

Do not expose technical errors.

Explain what access is required.

# 98. GLOBAL BUTTON SYSTEM

Primary:

Gold-filled or high-contrast primary action.

Secondary:

Outlined/neutral.

Destructive:

Reserved red/error treatment.

Text:

Low-emphasis navigation actions.

Do not create dozens of button styles.

# 99. INTERACTION RULES

## Swipe

Only for:

- matching,
- image galleries,
- card browsing where intuitive.
Do not force swipe interactions onto booking or critical operations.

## Long Press

Optional contextual actions.

## Bottom Sheets

Preferred on mobile for:

- filters,
- quick actions,
- contextual choices.
## Full Screens

Use for:

- checkout,
- KYC,
- SOS,
- focused matching.
# 100. ANIMATION SYSTEM

Motion should communicate:

- transition,
- hierarchy,
- success,
- state change.
Examples:

Good:

- card enters,
- bottom sheet rises,
- match confirmation.
Avoid:

- constant floating,
- glowing,
- unnecessary movement.
# 101. ACCESSIBILITY

The frontend must support:

- readable contrast,
- scalable text,
- touch targets,
- screen readers,
- reduced motion.
The R&D scope also includes multilingual and accessibility support as a product capability. AuricVista_RnD finallll.pdfPDF

# 102. MULTILINGUAL EXPERIENCE

Initial architecture should allow:

- localized strings,
- regional formatting,
- language selection.
Do not hardcode user-visible text into components.

# 103. FRONTEND TECHNOLOGY DIRECTION

## Primary Stack

```text
React
+
TypeScript
```

Recommended ecosystem direction:

- React-based component architecture
- Responsive CSS system
- Reusable design system
- Typed API client
- Central state/query management
- WebSocket/realtime client where required
# 104. FRONTEND ARCHITECTURE

Recommended conceptual structure:

```text
src/
│
├── app/
├── features/
│   ├── auth/
│   ├── profile/
│   ├── explore/
│   ├── stays/
│   ├── pg/
│   ├── matching/
│   ├── groups/
│   ├── trips/
│   ├── chat/
│   ├── wallet/
│   ├── safety/
│   └── bookings/
│
├── components/
├── services/
├── hooks/
├── state/
├── types/
└── design-system/
```

The exact framework structure can be finalized in Backend/Engineering PRD, but the product requirement is:

The frontend must use a modular React + TypeScript architecture so domains can evolve independently without becoming one monolithic component tree.

# 105. FRONTEND → BACKEND CONTRACT PRINCIPLE

The frontend never owns authoritative business state.

Example:

```text
User taps Join Group
        ↓
Frontend sends request
        ↓
Backend validates
        ↓
Backend updates state
        ↓
Response/Event
        ↓
Frontend updates UI
```

# 106. FRONTEND → AUTOMATION PRINCIPLE

The frontend does not directly call automation platforms for critical product workflows.

Correct flow:

```text
Frontend Action
      ↓
Backend API
      ↓
Backend Validation
      ↓
Domain State Change
      ↓
Domain Event
      ↓
Queue / Event Layer
      ↓
Automation Workflow
```

This is critical for the future Automation PRD.

# 107. FRONTEND ACTION MAPPING

## Example 1 — Swipe

```text
Swipe Right
   ↓
POST /interest
   ↓
Backend checks eligibility
   ↓
Mutual match?
   ↓
match.created
   ↓
Chat provisioning event
   ↓
Realtime update
```

## Example 2 — Join Group

```text
Join Button
   ↓
POST /groups/:id/join
   ↓
Backend eligibility
   ↓
join.requested
   ↓
Approval workflow
   ↓
group.membership.created
   ↓
Notification
```

## Example 3 — Booking

```text
Reserve
   ↓
Booking API
   ↓
Payment
   ↓
Authoritative confirmation
   ↓
booking.confirmed
   ↓
Automation
   ├── Notification
   ├── CRM
   └── Trip Update
```

## Example 4 — KYC

```text
Upload Document
   ↓
Secure Backend Upload
   ↓
Verification Provider
   ↓
Verification Status
   ↓
Frontend Status Update
   ↓
Exception workflow if required
```

# 108. REALTIME UX REQUIREMENTS

The frontend should receive realtime updates for:

- new chat messages,
- group membership changes,
- match creation,
- trip collaboration,
- vote changes,
- booking status where appropriate,
- emergency status.
Realtime events must update the UI without requiring a full page refresh.

# 109. PRIVACY UX

Users must be able to understand:

- what profile information is visible,
- location sharing state,
- notification preferences,
- matching visibility.
Avoid hiding privacy settings inside complex menus.

# 110. CONSENT UX

Consent should be contextual.

Examples:

### Location

Explain why.

### Notifications

Allow category preference.

### Marketing

Separate from operational communication.

The frontend collects and displays consent state; backend remains authoritative.

# 111. TRUST INDICATORS

Verification should be communicated carefully.

Possible badges:

- Phone Verified
- Identity Verified
- Partner Verified
Do not create meaningless badges.

Every badge must represent a real backend state.

# 112. REPORT / BLOCK UX

Available in:

- profiles,
- chat,
- community,
- groups,
- property interactions where relevant.
Flow:

```text
Report
   ↓
Select Reason
   ↓
Optional Description
   ↓
Submit
```

Confirmation:

Your report has been submitted.

Do not promise a specific enforcement outcome.

# 113. MOBILE PERFORMANCE REQUIREMENTS

The frontend should optimize:

- image loading,
- destination media,
- lazy loading,
- route splitting,
- skeleton loading.
Hero media must not block the rest of the application.

# 114. IMAGE STRATEGY

Use responsive image delivery.

Prioritize:

- Correct aspect ratio
- Destination quality
- Compression
- Progressive loading
Avoid loading full-resolution destination images unnecessarily on mobile.

# 115. CORE USER JOURNEY 1 — NEW USER

```text
Open AuricVista
      ↓
Explore Hero Destination
      ↓
Search / Explore
      ↓
Sign Up
      ↓
Basic Verification
      ↓
Preference Setup
      ↓
Personalized Home
```

# 116. CORE USER JOURNEY 2 — FIND A STAY

```text
Explore
   ↓
Search Location
   ↓
Apply Filters
   ↓
View Property
   ↓
Select Dates
   ↓
Review
   ↓
Book
   ↓
Confirmed
   ↓
Trip Added
```

# 117. CORE USER JOURNEY 3 — FIND A FLATMATE

```text
PG & Flatmate
       ↓
Set Preferences
       ↓
Verification Requirement
       ↓
Discover Profiles
       ↓
Swipe / Interest
       ↓
Mutual Match
       ↓
Safe Chat
```

# 118. CORE USER JOURNEY 4 — CREATE GROUP TRIP

```text
Create Trip
      ↓
Group
      ↓
Destination
      ↓
Dates
      ↓
Budget
      ↓
Visibility
      ↓
Publish
      ↓
Join Requests
      ↓
Members
      ↓
Group Chat
      ↓
Collaborative Planning
```

# 119. CORE USER JOURNEY 5 — TRAVEL MATCH

```text
Connect
   ↓
Select Intent
   ↓
Set Preferences
   ↓
Discover
   ↓
Swipe
   ↓
Mutual Interest
   ↓
Match
   ↓
Conversation
```

# 120. CORE USER JOURNEY 6 — ACTIVE TRIP

```text
Trip Starts
    ↓
Today's Plan
    ↓
Navigation / Activities
    ↓
Weather Change
    ↓
Updated Suggestion
    ↓
Expense Tracking
    ↓
Safety Check
    ↓
Trip Completion
```

# 121. CORE USER JOURNEY 7 — SOS

```text
SOS Button
    ↓
Confirm Emergency
    ↓
Location Permission
    ↓
Incident Created
    ↓
Status Screen
    ↓
Communication / Escalation
```

The emergency flow must remain deterministic and simpler than normal AI interaction, consistent with the R&D safety direction. AuricVista_RnD finallll.pdfPDF

# 122. FRONTEND PRODUCT PRIORITIES

## V1

Must establish the core ecosystem:

- Authentication
- Basic verification
- Profile
- Destination discovery
- Stay discovery
- PG discovery
- Trip creation
- Solo/Couple/Group trips
- Basic group system
- Group chat
- Matching foundation
- Swipe
- Match chat
- Booking UI
- Wallet/budget foundation
- Notifications
- Basic safety
- Support
## V2

Expand intelligence:

- Advanced compatibility
- Collaborative planning
- Voting
- Dynamic itinerary
- AI assistant expansion
- Advanced personalization
- Partner portal maturity
- Community expansion
- Better recommendations
## V3

Data-driven features:

- Advanced ranking
- Predictive recommendations
- Risk prediction
- Demand intelligence
- Advanced automation-driven experiences
# 123. FRONTEND ACCEPTANCE CRITERIA

The frontend PRD is successful only if:

### Product Coherence

- Travel, community, matching and stays feel like one product.
- Users understand the difference between travel matching, flatmate matching and groups.
### Mobile

- Core journeys are optimized for mobile first.
- Bottom navigation supports primary journeys.
- Important actions are reachable without excessive navigation.
### Trust

- Verification status is clearly represented.
- KYC is progressive and contextual.
- Users can report/block relevant interactions.
### Matching

- Swipe is controlled by backend state.
- Chat only becomes available after valid connection state.
- Compatibility is explainable.
### Trips

- Solo, couple and group flows are distinct.
- Group planning supports collaboration.
- Confirmed bookings are visually distinguishable from suggestions.
### Safety

- SOS is reachable quickly.
- Emergency status reflects authoritative backend state.
- No AI output is presented as an emergency authority.
### Architecture

- Every major frontend action maps to a backend API/event.
- The frontend does not directly own transactional truth.
- Automation is triggered through backend-controlled events.
# 124. FINAL FRONTEND PRODUCT PRINCIPLE

### 🔒 AURICVISTA — FRONTEND & MOBILE EXPERIENCE PRINCIPLE

> AuricVista will be designed as a mobile-first, premium travel ecosystem that unifies destination discovery, stays, PG accommodation, flatmate compatibility, travel matching, group travel, community, collaborative planning, booking, budgeting, communication and safety into one coherent product experience. The visual identity will combine cinematic destination storytelling with an elegant black, gold and restrained white design system, while

**avoiding generic AI-generated visual patterns and excessive decorative effects. Travel discovery will prioritize immersive imagery and practical planning, while compatibility features will use controlled profile depth and swipe interactions inspired by modern matching products without reducing AuricVista to a dating application. Every meaningful frontend action will connect through validated backend APIs and authoritative domain events, allowing the backend to own truth and the automation layer to orchestrate asynchronous workflows without creating conflicting product state.**
