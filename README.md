<div align="center">

# ⚡ Plai

### *"See the game beyond the game."*

**AI-Powered Gameplay Intelligence Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![YOLO](https://img.shields.io/badge/YOLO-v11-blue?style=flat-square&logo=pytorch)](https://docs.ultralytics.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?style=flat-square&logo=python)](https://python.org/)

</div>

---

## 🧠 What is Plai?

Plai analyzes gameplay videos to extract patterns, predict player decisions, and provide intelligent coaching insights in real-time. Think of it as your **AI coaching room** — like how NBA and pro football teams review game film, but powered by state-of-the-art computer vision and deep learning.

### 🎯 Key Highlights
*   🎮 **Pro-Level Intelligence** — Improve skill with AI-driven feedback loops.
*   🧠 **Strategic Analysis** — Analyze team strategies and player behavior patterns.
*   🎥 **Auto-Highlights** — Generate professional highlight reels automatically.
*   🏆 **Competitive Edge** — Deep-dive into match data for esports analysis.

---

## ⚙️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS v4, ShadCN UI, Framer Motion |
| **Backend** | Python, FastAPI, Async Architecture, WebSockets |
| **AI / CV** | YOLO v11 (Detection), TimeSformer (Video Understanding), OpenCV, FFmpeg |
| **Data Engine** | PostgreSQL, Redis (Queues + Caching) |
| **Storage** | S3-compatible Object Storage |
| **Infrastructure** | Docker, Celery, GitHub Actions, Prometheus, Grafana |

---

## 🧱 Project Structure

```bash
plai/
├── 🤖 ai/               # Computer vision & deep learning models
│   ├── detection/       # YOLO player/object detection
│   ├── tracking/        # Multi-object tracking (MOT)
│   └── analysis/        # Insights & pattern engine
├── 📱 apps/
│   ├── web/             # Next.js 15 Dashboard
│   ├── api/             # FastAPI High-Performance Gateway
│   └── workers/         # Scalable Celery task processors
├── 📂 data/             # (Gitignored) Raw & processed video assets
├── 🏗️ infra/            # Docker, K8s, and Monitoring configs
├── 📜 docs/             # Technical documentation & API specs
└── 🛠️ scripts/          # Automation & utility scripts
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 20+**
- **Python 3.11+**
- **FFmpeg** ⚙️
- **Docker** (Recommended for full-stack deployment)

### 💻 Local Development

**Frontend**
```bash
cd apps/web && npm install && npm run dev
```

**Backend**
```bash
cd apps/api
python -m venv .venv && source .venv/bin/activate  # venv/Scripts/activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

**Full Stack (Docker)**
```bash
cd infra/docker && docker-compose up --build
```

---

## 🔗 Intelligent Data Flow

1.  **Ingestion**: User uploads video via the Next.js dashboard.
2.  **Processing**: Celery workers distribute tasks to AI models.
3.  **Inference**: YOLO and TimeSformer perform frame-by-frame analysis.
4.  **Storage**: Metadata is persisted in PostgreSQL; binary data in S3.
5.  **Streaming**: Real-time insights are streamed via WebSockets.

---



