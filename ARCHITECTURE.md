# DealFlow-AI MVP: Simplified Architecture

## 🏗️ System Overview (24-Hour Version)

```
┌──────────────────────────────────────────────────────────────┐
│                    USER BROWSER                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │         Next.js Frontend (Vercel)                      │  │
│  │  • Three.js Globe                                      │  │
│  │  • Cyber HUD UI                                        │  │
│  │  • Framer Motion Animations                            │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓ HTTP                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │      FastAPI Backend (Railway/Render)                  │  │
│  │  • Single main.py file                                 │  │
│  │  • Gemini gemini-2.5-flash                             │  │
│  │  • In-memory embeddings                                │  │
│  └────────────────────────────────────────────────────────┘  │
│                          ↓ File I/O                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │            Data Files (JSON)                           │  │
│  │  • signals.json (20-30 pre-made signals)               │  │
│  │  • startups.json (sample profiles)                     │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 👥 Team Ownership (4 People)

**Person A (Frontend + Demo UI)**
- `frontend/app`, `frontend/components`, visual polish
- Three.js globe, HUD layout, Framer Motion animations

**Person B (Backend + Matching Logic)**
- `backend/main.py`, API routes, embeddings caching
- Matching algorithm + reasoning generation

**Person C (Data + Prompt Quality)**
- `backend/data/signals.json`, `backend/data/startups.json`
- Prompt tuning for reasoning + email generation

**Person D (Testing + Docs + Demo)**
- `tests/` and quality checks
- Demo script, API docs, QA checklist

---

## 📁 Directory Structure

```
dealflow-ai-mvp/
│
├── frontend/                      # Next.js App
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── demo/
│   │   │   └── page.tsx          # Main demo interface
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Tailwind + custom styles
│   │
│   ├── components/
│   │   ├── Globe3D.tsx           # Three.js globe component
│   │   ├── HUDLayout.tsx         # Cyber interface wrapper
│   │   ├── LeftPanel.tsx         # Filters/profile sidebar
│   │   ├── RightPanel.tsx        # Signal details panel
│   │   ├── SignalCard.tsx        # Individual signal display
│   │   ├── MatchCard.tsx         # Match result card
│   │   ├── DataStream.tsx        # Animated background
│   │   ├── EmailPreview.tsx      # Email modal
│   │   └── LoadingGlobe.tsx      # Loading animation
│   │
│   ├── lib/
│   │   ├── api.ts                # API client
│   │   ├── types.ts              # TypeScript types
│   │   └── utils.ts              # Helper functions
│   │
│   ├── public/
│   │   ├── earth-texture.jpg     # Globe texture
│   │   └── audio/                # Optional sound effects
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/
│   ├── main.py                   # Single FastAPI file (~300 lines)
│   ├── data/
│   │   ├── signals.json          # Pre-seeded signals
│   │   └── embeddings.pkl        # Pre-computed embeddings
│   ├── requirements.txt
│   └── .env.example
│
├── docs/
│   ├── PLAN_MVP.md               # This plan
│   ├── ARCHITECTURE_MVP.md       # This file
│   ├── DEMO_SCRIPT.md            # Presentation guide
│   └── API.md                    # API documentation
│
├── README.md                     # Quick setup guide
├── .gitignore
└── docker-compose.yml            # Optional local dev
```

---

## 🎨 Frontend Architecture

### Tech Stack
```json
{
  "framework": "Next.js 14",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "3d": "Three.js + React Three Fiber",
  "animation": "Framer Motion",
  "state": "React Hooks (useState/useEffect)",
  "deployment": "Vercel"
}
```

### Key Components

#### 1. Globe3D Component
```tsx
// components/Globe3D.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

interface Signal {
  id: number;
  lat: number;
  lng: number;
  category: string;
}

export default function Globe3D({ signals, onSignalClick }) {
  return (
    <Canvas>
      {/* Earth Sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial 
          map={earthTexture}
          bumpMap={earthBumpMap}
        />
      </Sphere>

      {/* Signal Markers */}
      {signals.map(signal => (
        <SignalMarker
          key={signal.id}
          position={latLngToVector3(signal.lat, signal.lng)}
          color={getCategoryColor(signal.category)}
          onClick={() => onSignalClick(signal)}
        />
      ))}

      <OrbitControls enableZoom={true} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}
```

#### 2. HUD Layout
```tsx
// components/HUDLayout.tsx
export default function HUDLayout({ children }) {
  return (
    <div className="relative h-screen w-screen bg-cyber-blue overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Data streams */}
      <DataStreams />
      
      {/* Top status bar */}
      <TopBar />
      
      {/* Main content grid */}
      <div className="grid grid-cols-12 h-full">
        {/* Left panel */}
        <div className="col-span-3">
          <LeftPanel />
        </div>
        
        {/* Center - Globe */}
        <div className="col-span-6">
          {children}
        </div>
        
        {/* Right panel */}
        <div className="col-span-3">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
```

#### 3. Signal Card
```tsx
// components/SignalCard.tsx
import { motion } from 'framer-motion';

export default function SignalCard({ signal, matchScore }) {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass-panel p-6 border border-cyber-cyan"
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-cyber-cyan/20 rounded-full text-cyber-cyan text-sm">
          {signal.category}
        </span>
        <span className="text-2xl font-bold text-matrix-green">
          {matchScore}% Match
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2">
        {signal.title}
      </h3>

      {/* Location */}
      <p className="text-gray-400 text-sm mb-4">
        📍 {signal.city}, {signal.state}
      </p>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Budget</p>
          <p className="text-white font-mono">
            ${(signal.budget / 1000000).toFixed(1)}M
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Timeline</p>
          <p className="text-white">{signal.timeline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">
        {signal.description}
      </p>

      {/* Stakeholders */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Key Contacts</p>
        {signal.stakeholders.map((person, i) => (
          <div key={i} className="text-sm text-white">
            • {person}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-cyber-cyan text-black rounded hover:bg-cyber-cyan/80">
          View Full Details
        </button>
        <button className="px-4 py-2 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan/10">
          Preview Email
        </button>
      </div>
    </motion.div>
  );
}
```

### Styling System

#### Tailwind Configuration
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'cyber-cyan': '#00D9FF',
        'cyber-blue': '#0A1929',
        'matrix-green': '#00FF41',
        'warning-amber': '#FFB800',
      },
      backgroundImage: {
        'grid-pattern': "url('/grid.svg')",
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-stream': 'stream 4s linear infinite',
      },
    },
  },
}
```

#### Custom CSS
```css
/* globals.css */

/* Glassmorphism panels */
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Cyber grid background */
.cyber-grid {
  background-image: 
    linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Pulsing signal marker */
.signal-pulse {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5);
  }
}

/* Data stream animation */
.data-stream {
  animation: stream 4s linear infinite;
}

@keyframes stream {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
```

---

## ⚙️ Backend Architecture

### Single-File FastAPI
```python
# backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import google.generativeai as genai
import os
from typing import List, Optional
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(title="DealFlow-AI API")

# CORS for Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============= Data Loading =============

def load_signals():
    """Load pre-seeded signals from JSON"""
    with open('data/signals.json', 'r') as f:
        return json.load(f)

SIGNALS = load_signals()

# ============= Models =============

class StartupInput(BaseModel):
    description: str
    category: Optional[str] = None

class MatchResult(BaseModel):
    signal_id: int
    match_score: float
    reasoning: str
    signal_data: dict

# ============= Gemini Integration =============

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_embedding(text: str) -> List[float]:
    """Get Gemini embedding for text"""
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text,
        task_type="retrieval_document"
    )
    return result['embedding']

def calculate_semantic_similarity(startup_desc: str, signal: dict) -> float:
    """Calculate semantic similarity between startup and signal"""
    
    # Create signal text
    signal_text = f"{signal['category']} {signal['title']} {signal['description']}"
    
    # Get embeddings
    startup_emb = get_embedding(startup_desc)
    signal_emb = get_embedding(signal_text)
    
    # Calculate cosine similarity
    similarity = cosine_similarity([startup_emb], [signal_emb])[0][0]
    
    return float(similarity)

def calculate_keyword_match(startup_desc: str, signal: dict) -> float:
    """Simple keyword matching for hybrid scoring"""
    
    startup_words = set(startup_desc.lower().split())
    signal_words = set(' '.join(signal['keywords']).lower().split())
    
    if not signal_words:
        return 0.0
    
    intersection = startup_words & signal_words
    return len(intersection) / len(signal_words)

def generate_match_reasoning(startup_desc: str, signal: dict, score: float) -> str:
    """Use Gemini to explain why this is a good match"""
    
    prompt = f"""You are an AI matching assistant for government procurement opportunities.

Startup: {startup_desc}

Government Signal:
- Category: {signal['category']}
- Title: {signal['title']}
- Description: {signal['description']}
- Budget: ${signal['budget']:,}
- Keywords: {', '.join(signal['keywords'])}

Match Score: {score:.0%}

Write a 2-sentence explanation of why this startup matches this government opportunity. Be specific about capabilities and needs.
"""

    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            temperature=0.3,
            max_output_tokens=150
        )
    )
    
    return response.text.strip()

# ============= API Endpoints =============

@app.get("/")
def root():
    return {
        "service": "DealFlow-AI API",
        "version": "1.0-MVP",
        "status": "operational",
        "signals_loaded": len(SIGNALS)
    }

@app.get("/signals")
def get_signals(category: Optional[str] = None, state: Optional[str] = None):
    """Get all signals, optionally filtered"""
    
    filtered = SIGNALS
    
    if category:
        filtered = [s for s in filtered if s['category'].lower() == category.lower()]
    
    if state:
        filtered = [s for s in filtered if s['state'] == state]
    
    return {
        "total": len(filtered),
        "signals": filtered
    }

@app.post("/match")
async def match_startup(startup: StartupInput):
    """Find matching signals for a startup"""
    
    matches = []
    
    for signal in SIGNALS:
        # Hybrid scoring: 70% semantic, 30% keyword
        semantic_score = calculate_semantic_similarity(startup.description, signal)
        keyword_score = calculate_keyword_match(startup.description, signal)
        
        final_score = (semantic_score * 0.7) + (keyword_score * 0.3)
        
        # Only include matches above 50%
        if final_score >= 0.5:
            # Generate AI reasoning
            reasoning = generate_match_reasoning(
                startup.description, 
                signal, 
                final_score
            )
            
            matches.append({
                "signal_id": signal['id'],
                "match_score": round(final_score * 100, 1),
                "reasoning": reasoning,
                "signal_data": signal
            })
    
    # Sort by score descending
    matches.sort(key=lambda x: x['match_score'], reverse=True)
    
    return {
        "startup_description": startup.description,
        "total_matches": len(matches),
        "matches": matches[:10]  # Top 10 only
    }

@app.post("/email-preview")
def generate_email_preview(signal_id: int, startup_description: str):
    """Generate email preview for a specific signal match"""
    
    signal = next((s for s in SIGNALS if s['id'] == signal_id), None)
    
    if not signal:
        raise HTTPException(status_code=404, detail="Signal not found")
    
    prompt = f"""Write a professional outreach email from a startup to a government contact.

Startup: {startup_description}

Government Opportunity:
- Title: {signal['title']}
- Description: {signal['description']}
- Budget: ${signal['budget']:,}
- Contact: {signal['stakeholders'][0] if signal['stakeholders'] else 'City Official'}

Write a concise 3-paragraph email:
1. Introduction and why you're reaching out
2. How your solution addresses their needs
3. Request for a meeting

Keep it professional, specific, and under 200 words.
"""

    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            temperature=0.7,
            max_output_tokens=300
        )
    )
    
    email_body = response.text.strip()
    
    return {
        "subject": f"Re: {signal['title']} - Partnership Opportunity",
        "to": signal['stakeholders'][0] if signal['stakeholders'] else "City Official",
        "body": email_body,
        "signal": signal
    }

# ============= Health Check =============

@app.get("/health")
def health_check():
    return {"status": "healthy", "signals": len(SIGNALS)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 📊 Data Structure

### signals.json
```json
[
  {
    "id": 1,
    "city": "Austin",
    "state": "TX",
    "lat": 30.2672,
    "lng": -97.7431,
    "category": "Cybersecurity",
    "title": "Security Operations Center Modernization",
    "description": "City council approved $1.5M budget allocation for cybersecurity improvements. IT department plans to implement AI-powered threat detection and automated incident response. RFP expected Q2 2024.",
    "budget": 1500000,
    "timeline": "Q2 2024",
    "source": "Austin City Council Minutes - January 15, 2024",
    "source_url": "https://austintexas.gov/...",
    "keywords": ["SOC", "SIEM", "security", "AI", "threat detection", "automation"],
    "stakeholders": [
      "John Smith (IT Director) - jsmith@austintexas.gov",
      "Jane Doe (CISO) - jdoe@austintexas.gov"
    ],
    "confidence": 0.92,
    "created_at": "2024-01-20T10:00:00Z"
  },
  {
    "id": 2,
    "city": "Houston",
    "state": "TX",
    "lat": 29.7604,
    "lng": -95.3698,
    "category": "Cloud Infrastructure",
    "title": "Enterprise Cloud Migration Initiative",
    "description": "Houston is planning a $3.2M cloud migration project to move legacy systems to modern cloud infrastructure. Focus on hybrid cloud architecture with emphasis on security and compliance.",
    "budget": 3200000,
    "timeline": "Q3 2024",
    "source": "Houston IT Strategic Plan 2024",
    "source_url": "https://houstontx.gov/...",
    "keywords": ["cloud", "AWS", "Azure", "migration", "infrastructure", "hybrid"],
    "stakeholders": [
      "Mike Johnson (CTO) - mjohnson@houstontx.gov"
    ],
    "confidence": 0.88,
    "created_at": "2024-01-22T14:30:00Z"
  }
  // ... 18 more signals
]
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

Deploy:
```bash
cd frontend
vercel --prod
```

### Backend (Railway)
```bash
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health"
  }
}
```

Deploy:
```bash
cd backend
railway up
```

### Environment Variables

**Backend (.env)**
```bash
GOOGLE_API_KEY=...
PORT=8000
ENVIRONMENT=production
```

**Frontend (.env.local)**
```bash
NEXT_PUBLIC_API_URL=https://dealflow-api.railway.app
```

---

## 🔄 API Flow

```
User enters startup description
         ↓
Frontend sends POST /match
         ↓
Backend:
  1. Get embedding for startup
  2. Compare with signal embeddings
  3. Calculate scores (semantic + keywords)
  4. Generate AI reasoning for top matches
  5. Return top 10 matches
         ↓
Frontend displays results on globe
         ↓
User clicks "Preview Email"
         ↓
Frontend sends POST /email-preview
         ↓
Backend:
  1. Get signal details
  2. Use Gemini to generate personalized email
  3. Return formatted email
         ↓
Frontend shows email modal
```

---

## 🎯 Performance Targets

- **Page Load:** < 2 seconds
- **Globe Render:** < 1 second
- **Match API:** < 3 seconds (includes Gemini calls)
- **Email Generation:** < 2 seconds
- **Animation FPS:** 60fps

---

## 🔧 Development Setup

```bash
# Clone repo
git clone https://github.com/yourusername/dealflow-ai-mvp.git
cd dealflow-ai-mvp

# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Add your GOOGLE_API_KEY
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local  # Add API URL
npm run dev

# Open http://localhost:3000
```

---

## 📦 Dependencies

### Frontend
```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "three": "0.158.0",
    "@react-three/fiber": "8.15.0",
    "@react-three/drei": "9.88.0",
    "framer-motion": "10.16.0",
    "tailwindcss": "3.3.0",
    "axios": "1.6.0"
  }
}
```

### Backend
```txt
fastapi==0.104.0
uvicorn==0.24.0
google-generativeai==0.3.0
pydantic==2.5.0
python-dotenv==1.0.0
scikit-learn==1.3.0
numpy==1.26.0
```

---

**Architecture Version:** 2.0 - MVP  
**Last Updated:** February 7, 2026  
**Status:** Production-Ready 🏗️
