"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { SmartTimeline } from "@/components/SmartTimeline";
import { AICoachPanel } from "@/components/AICoachPanel";
import { HeatmapView } from "@/components/HeatmapView";
import { ArrowLeft, Share2, Download, Settings, LayoutPanelLeft } from "lucide-react";
import Link from "next/link";
import { sampleAnalyses, sampleTimelineEvents, sampleInsights, sampleDetections, sampleTrackingPaths } from "@/lib/data";

export default function AIFilmRoom({ params }: { params: { id: string } }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showOverlays, setShowOverlays] = useState(true);
  const [selectedInsightId, setSelectedInsightId] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const analysis = sampleAnalyses[0]; // Mocking data for now

  // Handle timeline clicks
  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Sync with AI insights
  useEffect(() => {
    // Automatically select the active insight based on current time
    const activeInsight = sampleInsights.find(
      (insight) => Math.abs(insight.timestamp - currentTime) < 2
    );
    
    if (activeInsight && !selectedInsightId) {
      setSelectedInsightId(activeInsight.id);
    }
  }, [currentTime, selectedInsightId]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Top Bar - Minimal */}
      <header className="h-14 border-b border-white/5 glass-subtle flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-md transition-colors text-foreground/70 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <h1 className="font-semibold text-sm tracking-tight">{analysis.title}</h1>
            <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-foreground/60">
              {analysis.game} | {analysis.duration}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={() => setShowHeatmap(!showHeatmap)}
             className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
               showHeatmap ? "bg-accent/20 border-accent/30 text-accent-light" : "bg-transparent border-white/10 hover:bg-white/5"
             }`}
           >
             Heatmap
           </button>
           <button 
             onClick={() => setShowOverlays(!showOverlays)}
             className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
               showOverlays ? "bg-accent/20 border-accent/30 text-accent-light" : "bg-transparent border-white/10 hover:bg-white/5"
             }`}
           >
             AI Overlays
           </button>
           <div className="w-px h-6 bg-white/10 mx-2"></div>
           <button className="p-2 hover:bg-white/5 rounded-md text-foreground/70 transition-colors">
             <Share2 className="w-4 h-4" />
           </button>
           <button className="p-2 hover:bg-white/5 rounded-md text-foreground/70 transition-colors">
             <Settings className="w-4 h-4" />
           </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Left/Center: Video Area + Timeline */}
        <div className="flex-1 flex flex-col relative z-10 min-w-0">
          
          {/* Video Container (occupies remaining space) */}
          <div className="flex-1 p-4 flex flex-col justify-center relative">
             <div className="w-full max-w-6xl mx-auto aspect-video relative rounded-xl border border-white/5 overflow-hidden shadow-2xl glass bg-black group video-container">
               
               {/* Actual Video Element */}
               <video 
                 ref={videoRef}
                 src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                 className="w-full h-full object-contain"
                 onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                 onPlay={() => setIsPlaying(true)}
                 onPause={() => setIsPlaying(false)}
                 muted
                 loop // for testing
               />
               
               {/* Controls overlays */}
               <VideoPlayer 
                 videoRef={videoRef}
                 isPlaying={isPlaying}
                 currentTime={currentTime}
                 duration={596} // BigBuckBunny is ~9:56 long
                 onPlayPause={() => {
                   if (videoRef.current?.paused) videoRef.current.play();
                   else videoRef.current?.pause();
                 }}
               />

               {/* AI Overlays Layer */}
               {showOverlays && (
                 <div className="absolute inset-0 pointer-events-none z-10 w-[90%] left-[5%] my-auto" style={{ aspectRatio: '16/9' }}>
                    {/* Mock Detections */}
                    {sampleDetections.map(det => (
                       <div 
                         key={det.id}
                         className={`absolute border-2 ${det.label === 'Enemy' ? 'border-danger bg-danger/10' : 'border-success bg-success/10'}`}
                         style={{
                           left: `${det.x * 100}%`,
                           top: `${det.y * 100}%`,
                           width: `${det.width * 100}%`,
                           height: `${det.height * 100}%`,
                           opacity: Math.random() > 0.3 ? 1 : 0.4, // Flicker effect for testing
                           transition: 'all 0.1s linear'
                         }}
                       >
                         <div className={`absolute -top-5 left-[-2px] text-[10px] font-bold px-1 py-0.5 whitespace-nowrap ${
                           det.label === 'Enemy' ? 'bg-danger text-white' : 'bg-success text-black'
                         }`}>
                           {det.label} {Math.round(det.confidence * 100)}%
                         </div>
                       </div>
                    ))}
                    
                    {/* Mock Trajectories/Lines */}
                    <svg className="absolute inset-0 w-full h-full" overflow="visible">
                       {sampleTrackingPaths.map((path, i) => (
                         <path 
                           key={i}
                           d={`M ${path.points[0].x * 100}% ${path.points[0].y * 100}% ${
                             path.points.slice(1).map(p => `L ${p.x * 100}% ${p.y * 100}%`).join(' ')
                           }`}
                           fill="none"
                           stroke={path.color}
                           strokeWidth="2"
                           strokeDasharray="4 4"
                           className="opacity-70 animate-[dash_1s_linear_infinite]"
                         />
                       ))}
                    </svg>
                 </div>
               )}

               {/* Heatmap Layer */}
               {showHeatmap && <HeatmapView />}
             </div>
          </div>

          {/* Timeline Area */}
          <div className="h-48 border-t border-white/5 bg-surface-0/80 backdrop-blur-md p-4 shrink-0 flex flex-col">
            <div className="flex justify-between items-center mb-2">
               <h3 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                 <LayoutPanelLeft className="w-4 h-4" />
                 Event Timeline
               </h3>
               <span className="text-xs font-mono text-accent">
                 {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} 
                 <span className="text-foreground/40 mx-1">/</span> 
                 09:56
               </span>
            </div>
            
            <SmartTimeline 
              currentTime={currentTime} 
              duration={596} 
              events={sampleTimelineEvents} 
              onSeek={handleSeek} 
            />
          </div>

        </div>

        {/* Right Sidebar: AI Coach Notes */}
        <div className="w-[380px] border-l border-white/5 bg-surface-1/50 backdrop-blur-md flex flex-col shrink-0 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
           <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                 </span>
                 AI Coach Notes
              </h2>
           </div>
           
           <div className="overflow-y-auto flex-1 p-4 space-y-4">
              <AICoachPanel 
                 insights={sampleInsights} 
                 currentTime={currentTime} 
                 selectedId={selectedInsightId}
                 onSelect={(id: string) => {
                   setSelectedInsightId(id);
                   const insight = sampleInsights.find(i => i.id === id);
                   if (insight) handleSeek(insight.timestamp);
                 }}
              />
           </div>
           
           <div className="p-4 border-t border-white/5 bg-surface-0">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="Ask AI coach about this clip..." 
                 className="w-full bg-surface-2 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-foreground/30"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-accent text-white rounded-md hover:bg-accent-light transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </button>
             </div>
           </div>
        </div>

      </main>
    </div>
  );
}
