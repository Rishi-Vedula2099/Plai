import { sampleHeatmapData } from "@/lib/data";

export function HeatmapView() {
  return (
    <div className="heatmap-overlay">
      {sampleHeatmapData.map((point, i) => {
        // Red color for high intensity, blue for low
        const r = Math.floor(point.intensity * 255);
        const b = Math.floor((1 - point.intensity) * 255);
        
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${point.x * 100}%`,
              top: `${point.y * 100}%`,
              width: `${(point.intensity * 40) + 20}px`,
              height: `${(point.intensity * 40) + 20}px`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(${r},0,${b},${point.intensity * 0.8}) 0%, rgba(${r},0,${b},0) 70%)`,
              filter: "blur(5px)",
            }}
          />
        );
      })}
    </div>
  );
}
