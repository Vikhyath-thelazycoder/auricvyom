# AURICVISTA — PROJECT ENGINEERING EXECUTION LOOP
## Formal 14-Stage Task Execution Lifecycle, Decision Trees, and Action Directives

> **Document Status:** Authoritative Project Execution Lifecycle  
> **Target System:** AuricVista / AuricVyom (`Vikhyath-thelazycoder/auricvyom`)  
> **Control Plane Location:** `/prd/engineering-control/agent-loop.md`  
> **Related Control Documents:**  
> - [agent-sop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-sop.md) (Engineering Constitution)  
> - [master-roadmap.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/master-roadmap.md) (Development Sequence)  
> - [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md) (Requirement Matrix)  
> - [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md) (Architectural Decision Register)  

---

# 1. THE 14-STAGE ENGINEERING EXECUTION LOOP

Every engineering task—whether executed by an autonomous coding agent, a background worker, or a human engineer—must strictly progress through the 14 defined stages. Bypassing stages is an operational violation.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        AURICVISTA 14-STAGE EXECUTION LOOP                              │
│                                                                                        │
│   1. OBSERVE      ──▶  2. UNDERSTAND   ──▶  3. TRACE        ──▶  4. CONSTRAIN          │
│          │                                                               │             │
│          ▼                                                               ▼             │
│   5. PLAN         ──▶  6. IMPACT       ──▶  7. IMPLEMENT    ──▶  8. VERIFY             │
│          │                ANALYSIS                                       │             │
│          ▼                                                               ▼             │
│   9. TEST         ──▶ 10. SECURITY     ──▶ 11. ARCHITECTURE ──▶ 12. DOCUMENT           │
│                           REVIEW               REVIEW                    │             │
│                                                                          ▼             │
│                               14. NEXT STEP ◀── 13. REPORT                             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Stage 1: OBSERVE

- **Objective:** Gather raw factual data from the repository without making assumptions or edits.
- **Inputs:** Task prompt, repository file tree, git status, environment configs, package files.
- **Actions:**
  1. Inspect directory structure and check for relevant source files.
  2. Inspect package manifests (`package.json`, `Dockerfile`, `docker-compose.yml`, `nginx.conf`).
  3. Determine the runtime environment (Vanilla ES6 SPA, NestJS, Docker container, or mock scripts).
  4. Search for existing related code paths and active dependencies.
- **Expected Output:** An inventory of relevant files, active dependencies, and current runtime status.
- **Failure Conditions:** Missing repository access, unreadable directories, or assuming files exist without reading the filesystem.
- **Decision Criteria:** If repository files are missing or unreadable, `PAUSE` and `REPORT`. If files are observed, `CONTINUE` to Stage 2.

---

## Stage 2: UNDERSTAND

- **Objective:** Discern the functional and domain context of the user request or task objective.
- **Inputs:** Observed files, user request, relevant PRD specifications, design guidelines.
- **Actions:**
  1. Correlate the request with the authoritative PRDs (`prd/prd 2 backend.md`, `prd/prd 3 automation.md`, `prd/prd1 frontend .md`, `prd/design.md`, `security.md`).
  2. Differentiate between `[IMPLEMENTED]` reality and `[SPECIFIED]` PRD vision.
  3. Formulate the technical problem statement and expected behavior.
- **Expected Output:** A concise, validated problem statement citing the governing PRD sections.
- **Failure Conditions:** Conflating documentation with implementation; misunderstanding domain boundaries (e.g. attempting to authorize payments in the client).
- **Decision Criteria:** If requirements are ambiguous or contradictory, execute the Missing/Conflicting Requirements Decision Tree. Otherwise, `CONTINUE` to Stage 3.

---

## Stage 3: TRACE

- **Objective:** Map the request through the complete end-to-end operational lifecycle.
- **Inputs:** Problem statement, [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md), `prd/auricvista system flow.md`.
- **Actions:**
  1. Identify the Requirement ID (e.g. `REQ-BOOK-001`, `REQ-PAY-003`).
  2. Trace data flow: `Frontend UI` $\to$ `Cloudflare/Nginx` $\to$ `NestJS Route` $\to$ `PostgreSQL/Prisma` $\to$ `Outbox Event` $\to$ `Redis BullMQ` $\to$ `n8n Workflow` $\to$ `Verified Callback`.
  3. Identify all participating components, tables, and events.
- **Expected Output:** An end-to-end trace diagram or sequence mapping for the requested change.
- **Failure Conditions:** Modifying a component in isolation without mapping its upstream triggers and downstream consumers.
- **Decision Criteria:** If an architectural boundary is violated (e.g. frontend calling database directly), `ROLL BACK` plan and re-trace. If trace is complete, `CONTINUE` to Stage 4.

---

## Stage 4: CONSTRAIN

- **Objective:** Apply architectural, security, and project boundaries to the proposed execution.
- **Inputs:** Traced path, [agent-sop.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/agent-sop.md) architectural laws, `security.md` rules.
- **Actions:**
  1. Check **Zero-Exposure Principle**: Ensure no private secrets, master keys, or provider tokens are exposed.
  2. Check **Authoritative Backend Rule**: Ensure state mutations reside solely on the backend.
  3. Check **AI Boundedness**: Ensure AI does not make unilateral authorization, financial, or safety decisions.
  4. Check **Deterministic Safety**: Ensure SOS bypasses marketing queues and contains zero continuous GPS tracking.
  5. Check **Engineering OS Isolation**: Ensure no files in `~/.gemini` or Engineering OS are touched.
- **Expected Output:** A set of strict boundary constraints bounding the upcoming implementation plan.
- **Failure Conditions:** Proposing changes that bypass backend validation or leak credentials.
- **Decision Criteria:** If any architectural law is violated, reject the approach. If constraints are satisfied, `CONTINUE` to Stage 5.

---

## Stage 5: PLAN

- **Objective:** Produce a granular, step-by-step implementation plan.
- **Inputs:** Constraints, trace map, affected files.
- **Actions:**
  1. Enumerate the exact files to create, modify, or delete.
  2. Draft the precise functions, DTO schemas, database migrations, or CSS tokens to apply.
  3. Formulate the verification and testing steps before touching code.
- **Expected Output:** A formal implementation plan (e.g. `implementation_plan.md` artifact or documented task checklist).
- **Failure Conditions:** Beginning code modification without a step-by-step plan.
- **Decision Criteria:** For major architectural or high-risk changes, `PAUSE` and obtain user review. For scoped, safe changes within approved plans, `CONTINUE` to Stage 6.

---

## Stage 6: IMPACT ANALYSIS

- **Objective:** Predict unintended side effects and evaluate backward compatibility.
- **Inputs:** Implementation plan, dependency graphs.
- **Actions:**
  1. Assess impact on active user sessions, database locks, and schema migrations.
  2. Verify if client changes break desktop or mobile responsive layouts.
  3. Verify if API payload changes break existing mobile clients or webhooks.
  4. Define an explicit rollback plan in case of execution failure.
- **Expected Output:** An impact assessment covering API contracts, database locks, and rollback steps.
- **Failure Conditions:** Unidentified breaking changes, cascading database table locks, or unversioned API mutations.
- **Decision Criteria:** If high risk of data corruption or breaking changes exists, `PAUSE` and document mitigations. Otherwise, `CONTINUE` to Stage 7.

---

## Stage 7: IMPLEMENT

- **Objective:** Execute the scoped code or documentation modifications cleanly and precisely.
- **Inputs:** Implementation plan, source files, target interfaces.
- **Actions:**
  1. Modify only the targeted files using atomic, surgical edits.
  2. Maintain strict code hygiene (TypeScript types, ESLint rules, CSS tokens).
  3. Eliminate XSS vulnerabilities by wrapping dynamic DOM rendering in `DOMPurify`.
  4. Preserve all existing comments, docstrings, and unrelated code.
- **Expected Output:** Clean, compilable, syntax-valid source code modifications.
- **Failure Conditions:** Syntax errors, unresolved imports, breaking unrelated functionality, introducing `any` types.
- **Decision Criteria:** If implementation encounters syntax errors or unresolved dependencies, `PAUSE`, fix errors, and `VERIFY AGAIN`. If clean, `CONTINUE` to Stage 8.

---

## Stage 8: VERIFY

- **Objective:** Dynamically confirm that the modified code compiles, loads, and executes without runtime crashes.
- **Inputs:** Modified code files, container runtime, local dev server.
- **Actions:**
  1. Run build scripts or linters (e.g. `npm run build`, `tsc --noEmit`).
  2. Verify DOM rendering and browser console logs (zero uncaught exceptions).
  3. Check network tab for 4xx/5xx responses or CORS failures.
- **Expected Output:** Verification evidence (clean terminal logs, zero runtime crashes, healthy HTTP responses).
- **Failure Conditions:** Unhandled runtime exceptions, failed module loading, broken bundle builds.
- **Decision Criteria:** If runtime verification fails, `ROLL BACK` edits or patch immediately. If clean, `CONTINUE` to Stage 9.

---

## Stage 9: TEST

- **Objective:** Execute automated test suites and prove edge cases pass.
- **Inputs:** Test runners (Jest, Vitest, Cypress, Playwright), test specifications.
- **Actions:**
  1. Run unit tests covering modified business logic.
  2. Run integration tests covering API routes and database transactions.
  3. Verify edge cases (null inputs, duplicate IDs, unauthorized access).
- **Expected Output:** Test execution report demonstrating passing assertions.
- **Failure Conditions:** Failing test assertions, flaky tests, or skipping tests.
- **Decision Criteria:** If tests fail, diagnose root cause and return to Stage 7. If all tests pass, `CONTINUE` to Stage 10.

---

## Stage 10: SECURITY REVIEW

- **Objective:** Validate that the modification satisfies all defense-in-depth security mandates.
- **Inputs:** Modified files, git diff, `security.md`.
- **Actions:**
  1. Check for hardcoded credentials, API keys, or tokens.
  2. Check for XSS vulnerabilities (validate `DOMPurify` on `innerHTML`).
  3. Check for BOLA/IDOR vulnerabilities (validate user resource ownership check).
  4. Check for SQL/ORM injection or mass assignment risks.
  5. Check for sensitive data exposure in `localStorage` or server logs.
- **Expected Output:** A security sign-off confirming zero new vulnerabilities introduced.
- **Failure Conditions:** Hardcoded secrets, unescaped user inputs, missing authorization guards.
- **Decision Criteria:** If any security vulnerability is discovered, `PAUSE`, `ESCALATE`, and remediate before proceeding. If clean, `CONTINUE` to Stage 11.

---

## Stage 11: ARCHITECTURE REVIEW

- **Objective:** Confirm adherence to the core architectural laws and PRD boundaries.
- **Inputs:** Implemented changes, `prd/auricvista system flow.md`, [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md).
- **Actions:**
  1. Verify backend authority: did the client attempt to own booking/payment state?
  2. Verify n8n boundary: did n8n attempt to touch PostgreSQL directly?
  3. Verify AI boundary: did the AI attempt to confirm transactions or approve KYC?
  4. Verify SOS architecture: is emergency handling deterministic without continuous GPS?
- **Expected Output:** Architectural compliance verification.
- **Failure Conditions:** Architectural regression or boundary breach.
- **Decision Criteria:** If architecture is compromised, `ROLL BACK`. If compliant, `CONTINUE` to Stage 12.

---

## Stage 12: DOCUMENT

- **Objective:** Synchronize the project control plane with the implemented reality.
- **Inputs:** Verified changes, control plane files.
- **Actions:**
  1. Update [requirements-traceability.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/requirements-traceability.md) with active code references and verified status.
  2. Update [master-roadmap.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/master-roadmap.md) task checklists and milestone progress.
  3. If an architectural decision was established or modified, record an ADR in [decision-log.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/decision-log.md).
- **Expected Output:** Updated, synchronized engineering control documents.
- **Failure Conditions:** Leaving control documents stale or failing to record implementation status changes.
- **Decision Criteria:** Once documents are updated, `CONTINUE` to Stage 13.

---

## Stage 13: REPORT

- **Objective:** Deliver a transparent, evidence-backed summary of changes and status.
- **Inputs:** Test results, security review, documentation diffs.
- **Actions:**
  1. Formulate a concise summary of changes made.
  2. Provide concrete verification evidence (test outputs, logs, file paths).
  3. Disclose any discovered blockers, residual risks, or remaining implementation gaps.
- **Expected Output:** A formal engineering report adhering to the No-False-Completion Policy.
- **Failure Conditions:** Claiming "everything is complete" when downstream components remain unbuilt.
- **Decision Criteria:** Present report to user and `CONTINUE` to Stage 14.

---

## Stage 14: DETERMINE NEXT STEP

- **Objective:** Identify the immediate next dependency-driven action on the roadmap.
- **Inputs:** [master-roadmap.md](file:///Users/vikhyathmgowda007/Developer/chethan%20auric%20web/prd/engineering-control/master-roadmap.md), current phase status.
- **Actions:**
  1. Evaluate unblocked tasks in the current development phase.
  2. Prioritize high-risk or architectural prerequisite items.
  3. Propose the next specific engineering step to the user or team.
- **Expected Output:** A clear recommendation for the next engineering action.
- **Decision Criteria:** If current phase is complete, transition to the next phase in the roadmap.

---

# 2. SPECIALIZED DECISION TREES

```text
                                  TASK INITIATED
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
      Standard Feature                                  Specialized Domain Change
             │                                                     │
    Follow 14-Stage Loop                 ┌─────────────────────────┴─────────────────────────┐
                                         ▼                                                   ▼
                                  Security / Auth                                     Database / API
                                         │                                                   │
                                 Run Tree 2.1 / 2.2                                  Run Tree 2.3 / 2.4
```

### 2.1 Missing or Conflicting Requirements:
```text
Requirement Missing / Conflicting
  │
  ├── Is it a Visual / UX issue?
  │     └── YES ──▶ Check prd/design.md ──▶ If clear: Apply design tokens ──▶ If unclear: Ask User
  │
  ├── Is it a Transactional / Backend issue?
  │     └── YES ──▶ Check prd 2 backend.md ──▶ Backend PRD prevails over Frontend PRD
  │
  ├── Is it a Security / Permission issue?
  │     └── YES ──▶ Check security.md ──▶ Security PRD prevails over all feature PRDs
  │
  └── Unresolvable Contradiction?
        └── YES ──▶ PAUSE ──▶ Document in decision-log.md as [NEEDS VALIDATION] ──▶ ASK USER
```

### 2.2 Security-Sensitive Changes (Auth, Secrets, KYC):
```text
Security-Sensitive Change
  │
  ├── Does it involve credentials or API keys?
  │     └── Never put keys in client / repo ──▶ Inject via AWS Secrets Manager at backend runtime
  │
  ├── Does it render user content in the DOM?
  │     └── Wrap in DOMPurify.sanitize() ──▶ Verify against XSS injection
  │
  ├── Does it involve KYC documents or PII?
  │     └── Upload direct to Private KMS S3 Quarantine ──▶ Ephemeral Presigned URLs (TTL <= 5 min)
  │
  └── Does it alter route authorization?
        └── Enforce BOLA guard: verify req.user.id === resource.ownerId
```

### 2.3 Database Schema Changes:
```text
Database Change
  │
  ├── Is it a breaking change (column drop, type change)?
  │     └── Expand-and-Contract: Add new column ──▶ Dual-write ──▶ Backfill ──▶ Drop old column
  │
  ├── Does it touch high-concurrency tables (Bookings, Rooms)?
  │     └── Enforce row-level lock (SELECT FOR UPDATE) inside Prisma $transaction
  │
  └── Generate Prisma migration ──▶ Verify rollback script ──▶ Test against local PostgreSQL
```

### 2.4 Payment & Webhook Changes:
```text
Payment / Webhook Change
  │
  ├── Webhook Handler:
  │     ├── 1. Compute HMAC-SHA256 signature using Razorpay webhook secret
  │     ├── 2. Compare against X-Razorpay-Signature header using crypto.timingSafeEqual
  │     ├── 3. Check Redis idempotency_key (TTL: 24h) ──▶ If duplicate: Return HTTP 200 immediately
  │     └── 4. Open PostgreSQL transaction ──▶ Update Booking to CONFIRMED ──▶ Commit Outbox Event
  │
  └── Frontend Checkout:
        └── Call POST /bookings/hold ──▶ Display 15-min countdown timer ──▶ Launch Razorpay Modal
```

### 2.5 AI Gateway & Automation Changes:
```text
AI / n8n Change
  │
  ├── AI Assistant (Chat / Planning):
  │     ├── Route prompt through NestJS AiGatewayModule (never direct browser-to-OpenAI)
  │     ├── Enforce user rate limits & monthly token budgets in Redis
  │     └── Tools must be strictly bounded: AI cannot confirm bookings or execute payments
  │
  └── n8n Automation Workflow:
        ├── Triggered solely via signed outbox domain events (HMAC-SHA256)
        ├── Payloads contain only IDs and event names (zero raw PII)
        └── Callbacks to backend must use scoped mTLS or internal HMAC tokens
```

---

# 3. ACTION DIRECTIVES DEFINITION

When operating within any stage of the loop, the agent or engineer must explicitly adopt one of the following directives:

| Directive | Trigger Condition | Required Action |
| :--- | :--- | :--- |
| **`CONTINUE`** | Current stage passed all verification and exit criteria. | Transition immediately to the subsequent stage in the 14-stage loop. |
| **`PAUSE`** | Ambiguity detected, high-risk migration planned, or user review required. | Halt execution, preserve state, and await explicit approval. |
| **`ASK`** | Unresolvable conflict between PRDs or missing business requirement. | Present the specific trade-offs and options clearly to the user. |
| **`ROLL BACK`** | Runtime failure, broken build, regression, or architectural violation. | Revert modified files to last known healthy git commit and investigate root cause. |
| **`ESCALATE`** | Critical security vulnerability detected (e.g. exposed secret, unauthenticated PII leak). | Cease current task immediately, notify lead engineers, and implement emergency mitigation. |
| **`DOCUMENT`** | Implementation verified or architectural decision finalized. | Record changes in `requirements-traceability.md`, `master-roadmap.md`, or `decision-log.md`. |
| **`VERIFY AGAIN`** | A patch or fix was applied during implementation or review. | Re-run stages 8, 9, 10, and 11 to confirm regression-free execution. |
