// Mock data types and sample data for the Plai platform

export interface VideoAnalysis {
  id: string;
  title: string;
  game: string;
  duration: string;
  uploadedAt: string;
  status: "processing" | "completed" | "failed";
  thumbnail: string;
  insights: number;
}

export interface TimelineEvent {
  id: string;
  time: number; // seconds
  duration: number; // seconds
  type: "kill" | "death" | "objective" | "mistake" | "highlight" | "rotation";
  label: string;
  description: string;
  severity: "info" | "success" | "warning" | "danger";
}

export interface AIInsight {
  id: string;
  timestamp: number;
  type: "positioning" | "timing" | "strategy" | "mechanical" | "rotation";
  title: string;
  description: string;
  severity: "positive" | "neutral" | "warning" | "critical";
  confidence: number;
}

export interface DetectedObject {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  trackId?: number;
}

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

export interface TrackingPath {
  playerId: number;
  color: string;
  points: { x: number; y: number; time: number }[];
}

// ===== SAMPLE DATA =====

export const sampleAnalyses: VideoAnalysis[] = [
  {
    id: "analysis-1",
    title: "Ranked Match — Inferno",
    game: "CS2",
    duration: "32:15",
    uploadedAt: "2 hours ago",
    status: "completed",
    thumbnail: "/api/placeholder/320/180",
    insights: 24,
  },
  {
    id: "analysis-2",
    title: "Diamond Lobby — Kings Canyon",
    game: "Apex Legends",
    duration: "18:42",
    uploadedAt: "5 hours ago",
    status: "completed",
    thumbnail: "/api/placeholder/320/180",
    insights: 17,
  },
  {
    id: "analysis-3",
    title: "Tournament Scrim — Bind",
    game: "Valorant",
    duration: "45:03",
    uploadedAt: "1 day ago",
    status: "completed",
    thumbnail: "/api/placeholder/320/180",
    insights: 38,
  },
  {
    id: "analysis-4",
    title: "Solo Queue — Dust 2",
    game: "CS2",
    duration: "27:55",
    uploadedAt: "Just now",
    status: "processing",
    thumbnail: "/api/placeholder/320/180",
    insights: 0,
  },
];

export const sampleTimelineEvents: TimelineEvent[] = [
  { id: "e1", time: 12, duration: 3, type: "kill", label: "Double Kill", description: "Eliminated 2 enemies with rifle spray", severity: "success" },
  { id: "e2", time: 28, duration: 2, type: "rotation", label: "Late Rotation", description: "Rotated to B site 4s late — zone already closing", severity: "warning" },
  { id: "e3", time: 45, duration: 5, type: "objective", label: "Plant", description: "Bomb planted at A site", severity: "info" },
  { id: "e4", time: 67, duration: 1, type: "death", label: "Overextended", description: "Pushed too far without utility — caught in crossfire", severity: "danger" },
  { id: "e5", time: 89, duration: 4, type: "highlight", label: "Clutch Attempt", description: "1v3 clutch situation — good crosshair placement", severity: "success" },
  { id: "e6", time: 105, duration: 2, type: "mistake", label: "Bad Utility", description: "Flash thrown too early — no follow-up possible", severity: "warning" },
  { id: "e7", time: 130, duration: 3, type: "kill", label: "Ace", description: "5 eliminations in succession", severity: "success" },
  { id: "e8", time: 155, duration: 2, type: "rotation", label: "Smart Rotate", description: "Early rotation based on info — gained map control", severity: "success" },
  { id: "e9", time: 178, duration: 1, type: "mistake", label: "Economy Error", description: "Full buy when team was on eco — broke economy sync", severity: "danger" },
  { id: "e10", time: 200, duration: 4, type: "highlight", label: "1v2 Clutch", description: "Won 1v2 with perfect positioning and timing", severity: "success" },
];

export const sampleInsights: AIInsight[] = [
  {
    id: "i1", timestamp: 12, type: "mechanical",
    title: "Excellent Spray Control",
    description: "Your crosshair placement and recoil control during this double kill was textbook. The pre-aim on the second target shows strong game sense.",
    severity: "positive", confidence: 0.94,
  },
  {
    id: "i2", timestamp: 28, type: "rotation",
    title: "Late Rotation Detected",
    description: "You rotated to B site 4 seconds after the optimal window. The minimap showed enemies at B 6 seconds before your rotation. Consider watching minimap more actively.",
    severity: "warning", confidence: 0.87,
  },
  {
    id: "i3", timestamp: 67, type: "positioning",
    title: "Overextension — High Risk Position",
    description: "You pushed past the safe line without utility support. This position exposes you to 3 angles simultaneously. Recommendation: hold the corner and wait for teammate utility.",
    severity: "critical", confidence: 0.91,
  },
  {
    id: "i4", timestamp: 89, type: "strategy",
    title: "Strong Clutch Decision-Making",
    description: "In this 1v3, your decision to isolate fights by playing time was optimal. You correctly identified the weakest angle and exploited it.",
    severity: "positive", confidence: 0.88,
  },
  {
    id: "i5", timestamp: 105, type: "timing",
    title: "Utility Timing Off",
    description: "The flash was thrown 1.2s too early. By the time you peeked, the flash effect had already faded for the enemy. Ideal timing: throw flash 0.3-0.5s before peeking.",
    severity: "warning", confidence: 0.85,
  },
  {
    id: "i6", timestamp: 155, type: "rotation",
    title: "Perfect Info-Based Rotation",
    description: "Excellent read of the minimap. You rotated 3 seconds before the enemy push, giving your team the advantage. This is a high-IQ play.",
    severity: "positive", confidence: 0.92,
  },
];

export const sampleTrackingPaths: TrackingPath[] = [
  {
    playerId: 1, color: "#3b82f6",
    points: [
      { x: 0.1, y: 0.8, time: 0 }, { x: 0.15, y: 0.7, time: 2 }, { x: 0.2, y: 0.6, time: 4 },
      { x: 0.3, y: 0.5, time: 6 }, { x: 0.4, y: 0.45, time: 8 }, { x: 0.5, y: 0.4, time: 10 },
    ],
  },
  {
    playerId: 2, color: "#f43f5e",
    points: [
      { x: 0.9, y: 0.2, time: 0 }, { x: 0.85, y: 0.3, time: 2 }, { x: 0.75, y: 0.35, time: 4 },
      { x: 0.65, y: 0.4, time: 6 }, { x: 0.55, y: 0.42, time: 8 }, { x: 0.5, y: 0.45, time: 10 },
    ],
  },
  {
    playerId: 3, color: "#22c55e",
    points: [
      { x: 0.2, y: 0.2, time: 0 }, { x: 0.25, y: 0.25, time: 2 }, { x: 0.3, y: 0.35, time: 4 },
      { x: 0.35, y: 0.45, time: 6 }, { x: 0.4, y: 0.5, time: 8 }, { x: 0.45, y: 0.55, time: 10 },
    ],
  },
];

export const sampleHeatmapData: HeatmapPoint[] = Array.from({ length: 200 }, () => ({
  x: Math.random(),
  y: Math.random(),
  intensity: Math.random(),
}));

export const sampleDetections: DetectedObject[] = [
  { id: "d1", label: "Player", x: 0.35, y: 0.4, width: 0.06, height: 0.15, confidence: 0.95, trackId: 1 },
  { id: "d2", label: "Player", x: 0.65, y: 0.35, width: 0.05, height: 0.14, confidence: 0.91, trackId: 2 },
  { id: "d3", label: "Player", x: 0.48, y: 0.55, width: 0.055, height: 0.13, confidence: 0.88, trackId: 3 },
  { id: "d4", label: "Weapon", x: 0.38, y: 0.48, width: 0.04, height: 0.03, confidence: 0.82 },
];
