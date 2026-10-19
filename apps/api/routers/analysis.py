from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models.domain import Video, Analysis

router = APIRouter()

@router.post("/{video_id}/start")
async def start_analysis(video_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Video).where(Video.id == video_id))
    video = result.scalars().first()
    
    if not video:
        raise HTTPException(404, "Video not found")
        
    video.status = "processing"
    await db.commit()
    
    # Real app: sent to Celery queue
    # redis_client.lpush("analysis_queue", json.dumps({"video_id": video_id}))
    
    return {"message": "Analysis started", "video_id": video_id}

@router.get("/{video_id}/results")
async def get_analysis_results(video_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Analysis).where(Analysis.video_id == video_id))
    analysis = result.scalars().first()
    
    if not analysis:
        raise HTTPException(404, "Analysis not found or still processing")
        
    return analysis
