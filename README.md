# OrbitOS — Personal Developer Operating System

> **One platform. Your entire developer life — goals, code, learning, reflection, and career — in a single orbit.**

---

## Table of Contents

1. [Project Definition](#project-definition)
2. [The Problem](#the-problem)
3. [The Solution](#the-solution)
4. [Target Users](#target-users)
5. [Tech Stack](#tech-stack)
6. [System Architecture](#system-architecture)
7. [Feature Map (All Phases)](#feature-map-all-phases)
8. [Development Roadmap](#development-roadmap)
9. [Current Progress](#current-progress)
10. [Data Models](#data-models)
11. [API Reference](#api-reference)
12. [Frontend Structure](#frontend-structure)
13. [Environment Setup](#environment-setup)
14. [Coding Standards](#coding-standards)
15. [Milestone Checklist](#milestone-checklist)
16. [Resume & Portfolio Angles](#resume--portfolio-angles)
17. [Risks & Scope Control](#risks--scope-control)

---

## Project Definition

| Field | Detail |
|--------|--------|
| **Name** | OrbitOS |
| **Type** | Full-stack MERN web application |
| **Category** | Productivity / Developer OS / Personal knowledge & progress platform |
| **Elevator pitch** | A unified workspace where students and developers track learning goals, DSA practice, projects, notes, daily coding journals, job applications, and analytics — instead of juggling Notion, GitHub, LeetCode, Calendar, and spreadsheets. |
| **Primary outcome** | Reduce context-switching; make progress visible; build a portfolio-worthy, production-style SaaS. |
| **Success criteria** | A user can sign up, manage core entities (goals, projects, notes, journal), see a real analytics dashboard, and (Phase 2+) track DSA + GitHub + applications in one place. |

### Core Principles

1. **Single source of truth** — One user, one database, one dashboard.
2. **Progress over perfection** — Ship Phase 1 completely before Phase 2 polish.
3. **Developer-first UX** — Fast, minimal UI; keyboard-friendly where possible.
4. **API-first backend** — Every feature exposed via REST (later Socket.io for real-time).
5. **Resume-ready** — Each phase adds demonstrable full-stack skills.

---

## The Problem

Most students and developers scatter their work across:

| Tool | Used for | Pain |
|------|----------|------|
| Notion | Notes, docs | Not built for dev metrics |
| GitHub | Code, projects | No learning/DSA/planning context |
| LeetCode | DSA practice | Siloed from goals and journal |
| Google Calendar | Planning | No link to actual output |
| Excel / Sheets | Progress tracking | Manual, ugly, no automation |

**Result:** No single view of “Am I actually improving?” Streaks break. Goals fade. Interview prep feels chaotic.

---

## The Solution

**OrbitOS** centralizes:

- **Learn** — Goals, roadmaps, DSA topics  
- **Build** — Projects, GitHub activity, tech stack  
- **Capture** — Notes, coding journal, mood/reflection  
- **Advance** — Applications, internships, interview prep  
- **Measure** — Dashboard, streaks, charts, completion rates  

```
┌─────────────────────────────────────────────────────────────┐
│                        ORBITOS                               │
├─────────────┬─────────────┬─────────────┬──────────────────┤
│   LEARN     │    BUILD    │   CAPTURE   │     ADVANCE      │
│ Goals       │ Projects    │ Notes       │ Applications     │
│ DSA Tracker │ GitHub      │ Journal     │ Internships      │
│ Roadmaps    │ Repos       │ Daily log   │ Interview prep   │
├─────────────┴─────────────┴─────────────┴──────────────────┤
│              ANALYTICS (streaks, charts, insights)           │
└─────────────────────────────────────────────────────────────┘
```

---

## Target Users

- Computer science students  
- Self-taught developers  
- Bootcamp graduates  
- Junior devs preparing for internships / first job  
- Anyone building a portfolio while learning DSA and shipping projects  

---

## Tech Stack

### Planned (full vision)

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS *(migrate from custom CSS in Phase 1)* |
| Routing | React Router |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (Bearer token) |
| Real-time (Phase 3) | Socket.io |
| AI (Phase 3) | OpenAI API (or similar) |
| Charts (Phase 2) | Recharts or Chart.js |
| GitHub (Phase 2) | GitHub REST API + OAuth |

### Current repo (`orbit-os`)

| Layer | Status |
|-------|--------|
| Frontend | React + TypeScript + Vite, custom CSS (minimalist design) |
| Backend | Express + MongoDB + JWT |
| Tailwind | **Not yet** — add when refactoring UI |

---

## System Architecture

```
┌──────────────┐     HTTPS/JSON      ┌──────────────┐     Mongoose     ┌──────────────┐
│   React SPA  │ ◄─────────────────► │ Express API  │ ◄──────────────► │   MongoDB    │
│  (Vite :5173) │   Authorization:    │  (:5000)     │                  │   Atlas/Local│
│              │   Bearer <JWT>      │              │                  │              │
└──────────────┘                     └──────────────┘                  └──────────────┘
       │                                      │
       │  Phase 2: GitHub API                   │  Phase 3: Socket.io
       ▼                                      ▼
┌──────────────┐                     ┌──────────────┐
│ github.com   │                     │  OpenAI API  │
└──────────────┘                     └──────────────┘
```

### Repo layout

```
orbit-os/
├── README.md                 ← You are here (master roadmap)
├── backend/
│   ├── src/
│   │   ├── app.js            # Express app + route mounting
│   │   ├── server.js         # Entry + DB connect
│   │   ├── config/           # DB connection
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # auth, errors
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   └── utils/            # token, streak, etc.
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/              # fetch + auth client
    │   ├── components/       # UI building blocks
    │   ├── context/          # AuthContext
    │   ├── pages/            # Route-level pages
    │   ├── styles/           # auth.css, etc.
    │   └── data/             # mock data (temporary)
    └── package.json
```

---

## Feature Map (All Phases)

### Phase 1 — MERN Core *(foundation — ship this first)*

| Module | Features | Backend | Frontend |
|--------|----------|---------|----------|
| **Auth** | Register, login, logout, protected routes, `/me` | ✅ Done | ✅ Done |
| **Dashboard** | Overview stats, recent activity, mood summary | ✅ API exists | 🟡 UI mock data — wire API |
| **Goals** | CRUD, complete toggle, deadline, filters | ✅ API exists | ❌ Pages needed |
| **Projects** | CRUD, status pipeline, tech stack, links | ✅ API exists | ❌ Pages needed |
| **Notes** | CRUD, tags, search | ✅ API exists | ❌ Pages needed |
| **Journal** | Daily entry, mood, learned/wins/challenges | ✅ API exists | ❌ Pages needed |
| **Analytics** | Completion %, streaks, mood distribution | 🟡 Partial | ❌ Wire + charts later |

### Phase 2 — Resume-worthy *(differentiation)*

| Module | Features |
|--------|----------|
| **DSA Tracker** | Log problems (title, platform, difficulty, topic, status, date solved) |
| **DSA Analytics** | Count by difficulty, topic heatmap, weekly solved chart |
| **GitHub Integration** | OAuth connect, list repos, recent commits on dashboard |
| **Applications** | Track companies, role, status, date applied, follow-ups |
| **Internships** | Extend applications with duration, offer status |
| **Study hours** | Log hours per day/category |
| **Analytics dashboard** | Recharts: streaks, hours studied, goal progress over time |
| **Tailwind migration** | Consistent design system |

### Phase 3 — Advanced *(optional stretch)*

| Module | Features |
|--------|----------|
| **Real-time** | Socket.io notifications (deadline reminders, streak alerts) |
| **AI note summarizer** | Summarize long notes / journal entries |
| **AI roadmap generator** | Input goal → structured learning path |
| **AI interview prep** | Generate questions from resume + job description |
| **Deploy** | Frontend (Vercel/Netlify), Backend (Render/Railway), MongoDB Atlas |

---

## Development Roadmap

### Phase 1 — MERN Core (4–6 weeks)

**Goal:** Fully usable personal OS for goals, projects, notes, journal + real dashboard.

#### Week 1 — Auth polish & app shell
- [x] JWT auth (register, login, protect middleware)
- [x] Login / signup pages
- [x] Protected dashboard route
- [ ] Global layout: sidebar or top nav with active route
- [ ] Error boundaries + toast notifications
- [ ] Migrate styling to **Tailwind CSS** (optional but recommended in your spec)

#### Week 2 — Goals module
- [ ] `GET/POST /api/goals` — list + create UI
- [ ] `GET/PUT/DELETE /api/goals/:id` — edit, delete
- [ ] Mark complete / incomplete
- [ ] Filter: all | active | completed
- [ ] Optional: deadline badge + sort

#### Week 3 — Projects module
- [ ] Project list with status columns or tabs: `planned` | `in-progress` | `completed`
- [ ] Create/edit form: title, description, techStack[], githubLink, liveLink
- [ ] Status update (drag-drop or dropdown)

#### Week 4 — Notes module
- [ ] Notes list + markdown or rich text editor
- [ ] Tags: add, filter by tag
- [ ] Search by title/content

#### Week 5 — Journal module
- [ ] Daily journal form: mood, learned, wins, challenges
- [ ] Journal history calendar or list view
- [ ] One entry per day rule (optional)

#### Week 6 — Dashboard + analytics wiring
- [ ] Replace `mockDashboard` with `GET /api/dashboard` + `GET /api/analytics`
- [ ] Fix analytics controller (streak bug: `journalEntries` undefined — use fetched journals)
- [ ] Recent activity feed (aggregate from goals, projects, notes, journals)
- [ ] Deploy Phase 1 to production

---

### Phase 2 — Resume-worthy (4–5 weeks)

#### Week 7–8 — DSA Tracker
- [ ] **Model:** `DSAProblem` — user, title, platform, difficulty, topics[], status, solvedAt, url, notes
- [ ] CRUD API + frontend table
- [ ] Filters: difficulty, topic, platform, date range
- [ ] Stats: total solved, by difficulty, by topic

#### Week 9 — GitHub integration
- [ ] GitHub OAuth App
- [ ] Store `githubUsername` / access token on User (encrypted)
- [ ] Endpoints: repos list, recent commits
- [ ] Dashboard widget: “Recent GitHub activity”

#### Week 10 — Applications & study tracking
- [ ] **Model:** `Application` — company, role, status, appliedAt, link, notes
- [ ] Kanban or table: Applied → OA → Interview → Offer → Rejected
- [ ] **Model:** `StudySession` — date, hours, category (DSA, project, course)
- [ ] Charts: hours per week, applications funnel

#### Week 11 — Analytics dashboard v2
- [ ] Recharts: line (activity), bar (DSA by topic), pie (mood)
- [ ] Streak display (journal + optional study streak)
- [ ] Export summary (PDF or JSON) — bonus

---

### Phase 3 — Advanced (3–4 weeks, optional)

- [ ] Socket.io: connect on login, push notifications
- [ ] AI endpoints: summarize note, generate roadmap, interview questions
- [ ] Rate limiting + API key security for AI routes
- [ ] E2E tests (Playwright) for critical flows
- [ ] README demo GIF + live demo URL

---

## Current Progress

Use this section to update as you build. **Last updated:** Phase 1 in progress.

| Area | Status | Notes |
|------|--------|-------|
| Auth API | ✅ | `/api/auth/register`, `/login`, `/me` |
| Goals API | ✅ | Full CRUD |
| Projects API | ✅ | Full CRUD |
| Notes API | ✅ | Full CRUD |
| Journals API | ✅ | Full CRUD |
| Dashboard API | ✅ | Aggregated counts |
| Analytics API | 🟡 | Streak logic needs fix |
| Login / Signup UI | ✅ | Minimalist auth pages |
| Dashboard UI | 🟡 | Mock data only |
| Goals UI | ❌ | Not started |
| Projects UI | ❌ | Not started |
| Notes UI | ❌ | Not started |
| Journal UI | ❌ | Not started |
| Tailwind | ❌ | Custom CSS for now |
| DSA / GitHub / AI | ❌ | Phase 2–3 |

---

## Data Models

### Implemented (MongoDB)

#### User
```
name, email, password (hashed), avatar?, timestamps
```

#### Goal
```
user, title, description?, completed (bool), deadline?, timestamps
```

#### Project
```
user, title, description?, status: planned|in-progress|completed,
techStack[], githubLink?, liveLink?, timestamps
```

#### Note
```
user, title, content, tags[], timestamps
```

#### Journal
```
user, mood: great|good|okay|bad|terrible,
learned (required), wins?, challenges?, timestamps
```

### Planned (Phase 2+)

#### DSAProblem
```
user, title, platform (leetcode|codeforces|gfg|other),
difficulty: easy|medium|hard,
topics: [array, graph, dp, ...],
status: attempted|solved|review,
url?, notes?, solvedAt?, timestamps
```

#### Application
```
user, company, role, jobUrl?, status: wishlist|applied|oa|interview|offer|rejected,
appliedAt?, followUpAt?, notes?, timestamps
```

#### StudySession
```
user, date, hours (number), category: dsa|project|course|other, notes?, timestamps
```

#### User (extensions)
```
githubId?, githubAccessToken? (encrypted), githubUsername?
```

---

## API Reference

Base URL: `http://localhost:5000` (dev)  
Auth header: `Authorization: Bearer <token>`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | `{ name, email, password }` |
| POST | `/api/auth/login` | No | `{ email, password }` |
| GET | `/api/auth/me` | Yes | Current user |
| GET/POST | `/api/goals` | Yes | List / create goals |
| GET/PUT/DELETE | `/api/goals/:id` | Yes | Single goal |
| GET/POST | `/api/projects` | Yes | List / create projects |
| GET/PUT/DELETE | `/api/projects/:id` | Yes | Single project |
| GET/POST | `/api/notes` | Yes | List / create notes |
| GET/PUT/DELETE | `/api/notes/:id` | Yes | Single note |
| GET/POST | `/api/journals` | Yes | List / create journals |
| GET/PUT/DELETE | `/api/journals/:id` | Yes | Single journal |
| GET | `/api/dashboard` | Yes | Summary counts |
| GET | `/api/analytics` | Yes | Rates, streaks, mood |

### Planned (Phase 2)

| Method | Endpoint | Description |
|--------|----------|-------------|
| * | `/api/dsa` | DSA problem CRUD |
| GET | `/api/github/repos` | User repos |
| GET | `/api/github/commits` | Recent commits |
| * | `/api/applications` | Job application CRUD |
| * | `/api/study` | Study session CRUD |

---

## Frontend Structure

### Routes (current)

| Path | Page | Protected |
|------|------|-----------|
| `/login` | LoginPage | No |
| `/signup` | SignupPage | No |
| `/` | DashboardPage | Yes |

### Routes (target Phase 1)

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/goals` | Goals list + detail |
| `/projects` | Projects board |
| `/notes` | Notes library |
| `/journal` | Journal feed + new entry |
| `/settings` | Profile, logout |

### Key files

| File | Purpose |
|------|---------|
| `context/AuthContext.tsx` | Session, login, register, logout |
| `api/client.ts` | fetch wrapper + JWT storage |
| `api/auth.ts` | Auth API calls |
| `components/ProtectedRoute.tsx` | Redirect if not logged in |
| `pages/DashboardPage.tsx` | Main overview |

---

## Environment Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/orbit-os
JWT_SECRET=your_long_random_secret_here
NODE_ENV=development
```

```bash
npm run dev
# → http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

Vite proxies `/api` → `http://localhost:5000` (see `frontend/vite.config.ts`).

### First-time test

1. Open `http://localhost:5173/signup`
2. Create account → redirect to dashboard
3. Test API with token:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/dashboard
```

---

## Coding Standards

### Backend
- Controllers use `express-async-handler`
- All user data queries filter by `req.user._id`
- Validate required fields; return `400` with clear `message`
- Never return `password` from User

### Frontend
- TypeScript for all new files
- API calls only in `src/api/`
- Page components in `src/pages/`
- Shared UI in `src/components/`
- No secrets in frontend code

### Git workflow
- `main` — stable
- `feature/goals-ui`, `feature/dsa-tracker` — branch per module
- Commit format: `feat(goals): add completion toggle`

---

## Milestone Checklist

Copy into GitHub Issues or a project board.

### M1 — Foundation ✅ (mostly done)
- [x] MERN repo structure
- [x] User model + JWT auth
- [x] CRUD APIs for core entities
- [x] Login / signup UI
- [ ] App layout with navigation

### M2 — Core UI (Phase 1 complete)
- [ ] Goals UI end-to-end
- [ ] Projects UI end-to-end
- [ ] Notes UI end-to-end
- [ ] Journal UI end-to-end
- [ ] Dashboard wired to real API

### M3 — Analytics (Phase 2 start)
- [ ] Fix streak calculation bug
- [ ] Charts on dashboard
- [ ] DSA module live

### M4 — Integrations
- [ ] GitHub OAuth + widgets
- [ ] Applications tracker

### M5 — Polish & deploy
- [ ] Tailwind design system
- [ ] Production deploy + custom domain
- [ ] Demo video + portfolio write-up

### M6 — Advanced (optional)
- [ ] Socket.io notifications
- [ ] AI features

---

## Resume & Portfolio Angles

**One-liner for resume:**  
*Built OrbitOS, a full-stack MERN developer productivity platform with JWT auth, REST APIs, analytics dashboards, and [Phase 2: GitHub OAuth / DSA tracking / real-time notifications].*

**Bullet examples (customize after you ship):**
- Developed a unified MERN platform consolidating goals, projects, notes, and coding journals for 6+ resource types, reducing tool fragmentation for developers.
- Implemented JWT authentication, protected routes, and role-scoped MongoDB queries across 8+ REST endpoints.
- Designed analytics module with completion rates, mood distribution, and journal streak algorithms.
- Integrated GitHub OAuth API to surface repository and commit activity on a personal dashboard.
- Built DSA progress tracker with topic/difficulty breakdown and interactive charts (Recharts).

**Portfolio README must include:**
- Live demo URL
- Screenshots (dashboard, goals, DSA chart)
- Architecture diagram
- Tech stack list
- “What I learned” paragraph

---

## Risks & Scope Control

| Risk | Mitigation |
|------|------------|
| Scope creep | Finish Phase 1 100% before DSA/GitHub |
| UI rework fatigue | Pick Tailwind early OR commit to current CSS until M2 |
| GitHub API limits | Cache responses; don’t poll every second |
| AI costs (Phase 3) | Rate limit; use only on button click |
| Streak bugs | Unit test `calculateStreak` with edge cases |
| No users | You are user #1 — dogfood daily for 30 days |

### What NOT to build until Phase 1 is done

- Microservices
- Mobile app
- Social features / public profiles
- Payment / subscriptions
- Custom markdown editor from scratch (use a library)

---

## Suggested Page Wireframes (Phase 1)

```
Dashboard          Goals              Projects
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Stats row    │   │ + New goal   │   │ Planned | …  │
│ Activity     │   │ □ Goal 1     │   │ [cards...]   │
│ Mood chart   │   │ ☑ Goal 2     │   │              │
└──────────────┘   └──────────────┘   └──────────────┘

Notes              Journal
┌──────────────┐   ┌──────────────┐
│ Tags | Search│   │ Mood picker  │
│ Note cards   │   │ Today’s entry│
└──────────────┘   └──────────────┘
```

---

## Quick “What do I build next?”

**If you only read one section:**

1. Add **app layout + sidebar nav** (Dashboard, Goals, Projects, Notes, Journal).
2. Build **Goals page** — first full CRUD UI wired to API.
3. Repeat for Projects → Notes → Journal.
4. **Wire dashboard** to `/api/dashboard` and `/api/analytics`.
5. Fix analytics streak bug in backend.
6. Add **Tailwind** when ready for faster UI iteration.
7. Start **Phase 2** with DSA model + table UI.

---

## License & Contributing

Personal portfolio project. Add license (MIT recommended) before open-sourcing.

---

**OrbitOS — Everything in one orbit. Build Phase 1 completely. Then level up.**
