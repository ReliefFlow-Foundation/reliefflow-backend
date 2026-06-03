# ReliefFlow — Backend API (Stellar / Soroban integration)

Humanitarian cash programs need a secure bridge between field enrollment, donor reporting, and Soroban program rules—this API is that bridge.

---

## 🎯 What is this service?

ReliefFlow uses **`beneficiary-registry`**, **`aid-escrow`**, and **`fraud-challenge`** to encode **eligibility, treasury tranches, and integrity workflows** on-chain. Real-world programs also need **PII-minimized** databases, feature-phone OTP flows, NGO SSO, and donor dashboards—this Fastify service hosts those patterns **without** leaking secrets or bulk personal data into static frontend JS.

---

## ❓ Problems the **protocol** solves (whole repo)

These come from the [root README](../../README.md) — shared context for why Stellar/Soroban exists here:

- Cash aid programs struggle with **duplication**, exclusion errors, and delayed reconciliation.
- Donors demand **traceability** without exposing vulnerable populations.
- Multiple agencies often lack **interoperable** accountability standards.

---

## 🛠️ Problems **this API** solves specifically

The smart contracts hold **truth on-chain**; they cannot safely hold ERP passwords, IoT vendor keys, bulk files, or cron jobs. That is this service’s job:

- **PII boundary**: National IDs and biometrics must stay in encrypted stores—never `NEXT_PUBLIC`.
- **Field integrations**: Mobile money aggregators and SMS gateways require server-side callbacks.
- **Donor assurance**: Aggregate reporting with cryptographic anchoring to milestones—computed here.
- **Duplicate detection**: Risk scoring across datasets belongs in controlled services with appeals workflows.

---

## ✅ Protocol goals this backend helps achieve

- Maintain **beneficiary records** with privacy-preserving design choices (`beneficiary-registry`).
- Run **campaign treasuries** with tranche logic (`aid-escrow`).
- Enable **integrity** workflows—challenges, appeals, audits (`fraud-challenge`).
- Publish **impact views** that aggregate outcomes without unsafe micro-data exposure.

---

## ✨ Capabilities this backend enables (production roadmap)

- **Enrollment APIs**: Session-based intake with audit trails; optional duplicate-detection hooks.
- **Tranche orchestration**: Align treasury movements with `aid-escrow` states.
- **Integrity desk**: Case management hooks feeding `fraud-challenge`.
- **Webhooks**: PSP settlement confirmations → chain reconciliation jobs.

---

## 🔗 Soroban crates → API responsibilities

| Crate | What the HTTP layer typically does |
| ----- | ---------------------------------- |
| `beneficiary-registry` | Map operational beneficiary IDs to on-chain identifiers using minimal disclosure strategies. |
| `aid-escrow` | Coordinate funding rounds and releases with treasury approvals. |
| `fraud-challenge` | Attach investigator notes and outcomes to dispute flows—off-chain case file + on-chain resolution tx. |

---

## 🏗️ Architecture & stack

| Layer | Choice |
| ----- | ------ |
| HTTP framework | **Fastify** 5 — low overhead, schema-friendly |
| Language | **TypeScript** (strict, ESM, `verbatimModuleSyntax`) |
| Config | **Zod** parsing in `src/config/env.ts` |
| Blockchain | **Stellar** Horizon + **Soroban** RPC (server-side keys only) |
| Consumers | [`apps/web`](../web/README.md), partner systems, cron workers |

---

## 📁 Package layout

```
apps/backend/
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── index.ts              # Fastify bootstrap, CORS, route registration
    ├── config/env.ts         # Typed environment
    └── routes/
        ├── health.ts         # GET /health
        └── v1/index.ts       # Versioned API surface (expand here)
```

---

## 🚀 Quick start

### Prerequisites

- **Node.js** 20.x or **22.x** (LTS)
- npm (or pnpm/yarn per org standard)

### Install & run

```bash
cd apps/backend
npm install
cp .env.example .env
# Edit .env — see tables below
npm run dev
```

Default: **http://localhost:8080** · Health: **GET** `/health` · Meta: **GET** `/api/v1/meta`

### Run with the Next.js frontend

```bash
# Terminal A — API
cd apps/backend && npm run dev

# Terminal B — Web
cd apps/web && npm install && npm run dev
```

Set `CORS_ORIGIN` in `.env` to match the web origin (e.g. `http://localhost:3000`).

---

## 📜 Scripts

| Command | Purpose |
| ------- | ------- |
| `npm install` | Install dependencies |
| `npm run dev` | `tsx watch` — reload on change |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled server |
| `npm run lint` | `tsc --noEmit` typecheck |

---

## 🔐 Environment variables

### Baseline (implemented)

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `NODE_ENV` | `development` | Environment name |
| `PORT` | `8080` | Listen port |
| `API_PREFIX` | `/api/v1` | Prefix for versioned routes |
| `CORS_ORIGIN` | `http://localhost:3000` | Browser origin allowed by CORS |

### Production / integration (plan — **do not commit secrets**)

| Variable | Example | Purpose |
| -------- | ------- | ------- |
| `PII_DATABASE_URL` | (secret) | Encrypted Postgres/SQL—network isolated. |
| `PAYMENT_PROVIDER_*` | (secret) | Mobile money credentials. |
| `SOROBAN_RPC_URL` | `https://…` | Chain access. |

---

## 🔌 HTTP surface

### Implemented (scaffold)

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/health` | Liveness for load balancers & CI |
| GET | `/api/v1/meta` | Service name / version |

### Planned themes (domain routes — implement under `src/routes/v1/`)

- `POST /api/v1/enrollment/sessions` — begin enrollment with consent artifacts.
- `POST /api/v1/tranches/release` — operator workflow prior to Soroban submit.
- `GET /api/v1/impact/summary` — donor-facing aggregates.

---

## 🧪 Testing & quality

```bash
npm run lint
```

CI should mirror this (see [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)).

Add **contract integration tests** in the Rust workspace and **API integration tests** (e.g. `vitest` + `supertest`) as routes grow.

---

## 🚢 Deployment notes

- Run behind TLS termination (load balancer or reverse proxy).
- Store signing keys in **KMS/HSM**, never in repo.
- Restrict Soroban RPC by IP allowlist or private gateway when possible.
- Emit structured logs (JSON) with **request IDs** for regulator audits (especially MediProof / CivicLedger / ReliefFlow).

---

## 🤝 Contributing

See [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md). Contract changes must stay aligned with this API’s eventual routes and [`../../docs/SITE_MAP.md`](../../docs/SITE_MAP.md).

---

## 📄 License

Match the repository license (Apache-2.0 suggested for OSS grants — confirm per org).

---

## 📞 Support & related docs

| Doc | Link |
| --- | ---- |
| Monorepo overview | [`../../README.md`](../../README.md) |
| Frontend | [`../web/README.md`](../web/README.md) |
| Architecture notes | [`../../docs/layout-plan.md`](../../docs/layout-plan.md) |
| Milestones → issues | [`../../docs/milestones-issues.md`](../../docs/milestones-issues.md) |

---

**Package:** `reliefflow-api` · **Slug:** `reliefflow`

// patch: 2026-05-30T19:32:18.461535

// patch: 2026-05-31T12:09:13.846150

// patch: 2026-06-03T06:36:55.384610
