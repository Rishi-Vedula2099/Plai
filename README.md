<![CDATA[<div align="center">

# ⚡ Plai

### *"See the game beyond the game."*

**AI-Powered Gameplay Intelligence Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![YOLO](https://img.shields.io/badge/YOLO-v8-blue?logo=pytorch)](https://docs.ultralytics.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?logo=python)](https://python.org/)

</div>

---

## 🧠 What is Plai?

Plai analyzes gameplay videos to extract patterns, predict player decisions, and provide intelligent coaching insights in real-time. Think of it as your **AI coaching room** — like how NBA and pro football teams review game film, but powered by computer vision and deep learning.

### 🎯 Target Users
- 🎮 **Gamers** — Improve skill with AI-driven feedback
- 🧠 **Coaches** — Analyze team strategy and player behavior
- 🎥 **Content Creators** — Generate highlight reels automatically
- 🏆 **Esports Analysts** — Deep-dive into match data

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS v4, ShadCN UI, Framer Motion |
| **Backend** | Python, FastAPI, async architecture, WebSockets |
| **AI / CV** | YOLO v8 (detection), TimeSformer (video understanding), OpenCV, FFmpeg |
| **Database** | PostgreSQL, Redis (queues + caching) |
| **Storage** | S3-compatible object storage |
| **DevOps** | Docker, Celery, GitHub Actions, Prometheus, Grafana |

---

## 🧱 Project Structure

```
plai/
├── apps/
│   ├── web/               # Next.js frontend
│   ├── api/               # FastAPI backend
│   └── workers/           # Celery background processing
├── ai/
│   ├── detection/         # YOLO models
│   ├── tracking/          # Player tracking
│   └── analysis/          # Insights engine
├── data/
│   ├── raw_videos/        # (gitignored)
│   └── processed/         # (gitignored)
├── infra/
│   ├── docker/
│   ├── monitoring/
│   └── terraform/
├── scripts/
├── .github/workflows/
└── docs/
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- FFmpeg
- Docker (optional, for full stack)

### Frontend
```bash
cd apps/web
npm install
npm run dev
```

### Backend
```bash
cd apps/api
python -m venv .venv
.venv/Scripts/activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Full Stack (Docker)
```bash
cd infra/docker
docker-compose up --build
```

---

## 🔗 Data Flow

```
User uploads video
    → Backend queues task (Redis + Celery)
        → AI processes frames (YOLO + TimeSformer)
            → Results stored in database
                → WebSocket sends updates
                    → Frontend renders insights
```

---

## 📄 License

MIT © Plai
]]>
