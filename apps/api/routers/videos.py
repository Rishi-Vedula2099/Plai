from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import os
import uuid
import shutil

from database import get_db
from models.domain import Video, User
from config import settings

router = APIRouter()

# Mock Auth dependency (in real app, decode JWT)
async def get_current_user(db: AsyncSession = Depends(get_db)):
    # For dev purposes, return first user or create one
    result = await db.execute(select(User).limit(1))
    user = result.scalars().first()
    if not user:
        user = User(username="testuser", email="test@plai.com", hashed_password="xxx")
        db.add(user)
        await db.commit()
        await db.refresh(user)
    return user

@router.post("/upload")
async def upload_video(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...), 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not file.content_type.startswith("video/"):
        raise HTTPException(400, "File must be a video")
        
    # Create storage dir
    os.makedirs(os.path.join(settings.STORAGE_PATH, "raw_videos"), exist_ok=True)
    
    # Save file
    file_id = str(uuid.uuid4())
    ext = os.path.splitext(file.filename)[1]
    file_path = os.path.join(settings.STORAGE_PATH, "raw_videos", f"{file_id}{ext}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Create DB record
    db_video = Video(
        title=file.filename,
        file_path=file_path,
        owner_id=current_user.id,
        status="uploaded"
    )
    db.add(db_video)
    await db.commit()
    await db.refresh(db_video)
    
    # Optional: trigger celery task here via background_tasks
    
    return {"id": db_video.id, "message": "Upload successful", "status": "uploaded"}

@router.get("/")
async def list_videos(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Video).where(Video.owner_id == current_user.id).order_by(Video.created_at.desc()))
    return result.scalars().all()
