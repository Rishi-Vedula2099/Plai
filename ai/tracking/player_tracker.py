import numpy as np

class PlayerTracker:
    def __init__(self, max_disappeared=30, distance_threshold=50):
        """
        A simple centroid tracker for player paths.
        In production, we would use DeepSORT or ByteTrack.
        """
        self.next_object_id = 0
        self.objects = {} # dict of id -> centroid
        self.disappeared = {} # dict of id -> count
        
        self.max_disappeared = max_disappeared
        self.distance_threshold = distance_threshold
        
        self.trajectories = {} # History path for heatmaps: id -> list of dicts {x, y, time}
        
    def _register(self, centroid, time_ms):
        self.objects[self.next_object_id] = centroid
        self.disappeared[self.next_object_id] = 0
        self.trajectories[self.next_object_id] = [{"x": centroid[0], "y": centroid[1], "time": time_ms}]
        self.next_object_id += 1

    def _deregister(self, object_id):
        del self.objects[object_id]
        del self.disappeared[object_id]
        
    def update(self, rects, time_ms):
        """
        Update tracker with new bounding boxes [x1, y1, x2, y2]
        """
        if len(rects) == 0:
            for obj_id in list(self.disappeared.keys()):
                self.disappeared[obj_id] += 1
                if self.disappeared[obj_id] > self.max_disappeared:
                    self._deregister(obj_id)
            return self.objects

        # Calculate centroids
        input_centroids = np.zeros((len(rects), 2), dtype="int")
        for i, (startX, startY, endX, endY) in enumerate(rects):
            cX = int((startX + endX) / 2.0)
            cY = int((startY + endY) / 2.0)
            input_centroids[i] = (cX, cY)

        if len(self.objects) == 0:
            for i in range(0, len(input_centroids)):
                self._register(input_centroids[i], time_ms)
        else:
            object_ids = list(self.objects.keys())
            object_centroids = list(self.objects.values())

            # Compute distance between each pair of object centroids and input centroids
            D = np.linalg.norm(np.array(object_centroids)[:, np.newaxis] - input_centroids, axis=2)

            # Find smallest distances to match tracking
            rows = D.min(axis=1).argsort()
            cols = D.argmin(axis=1)[rows]

            used_rows = set()
            used_cols = set()

            for (row, col) in zip(rows, cols):
                if row in used_rows or col in used_cols:
                    continue
                    
                if D[row, col] > self.distance_threshold:
                    continue

                object_id = object_ids[row]
                new_centroid = input_centroids[col]
                self.objects[object_id] = new_centroid
                self.disappeared[object_id] = 0
                self.trajectories[object_id].append({"x": int(new_centroid[0]), "y": int(new_centroid[1]), "time": time_ms})

                used_rows.add(row)
                used_cols.add(col)

            # Check for disappeared objects
            unused_rows = set(range(0, D.shape[0])).difference(used_rows)
            for row in unused_rows:
                object_id = object_ids[row]
                self.disappeared[object_id] += 1
                if self.disappeared[object_id] > self.max_disappeared:
                    self._deregister(object_id)

            # Register new objects
            unused_cols = set(range(0, D.shape[1])).difference(used_cols)
            for col in unused_cols:
                self._register(input_centroids[col], time_ms)

        # Return tracked centroids alongside trajectories
        return self.objects, self.trajectories
