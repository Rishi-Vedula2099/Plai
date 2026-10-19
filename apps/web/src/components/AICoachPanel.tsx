import { AIInsight } from "@/lib/data";
import { BrainCircuit, AlertTriangle, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

interface AICoachPanelProps {
  insights: AIInsight[];
  currentTime: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AICoachPanel({ insights, currentTime, selectedId, onSelect }: AICoachPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to selected insight
  useEffect(() => {
    if (selectedId && panelRef.current) {
      const el = document.getElementById(`insight-${selectedId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedId]);

  const getSeverityIcon = (severity: AIInsight["severity"]) => {
    switch (severity) {
      case "positive": return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "critical": return <AlertTriangle className="w-5 h-5 text-danger" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-warning" />;
      default: return <BrainCircuit className="w-5 h-5 text-accent" />;
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-3" ref={panelRef}>
      {insights.map((insight) => {
        const isSelected = selectedId === insight.id;
        const isPast = currentTime > insight.timestamp + 5;
        
        return (
          <div 
            key={insight.id}
            id={`insight-${insight.id}`}
            onClick={() => onSelect(insight.id)}
            className={`
              relative p-4 rounded-xl cursor-pointer transition-all duration-300 border
              ${isSelected 
                ? "bg-surface-2 border-accent shadow-[0_0_20px_rgba(59,130,246,0.1)] scale-[1.02]" 
                : "bg-surface-1 border-white/5 hover:border-white/20 hover:bg-surface-2"}
              ${isPast && !isSelected ? "opacity-60" : "opacity-100"}
            `}
          >
            {/* Type badge attached to top right */}
            <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-xl bg-surface-3 px-2 py-1 text-[10px] font-semibold text-foreground/50 border-b border-l border-white/5 flex items-center gap-1">
               <Clock className="w-3 h-3" />
               {formatTime(insight.timestamp)}
            </div>

            <div className="flex gap-3 mt-1">
              <div className="shrink-0 mt-0.5">
                {getSeverityIcon(insight.severity)}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm ${isSelected ? "text-accent-light" : "text-foreground"}`}>
                   {insight.title}
                </h4>
                
                {/* Expanded content */}
                <div className={`mt-2 text-sm text-foreground/70 leading-relaxed overflow-hidden transition-all duration-300 ${isSelected ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p>{insight.description}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono bg-black/40 px-2 py-1 rounded text-white/50">
                      AI Confidence: {Math.round(insight.confidence * 100)}%
                    </span>
                    <button className="text-accent hover:text-accent-light text-xs font-semibold flex items-center gap-1">
                      Play sequence <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Empty space at bottom for scrolling */}
      <div className="h-20" />
    </div>
  );
}
