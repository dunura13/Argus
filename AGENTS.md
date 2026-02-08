# Argus MVP: Simplified AI Agents

## 🤖 MVP AI Strategy

**Philosophy:** Use AI where it creates WOW moments, skip it where it wastes time.

```
Original Plan: 5 Complex Agents ❌
MVP Plan: 2 Simple Agents ✅

Time Saved: ~15 hours
Focus Gained: UI + Demo Polish
```

---

## 🎯 The Two Essential Agents

### Agent 1: Semantic Matcher
**Purpose:** Match startups to relevant government signals  
**Tech:** Gemini Embeddings + Simple Scoring  
**Wow Factor:** ⭐⭐⭐⭐⭐ (Core value prop)

### Agent 2: Email Generator  
**Purpose:** Create personalized outreach drafts  
**Tech:** gemini-2.5-flash with good prompts  
**Wow Factor:** ⭐⭐⭐⭐ (Nice finishing touch)

---

## 👥 Team Ownership (4 People)

**Person A (Frontend + Demo UI)**
- Build the demo interface (globe, HUD layout, panels, animations)
- Own `frontend/` components and styling
- Ensure the WOW factor and smooth UX flow

**Person B (Backend + Matching Logic)**
- Implement FastAPI `backend/main.py`
- Semantic matching + keyword overlap + caching
- API endpoints and error handling

**Person C (Prompting + Data Quality)**
- Curate `signals.json` and sample `startups.json`
- Tune prompts for match reasoning + emails
- Validate match quality with manual examples

**Person D (Testing + Demo Readiness)**
- Add unit tests for matching + email generation
- Demo script and QA checklist
- Performance checks and fallback behavior

---

## 🧠 Agent 1: Semantic Matcher

### What It Does
Takes a startup description and finds the most relevant government signals using AI-powered semantic search.

### How It Works

```python
# File: backend/main.py (Semantic Matching Section)

import google.generativeai as genai
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def match_startup_to_signals(startup_description: str, signals: list) -> list:
    """
    Hybrid matching: 70% semantic similarity + 30% keyword overlap
    
    Returns: List of matches sorted by score
    """
    
    matches = []
    
    # Get startup embedding
    startup_embedding = get_embedding(startup_description)
    
    for signal in signals:
        # 1. Semantic Similarity (70% weight)
        signal_text = f"{signal['category']} {signal['title']} {signal['description']}"
        signal_embedding = get_embedding(signal_text)
        
        semantic_score = cosine_similarity(
            [startup_embedding], 
            [signal_embedding]
        )[0][0]
        
        # 2. Keyword Overlap (30% weight)
        keyword_score = calculate_keyword_overlap(
            startup_description.lower(),
            signal['keywords']
        )
        
        # 3. Combine scores
        final_score = (semantic_score * 0.7) + (keyword_score * 0.3)
        
        # 4. Generate AI explanation if good match
        if final_score >= 0.5:
            reasoning = generate_match_reasoning(
                startup_description,
                signal,
                final_score
            )
            
            matches.append({
                'signal': signal,
                'score': final_score,
                'reasoning': reasoning
            })
    
    # Sort by score
    matches.sort(key=lambda x: x['score'], reverse=True)
    
    return matches[:10]  # Top 10 only
```

### Example Input/Output

**Input:**
```json
{
  "startup_description": "We build AI-powered cybersecurity platforms that help government agencies detect and respond to threats in real-time. Our SOC automation reduces incident response time by 80%."
}
```

**Output:**
```json
{
  "matches": [
    {
      "signal_id": 1,
      "match_score": 94.3,
      "reasoning": "Your AI-powered SOC automation directly addresses Austin's $1.5M cybersecurity modernization initiative. They specifically mentioned need for automated threat detection and incident response capabilities in their council minutes.",
      "signal": {
        "city": "Austin",
        "title": "SOC Modernization",
        "budget": 1500000,
        "stakeholders": ["John Smith (IT Director)"],
        ...
      }
    },
    {
      "signal_id": 5,
      "match_score": 87.1,
      "reasoning": "San Francisco's $2.2M security operations upgrade aligns well with your real-time threat detection platform. Your 80% faster response time would help them meet their aggressive timeline.",
      ...
    }
  ]
}
```

### Prompt Engineering

```python
def generate_match_reasoning(startup_desc: str, signal: dict, score: float) -> str:
    """
    Use gemini-2.5-flash to explain WHY this is a good match.
    
    Key: Be specific about both startup capabilities AND government needs.
    """
    
    prompt = f"""You are an expert at matching GovTech startups to government procurement opportunities.

STARTUP:
{startup_desc}

GOVERNMENT SIGNAL:
- Category: {signal['category']}
- Title: {signal['title']}
- Description: {signal['description']}
- Budget: ${signal['budget']:,}
- Key Requirements: {', '.join(signal['keywords'])}

Match Score: {score:.0%}

Task: Write exactly 2 sentences explaining why this startup matches this opportunity.

Requirements:
- Sentence 1: State the specific startup capability that addresses the government need
- Sentence 2: Mention the budget/timeline/stakeholder to show you understand the context
- Be concrete and specific
- No fluff or generic statements
- Maximum 50 words total

Example output:
"Your AI-powered SOC automation directly addresses Austin's $1.5M cybersecurity modernization initiative. They specifically mentioned automated threat detection in their council minutes, which aligns perfectly with your 80% faster incident response capability."
"""

    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            temperature=0.3,  # Low temperature for consistency
            max_output_tokens=100
        )
    )
    
    return response.text.strip()
```

### Scoring Breakdown

**Semantic Similarity (70%)**
```python
def get_embedding(text: str) -> list:
    """
    Get Gemini embedding using text-embedding-004
    
    Why this model:
    - Fast: ~50ms per call
    - Cheap: $0.00002 per 1K tokens
    - Good: 768 dimensions
    """
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text,
        task_type="retrieval_document"
    )
    return result['embedding']

def semantic_similarity(emb1, emb2):
    """Cosine similarity: 1.0 = identical, 0.0 = unrelated, -1.0 = opposite"""
    return cosine_similarity([emb1], [emb2])[0][0]
```

**Keyword Overlap (30%)**
```python
def calculate_keyword_overlap(startup_desc: str, signal_keywords: list) -> float:
    """
    Simple but effective: What % of signal keywords appear in startup description?
    
    Example:
    Startup: "We build AI security platforms for SOC automation"
    Keywords: ["AI", "security", "SOC", "SIEM", "automation"]
    
    Match: 4/5 keywords found = 0.8
    """
    startup_words = set(startup_desc.lower().split())
    keyword_words = set(' '.join(signal_keywords).lower().split())
    
    if not keyword_words:
        return 0.0
    
    matches = startup_words & keyword_words
    return len(matches) / len(keyword_words)
```

### Performance Optimization

```python
# BEFORE: Slow (3-5 seconds per match)
def slow_matching(startup_desc, signals):
    for signal in signals:
        # Get embedding on every call - SLOW!
        signal_emb = get_embedding(signal['description'])
        ...

# AFTER: Fast (<1 second per match)
def fast_matching(startup_desc, signals):
    # Pre-compute and cache signal embeddings
    if 'embedding' not in signal:
        signal['embedding'] = get_embedding(signal['description'])
    
    # Only get startup embedding once
    startup_emb = get_embedding(startup_desc)
    
    for signal in signals:
        similarity = cosine_similarity([startup_emb], [signal['embedding']])[0][0]
        ...
```

**Result:** 
- Original: 20 signals × 200ms = 4 seconds ❌
- Optimized: 1 embedding + lookups = 300ms ✅

---

## ✉️ Agent 2: Email Generator

### What It Does
Generates personalized, professional outreach emails based on a specific signal match.

### How It Works

```python
def generate_email(startup_desc: str, signal: dict, match_score: float) -> dict:
    """
    Generate personalized outreach email
    
    Output: Subject line + body (3 paragraphs)
    """
    
    # Build context-rich prompt
    prompt = f"""Write a professional outreach email from a startup to a government contact.

FROM (Startup):
{startup_desc}

TO (Government Contact):
{signal['stakeholders'][0] if signal['stakeholders'] else 'City Official'}

REGARDING (Opportunity):
- Title: {signal['title']}
- Description: {signal['description']}
- Budget: ${signal['budget']:,}
- Timeline: {signal['timeline']}
- Match Score: {match_score}%

TASK: Write a concise 3-paragraph email:

Paragraph 1 (Introduction):
- Reference the specific government initiative
- Explain why you're reaching out
- Mention how you learned about this (council minutes, strategic plan, etc.)

Paragraph 2 (Value Proposition):
- Highlight 2-3 specific capabilities that address their needs
- Use concrete metrics (e.g., "reduce costs by 40%")
- Show you understand their requirements

Paragraph 3 (Call to Action):
- Request a 30-minute introductory call
- Suggest next steps
- Provide availability

REQUIREMENTS:
- Professional but not stiff
- Specific, not generic
- Under 200 words
- No marketing fluff
- Include actual contact info (their email address)

Example tone: "I noticed in the January council minutes that Austin approved $1.5M for SOC modernization. Our AI-powered platform has helped similar-sized cities reduce incident response time by 80%..."
"""

    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            temperature=0.7,  # Slightly higher for natural writing
            max_output_tokens=400
        )
    )
    
    email_body = response.text.strip()
    
    return {
        "subject": f"Re: {signal['title']} - Partnership Opportunity",
        "to": signal['stakeholders'][0] if signal['stakeholders'] else "City Official",
        "body": email_body,
        "preview_note": "⚠️ This is a preview. Review and customize before sending."
    }
```

### Example Output

```
Subject: Re: SOC Modernization - Partnership Opportunity

To: John Smith (IT Director) - jsmith@austintexas.gov

Body:
Hi John,

I noticed in the January 15th city council minutes that Austin approved $1.5M for cybersecurity improvements, specifically mentioning AI-powered threat detection and automated incident response. This aligns perfectly with what we've built at [Your Company].

Our SOC automation platform has helped cities like Portland and Denver reduce incident response time by 80% while cutting security operations costs by 40%. We specialize in AI-powered threat detection and automated playbooks, which directly address the capabilities mentioned in your council presentation. Our platform integrates with existing SIEM tools and can be deployed within the Q2 2024 timeline you outlined.

Would you be open to a 30-minute call next week to discuss how we can support Austin's cybersecurity initiative? I'm available Tuesday/Thursday afternoons or Friday mornings. Happy to provide references from other Texas municipalities as well.

Best regards,
[Your Name]
[Your Title]
[Your Company]
```

### Email Quality Checklist

✅ **Specific reference** to actual government document  
✅ **Concrete metrics** (80% faster, 40% cost reduction)  
✅ **Timeline awareness** (mentions Q2 2024)  
✅ **Clear CTA** (30-minute call, specific availability)  
✅ **Professional tone** (not salesy)  
✅ **Under 200 words** (respects their time)

---

## 🚫 What We DON'T Build (MVP Scope)

### ❌ Agent 3: Document Parser
**Why Skip:** No time to build scrapers, use pre-made signals instead

**What We'd Build Later:**
```python
# Future: Real document parsing
class DocumentParserAgent:
    def parse_pdf(self, pdf_bytes):
        # Extract text from PDFs
        # Handle OCR for scanned docs
        # Clean and structure data
        ...
```

**MVP Alternative:** 
- Manually create 20-30 high-quality signals
- Store in `signals.json`
- Focus on matching quality, not data pipeline

### ❌ Agent 4: Entity Extractor  
**Why Skip:** Stakeholder names already in seed data

**What We'd Build Later:**
```python
# Future: Named entity recognition
def extract_stakeholders(text):
    # Use spaCy to find people names
    # Extract email addresses
    # Identify organizations
    ...
```

**MVP Alternative:**
- Include stakeholder info in seed signals
- Format: "John Smith (IT Director) - jsmith@city.gov"

### ❌ Agent 5: Signal Classifier
**Why Skip:** Manual categorization is faster for 20 signals

**What We'd Build Later:**
```python
# Future: Automatic categorization
def classify_signal(description):
    # Use gemini to categorize into:
    # - Cybersecurity
    # - Cloud Infrastructure  
    # - AI/ML
    # - Data Analytics
    ...
```

**MVP Alternative:**
- Manually tag each signal with category
- Ensure good category distribution

---

## 💰 Cost Analysis (24-Hour Hackathon)

### Gemini API Usage

**Embeddings (text-embedding-004)**
```
Per match request:
- 1 startup embedding: ~$0.0001
- 20 signal lookups: $0 (pre-cached)
- Total: ~$0.0001 per match

100 demo requests: $0.01
```

**Chat Completions (gemini-2.5-flash)**
```
Match reasoning (per signal):
- Prompt: ~200 tokens
- Response: ~100 tokens
- Cost: ~$0.0001

Email generation (per email):
- Prompt: ~400 tokens  
- Response: ~300 tokens
- Cost: ~$0.0003

100 matches + 20 emails: $0.02
```

**Total Hackathon Cost: ~$0.05** ✅

---

## 🎯 AI Agent Performance Targets

### Speed
- **Embedding generation:** < 100ms
- **Semantic similarity:** < 50ms (pre-cached)
- **Match reasoning:** < 2s (gemini call)
- **Email generation:** < 3s (gemini call)
- **Total match request:** < 3s

### Quality
- **Match accuracy:** >85% precision (validated manually)
- **Reasoning coherence:** >90% human-readable
- **Email professionalism:** >95% send-ready

### Reliability
- **API success rate:** >99.5%
- **Error handling:** Graceful degradation
- **Fallback behavior:** Cache + retry

---

## 🧪 Testing AI Agents

### Unit Tests
```python
# tests/test_matching.py

def test_semantic_matching():
    """Test that semantic matching works correctly"""
    
    startup = "We build AI cybersecurity platforms for SOCs"
    
    signal_good = {
        "category": "Cybersecurity",
        "description": "Need AI-powered SOC platform",
        "keywords": ["AI", "SOC", "security"]
    }
    
    signal_bad = {
        "category": "Road Maintenance",
        "description": "Repaving Highway 101",
        "keywords": ["asphalt", "highway", "construction"]
    }
    
    score_good = calculate_match_score(startup, signal_good)
    score_bad = calculate_match_score(startup, signal_bad)
    
    assert score_good > 0.7  # Should match well
    assert score_bad < 0.3   # Should not match

def test_email_generation():
    """Test that email generation produces valid output"""
    
    result = generate_email(
        startup_desc="AI security platform",
        signal=test_signal,
        match_score=94
    )
    
    assert 'subject' in result
    assert 'body' in result
    assert len(result['body']) < 1000  # Not too long
    assert '@' in result['to']  # Valid email format
```

### Manual Quality Checks
```
Test Case 1: High Match (>80%)
- Startup: Cybersecurity AI platform
- Signal: SOC modernization with AI
- Expected: Coherent reasoning, specific capabilities mentioned

Test Case 2: Medium Match (60-80%)
- Startup: Cloud migration tools
- Signal: General IT modernization
- Expected: Some overlap mentioned, but not perfect fit

Test Case 3: Low Match (<50%)
- Startup: Traffic management AI
- Signal: Parks department maintenance
- Expected: No match returned OR honest "weak fit" reasoning
```

---

## 🔧 Configuration & Tuning

### Environment Variables
```bash
# .env

# Gemini
GOOGLE_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
EMBEDDING_MODEL=text-embedding-004

# Matching Parameters
SEMANTIC_WEIGHT=0.7
KEYWORD_WEIGHT=0.3
MIN_MATCH_SCORE=0.5

# Generation Parameters
REASONING_TEMPERATURE=0.3  # Low for consistency
EMAIL_TEMPERATURE=0.7       # Higher for natural writing
MAX_REASONING_TOKENS=100
MAX_EMAIL_TOKENS=400
```

### Tuning Tips

**If matches are too broad:**
```python
MIN_MATCH_SCORE=0.6  # Raise threshold
SEMANTIC_WEIGHT=0.8  # Rely more on embeddings
```

**If matches are too narrow:**
```python
MIN_MATCH_SCORE=0.4  # Lower threshold
KEYWORD_WEIGHT=0.4   # Give keywords more weight
```

**If reasoning is too generic:**
```python
REASONING_TEMPERATURE=0.2  # More deterministic
# Add more examples to prompt
# Emphasize "be specific" in system message
```

**If emails sound too robotic:**
```python
EMAIL_TEMPERATURE=0.8  # More creative
# Adjust tone in prompt: "conversational but professional"
```

---

## 📊 Monitoring (Post-Demo)

```python
# Track agent performance
class AgentMetrics:
    def log_match_request(self, startup_desc, matches, duration):
        """Track matching performance"""
        metrics = {
            'timestamp': datetime.now(),
            'startup_length': len(startup_desc),
            'num_matches': len(matches),
            'duration_ms': duration,
            'avg_score': sum(m['score'] for m in matches) / len(matches)
        }
        # Log to database or analytics service
    
    def log_email_generation(self, signal_id, email_length, duration):
        """Track email generation performance"""
        ...
```

---

## 🚀 Future AI Enhancements (Post-MVP)

### V2: Add Real Scraping
```python
# Agent 3: Document Parser
parser = DocumentParserAgent()
signals = parser.extract_signals_from_pdf(city_council_minutes)
```

### V3: Learning from Feedback
```python
# Track which matches lead to actual meetings
def update_match_quality(signal_id, startup_id, user_contacted: bool):
    """Improve matching based on user actions"""
    if user_contacted:
        boost_similar_signals()
```

### V4: Multi-Modal Analysis
```python
# Analyze charts/tables in government docs
def analyze_budget_table(image_bytes):
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    response = model.generate_content([
        {"mime_type": "image/jpeg", "data": image_b64},
        "Extract budget items from this table"
    ])
```

---

## ✅ AI Agent Checklist

**Pre-Demo:**
- [ ] Gemini API key working
- [ ] Embeddings cached for all signals
- [ ] Match reasoning tested on 10 examples
- [ ] Email generation tested on 5 examples
- [ ] Error handling implemented
- [ ] Fallback responses ready

**During Demo:**
- [ ] Match score >80% for good fits
- [ ] Reasoning is specific and coherent
- [ ] Emails look professional
- [ ] Response time <3 seconds
- [ ] Zero API errors

**Post-Demo:**
- [ ] Log all API calls for cost tracking
- [ ] Save match results for analysis
- [ ] Collect user feedback on quality

---

**Document Version:** 2.0 - MVP  
**Last Updated:** February 7, 2026  
**Status:** Production-Ready AI 🤖
