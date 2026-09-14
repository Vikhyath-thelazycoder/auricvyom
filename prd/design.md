# AURICVISTA — MASTER PRODUCT DESIGN & UI/UX SPECIFICATION

## Production Design System • Frontend Visual Blueprint • Responsive Web + Mobile-First Experience

> **Product:** AuricVista  
> **Document:** Master Design & UI/UX Specification  
> **Version:** 3.0  
> **Status:** Production Design Source of Truth  
> **Primary Design Target:** Mobile-first web application  
> **Secondary Design Target:** Desktop responsive web portal  
> **Visual Direction:** Editorial Luxury Travel + Modern Social Discovery  
> **Primary Palette:** Deep Black / Charcoal (`#080B10`, `#0E141E`) + Warm White (`#FFFFFF`, `#C4CBD6`) + Auric Gold (`#E5A93C`, `#F3C766`, `#B88220`)  
> **Social Accent:** Controlled Pink (`#EC4899`) for Dating/Match contexts  
> **Technology Direction:** Target Architecture: React / Next.js-compatible frontend architecture • Active Implementation: Complete working Single Page Application in Vanilla ES6+ modules (`index.html`, `js/app.js`, `js/components/*.js`, `styles/main.css`) served via Alpine Nginx container  
> **Design Principle:** Human-designed premium travel product; no generic AI-dashboard appearance.  
> **Direct Visual References:** [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png), [`website view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%20view.png), [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png)

---

## 0. DESIGN SOURCE OF TRUTH

This document is the definitive visual and interaction specification for AuricVista.

The implementation team must use this document together with:

1. AuricVista Frontend PRD
2. AuricVista Backend PRD
3. AuricVista Automation / n8n PRD
4. Approved reference screenshots ([`templet/`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet))
5. Backend API contracts
6. Automation event contracts

If a conflict exists:

```text
Backend correctness
        ↓
Product PRD
        ↓
Design system
        ↓
Individual component preference
```

Never create frontend behavior that contradicts the backend contract.  
Never allow the frontend to become the source of truth for:
- bookings
- payments
- KYC status
- wallet balances
- matching state
- moderation state
- SOS state
- inventory
- user permissions

The frontend is responsible for presentation, interaction and client-side state.  
The backend remains authoritative.

---

## 1. PRODUCT VISUAL IDENTITY

AuricVista should feel like the combination of:
- premium travel platform
- modern hospitality marketplace
- social discovery platform
- travel community
- collaborative trip planner
- intelligent travel assistant
The experience should feel inspired by the usability patterns of:
- Airbnb
- MakeMyTrip
- Booking-style property discovery
- Tinder
- Bumble
- Hinge
- modern community products
However, AuricVista must NOT visually copy these products.
The product should have its own visual identity.
The resulting visual language is:
Luxury
+
Travel
+
Trust
+
Human Connection
+
Modern Technology
The product should never feel like:
Generic SaaS dashboard
Generic AI chatbot
Generic dating application
Generic hotel booking website

---

## 2. CORE DESIGN PHILOSOPHY


### 2.1 Design Principles


#### Principle 1 — Travel Comes First

AuricVista is fundamentally a travel ecosystem.
Dating-style swiping is a compatibility mechanism.
It should never make the entire product look like a dating app.


#### Principle 2 — Human Product, Not AI Product

AI should feel embedded into the experience.
Do NOT cover the interface with:
- excessive glowing AI borders
- random gradients
- robotic icons
- "AI GENERATED" labels
- unnecessary sparkle effects
- oversized chatbot interfaces
- futuristic sci-fi decoration
AI should feel like a premium service inside the product.


#### Principle 3 — Visual Storytelling

Travel pages should use photography heavily.
Destination pages should feel immersive.
The homepage should immediately communicate:
Where can I go?
What can I experience?
Who can I travel with?
Where can I stay?
What can AuricVista help me plan?


#### Principle 4 — Trust Is Visible

Trust signals should be visually understandable:
- verified users
- verified properties
- safety status
- ratings
- reviews
- booking confirmation
- KYC status
Do not hide important trust information inside complicated menus.


#### Principle 5 — Mobile First

Every feature must work beautifully on mobile before desktop.
Desktop is an expansion of the mobile experience, not a completely different product.

---

## 3. COLOR SYSTEM


### 3.1 Primary Palette

Deep Black
--bg-primary: #080B10;
Use for:
- application background
- hero overlays
- navigation
- major sections
- premium dark surfaces

Dark Surface
--bg-surface: #0E141E;
Use for:
- cards
- panels
- chat surfaces
- trip cards
- sidebar components

Elevated Surface
--bg-surface-elevated: #151D2C;
Use for:
- dropdowns
- modals
- floating panels
- menus
- bottom sheets

Hover Surface
--bg-surface-hover: #1D273B;


### 3.2 Text

--text-primary: #FFFFFF;
--text-secondary: #C4CBD6;
--text-muted: #7E8B9F;
Use:
Primary
→ headings
→ important numbers
→ main labels

Secondary
→ descriptions
→ supporting information

Muted
→ metadata
→ timestamps
→ captions

---

## 4. AURIC GOLD SYSTEM

Gold is the brand signature.
--gold-primary: #E5A93C;
--gold-glow: #F3C766;
--gold-dark: #B88220;
Primary gradient:
```css
--gold-gradient: linear-gradient(
  135deg,
  #F5D061 0%,
  #E5A93C 50%,
  #B88220 100%
  );
```

Gold should represent:
- primary CTA
- selected navigation
- important highlights
- premium actions
- booking confirmation
- progress
- brand identity
Gold must NOT be used everywhere.
Maintain approximately:
60% → dark / charcoal
30% → white / neutral surfaces
10% → gold accents

---

## 5. SOCIAL ACCENTS

Dating / social interactions can use controlled accent colors.
--social-pink: #EC4899;
Pink is primarily used for:
- Dating mode
- match celebration
- romantic context
- heart actions
Do not turn the entire application pink.

---

## 6. FUNCTIONAL COLORS

--success: #22C55E;
--warning: #F59E0B;
--danger: #EF4444;
Success
Used for:
- verified
- online
- confirmed
- completed
- successful payment
Warning
Used for:
- weather warning
- incomplete profile
- pending verification
- approaching budget limit
Danger
Used for:
- SOS
- destructive actions
- rejection
- serious errors
- report/block confirmation

---

## 7. TYPOGRAPHY


### 7.1 Display Typeface

Primary:
Cinzel
Fallback:
Playfair Display
Use for:
- hero headlines
- destination titles
- major editorial sections
- special match headline


### 7.2 UI Typeface

Primary:
Plus Jakarta Sans
Fallback:
Outfit
Use for:
- navigation
- buttons
- forms
- cards
- chat
- metadata
- dashboards

---

## 8. TYPOGRAPHY SCALE

Hero H1:
44px – 64px desktop
32px – 44px mobile

H2:
26px – 32px

H3:
18px – 22px

Body:
14px – 16px

Small:
12px – 13px

Micro:
11px – 12px
Desktop hero titles may use display typography.
Application UI should primarily use the sans-serif system.

---

## 9. SPACING SYSTEM

Use an 8px base spacing system.
4px
8px
12px
16px
24px
32px
40px
48px
64px
80px
96px
Do not use arbitrary spacing values unless required by a specific component.

---

## 10. BORDER RADIUS

--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-full: 9999px;
Use:
8px
→ compact controls

14px
→ cards and inputs

20px
→ hero cards / large panels

9999px
→ pills / avatars / circular controls

---

## 11. SHADOW SYSTEM

--shadow-sm:
0 2px 8px rgba(0,0,0,.4);

--shadow-md:
0 8px 24px rgba(0,0,0,.5);

--shadow-lg:
0 16px 48px rgba(0,0,0,.7);

--shadow-gold:
0 4px 20px rgba(229,169,60,.25);
Avoid excessive shadows.

---

## 12. GLASS EFFECT

Use subtle glassmorphism only where useful.
backdrop-filter: blur(16px);
Glass surfaces should remain readable.
Do not use glass effects on every card.

---

## 13. IMAGE LANGUAGE

Images are one of AuricVista's primary visual assets.
Use:
- destination photography
- authentic accommodation photography
- natural portraits
- activity photography
- group travel imagery
- landscape imagery
Avoid:
- obvious stock photography
- repetitive AI-generated people
- overly staged people
- low-resolution images
- inconsistent image styles
Image treatment:
Large hero:
16:9 / cinematic

Destination cards:
4:3 or 3:2

Profile:
4:5 or 3:4

Property cards:
4:3

Trip thumbnails:
16:9

---

## 14. IMAGE OVERLAYS

Dark gradients should be used over images when text is placed on top.
Example:
Transparent
      ↓
Dark gradient
      ↓
Image
Text must remain readable without making the image look unnecessarily dark.

---

## 15. RESPONSIVE BREAKPOINTS

Mobile:
< 640px

Large Mobile / Small Tablet:
640px – 767px

Tablet:
768px – 1023px

Desktop:
1024px – 1279px

Large Desktop:
1280px+

Wide Desktop:
1440px+

---

## 16. MOBILE-FIRST NAVIGATION

Mobile navigation contains five primary destinations:
Explore
Trips
Connect
Inbox
Profile
Visual structure:
```text
┌──────────────────────────────┐
│ AuricVista      🔔    ⌕      │
├──────────────────────────────┤
│                              │
│       PAGE CONTENT           │
│                              │
│                              │
├──────────────────────────────┤
│ 🧭    ✈️    💘    💬    👤 │
│Explore Trips Connect Inbox Profile
└──────────────────────────────┘
```

The bottom navigation remains fixed.
Active tab uses Auric Gold.
Inactive tabs use muted gray.

---

## 17. DESKTOP NAVIGATION

Desktop top navigation:
AURICVISTA

Explore
Stays
Trips
Connect
Communities
AI Assistant

Search
Globe
Notifications
Profile
Primary CTA:
Sign In
or authenticated profile avatar.
Desktop navigation should remain compact.

---

## 18. GLOBAL COMPONENT LIBRARY

Every page should use reusable components.
Core components:
AuricLogo
TopNav
MobileTopBar
BottomNav
Hero
SearchBar
SearchTabs
DestinationCard
PropertyCard
ProfileCard
GroupCard
TripCard
MatchCard
ChatBubble
ChatComposer
PollCard
ExpenseCard
WalletSummary
AIMessage
AIActionButton
VerificationBadge
SafetyCard
SOSButton
Modal
BottomSheet
Drawer
Toast
Skeleton
EmptyState
ErrorState

---

## 19. BUTTON SYSTEM

Primary
Gold background.
[ Search ]
[ Book Now ]
[ Create Trip ]
[ Save Trip ]

Secondary
Dark transparent / bordered.
[ View Details ]
[ Keep Swiping ]
[ Settle Up ]

Destructive
Red.
[ Delete ]
[ Report ]
[ SOS ]

Social
Pink / contextual.
[ Send Message ]
[ Like ]

---

## 20. FORM INPUT SYSTEM

Inputs should use:
dark background
subtle border
white text
muted placeholder
gold focus state
Focus:
border → gold
shadow → subtle gold glow

---

## 21. GLOBAL LOADING STATES

Never show blank screens during loading.
Use skeletons.
Skeleton surfaces:
#151D2C
→
#1D273B
Examples:
Hero skeleton
Property card skeleton
Profile skeleton
Chat message skeleton
Trip skeleton
AI response skeleton

---

## 22. GLOBAL ERROR STATES

Errors should be human-readable.
Bad:
Error 500
Better:
We couldn't load this right now.

Please try again.

[ Try Again ]

---

## 23. GLOBAL EMPTY STATES

Example:
No saved stays yet.

Save properties you like and
they'll appear here.

[ Explore Stays ]
Empty states should always provide the next useful action.

---

## 24. HOMEPAGE / EXPLORE

Purpose
The homepage is the primary discovery surface.
It must communicate:
Travel
+
People
+
Stays
+
Groups
+
AI

---

## 25. MOBILE HOMEPAGE

Structure:
TOP BAR
 ↓
CINEMATIC HERO
 ↓
SEARCH
 ↓
POPULAR DESTINATIONS
 ↓
STAYS NEAR YOU
 ↓
TRAVEL / PEOPLE DISCOVERY
 ↓
AI TRIP PLANNER
 ↓
COMMUNITIES
 ↓
UPCOMING TRIP
 ↓
SAFETY / TRUST

---

## 26. HOMEPAGE HERO

*Direct Visual Reference: [`website view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%20view.png) & [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png)*


Hero must use a large destination image.
Example:
Hampi, Karnataka

Discover Beyond Travel

- Stays • Trips • People • Communities
Dynamic destination:
Hampi
Coorg
Manali
Goa
Ooty
Jaipur
Hero metadata may include:
Location
Current local time
Temperature
Sunset
Heritage badge

---

## 27. HERO SLIDESHOW

The hero rotates between curated destinations.
Example:
01 / 06
Hampi

02 / 06
Coorg

03 / 06
Manali

04 / 06
Goa

05 / 06
Ooty

06 / 06
Jaipur
Transition:
700ms crossfade
scale(1.03)
Do not make transitions distracting.

---

## 28. HOMEPAGE SEARCH

*Direct Visual Reference: [`website view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%20view.png) & [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png)*


Search should be visually prominent.
Desktop:
```text
┌───────────────────────────────────────────────────────────────┐
│ Where are you going? │ Check-in │ Check-out │ Travellers │ Search │
└───────────────────────────────────────────────────────────────┘
```

Mobile:
```text
┌──────────────────────────────┐
│ 🔍 Where do you want to go? │
└──────────────────────────────┘
```

Tap opens full-screen search interface.

---

## 29. SEARCH CATEGORIES

All
Stays
PG
Trips
Experiences
People
Groups
Selected state:
gold background
dark text

---

## 30. POPULAR DESTINATIONS

*Direct Visual Reference: [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png)*


Horizontal cards on mobile.
Example:
Coorg
Karnataka

Manali
Himachal Pradesh

Goa
India

Hampi
Karnataka

Ooty
Tamil Nadu

Jaipur
Rajasthan
Each card contains:
Image
Destination
Region
Rating
Optional stay/group count

---

## 31. FEATURED STAYS

*Direct Visual Reference: [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png) (Stays Grid)*


Cards contain:
Image
Favorite icon
Property name
Location
Rating
Review count
Price
Verification badge
Example:
The Hosteller Coorg
Madikeri

★ 4.8

₹699 / night

---

## 32. HOMEPAGE AI TRIP PLANNER

This should look like a premium product card.
Not a generic chatbot.
Example:
AI Trip Planner

Create an epic trip with Auric AI

[ Destination ]
[ Dates ]
[ Travelers ]
[ Budget ]

                [ Plan My Trip ]
A generated plan may show:
Day 1
Arrival + Sightseeing

Day 2
Adventure + Nature

Day 3
Culture + Food

Day 4
Departure

---

## 33. HOMEPAGE ACTIVE TRIP CARD

For users with an active trip, show a contextual card.
Upcoming Trip

Coorg Getaway

12 Dec – 15 Dec
4 Members

75%

[ Open Trip ]
Show:
Itinerary progress
Booking progress
Budget

---

## 34. HOMEPAGE SOCIAL PREVIEW

A compact discovery module:
Discover People

Travel Buddy | Dating | Flatmates
Show one large profile card or horizontal profile carousel.

---

## 35. HOMEPAGE COMMUNITY PREVIEW

Show:
Active Groups
Community Highlights
Upcoming Trips
Example:
Coorg Trip Squad
12 members
Active now

---

## 36. HOMEPAGE TRUST SECTION

Use concise proof points:
2M+ Travelers
10,000+ Verified Stays
250K+ Active Community
4.8/5 Trust Rating
24×7 Safety Support
Do not fabricate these numbers in production.
Numbers must come from real backend/admin-controlled data.

---

## 37. CONNECT

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 2) & [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png) (Sidebar)*


Connect is the social discovery area.
Modes:
Travel Buddy
Dating
Flatmates
The overall visual language remains AuricVista.
Only the contextual accent changes.

---

## 38. TRAVEL BUDDY MODE

Primary objective:
Find compatible people for travel.
Profile card contains:
Photo
Name
Age
Verification
Location
Travel style
Interests
Destination
Dates
Distance
Bio

---

## 39. DATING MODE

Dating is a mode inside Connect.
Do not redesign the entire application into a pink dating app.
Use:
Auric dark base
Pink accent
Gold secondary branding

---

## 40. FLATMATE MODE

Use the same discovery interaction.
Relevant information:
Location
Budget
Move-in date
Lifestyle
Food preferences
Sleep schedule
Cleanliness
Occupancy preference

---

## 41. PROFILE SWIPE CARD

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 2)*


Card:
```text
┌───────────────────────────────┐
│                               │
│        PROFILE IMAGE          │
│                               │
│                               │
│  Ananya, 24      ✓            │
│  Bengaluru, KA                │
│                               │
│  Photographer | Coffee Lover  │
│                               │
│  #Mountains #Trekking #Dogs   │
│                               │
└───────────────────────────────┘
```

Distance badge:
📍 Within 50 km

---

## 42. SWIPE ACTIONS

Five actions:
Rewind
Dislike
Superlike
Like
Boost
Visual colors:
Rewind → Amber
Dislike → Red
Superlike → Purple
Like → Green / Pink depending on mode
Boost → Blue

---

## 43. SWIPE PHYSICS

Cards should behave physically.
Maximum rotation:
±15°
Swipe threshold:
> 120px displacement
Interactions:
drag
rotation
opacity
direction indicator
spring-back
The card should never feel like a simple HTML carousel.

---

## 44. SWIPE BACKEND INTERACTION

Frontend:
User swipes
 ↓
Optimistic visual transition
 ↓
POST swipe
 ↓
Backend validates
 ↓
Match engine checks mutual interest
 ↓
Response
The UI must recover if the backend rejects the action.

---

## 45. MATCH SCREEN

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 3 - Match Modal)*


Match screen is a special moment.
Background:
deep black
glass layer
subtle confetti
Headline:
It's a Match!
Use display typography.
Show:
User A avatar
heart
User B avatar
CTA:
[ Send a Message ]
Secondary:
[ Keep Swiping ]

---

## 46. MATCH CONTEXT

Where useful, show a short explanation:
You both love trekking
and are planning Coorg.
Do not expose hidden algorithmic reasoning.
Only show safe, understandable compatibility signals.

---

## 47. 1:1 CHAT

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 4 - Direct Chat)*


Chat should feel like a polished messaging application.
Header:
←
Avatar
Name
Online
⋮
Optional AI sparkle icon can provide contextual assistance.

---

## 48. CHAT BUBBLES

Incoming:
dark charcoal
Outgoing:
subtle gold/slate tint
Use timestamps.
Use read receipts where supported.

---

## 49. CHAT COMPOSER

```text
┌────────────────────────────────────┐
│ Type a message...   😊  📎  🎙️  ➤ │
└────────────────────────────────────┘
```

Features:
Text
Emoji
Attachment
Voice
Send

---

## 50. CHAT SAFETY

Actions available from chat menu:
Mute
Block
Report
Unmatch
View Profile
Do not bury safety actions.

---

## 51. GROUPS / COMMUNITIES

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 5 - Communities)*


Community is a first-class product area.
Categories:
Travel Groups
Destination Communities
Interest Communities
Trip Groups

---

## 52. GROUP DISCOVERY CARD

Show:
Cover image
Group name
Destination
Members
Online count
Description
Join button
Example:
Coorg Trip Squad 🌲
12 Members
Coorg
12–15 Dec

[ Join Group ]

---

## 53. GROUP PAGE

Structure:
GROUP COVER
 ↓
GROUP INFORMATION
 ↓
MEMBERS
 ↓
CHAT
 ↓
TRIP PLAN
 ↓
POLLS
 ↓
EXPENSES
 ↓
MEDIA

---

## 54. GROUP CHAT

Header:
←
Group image
Coorg Trip Squad
12 members
⋮
Below:
members
messages
polls
shared plans

---

## 55. GROUP POLL

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 5 - Interactive Poll)*


Example:
Where should we stay in Coorg?

Homestay in Madikeri       8
████████████

Resort in Suntikoppa      3
████

Budget Stay               1
█
Show:
Vote Now
or
Poll Closed

---

## 56. GROUP AI

AI can appear inside group planning.
Example:
Ask Auric AI

"Suggest a dinner place for 8 people under ₹4,000."
AI response should appear as a normal product card/message.
Do not create an enormous AI dashboard.

---

## 57. TRIPS

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 6 - Day-wise Timeline) & [`website view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%20view.png)*


Trips are the operational center of a journey.
Main states:
Upcoming
Ongoing
Past
Cancelled

---

## 58. TRIP CARD

Coorg Getaway

12 Dec – 15 Dec
4 Members

75% Complete

[ Open Trip ]

---

## 59. TRIP DETAIL PAGE

Tabs:
Itinerary
Bookings
Expenses
Details

---

## 60. ITINERARY

Use day-by-day timeline.
Example:
DAY 1 — 12 DEC

Reach Coorg
↓
Check-in
↓
Abbey Falls
↓
Local Cafe
Each activity may contain:
time
location
image
notes
booking
travel duration

---

## 61. ITINERARY PROGRESS

Trip header:
75%
Completed
Use circular progress ring.
Gold progress.

---

## 62. ADD ITINERARY ITEM

Floating action button:
+
Options:
Add Place
Add Activity
Add Stay
Add Note
Add Reservation

---

## 63. AI TRIP PLANNER

*Direct Visual Reference: [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png) & [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 7)*


Dedicated full-page experience.
Header:
AI Trip Planner
Input:
Plan a 4 day trip to Coorg
for 4 people under ₹15,000
per person.

---

## 64. AI PLANNER RESULT

Show:
Trip summary
Budget
Route
Best season
Travel time
Day-by-day itinerary
Example:
Estimated Budget

₹14,250 / person

Best Season:
Oct – Feb

Travel Time:
6 hrs

---

## 65. AI ROUTE MAP

Use a real map component.
Map shows:
Start
 ↓
Stop 1
 ↓
Stop 2
 ↓
Stop 3
 ↓
End
Route should be visually understandable.

---

## 66. AI PLANNER ACTIONS

Customize
Replace Activity
Remove
Add Stop
Change Budget
Change Dates
Save Trip
Share with Group

---

## 67. AI ASSISTANT

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 8 - Auric AI Concierge)*


Auric AI is the unified assistant.
It should not feel like a separate AI application.
Header:
Auric AI
Your Personal Travel Assistant

---

## 68. AI ASSISTANT HOME

Greeting:
Hi Ketan! 👋
How can I help you today?
Quick actions:
Plan a trip
Find stays
Suggest activities
Show my bookings
Weather update
Budget calculator

---

## 69. AI CHAT

Input:
Ask me anything about travel...
Optional:
🎙 Voice
➤ Send

---

## 70. AI ASSISTANT CONTEXT

When authorized, AI can use:
Current trip
Itinerary
Bookings
Destination
Budget
Preferences
Group context
Never visually expose private context unnecessarily.

---

## 71. AI ACTION CONFIRMATION

For informational actions:
AI can answer directly.
For state-changing actions:
AI suggests
 ↓
User confirms
 ↓
Backend executes
Example:
AI:
I can add Abbey Falls
to Day 2.

[ Add to Trip ]
[ Cancel ]

---

## 72. AI VISUAL RULE

Never use:
"AI generated"
as a visual badge on normal UI.
Never make every AI card purple.
Use AuricVista's normal design language.
AI can have a subtle purple identity in specific planner surfaces, but it must remain part of the product.

---

## 73. STAYS BROWSER

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 9) & [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png)*


Page structure:
Search
 ↓
Category Filters
 ↓
Property Results
 ↓
Property Details
 ↓
Booking
Filters:
All
Homestay
Hostel
Resort
PG
Rental

---

## 74. PROPERTY CARD

Card:
Image
Heart
Verified badge

Property Name
Location

★ 4.7
128 reviews

₹1,299 / night

---

## 75. PROPERTY DETAIL PAGE

Sections:
Gallery
Property Name
Location
Rating
Description
Amenities
Rooms
Policies
Map
Reviews
Price
Availability
Booking CTA
Sticky mobile CTA:
₹1,299 / night

[ Reserve ]

---

## 76. BOOKING CHECKOUT

*Direct Visual Reference: PRD 1 (§81) & PRD 2 (§18) Checkout Protocol*


Four-step structure:
1. Review
2. Guest Information
3. Payment
4. Confirmation

---

## 77. BOOKING REVIEW

Show:
Property
Room
Dates
Guests
Base price
Taxes
Discount
Final amount

---

## 78. GUEST INFORMATION

Fields:
Name
Phone
Email
Special request
Verified information should be prefilled where appropriate.

---

## 79. PAYMENT

Payment screen must feel highly trustworthy.
Show:
Total
Payment method
Secure payment indication
Do not display raw payment credentials.

---

## 80. BOOKING CONFIRMATION

Confirmation page:
✓ Booking Confirmed

Booking ID

Property
Dates
Guests

[ View Trip ]
[ View Voucher ]

---

## 81. TRIP WALLET

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 10 - Group Wallet Ledger)*


Wallet belongs to the trip.
Header:
Coorg Trip Wallet
4 Members
Summary:
Total Spent
₹28,450

Per Person
₹7,112

---

## 82. EXPENSE LIST

Example:
Homestay Booking
₹12,000
Paid by Rohit

Jeep Safari
₹4,800
Paid by You

Food & Groceries
₹3,650
Paid by Sneha

Fuel
₹4,000
Paid by Ketan

Miscellaneous
₹4,000
Paid by Amit

---

## 83. ADD EXPENSE

Fields:
Amount
Category
Paid By
Participants
Note
CTA:
[ Add Expense ]

---

## 84. SETTLE UP

Show:
You owe Rohit ₹1,250

Sneha owes you ₹800

Amit owes you ₹450
CTA:
[ Settle Up ]
The actual balance calculation must come from the backend.

---

## 85. PROFILE

*Direct Visual Reference: [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 11 - Profile & Trust Hub)*


Profile header:
Avatar
Name
Verification
Handle
Location
Bio
Stats:
Trips
Followers
Following

---

## 86. PROFILE MENU

Edit Profile
Verification
Safety & Emergency
My Trips
Saved Stays
Settings
Log Out

---

## 87. EDIT PROFILE

Editable:
Photos
Name where permitted
Bio
Interests
Travel style
Preferences
Use simple forms.

---

## 88. KYC / VERIFICATION PAGE

Show:
Verification

Identity
✓ Verified

Phone
✓ Verified

Email
✓ Verified
If pending:
Verification in progress
If failed:
We couldn't verify your identity.

[ Review Details ]
[ Try Again ]
Do not expose raw KYC documents after submission unless required.

---

## 89. SAFETY HUB

*Direct Visual Reference: [`website 2.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/website%202.png) (Sidebar) & [`app view.png`](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/templet/app%20view.png) (Screen 11/12)*


Safety page:
Safety & Emergency
Status:
Safety Check-ins
Active

Emergency Contacts
3 Added

Live Location
Shared with Group

24×7 Safety Support
Available

---

## 90. SOS BUTTON

SOS is visually unmistakable.
Use:
RED
HIGH CONTRAST
LARGE TAP TARGET
Example:
```text
┌─────────────────────────────┐
│                             │
│            SOS              │
│       Emergency Help        │
│                             │
└─────────────────────────────┘
```

Do not decorate SOS with AI effects.

---

## 91. SOS CONFIRMATION

Because SOS is high impact, avoid accidental activation while maintaining rapid access.
Use a carefully designed activation interaction according to the safety PRD.
Once activated:
SOS ACTIVE
 ↓
Location broadcast
 ↓
Emergency contacts notified
 ↓
Admin emergency team alerted

---

## 92. EMERGENCY SCREEN

Full-screen emergency interface.
Show:
Emergency Active

Current Location
GPS accuracy

Emergency Contacts
Notified ✓

AuricVista Emergency Desk
Alerted ✓
Direct calls:
Police — 112
Ambulance — 108
Women's Helpline — 1091
AuricVista Emergency Desk
AI must not control emergency routing.

---

## 93. SOLO TRAVEL MODE

The interface can support solo travelers.
Display:
Solo Trip
Safety Check-in
Today's Plan
Weather
Location
AI Assistance
Emergency
Social matching remains optional.

---

## 94. COUPLE TRAVEL MODE

Trip UI may adapt to:
Romantic activities
Dining
Scenic locations
Relaxation
Photography
Shared itinerary
The base design system does not change.

---

## 95. GROUP TRAVEL MODE

Group trip interface adds:
Members
Chat
Polls
Shared itinerary
Expenses
Attendance
Safety

---

## 96. NOTIFICATIONS

Notification center should group events.
Categories:
Matches
Messages
Trips
Bookings
Groups
Safety
Account
Example:
Ananya liked you back.
2 min ago

Your Coorg trip starts tomorrow.
1 hr ago

Booking confirmed.
Yesterday

---

## 97. NOTIFICATION PRIORITY

Visual priority:
Emergency
 ↓
Critical booking/payment
 ↓
Trip
 ↓
Message/match
 ↓
Marketing
Marketing must never visually compete with SOS or critical travel information.

---

## 98. SEARCH RESULTS

Search results must be context-sensitive.
Example:
"Coorg"
can return:
Destinations
Stays
Trips
People
Groups
Experiences

---

## 99. SEARCH FILTERS

Filters depend on category.
Stay:
Price
Rating
Type
Amenities
Distance
Availability
People:
Travel style
Interests
Distance
Dates
Budget
Groups:
Destination
Dates
Group size
Interest

---

## 100. DESTINATION PAGE

Destination page:
Hero
 ↓
Overview
 ↓
Places
 ↓
Activities
 ↓
Food
 ↓
Stays
 ↓
Trips
 ↓
Groups
 ↓
People
 ↓
AI planning
The destination is the bridge between every AuricVista product domain.

---

## 101. DESTINATION HERO

Example:
Hampi, Karnataka

Discover Beyond Travel

UNESCO World Heritage
Metadata:
Current local time
Temperature
Sunset

---

## 102. DESTINATION CONTENT

Use editorial layouts.
Do not turn every section into identical cards.
Mix:
large image
small cards
horizontal carousels
editorial text
map
activity tiles

---

## 103. COMMUNITY PAGE

Community page contains:
Hero
Featured communities
Nearby groups
Popular destinations
Upcoming group trips
Create group

---

## 104. CREATE GROUP

Fields:
Group Name
Destination
Dates
Capacity
Description
Privacy
Travel style
Activities
Primary CTA:
[ Create Group ]

---

## 105. GROUP JOIN FLOW

View Group
 ↓
Join
 ↓
Backend eligibility
 ↓
Approved
 ↓
Member
 ↓
Group Chat
If approval is required:
Join Request Sent

---

## 106. PARTNER PORTAL

*Direct Visual Reference: Dedicated Partner Portal (`/partner`)*


Route:
/partner
The partner portal is visually related to AuricVista but operationally more dashboard-oriented.
Primary sections:
Overview
Properties
Inventory
Bookings
Messages
Earnings
Profile

---

## 107. PARTNER ONBOARDING

Steps:
Account
 ↓
Business information
 ↓
Host KYC
 ↓
Property
 ↓
Bank details
 ↓
Verification

---

## 108. PROPERTY LISTING WIZARD

Steps:
Property Details
 ↓
Location
 ↓
Photos
 ↓
Rooms / Units
 ↓
Amenities
 ↓
Policies
 ↓
Pricing
 ↓
Review
 ↓
Submit

---

## 109. PARTNER INVENTORY

Calendar view:
Date
Room
Availability
Booking
Block
Hold
Use clear status colors.

---

## 110. PARTNER MESSAGES

Host can communicate with guests.
Optional AI-assisted draft:
Guest:
"What time can I check in?"

AI draft:
"Check-in begins at 2:00 PM..."

Host:
[ Send ]
[ Edit ]
AI must not automatically send sensitive or binding responses without appropriate controls.

---

## 111. PARTNER EARNINGS

Show:
Current Balance
Upcoming Payout
Completed Stays
Transaction History

---

## 112. ADMIN PORTAL

*Direct Visual Reference: Dedicated Super Admin & Staff Operations Portal (`/admin`)*


Route:
/admin
The admin portal can be more information-dense than the consumer product.
Navigation:
Dashboard
Users
KYC
Properties
Bookings
Groups
Reports
Safety
Support
Pricing
Offers
CMS
Automation
Audit Logs

---

## 113. ADMIN DASHBOARD

Show operational metrics:
Active Users
Bookings
Revenue
Pending KYC
Pending Properties
Open Support Tickets
Active SOS Incidents
Automation Failures

---

## 114. HERO CMS

Admin can manage:
Destination
Image
Title
Subtitle
Metadata
Start Date
End Date
Order
Active / Inactive
This controls the homepage cinematic hero.

---

## 115. PROPERTY MODERATION

Admin can:
Review
Approve
Reject
Request Changes
Mark Sponsored
Suspend

---

## 116. USER TRUST PANEL

Admin can review:
KYC state
Reports
Blocks
Verification history
Safety incidents
Sensitive information must be role-restricted.

---

## 117. SAFETY ADMIN CONSOLE

Safety console must be operationally clear.
Show:
Active SOS incidents
Location
User
Trip
Time
Contact status
Responder status
Emergency information should have high visual priority.

---

## 118. SUPPORT DESK

Support UI:
Ticket Queue
 ↓
Ticket Details
 ↓
User Context
 ↓
Booking Context
 ↓
Actions
 ↓
Resolution

---

## 119. AUTOMATION VISUAL BOUNDARY

Frontend does NOT directly depend on n8n for core state.
Correct architecture:
FRONTEND
    ↓
BACKEND API
    ↓
DATABASE
    ↓
DOMAIN EVENT
    ↓
AUTOMATION / n8n
    ↓
EXTERNAL SERVICE
    ↓
BACKEND
    ↓
FRONTEND
Never:
Frontend
 ↓
n8n
 ↓
Database
for authoritative transactions.

---

## 120. UI → BACKEND → AUTOMATION MAPPING

Architectural contract mapping user interface actions to authoritative backend domain mutations and downstream automation workflows:

### 120.1 Registration Flow
```text
UI: Register
  ↓
Backend: Create account
  ↓
Event: USER_REGISTERED
  ↓
Automation: OTP / lifecycle onboarding workflow
```

### 120.2 Identity Verification (KYC) Flow
```text
UI: Start Verification
  ↓
Backend: Create KYC session
  ↓
Provider: External verification provider
  ↓
Callback: Webhook verification response
  ↓
Backend: Update authoritative KYC status
  ↓
Event: KYC_VERIFIED / KYC_FAILED
  ↓
Automation: Push/SMS notification / retry flow / admin review
```

### 120.3 Profile Management Flow
```text
UI: Update Profile
  ↓
Backend: Validate and save profile
  ↓
Event: PROFILE_UPDATED
  ↓
Automation: Profile quality score calculation / recommendation index refresh
```

### 120.4 Swipe & Match Flow
```text
UI: Swipe (Right / Like / Superlike)
  ↓
Backend: Record swipe in transaction
  ↓
Matching Engine: Evaluate mutual interest
  ↓
If Matched: MATCH_CREATED
  ↓
Automation: Instant match push notification
  ↓
Frontend: "It's a Match!" celebration modal
```

### 120.5 Match to 1:1 Direct Chat Flow
```text
Match Created
  ↓
Chat Permission Token Issued
  ↓
System Notification
  ↓
Open 1:1 Direct Realtime Chat
```

### 120.6 Community & Group Flow
```text
UI: Create Group / Join Group
  ↓
Backend: Membership authorization & persistence
  ↓
Event: GROUP_CREATED / GROUP_MEMBER_JOINED
  ↓
Automation: Recruitment notifications / active trip reminders
```

### 120.7 Property Booking Flow
```text
UI: Book Property / PG
  ↓
Backend: Verify live inventory & hold dates
  ↓
Payment Gateway: Razorpay / Stripe modal payment
  ↓
Backend: Webhook verification & booking confirmation
  ↓
Event: BOOKING_CONFIRMED
  ↓
Automation: Send PDF voucher via WhatsApp/Email & link to user Trip Itinerary
```

### 120.8 Trip Wallet & Expense Ledger Flow
```text
UI: Add Expense
  ↓
Backend: Record itemized expense
  ↓
Split Engine: Recalculate group balances
  ↓
Authoritative State: Update wallet ledger
  ↓
Realtime Event: Broadcast balance update
  ↓
Frontend: Optimistically reconciled member balances
```

### 120.9 In-App AI Concierge Flow
```text
User: Natural language travel prompt
  ↓
AI Interface: Client input validation & query sanitization
  ↓
AI Gateway: Token budget & rate limit enforcement
  ↓
Authorized Context: Inject user profile & active trip parameters
  ↓
Tool Call: Safe read query to backend APIs
  ↓
Validated Result: Sanitize backend payload
  ↓
AI Response: Render structured recommendation cards / itinerary suggestions
  ↓
User: One-tap action to save or execute
```

### 120.10 Critical Safety & SOS Emergency Flow
```text
UI: Big Red SOS Button Pressed (Hold / Tap)
  ↓
Backend: Authoritative P0 emergency incident created
  ↓
Emergency Event: EMERGENCY_SOS_ACTIVATED
  ↓
Deterministic Automation: Immediate SMS & automated emergency calls to contacts
  ↓
Super Admin Safety Command Console: Real-time alert with live GPS breadcrumb tracking
```
> **Critical Architectural Constraint:** AI is NEVER in the critical SOS execution path. Flow operates exclusively on 100% deterministic backend routing.

---

## 121. REALTIME UI

Realtime should be used for:
Chat messages
Typing indicators
Online state
Group messages
Poll updates
Expense updates
Booking status where appropriate
SOS state
Trip collaboration
The UI must update without requiring full page refreshes.

---

## 122. OPTIMISTIC UI

Use optimistic interaction only where safe.
Good:
Like animation
Save stay
Send message
Toggle preference
Be cautious with:
Payment
Booking
KYC
SOS
Wallet settlement
These require authoritative confirmation.

---

## 123. MOBILE DRAWERS

Mobile should use bottom sheets for:
Filters
Search filters
Trip actions
Expense actions
Profile actions
Group settings
AI actions
Avoid desktop-style tiny dropdown menus on mobile.

---

## 124. MOBILE FULL-SCREEN FLOWS

Use full-screen pages for:
Search
KYC
Payment
AI Planner
Chat
SOS
Profile editing
Property details

---

## 125. DESKTOP LAYOUT

*Direct Visual Reference: Master Desktop Dual-Layout Blueprint (`website 2.png`)*


Desktop can use multi-column layouts.
Example:
```text
┌──────────────────────────────────────────────────────────────┐
│ NAV                                                          │
├───────────────────────────────────────┬──────────────────────┤
│                                       │                      │
│ MAIN CONTENT                          │ CONTEXT SIDEBAR      │
│                                       │                      │
│ Hero                                  │ Active Trip          │
│ Search                                │ Groups               │
│ Destinations                          │ Matches              │
│ Stays                                 │ Auric AI             │
│ Planner                               │ Wallet               │
│                                       │ Safety               │
└───────────────────────────────────────┴──────────────────────┘
```


---

## 126. DESKTOP HOME MASTER LAYOUT

Primary column:
65%
Sidebar:
35%
Main content:
Cinematic hero
Search
Destinations
Stays
AI planner
Trust
Sidebar:
Active trip
Groups
Matches
AI assistant
Wallet
Safety

---

## 127. DESKTOP HOME VISUAL HIERARCHY

Priority:
1. Destination hero
2. Search
3. Current trip / personalized context
4. Destinations
5. Stays
6. People
7. AI
8. Communities
9. Trust

---

## 128. MOBILE HOME VISUAL HIERARCHY

Priority:
1. Hero
2. Search
3. Destinations
4. Stays
5. People
6. AI planner
7. Groups
8. Active trip
9. Safety

---

## 129. CARD DESIGN

Cards should not all look identical.
Use three families:
Editorial Cards
Large image + text overlay.
For:
destinations
hero content
experiences
Marketplace Cards
Image + structured information.
For:
stays
PG
rentals
Utility Cards
Dense but clean.
For:
wallet
trip progress
AI actions
safety
booking

---

## 130. ICONOGRAPHY

Use one coherent icon library.
Icons should be:
simple
outlined
consistent
small
Avoid mixing:
3D icons
emoji
random icon sets
Emoji can appear in user-generated content and casual UI where appropriate.

---

## 131. AVATAR SYSTEM

Sizes:
24px
32px
40px
48px
64px
80px
120px
Verified badge:
small blue/green check
Do not overuse badges.

---

## 132. ONLINE STATUS

Green dot:
6px – 8px
Use next to avatar.
Text:
Online
Active now
Last seen
Only show what privacy settings permit.

---

## 133. FAVORITE / SAVE

Property cards use a heart icon.
States:
Unselected:
outline

Selected:
filled
Do not use unnecessary animation.

---

## 134. TOAST SYSTEM

Examples:
Stay saved.

Trip updated.

Expense added.

Match created.

Booking confirmed.
Toast should appear briefly and not interrupt important workflows.

---

## 135. MODALS

Use modal only for:
confirmation
short action
important warning
match celebration
Do not place entire pages inside modals.

---

## 136. ACCESSIBILITY

Minimum requirements:
keyboard navigation
visible focus
ARIA labels
semantic HTML
sufficient contrast
large touch targets
screen reader support
reduced motion
Interactive touch targets should generally be at least:
44 × 44px

---

## 137. REDUCED MOTION

If user prefers reduced motion:
Disable or reduce:
hero zoom
swipe rotation
confetti
large transitions
parallax
Keep the interface fully functional.

---

## 138. ANIMATION SYSTEM

Animations should communicate interaction.
Use:
Hero crossfade:
700ms

Button:
150–200ms

Card:
200–300ms

Modal:
200–250ms

Swipe:
spring physics

Match confetti:
~1.5s
Avoid continuous decorative animation.

---

## 139. MICRO-INTERACTIONS

Use:
heart pulse
button press
save transition
card lift
image hover
progress animation
message arrival
Animation should never slow down a task.

---

## 140. SWIPE MICRO-INTERACTION

While dragging:
drag right:
LIKE indicator

drag left:
PASS indicator

drag up:
SUPERLIKE where supported
Indicators should be subtle and disappear when card returns.

---

## 141. MATCH MICRO-INTERACTION

Sequence:
Card completes
 ↓
Screen darkens
 ↓
Confetti
 ↓
Match title
 ↓
Avatars animate into place
 ↓
CTA appears
Total experience should be fast.

---

## 142. AI MICRO-INTERACTION

AI loading:
Do not show:
"AI is thinking..."
as a huge animated message.
Prefer:
Planning your trip...
or:
Checking available options...
Use product language instead of technical AI language.

---

## 143. CHAT MESSAGE STATES

Messages:
Sending
Sent
Delivered
Read
Failed
Failed:
!
Tap to retry

---

## 144. PROPERTY IMAGE LOADING

Use:
aspect-ratio locked container
skeleton
progressive loading
Never allow layout jumping.

---

## 145. PROFILE IMAGE LOADING

Use blurred / skeleton placeholder.
Maintain card dimensions.

---

## 146. OFFLINE BEHAVIOR

Where supported, retain:
saved trips
essential itinerary
booking references
emergency information
Show:
You're offline.

Some live information may be unavailable.
Do not imply live availability when offline.

---

## 147. SECURITY-RELATED UI

Never expose:
API keys
provider secrets
raw tokens
internal IDs
KYC raw documents
admin-only fields

---

## 148. PRIVACY UI

Settings should include:
Profile visibility
Location sharing
Message permissions
AI personalization
AI memory
Notification preferences
Safety sharing
Users should have clear control over optional personalization.

---

## 149. AI MEMORY UI

If Auric AI stores personalization:
AI Personalization

Remember my travel preferences
✓

Use my saved trips
✓

Use my previous conversations
[ setting ]
Allow:
View
Edit
Delete

---

## 150. LOCATION UI

Location permissions should be explicit.
Use:
Use current location
rather than silently requesting location.
Explain why:
Used to find nearby stays and travel companions.

---

## 151. SOCIAL PRIVACY

Users should control:
Who can discover me
Who can message me
Distance visibility
Travel intent visibility
Profile visibility

---

## 152. RESPONSIVE DATA DENSITY

Mobile:
one major action per viewport
Desktop:
multiple contextual actions
Never simply shrink desktop UI into mobile.

---

## 153. DESKTOP SIDEBAR RULE

Sidebar content should be contextual.
For example:
On Explore:
Active Trip
Groups
Matches
AI

On Trip:
Group
Wallet
Safety
AI

On Stays:
Trip
Saved Stays
AI

---

## 154. FOOTER

Desktop footer:
AuricVista

Company
About
Careers
Contact

Products
Stays
Trips
Connect
Communities

Resources
Safety
Help Center
Travel Guide

Follow Us
Instagram
YouTube
LinkedIn

Download App
App Store
Google Play
Mobile footer should be simplified.

---

## 155. LANDING / PUBLIC EXPERIENCE

Unauthenticated users can see:
Hero
Destinations
Stays
Communities
How AuricVista works
Safety
AI overview
CTA
Footer
Primary CTA:
Join AuricVista
Secondary:
Explore Destinations

---

## 156. LOGIN

Login screen should be minimal.
AuricVista

Welcome back.

Phone / Email

[ Continue ]

or

Continue with supported provider

Privacy
Terms
Do not clutter the login screen.

---

## 157. REGISTRATION

Registration should be progressive.
Account
 ↓
Verification
 ↓
Profile
 ↓
Interests
 ↓
Travel preferences
 ↓
Optional advanced setup
Do not ask 30 questions on the first screen.

---

## 158. ONBOARDING

Onboarding should feel like discovering the product.
Example:
What brings you to AuricVista?

Travel
Find stays
Travel buddies
Communities
Dating
Flatmates
Multiple selections allowed where appropriate.

---

## 159. ONBOARDING INTERESTS

Example:
Mountains
Beaches
Food
Photography
Trekking
Nightlife
Culture
Nature
Adventure
Relaxation
Use visual chips.

---

## 160. PROFILE COMPLETION

Progress indicator:
Profile
75% complete
Suggestions:
Add another photo
Add your travel style
Add interests

---

## 161. DESIGN STATES

Every interactive component must support:
Default
Hover
Focus
Active
Pressed
Selected
Disabled
Loading
Error
Empty
Success
Do not implement only the happy path.

---

## 162. BUTTON STATES

Example:
Default
Hover
Pressed
Loading
Disabled
Success
Error
Loading:
spinner
+
preserve button width

---

## 163. CARD STATES

Cards can be:
Default
Hover
Selected
Saved
Unavailable
Loading
Error

---

## 164. PROPERTY UNAVAILABLE

Example:
Unavailable for selected dates.

[ Change Dates ]
Do not show a misleading active booking CTA.

---

## 165. MATCH UNAVAILABLE

If a profile disappears:
This profile is no longer available.

[ Continue Discovering ]

---

## 166. GROUP FULL

This group is currently full.

Join Waitlist

---

## 167. TRIP CANCELLED

Show clearly:
Trip Cancelled

Your bookings and expenses remain available
for review.

---

## 168. AI FAILURE

Never expose model/provider errors.
Bad:
OpenAI API error
Good:
I couldn't complete that right now.

You can try again or continue manually.

[ Try Again ]
[ Continue Manually ]

---

## 169. PAYMENT FAILURE

Payment could not be completed.

No booking has been confirmed.

[ Try Again ]

---

## 170. KYC FAILURE

We couldn't verify your identity.

Please review the information and try again.
Provide support escalation where required.

---

## 171. CHAT FAILURE

Message not sent.

[ Retry ]

---

## 172. AUTOMATION FAILURE

Automation failures should generally be invisible to users.
Example:
Instead of:
n8n execution failed
show:
We'll retry that automatically.
unless user action is required.

---

## 173. FRONTEND PERFORMANCE

The frontend should prioritize:
fast first render
image optimization
lazy loading
route-level code splitting
component reuse
minimal client-side JavaScript
Large images must be optimized.

---

## 174. IMAGE PERFORMANCE

Use:
WebP / AVIF where supported
responsive image sizes
lazy loading
priority loading for hero
blur placeholders
Hero image should be prioritized.

---

## 175. REACT COMPONENT ARCHITECTURE

Suggested structure:
```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── navigation/
│   ├── travel/
│   ├── stays/
│   ├── connect/
│   ├── chat/
│   ├── groups/
│   ├── trips/
│   ├── ai/
│   ├── wallet/
│   ├── safety/
│   └── profile/
├── features/
│   ├── auth/
│   ├── matching/
│   ├── booking/
│   ├── trips/
│   ├── messaging/
│   ├── communities/
│   └── ai/
├── hooks/
├── lib/
├── services/
├── types/
└── styles/
```


---

## 176. COMPONENT REUSE

Do not create separate versions of:
Button
Card
Modal
Input
Avatar
Badge
Tabs
for every page.
Create a shared design system.

---

## 177. PAGE ROUTE MAP

Every core surface must have a permanent, deterministic URL route:

#### Public Routes
- `/` — Homepage / Cinematic Explore Feed
- `/explore` — Destination catalog
- `/destinations/:slug` — Individual destination editorial hub
- `/stays` — Stays & Urban PG search
- `/stays/:id` — Property detail page
- `/communities` — Public community explorer
- `/communities/:id` — Community group preview
- `/login` — User authentication & phone OTP
- `/register` — New account registration

#### Authenticated App Routes
- `/app` — Authenticated home dashboard
- `/app/explore` — Personalized travel discovery
- `/app/trips` — Trip management overview
- `/app/trips/:id` — Active / past trip details & timeline itinerary
- `/app/connect` — Social discovery feed
- `/app/connect/travel-buddy` — Travel buddy matchmaking feed
- `/app/connect/dating` — Dating mode matchmaking feed
- `/app/connect/flatmates` — Flatmate matchmaking feed
- `/app/matches` — Direct match candidates
- `/app/chat/:id` — 1:1 real-time direct chat
- `/app/groups` — Joined communities & squad hubs
- `/app/groups/:id` — Community group chat, timeline & interactive polls
- `/app/ai` — Personal Auric AI Concierge portal
- `/app/ai/planner` — Multi-day AI trip planner
- `/app/stays` — Filtered stay booking
- `/app/stays/:id` — Stay details & room selection
- `/app/bookings` — Confirmed bookings & vouchers
- `/app/wallet/:tripId` — Trip expense splitting ledger
- `/app/profile` — User profile & trust stats
- `/app/profile/edit` — Edit bio, photos, interests
- `/app/profile/verification` — KYC identity verification
- `/app/profile/safety` — Safety hub & emergency contacts
- `/app/settings` — App settings, privacy, quiet hours

#### Partner Portal Routes
- `/partner` — Partner dashboard & occupancy metrics
- `/partner/properties` — Listed properties overview
- `/partner/properties/new` — Multi-step property listing wizard
- `/partner/inventory` — Multi-unit calendar & room availability
- `/partner/bookings` — Guest reservations & check-ins
- `/partner/messages` — Guest inquiries & communications
- `/partner/earnings` — Payout ledger & locked baseline prices

#### Super Admin Operations Routes
- `/admin` — Operations command center
- `/admin/users` — User management & moderation
- `/admin/kyc` — Identity verification review panel
- `/admin/properties` — Host listing moderation & sponsored flags
- `/admin/bookings` — Booking management & dispute resolution
- `/admin/groups` — Group oversight & community safety
- `/admin/reports` — User reports & moderation queue
- `/admin/safety` — Real-time SOS emergency command console
- `/admin/support` — Multi-channel customer service desk
- `/admin/pricing` — Dynamic markup, platform fees & discounts
- `/admin/offers` — 1-time WhatsApp re-engagement coupons
- `/admin/cms` — Homepage hero slideshow & banner manager
- `/admin/automation` — Event webhook logs & n8n status
- `/admin/audit` — Immutable administrator audit logs

---

## 178. PAGE TRANSITION RULE

Navigation should feel immediate.
Use transitions only when they improve continuity.
Examples:
Destination card
→ Destination page

Property card
→ Property detail

Profile card
→ Profile detail

Trip card
→ Trip detail

---

## 179. DEEP-LINKING

Every important entity should have a stable route.
Examples:
/trips/:id
/groups/:id
/stays/:id
/destinations/:slug
/chat/:id

---

## 180. URL STATE

Search filters and selected dates should be shareable where appropriate.
Example:
/stays?destination=coorg&checkin=...

---

## 181. DESIGN TOKEN IMPLEMENTATION

Tokens should exist in one source.
Example:
```css
:root {
  --bg-primary: #080B10;
  --bg-surface: #0E141E;
  --bg-surface-elevated: #151D2C;
  --bg-surface-hover: #1D273B;

  --text-primary: #FFFFFF;
  --text-secondary: #C4CBD6;
  --text-muted: #7E8B9F;

  --surface-light: #F8F9FB;
  --surface-light-card: #FFFFFF;

  --gold-primary: #E5A93C;
  --gold-glow: #F3C766;
  --gold-dark: #B88220;

  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --social-pink: #EC4899;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-full: 9999px;
}
```


---

## 182. DESIGN RATIO

Maintain the visual ratio:
60%
Deep black / charcoal

30%
Warm white / neutral

10%
Auric gold
Social pink is a contextual accent and should not dominate the overall ratio.

---

## 183. DESIGN DON'TS

NEVER:
- make the entire UI purple because AI is present
- make the entire app pink because dating exists
- use generic SaaS gradients
- use random glassmorphism everywhere
- use inconsistent fonts
- use excessive shadows
- use tiny touch targets
- hide critical safety actions
- expose technical errors to users
- make AI the center of every page
- turn the home page into a dashboard
- make desktop UI simply shrink into mobile
- make every card identical
- allow frontend-only booking state
- allow frontend-only payment confirmation
- allow AI to directly perform high-risk actions without authorization
- allow n8n to become the authoritative application database

---

## 184. DESIGN DO'S

ALWAYS:
- prioritize travel imagery
- maintain black + gold identity
- use white carefully for readability
- use typography to establish luxury
- keep navigation predictable
- make mobile excellent
- use contextual AI
- make trust visible
- make safety obvious
- make social discovery fun but controlled
- keep cards visually consistent
- maintain backend-authoritative state
- design all loading/error/empty states
- maintain accessibility
- optimize images
- reuse components

---

## 185. HOME PAGE FINAL COMPOSITION

*Direct Visual Reference: Homepage Final Composition Blueprint*


Desktop:
```text
┌─────────────────────────────────────────────────────────────────────┐
│ AURICVISTA  Explore  Stays  Trips  Connect  Communities  AI        │
├─────────────────────────────────────────────┬───────────────────────┤
│                                             │ Active Trip           │
│                                             │                       │
│             CINEMATIC HERO                  │ Groups                │
│                                             │                       │
│      Discover Beyond Travel                 │ Matches               │
│                                             │                       │
│             SEARCH                          │ Auric AI              │
│                                             │                       │
│       POPULAR DESTINATIONS                  │ Wallet                │
│                                             │                       │
│       FEATURED STAYS                        │ Safety                │
│                                             │                       │
│       AI TRIP PLANNER                       │                       │
└─────────────────────────────────────────────┴───────────────────────┘
```

Mobile:
```text
┌──────────────────────────────┐
│ AuricVista      🔔      ⌕   │
├──────────────────────────────┤
│                              │
│       CINEMATIC HERO         │
│                              │
│  Hampi, Karnataka            │
│  Discover Beyond Travel      │
│                              │
├──────────────────────────────┤
│ 🔍 Where do you want to go? │
├──────────────────────────────┤
│ Popular Destinations         │
│ [Coorg] [Goa] [Manali]      │
├──────────────────────────────┤
│ Stays You'll Love            │
│ [Property cards]             │
├──────────────────────────────┤
│ Discover People              │
│ [Profile Card]               │
├──────────────────────────────┤
│ AI Trip Planner              │
│ [Create Trip]                │
├──────────────────────────────┤
│ Communities                  │
│ [Group cards]                │
├──────────────────────────────┤
│ Trust & Safety               │
├──────────────────────────────┤
│ Explore Trips Connect Inbox  │
│ Profile                      │
└──────────────────────────────┘
```


---

## 186. COMPLETE USER VISUAL JOURNEY

```text
LANDING
   ↓
LOGIN / REGISTER
   ↓
OTP
   ↓
KYC
   ↓
ONBOARDING
   ↓
PROFILE
   ↓
EXPLORE
   │
   ├──────────────→ DESTINATION
   │                    ↓
   │                STAYS
   │                    ↓
   │                BOOKING
   │                    ↓
   │                  TRIP
   │
   ├──────────────→ CONNECT
   │                    ↓
   │                  SWIPE
   │                    ↓
   │                 MATCH
   │                    ↓
   │                  CHAT
   │                    ↓
   │                  GROUP
   │
   ├──────────────→ COMMUNITIES
   │                    ↓
   │                 GROUP CHAT
   │                    ↓
   │                   POLLS
   │                    ↓
   │              COLLABORATIVE PLAN
   │
   └──────────────→ AI
                        ↓
                  TRIP PLANNER
                        ↓
                     ITINERARY
                        ↓
                      TRIP
                        ↓
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
     BOOKINGS         WALLET           SAFETY
        ↓               ↓                ↓
     CONFIRM          EXPENSES           SOS
        │               │                │
        └───────────────┼────────────────┘
                        ↓
                  ACTIVE JOURNEY
                        ↓
                  TRIP COMPLETION
                        ↓
                    REVIEW
                        ↓
                  NEXT JOURNEY
```


---

## 187. CROSS-DOMAIN DESIGN CONNECTION

Every major object should visually connect to related objects.
Example:
Destination
   ↓
Stay
   ↓
Trip
   ↓
Group
   ↓
Chat
   ↓
Wallet
   ↓
Safety
   ↓
AI
A user should never feel that these are unrelated applications.

---

## 188. EXAMPLE: COORG USER JOURNEY

Walkthrough demonstrating cross-domain continuity across travel, social, AI, bookings, and safety:

```text
User sees:
COORG (Karnataka)
  ↓
Explore Coorg Destination Portal
  ↓
Stays | People | Groups | Activities
  ↓
User Discovers:
"Coorg Trip Squad" Community Group
  ↓
Join Group
  ↓
Active Group Chat
  ↓
Interactive Poll: "Where should we stay in Coorg?"
  ↓
Auric AI Concierge: Suggest accommodation within group budget
  ↓
Group Chooses Stay: "The Hosteller Coorg"
  ↓
Book Property (Deterministic Checkout Flow)
  ↓
Booking Attaches Authoritatively to Trip
  ↓
Trip Day-by-Day Timeline Itinerary Created
  ↓
Group Trip Wallet Activated & Shared
  ↓
Safety Check-in Intervals Activated
  ↓
Trip Commences
  ↓
Auric AI Assists Live During Trip
  ↓
Trip Completed
  ↓
Verified Host & Experience Review
  ↓
Personalized Future Travel Recommendations
```

---

## 189. DESIGN-TO-BACKEND CONTRACT RULE

Every interactive UI element must have a defined, authoritative backend domain owner:

| UI Component / Surface | Authoritative Backend Domain | Purpose & Ownership |
| :--- | :--- | :--- |
| **Login / OTP** | Auth | Session creation, token issuance, rate limits |
| **KYC Verification** | Identity | Identity documents, Aadhaar/Passport verification |
| **Profile & Settings** | Profile | User metadata, photos, travel interests |
| **Swipe Feed** | Matching | Candidate generation, distance & preference filtering |
| **Match Modal** | Matching | Mutual like resolution, chat permission token |
| **Direct 1:1 Chat** | Messaging | Realtime websocket messages, read receipts, media |
| **Community Hub** | Community | Group creation, member permissions, discovery |
| **Group Polls** | Group Planning | Collaborative voting, poll resolution |
| **Trip Itinerary** | Trip | Day-wise stops, member joins, itinerary timeline |
| **Booking & Checkout** | Booking | Date locking, inventory hold, confirmed vouchers |
| **Trip Wallet** | Finance | Itemized expenses, split calculations, settlements |
| **Auric AI Assistant** | AI Gateway | Context assembly, tool call validation, rate limit |
| **SOS Button** | Safety | P0 emergency alert, GPS broadcast, responders |
| **Property Discovery** | Stay | Property listing, amenities, reviews, host rules |
| **Partner Portal** | Partner | Room inventory, locked baseline payouts, earnings |
| **Admin Operations** | Operations | CMS, sponsored badges, moderation, dispute resolution |

---

## 190. DESIGN-TO-AUTOMATION RULE

Automation is triggered by domain events.
Example:
USER_REGISTERED
OTP_VERIFIED
KYC_VERIFIED
PROFILE_UPDATED
SWIPE_RIGHT
MATCH_CREATED
MESSAGE_SENT
GROUP_CREATED
GROUP_MEMBER_JOINED
TRIP_CREATED
BOOKING_CONFIRMED
EXPENSE_ADDED
TRIP_STARTED
TRIP_COMPLETED
SOS_CREATED
The frontend must not directly orchestrate automation workflows.

---

## 191. AI DESIGN BOUNDARY

AI can:
recommend
summarize
plan
explain
assist
personalize
rephrase
calculate
retrieve information
AI should not silently:
confirm payments
change bookings
send sensitive messages
change KYC status
resolve SOS
ban users
approve properties
modify authoritative financial records
Those require backend authorization and appropriate user/admin confirmation.

---

## 192. PRODUCTION DESIGN CHECKLIST

Before a page or feature is considered production-ready, it must verify against this checklist:

#### Visual Design
- [ ] Correct color tokens applied (Strict 60/30/10 ratio: Charcoal / Warm White / Auric Gold)
- [ ] Correct typography (Cinzel / Playfair Display for editorial headers, Plus Jakarta Sans / Outfit for UI)
- [ ] Correct spacing tokens (Strict 8px grid scale)
- [ ] Correct image treatment and aspect ratios (16:9 heroes, 4:3 stays, 4:5 profiles)
- [ ] Correct border radius tokens (`8px`, `14px`, `20px`, `9999px`)
- [ ] Correct elevation shadows (`--shadow-sm` through `--shadow-gold`)
- [ ] Correct visual hierarchy without clutter or generic SaaS cards

#### Responsive Viewports
- [ ] Mobile (< 640px) — 44px touch targets, fixed bottom navigation, dynamic drawers
- [ ] Tablet (768px – 1023px) — Fluid layout adaptation, dual-column support
- [ ] Desktop (1024px – 1279px) — Multi-column layout, sticky navigation & context sidebar
- [ ] Large Desktop (1280px+) & Wide (1440px+) — Max-width containers, balanced density

#### Interactive States
- [ ] Default / Resting state
- [ ] Hover state (desktop)
- [ ] Focus-visible rings (accessibility)
- [ ] Pressed / Active state
- [ ] Shimmering dark skeleton loading state
- [ ] Disabled state (clear visual opacity and non-interactive cursor)
- [ ] Contextual error state with actionable recovery
- [ ] Empty state with helpful illustrations and CTA
- [ ] Success state celebration / feedback

#### Accessibility & Ergonomics
- [ ] Full keyboard navigation support (Tab / Enter / Space / Escape)
- [ ] Clear high-contrast focus rings
- [ ] Semantic ARIA attributes on interactive and dialog controls
- [ ] Accessible WCAG 2.1 AA color contrast ratios
- [ ] Touch targets meet minimum 44×44px guideline
- [ ] `prefers-reduced-motion` respected across all transitions

#### Backend Integration
- [ ] API endpoints strictly mapped to backend contract specifications
- [ ] Deterministic loading state while awaiting responses
- [ ] Authoritative backend response handled without client divergence
- [ ] Graceful error feedback reflecting backend failure payloads
- [ ] Realtime state synchronization handled via websocket events

#### Automation & Event Contracts
- [ ] Explicit domain events identified and emitted upon state change
- [ ] Zero direct frontend → n8n workflow dependencies
- [ ] Asynchronous notification delivery behavior defined
- [ ] Retry behavior defined for failed webhook triggers

---

## 193. FINAL DESIGN QUALITY BAR

AuricVista should look like a premium product that could realistically sit alongside major travel and social platforms.
The experience should communicate:
PREMIUM
        ↓
TRUSTED
        ↓
TRAVEL-FIRST
        ↓
SOCIAL
        ↓
INTELLIGENT
        ↓
SAFE
The user should understand the product within seconds.
They should be able to:
Discover a destination
        ↓
Find a stay
        ↓
Find people
        ↓
Create / join a group
        ↓
Chat
        ↓
Plan a trip
        ↓
Book
        ↓
Manage expenses
        ↓
Travel
        ↓
Stay safe
without feeling that they have moved between separate products.

---

## 194. FINAL IMPLEMENTATION PRINCIPLE

Build AuricVista as one visual ecosystem with multiple product surfaces.
The consumer experience must feel:
ONE APP
ONE BRAND
ONE DESIGN SYSTEM
ONE USER JOURNEY
while internally supporting:
Travel
Stays
PG
Trips
Dating
Travel Buddies
Flatmates
Communities
Groups
Chat
AI
Bookings
Wallet
Safety
Partner Portal
Admin Portal
Automation
The visual identity must remain consistent across all of them.

---

## 195. ABSOLUTE FINAL RULE

When implementing any new AuricVista page or feature:

1. **Reuse existing tokens:** Always bind colors, radii, shadows, and spacing to `:root` design tokens.
2. **Reuse existing components:** Standardize buttons, inputs, cards, avatars, and modals from the global library.
3. **Preserve visual hierarchy:** Strictly enforce the 60% Charcoal / 30% Warm White / 10% Auric Gold distribution.
4. **Editorial storytelling:** Use authentic high-res destination and stay photography as the primary narrative element.
5. **Subtle & integrated AI:** Keep AI assistive, embedded, and contextual; never decorate with gimmick glow effects.
6. **Contextual social discovery:** Keep social interactions relevant to travel, roommates, and shared itineraries.
7. **Uncompromising safety:** Keep safety status visible and the Big Red SOS emergency trigger accessible everywhere.
8. **Design mobile-first:** Build the mobile viewport first with native ergonomics, bottom navigation, and gestures.
9. **Desktop optimization:** Enhance the desktop experience with multi-column productivity and persistent sidebars.
10. **Implement all states:** Every interactive component must handle resting, hover, active, loading, empty, and error.
11. **Authoritative backend ownership:** Map every interaction to an authoritative domain API; the frontend never owns critical state.
12. **Zero client-side authority:** Never make the client the source of truth for bookings, payments, KYC, wallet, or SOS.
13. **Isolated automation:** Never allow the frontend to invoke n8n automation directly for transactional actions.
14. **Humanized error handling:** Never display raw technical stack traces, database codes, or raw JSON errors to users.
15. **Uncompromised SOS pipeline:** The SOS emergency path must remain 100% deterministic with zero AI interference.
16. **Brand integrity:** Never allow visual experimentation to dilute the editorial luxury travel identity of AuricVista.
17. **Evolution over divergence:** New features must extend the existing design system instead of inventing isolated visual styles.

---

### End of Master Design Specification
*This document provides the definitive production blueprint for building every component, page, flow, and portal across AuricVista.*
