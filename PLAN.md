# DealFlow-AI MVP: 24-Hour Hackathon Plan

## 🎯 Core Vision
**"Describe your startup, get instant government signals from around the world"**

Ultra-lean MVP focused on the WOW factor: stunning futuristic UI + working AI matching.

---

## 👥 Team Work Split (4 People)

**Person A (Frontend + Demo UI)**
- Globe UI, HUD layout, animations, signal cards
- Owns `frontend/` implementation and polish

**Person B (Backend + Matching Logic)**
- FastAPI `main.py`, matching algorithm, caching, API endpoints
- Owns `backend/` runtime and integration

**Person C (Data + Prompt Quality)**
- Seed `signals.json` + `startups.json`
- Prompt tuning for reasoning + email generation

**Person D (Testing + Demo Readiness)**
- Unit tests, QA checklist, demo script
- Performance targets and fallback behavior

---

## ✂️ What We CUT (No Time Wasters)

❌ **Stripe/Payments** - Free demo only  
❌ **User accounts** - Single session, no login  
❌ **Email sending** - Preview only  
❌ **Web scraping** - Use pre-seeded data  
❌ **Database complexity** - SQLite + JSON files  
❌ **Celery workers** - Direct API calls  
❌ **Multiple cities** - Focus on 3-5 cities with 20-30 signals

---

## ✅ What We KEEP (MVP Core)

### 1. Stunning UI (The Star) ⭐
- **Globe visualization** with pulsing signal hotspots
- **Cyber HUD interface** matching uploaded image
- **Real-time animations** - data streams, particle effects
- **Signal cards** with glassmorphism
- **Match results** with AI reasoning

### 2. Simple Flow (3 Steps)
```
Step 1: "Describe your startup" → Text input
Step 2: AI matches signals → Loading animation  
Step 3: Show results → Globe + cards
```

### 3. Working AI
- **Gemini gemini-2.5-flash** for signal matching
- **Embeddings** for semantic search (in-memory)
- **Pre-extracted signals** from sample documents

---

## 📁 Simplified Stack

### Frontend (Next.js)
```
pages/
  index.tsx           # Landing page
  demo.tsx            # Main demo interface
components/
  Globe3D.tsx         # Three.js globe
  SignalCard.tsx      # Individual signal display
  MatchCard.tsx       # Startup match display
  HUDLayout.tsx       # Cyber interface wrapper
  DataStream.tsx      # Animated background
lib/
  api.ts              # API calls
  types.ts            # TypeScript definitions
```

### Backend (FastAPI - Minimal)
```
main.py             # Single file API
data/
  signals.json      # 20-30 pre-extracted signals
  startups.json     # Sample startup profiles
requirements.txt
```

### Data Structure (JSON Files)
```json
// signals.json
[
  {
    "id": 1,
    "city": "Austin",
    "state": "TX",
    "lat": 30.2672,
    "lng": -97.7431,
    "category": "Cybersecurity",
    "title": "SOC Platform Modernization",
    "description": "City council approved $1.5M for security operations center",
    "budget": 1500000,
    "timeline": "Q2 2024",
    "source": "City Council Minutes - Jan 2024",
    "stakeholders": ["IT Director John Smith", "CISO Jane Doe"],
    "keywords": ["SOC", "SIEM", "security", "monitoring"],
    "embedding": [0.123, -0.456, ...] // Pre-computed
  }
]
```

---

## 🎨 UI Implementation (24h Version)

### Tech Stack
- **Next.js 14** (App Router)
- **TypeScript** 
- **Tailwind CSS** (Cyber theme)
- **Three.js + React Three Fiber** (Globe)
- **Framer Motion** (Animations)

### Color Scheme
```css
--cyber-cyan: #00D9FF
--cyber-blue: #0A1929
--matrix-green: #00FF41
--warning-amber: #FFB800
--glass-white: rgba(255, 255, 255, 0.1)
```

### Key Components

#### 1. Landing Page (5 min experience)
```
┌────────────────────────────────────┐
│   DealFlow-AI                      │
│   Know what governments need       │
│   before they post the RFP         │
│                                    │
│   ┌──────────────────────────┐    │
│   │ Describe your startup... │    │
│   └──────────────────────────┘    │
│                                    │
│   [Find Opportunities →]           │
└────────────────────────────────────┘
```

#### 2. Globe Interface (Main Demo)
```
┌─────────────────────────────────────────────┐
│ ◉ DEALFLOW-AI    ⚡ 23 SIGNALS  🌍 LIVE    │
├─────────────────────────────────────────────┤
│                                             │
│         ╔════════════════╗                  │
│    ╔═══╣  SIGNAL FEED   ╠═══╗              │
│    ║    ╚════════════════╝   ║              │
│    ║                         ║              │
│    ║    [ROTATING GLOBE]     ║              │
│    ║    • Pulsing dots       ║              │
│    ║    • Click for detail  ║              │
│    ║                         ║              │
│    ╚═════════════════════════╝              │
│                                             │
│  ┌────────────────┐  ┌────────────────┐   │
│  │ Austin, TX     │  │ Budget: $1.5M  │   │
│  │ Cybersecurity  │  │ Timeline: Q2   │   │
│  │ SOC Platform   │  │ Match: 94%     │   │
│  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────┘
```

#### 3. Match Results Panel
```
╔═══════════════════════════════════════╗
║  TOP MATCHES FOR YOUR STARTUP         ║
╠═══════════════════════════════════════╣
║                                       ║
║  ⭐ 94% Match - Austin Cyber Signal   ║
║  ├─ Budget: $1.5M                     ║
║  ├─ Timeline: Q2 2024                 ║
║  ├─ Stakeholders:                     ║
║  │  • John Smith (IT Director)        ║
║  │  • Jane Doe (CISO)                 ║
║  └─ [View Full Signal] [Preview Email]║
║                                       ║
║  ⭐ 87% Match - Houston Cloud Signal  ║
║  └─ ...                               ║
║                                       ║
╚═══════════════════════════════════════╝
```

---

## 🔄 User Journey (3 Minutes)

### Act 1: Setup (30 seconds)
1. User lands on homepage
2. Sees tagline: "Know what governments need before they post the RFP"
3. Types startup description: 
   > "We build AI-powered security operations platforms for government agencies"
4. Clicks "Find Opportunities"

### Act 2: Discovery (90 seconds)
1. Globe appears with loading animation
2. Signals light up on globe (Austin, Houston, SF)
3. User clicks Austin hotspot
4. Signal card slides in from right
5. Shows match score: **94%**
6. AI explains why: 
   > "Your AI-powered security platform aligns perfectly with Austin's $1.5M SOC modernization initiative. They specifically mentioned automation and AI capabilities in their requirements."

### Act 3: Action (60 seconds)
1. User clicks "View Matches"
2. Top 3 matches appear with scores
3. Each shows:
   - Signal details
   - Stakeholder contacts
   - AI-generated outreach preview
4. User clicks "Preview Email"
5. Modal shows personalized email draft
6. User impressed, demo complete

---

## 🚀 24-Hour Timeline

### Hour 0-6: Foundation
**Backend (3h)**
- [ ] Create FastAPI app
- [ ] Load signals.json (20-30 pre-made signals)
- [ ] Implement `/match` endpoint
- [ ] Gemini integration for matching
- [ ] CORS setup

**Frontend Setup (3h)**
- [ ] Next.js init with TypeScript
- [ ] Tailwind cyber theme
- [ ] Basic routing
- [ ] API integration layer

### Hour 6-12: Core Features
**Globe Visualization (4h)**
- [ ] Three.js globe with Earth texture
- [ ] Plot signal points (lat/lng)
- [ ] Pulsing animation for hotspots
- [ ] Click handlers

**Matching Logic (2h)**
- [ ] Startup description → embedding
- [ ] Semantic similarity calculation
- [ ] Hybrid scoring (semantic + keywords)
- [ ] Return top 10 matches

### Hour 12-18: UI Polish
**HUD Interface (4h)**
- [ ] Glassmorphism panels
- [ ] Data stream animations
- [ ] Signal cards with slide-in
- [ ] Match result cards
- [ ] Loading states

**Interactions (2h)**
- [ ] Click globe → show signal
- [ ] Hover effects
- [ ] Modal for email preview
- [ ] Smooth transitions

### Hour 18-24: Final Push
**Demo Preparation (3h)**
- [ ] Seed 20-30 quality signals
- [ ] Test all interactions
- [ ] Fix critical bugs
- [ ] Performance optimization
- [ ] Prepare demo script

**Deployment (2h)**
- [ ] Deploy to Vercel (frontend)
- [ ] Deploy to Railway (backend)
- [ ] Test production build
- [ ] Record demo video

**Buffer (1h)**
- Fix last-minute issues
- Practice pitch

---

## 📊 Sample Data (Pre-Seed)

### Cities (5 Focus Areas)
1. **Austin, TX** - Tech-friendly (5 signals)
2. **Houston, TX** - Energy sector (4 signals)
3. **San Francisco, CA** - Innovation (6 signals)
4. **Boston, MA** - Healthcare (3 signals)
5. **Seattle, WA** - Cloud infrastructure (5 signals)

### Signal Categories
- Cybersecurity (8 signals)
- Cloud Infrastructure (6 signals)
- AI/ML Solutions (5 signals)
- Data Analytics (4 signals)

### Sample Signal Quality
```
High-quality example:
"Austin City Council approved $1.5M cybersecurity budget. 
IT Director John Smith (jsmith@austintexas.gov) mentioned 
need for 'AI-powered threat detection' in council minutes. 
Timeline: RFP expected Q2 2024."
```

---

## 🎬 Demo Script (3 Minutes)

### Opening (30s)
> "Government RFPs are a $500B market, but by the time they're posted, it's too late. We built DealFlow-AI to change that."

**Show:** Landing page → Type startup description

### The Magic (90s)
> "Watch this. I just described my cybersecurity startup. Now DealFlow-AI is scanning 1,800 government entities in real-time..."

**Show:** 
- Globe appears
- Signals light up
- Click Austin hotspot
- Signal card appears with 94% match
- Show AI reasoning

### The Payoff (60s)
> "Here's the best part. It found the IT Director's contact info, knows the budget is $1.5M, and even drafted a personalized email."

**Show:**
- Match results panel
- Stakeholder contacts
- Email preview modal

**Close:** 
> "This is live, working, and ready to help GovTech startups win more deals."

---

## 🎯 Success Metrics

### Demo Must-Haves
✅ Globe loads in < 3 seconds  
✅ Signals visible and clickable  
✅ Match scores make sense (>80% for good fits)  
✅ AI reasoning is coherent  
✅ Email preview looks professional  
✅ Zero crashes during demo

### Wow Factors
⭐ Smooth 60fps animations  
⭐ Impressive globe visualization  
⭐ Fast matching (< 2 seconds)  
⭐ Beautiful glassmorphism UI  
⭐ Accurate AI explanations

---

## 🛠️ Tech Choices (Why)

**Why No Database?**
- SQLite file for signals
- JSON for rapid iteration
- No Docker needed
- Deploy anywhere instantly

**Why Pre-Seeded Data?**
- No scraping time wasted
- Control demo quality
- Reliable demo experience
- Focus on UI/matching

**Why Single-File Backend?**
- Deploy to Railway free tier
- Easy to debug
- No architecture overhead
- Fast iteration

**Why No User Accounts?**
- Stateless demo
- Share URL directly
- No auth complexity
- Pure product focus

---

## 📦 Final Deliverables

### GitHub Repo
```
dealflow-ai-mvp/
├── README.md (setup in 3 commands)
├── frontend/ (Next.js)
├── backend/ (FastAPI single file)
├── data/ (signals.json, startups.json)
└── docs/ (this plan, demo script)
```

### Live Demos
1. **Production:** dealflow-ai.vercel.app
2. **Backup Video:** 2-minute Loom recording
3. **Pitch Deck:** 5 slides in Figma

### Documentation
- One-page setup guide
- API documentation (3 endpoints)
- Demo script with screenshots

---

## 💡 Post-Hackathon (If We Win)

### Week 1: Validation
- Share demo with 50 GovTech startups
- Collect feedback
- Improve matching accuracy

### Week 2-4: Build Real Scraping
- Implement actual web scraping
- Expand to 50 cities
- Real-time signal detection

### Month 2: Monetize
- Launch beta with 10 customers
- Implement subscription system
- Target $5k MRR

---

## ⚡ Key Simplifications from Original Plan

| Original | MVP |
|----------|-----|
| 1,800 government entities | 5 cities |
| Live web scraping | Pre-seeded data |
| PostgreSQL + MongoDB + Redis | SQLite + JSON |
| Celery background jobs | Direct API calls |
| User authentication | Stateless demo |
| Email delivery | Preview only |
| Stripe integration | Free demo |
| Multi-tier pricing | Single experience |

**Time Saved:** ~30 hours → Focus on UI + AI ⭐

---

## 🎨 UI Reference (Your Uploaded Image)

### Key Elements to Replicate:
1. ✅ **Central Globe** - Rotating Earth with data points
2. ✅ **Left Sidebar** - User profile, map mini-view
3. ✅ **Right Sidebar** - Signal feed, target info
4. ✅ **Top Bar** - Status indicators, mission info
5. ✅ **Grid Overlay** - Subtle hexagon pattern
6. ✅ **Color Scheme** - Cyan blue dominant
7. ✅ **Data Streams** - Animated vertical bars
8. ✅ **Gauges** - Circular progress indicators

### Fonts:
- **Headers:** Orbitron or Rajdhani (Google Fonts)
- **Data:** Roboto Mono
- **Body:** Inter

### Components:
```tsx
<GlobeView />        // Center stage
<LeftPanel />        // User/filters
<RightPanel />       // Signal details
<TopBar />           // Status
<DataStreams />      // Background
<SignalMarker />     // Globe pins
```

---

**Last Updated:** February 7, 2026  
**Version:** 2.0 - 24H MVP  
**Status:** Ready to Build 🚀
