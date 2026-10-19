from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, videos, analysis, websocket
from database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB schema for dev
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Cleanup on shutdown
    await engine.dispose()

app = FastAPI(
    title="Plai AI Engine",
    description="Backend API for Plai Gameplay Intelligence Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Next.js local frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount logical routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(videos.router, prefix="/api/videos", tags=["Videos"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(websocket.router, tags=["Websockets"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "plai-api"}
