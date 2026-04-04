import torch
from torchvision.transforms import Compose, Resize, Normalize, ToTensor

class FeatureExtractor:
    """
    Integration for TimeSformer or similar Video Vision Transformers.
    This module analyzes sequence of frames to understand complex actions 
    like "peeking", "reloading", or "throwing utility".
    """
    def __init__(self, device=None):
        self.device = device if device else ("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Initializing Video Transformer on {self.device}")
        
        # Load pre-trained TimeSformer from PyTorch Hub (or custom weights)
        # For simplicity in local dev setup without 4GB weights, we mock the forward pass 
        # but setup the real boilerplate
        self.is_mock = True 
        
        if not self.is_mock:
            self.model = torch.hub.load('facebookresearch/TimeSformer', 'TimeSformer_divST_8x32_224', pretrained=True)
            self.model = self.model.to(self.device)
            self.model.eval()
            
        self.transform = Compose([
            ToTensor(),
            Resize((224, 224)),
            Normalize(mean=[0.45, 0.45, 0.45], std=[0.22, 0.22, 0.22])
        ])

    def predict_action(self, frame_sequence, fps=30):
        """
        Expects a sequence of frames (e.g., shape: [T, H, W, C])
        """
        if self.is_mock:
            # Mock reasoning for local demonstration
            return {
                "action": "peeking_corner",
                "confidence": 0.88,
                "attention_weights": [0.1] * len(frame_sequence) # Mock attention pattern
            }

        # Real implementation:
        # 1. Preprocess frames
        tensor_frames = torch.stack([self.transform(frame) for frame in frame_sequence])
        
        # 2. Reshape for TimeSformer: [B, C, T, H, W]
        tensor_frames = tensor_frames.permute(1, 0, 2, 3).unsqueeze(0).to(self.device)
        
        # 3. Forward pass
        with torch.no_grad():
            outputs = self.model(tensor_frames)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            
            top_prob, top_class = probabilities.topk(1, dim=1)
            
            # Map top_class to action label via dict..
            
        return {
            "action_id": int(top_class[0][0]),
            "confidence": float(top_prob[0][0])
        }
