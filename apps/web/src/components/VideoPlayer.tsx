import { Play, Pause, Volume2, Maximize2, SkipBack, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
}

export function VideoPlayer({ videoRef, isPlaying, currentTime, duration, onPlayPause }: VideoPlayerProps) {
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div className="video-controls z-20">
      {/* Progress Bar */}
      <div 
        className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative group"
        onClick={handleProgressClick}
      >
        <div 
          className="absolute top-0 left-0 h-full bg-accent rounded-full pointer-events-none group-hover:bg-accent-light transition-colors"
          style={{ width: `${progressPercent}%` }}
        />
        {/* Playhead */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `${progressPercent}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onPlayPause} className="text-white hover:text-accent transition-colors">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button 
             onClick={() => { if(videoRef.current) videoRef.current.currentTime -= 5; }} 
             className="text-white/70 hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button 
             onClick={() => { if(videoRef.current) videoRef.current.currentTime += 5; }} 
             className="text-white/70 hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm font-mono text-white/80 ml-2">
            <span>{formatTime(currentTime)}</span>
            <span className="text-white/40">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-white transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => videoRef.current?.requestFullscreen()}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
