from celery import Celery
import os
import sys

# Add root folder to sys.path to access AI modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "plai_workers",
    broker=redis_url,
    backend=redis_url,
    include=["tasks.process_video"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    worker_concurrency=2, # Limiting async video processing instances
)
