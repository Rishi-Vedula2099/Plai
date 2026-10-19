from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    videos = relationship("Video", back_populates="owner")

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    game = Column(String, nullable=True) # e.g., CS2, Valorant
    file_path = Column(String, nullable=False)
    status = Column(String, default="uploaded") # uploaded, processing, completed, failed
    duration = Column(Integer, nullable=True) # seconds
    thumbnail_path = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    owner = relationship("User", back_populates="videos")
    analysis = relationship("Analysis", back_populates="video", uselist=False)

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("videos.id"), unique=True)
    summary = Column(String, nullable=True)
    details_json_path = Column(String, nullable=True) # Path to heavy JSON payload (tracking, heatmaps)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    video = relationship("Video", back_populates="analysis")
