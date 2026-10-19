from celery_app import celery_app
from ai.pipeline import PipelineOrchestrator
import time
import asyncio

# Need this dependency to mock db update
from apps.api.database import AsyncSessionLocal
from apps.api.models.domain import Video, Analysis

pipeline = PipelineOrchestrator()

@celery_app.task(bind=True)
def process_video_task(self, video_id: int, file_path: str):
    """
    Background worker task to run the AI Pipeline.
    """
    print(f"Starting analysis for video ID {video_id}")
    
    # 1. Output path for results
    output_path = f"../../data/processed/{video_id}_results.json"
    
    # 2. Run Heavy AI Pipeline
    # This involves YOLO object detection, Player Tracker, and TimeSformer logic
    try:
        results = pipeline.process_video(file_path, output_path)
    except Exception as e:
        print(f"Pipeline failed: {e}")
        # In a real app we'd mark video as failed in DB
        return {"status": "failed", "error": str(e)}

    # 3. Update database
    async def update_db():
        async with AsyncSessionLocal() as db:
            # Update Video status
            video = await db.get(Video, video_id)
            if video:
                video.status = "completed"
            
            # Create Analysis record
            db_analysis = Analysis(
                video_id=video_id,
                summary="AI generation complete",
                details_json_path=output_path
            )
            db.add(db_analysis)
            await db.commit()

    # Create new event loop because Celery tasks run sync
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(update_db())
    loop.close()

    print(f"Finished processing video ID {video_id}")
    return {"status": "completed", "insights_count": len(results.get("insights", []))}
