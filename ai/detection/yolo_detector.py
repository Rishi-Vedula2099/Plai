from ultralytics import YOLO
import cv2
import numpy as np

class GameDetector:
    def __init__(self, model_version="yolov8n.pt", conf_threshold=0.5):
        """
        Initialize the YOLO object detector.
        Uses pretrained weights by default, but should be fine-tuned on esports data
        for production use.
        """
        # In a real setup, we would load custom weights here: YOLO('plai-cs2-weights.pt')
        # We use standard yolo for this implementation
        self.model = YOLO(model_version)
        self.conf_threshold = conf_threshold
        
    def detect_frame(self, frame_img: np.ndarray):
        """
        Run detection on a single frame.
        Returns bounding boxes, confidences, and class IDs.
        """
        results = self.model(frame_img, conf=self.conf_threshold, verbose=False)
        
        detections = []
        if len(results) > 0:
            result = results[0]
            boxes = result.boxes
            
            for box in boxes:
                # box.xyxy format is [x1, y1, x2, y2]
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                conf = float(box.conf[0])
                class_id = int(box.cls[0])
                class_name = result.names[class_id]
                
                # We specifically care about person/player classes
                if class_name == 'person':
                    class_name = 'player'
                
                detections.append({
                    "class": class_name,
                    "bbox": [x1, y1, x2, y2],
                    "confidence": conf
                })
                
        return detections

    def extract_player_crops(self, frame_img: np.ndarray, detections: list):
        """
        Helper to crop out just the players from a frame
        (useful before passing to TimeSformer for action recognition)
        """
        crops = []
        for det in detections:
            if det["class"] == "player":
                x1, y1, x2, y2 = map(int, det["bbox"])
                # Add padding
                x1, y1 = max(0, x1-10), max(0, y1-10)
                x2, y2 = min(frame_img.shape[1], x2+10), min(frame_img.shape[0], y2+10)
                crops.append(frame_img[y1:y2, x1:x2])
        return crops
