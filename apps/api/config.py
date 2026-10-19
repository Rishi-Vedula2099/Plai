from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App config
    PROJECT_NAME: str = "Plai API"
    
    # DB config (Using SQLite for local dev, will pass Postgres URI in prod)
    DATABASE_URL: str = "sqlite+aiosqlite:///./plai_dev.db"
    
    # Security
    SECRET_KEY: str = "super-secret-plai-key-do-not-use-in-prod"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 1 week
    
    # Redis/Celery
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Storage
    STORAGE_PATH: str = "../../data/"
    
    class Config:
        env_file = ".env"

settings = Settings()
