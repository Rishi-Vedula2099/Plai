import cv2
import json
import os
from detection.yolo_detector import GameDetector
from tracking.player_tracker import PlayerTracker
from analysis.timesformer import FeatureExtractor
from analysis.insights_engine import CoachingInsightsEngine

class PipelineOrchestrator:
    def __init__(self):
        self.detector = GameDetector()
        self.tracker = PlayerTracker()
        self.action_model = FeatureExtractor()
        self.engine = CoachingInsightsEngine()

    def process_video(self, video_path: str, output_path: str):
        print(f"Starting pipeline for {video_path}")
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        
        frame_idx = 0
        frame_sequence = []
        all_actions = []
        raw_events = [] # e.g. from OCR on killfeed

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            time_ms = cap.get(cv2.CAP_PROP_POS_MSEC)
            
            # 1. Detection
            # Run YOLO every 3rd frame to save compute
            if frame_idx % 3 == 0:
                detections = self.detector.detect_frame(frame)
                
                # Convert detections to format for tracker
                rects = [d["bbox"] for d in detections if d["class"] == "player"]
                
                # 2. Tracking
                self.tracker.update(rects, time_ms)
                
            # 3. Action Recognition (Batch frames)
            frame_sequence.append(frame)
            if len(frame_sequence) == int(fps): # 1 second of frames
                # Get crops of tracked players
                # pass to timesformer
                action_res = self.action_model.predict_action(frame_sequence)
                action_res["time"] = time_ms
                all_actions.append(action_res)
                frame_sequence = [] # reset buffer
                
            frame_idx += 1

        cap.release()
        
        # 4. Generate AI Insights & Heatmaps
        tracker_trajectories = self.tracker.trajectories
        insights = self.engine.generate_insights(tracker_trajectories, all_actions, raw_events)
        heatmap = self.engine.generate_heatmap(tracker_trajectories)
        
        # Save results
        results = {
            "insights": insights,
            "heatmap": heatmap,
            "tracking_paths": tracker_trajectories
        }
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w') as f:
            json.dump(results, f)
            
        return results

if __name__ == "__main__":
    # Test script
    pipeline = PipelineOrchestrator()
    # pipeline.process_video("sample.mp4", "../../data/processed/result.json")
