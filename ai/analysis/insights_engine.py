import uuid

class CoachingInsightsEngine:
    def __init__(self):
        # Configuration for heuristics mapping to AI insights
        pass

    def generate_insights(self, tracker_trajectories, timesformer_actions, game_events):
        """
        Merge raw CV tracking data, action recognition, and events
        to generate natural language feedback for the "AI Coach Panel".
        """
        insights = []
        
        # Example 1: Positioning Analysis via Tracking
        for obj_id, path in tracker_trajectories.items():
            if len(path) > 50: # Extended tracking segment
                # Analyze movement variance
                xs = [p['x'] for p in path]
                ys = [p['y'] for p in path]
                
                # Rule: Standing still in open area
                # (In real implementation, we'd map coordinates to navmesh)
                if max(xs) - min(xs) < 10 and max(ys) - min(ys) < 10:
                    insights.append({
                        "id": str(uuid.uuid4()),
                        "timestamp": path[-1]['time'] / 1000, # ms to sec
                        "type": "positioning",
                        "title": "Static Positioning",
                        "description": "You held this angle for too long without cover. Shift your position after 3-4 seconds to avoid pre-fires.",
                        "severity": "warning",
                        "confidence": 0.85
                    })

        # Example 2: Action Recognition (TimeSformer)
        for action in timesformer_actions:
            if action["action"] == "reloading_in_open":
                insights.append({
                    "id": str(uuid.uuid4()),
                    "timestamp": action["time"] / 1000,
                    "type": "mechanical",
                    "title": "Exposed Reload",
                    "description": "You reloaded without breaking line of sight to the main choke. Always step behind cover before initiating a reload.",
                    "severity": "critical",
                    "confidence": action["confidence"]
                })

        # Example 3: Event based (e.g. late rotations)
        for event in game_events:
            if event["type"] == "rotation" and event["label"] == "Late Rotation":
                insights.append({
                     "id": str(uuid.uuid4()),
                     "timestamp": event["time"],
                     "type": "strategy",
                     "title": "Late Rotation Detected",
                     "description": "Your rotation was delayed. You lost map control and allowed enemies to anchor the site.",
                     "severity": "warning",
                     "confidence": 0.90
                })

        return insights

    def generate_heatmap(self, tracker_trajectories):
        """
        Convert raw tracker points into an aggregated density map.
        """
        points = []
        for path in tracker_trajectories.values():
            for pt in path:
                # normalize coordinates assuming 1280x720 video
                x_norm = pt['x'] / 1280.0
                y_norm = pt['y'] / 720.0
                points.append({
                    "x": x_norm,
                    "y": y_norm,
                    "intensity": 0.5  # Base intensity
                })
        
        # Real impl would apply a gaussian blur/density matrix here
        # to compute true overlapping intensity
        return points
