import { TimelineEvent } from "@/lib/data";
import { Crosshair, ShieldAlert, Target, AlertTriangle, Zap, RotateCcw } from "lucide-react";

interface SmartTimelineProps {
  currentTime: number;
  duration: number;
  events: TimelineEvent[];
  onSeek: (time: number) => void;
}

export function SmartTimeline({ currentTime, duration, events, onSeek }: SmartTimelineProps) {
  
  const getSeverityColor = (severity: TimelineEvent["severity"]) => {
    switch (severity) {
      case "success": return "bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]";
      case "danger": return "bg-danger shadow-[0_0_10px_rgba(244,63,94,0.5)]";
      case "warning": return "bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]";
      default: return "bg-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]";
    }
  };

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "kill": return <Crosshair className="w-3 h-3 text-white" />;
      case "death": return <ShieldAlert className="w-3 h-3 text-white" />;
      case "objective": return <Target className="w-3 h-3 text-white" />;
      case "mistake": return <AlertTriangle className="w-3 h-3 text-white" />;
      case "highlight": return <Zap className="w-3 h-3 text-white" />;
      case "rotation": return <RotateCcw className="w-3 h-3 text-white" />;
    }
  };

  return (
    <div className="flex-1 relative flex flex-col justify-center select-none pt-4">
      {/* Playhead Indicator Line */}
      <div 
        className="absolute top-0 bottom-0 w-px bg-white z-20 pointer-events-none before:content-[''] before:absolute before:top-0 before:-left-1.5 before:w-3 before:h-3 before:bg-white before:rounded-sm"
        style={{ left: `${(currentTime / duration) * 100}%` }}
      />

      <div 
         className="timeline-track relative"
         onClick={(e) => {
           const rect = e.currentTarget.getBoundingClientRect();
           const pos = (e.clientX - rect.left) / rect.width;
           onSeek(pos * duration);
         }}
      >
        {/* Track Background Grid */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-white/5 h-full opacity-50" />
          ))}
        </div>

        {/* Events */}
        {events.map((event) => (
          <div
            key={event.id}
            className={`timeline-event group ${getSeverityColor(event.severity)}`}
            style={{ 
              left: `${(event.time / duration) * 100}%`,
              width: `${Math.max(0.5, (event.duration / duration) * 100)}%`
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSeek(event.time);
            }}
          >
            {/* Tooltip on hover */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 flex items-center gap-2 border border-white/10 shadow-xl">
               <div className={`flex items-center justify-center w-5 h-5 rounded-full ${getSeverityColor(event.severity)}`}>
                 {getEventIcon(event.type)}
               </div>
               <div>
                 <p className="font-bold">{event.label}</p>
                 <p className="text-white/70 text-[10px]">{event.description}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Time axis labels */}
      <div className="flex justify-between mt-2 text-[10px] font-mono text-foreground/40">
        <span>0:00</span>
        <span>2:00</span>
        <span>4:00</span>
        <span>6:00</span>
        <span>8:00</span>
      </div>
    </div>
  );
}
