import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  ArrowRight,
  Crosshair,
  BrainCircuit,
  Activity,
  Trophy,
  Play,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-accent blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-20 left-40 w-96 h-96 bg-purple blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <Navbar transparent />

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center space-y-8 max-w-4xl relative">
          {/* Badge */}
          <div className="inline-flex flex-col items-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-6 text-sm font-medium text-accent-light">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Plai Engine v2.0 Live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight pb-2">
              See the game <br className="hidden md:block" />
              <span className="gradient-text">beyond the game.</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Upload your gameplay. Let our AI analyze your positioning, 
            mechanics, and strategy to give you pro-level coaching insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg hover:bg-accent-light transition-all glow-accent flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Enter AI Film Room
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-lg glass font-semibold text-lg hover:bg-white/5 transition-all w-full sm:w-auto justify-center flex"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Hero Video / Mock UI */}
        <div className="mt-20 w-full max-w-5xl aspect-video rounded-xl border border-white/10 glass shadow-2xl relative overflow-hidden group animate-fade-in-up animate-float" style={{ animationDelay: "300ms" }}>
          <div className="absolute inset-0 bg-surface-1 flex items-center justify-center">
            <div className="absolute inset-0 grid-bg opacity-50" />
            
            {/* Mock Detections */}
            <div className="absolute top-[30%] left-[40%] w-[5%] h-[15%] border border-[#22c55e] bg-[#22c55e]/10 hidden group-hover:block">
              <div className="absolute -top-5 left-0 bg-[#22c55e] text-black text-[10px] font-bold px-1 rounded-sm">PLAYER 95%</div>
            </div>
            <div className="absolute top-[40%] left-[60%] w-[4%] h-[12%] border border-[#f43f5e] bg-[#f43f5e]/10 hidden group-hover:block">
              <div className="absolute -top-5 left-0 bg-[#f43f5e] text-black text-[10px] font-bold px-1 rounded-sm">ENEMY 88%</div>
            </div>

            {/* Mock Trajectory */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden group-hover:block" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 42 45 Q 50 60 62 46" fill="none" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="1 1" className="animate-[dash_2s_linear_infinite]" />
            </svg>

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center glow-accent">
                <Play className="w-8 h-8 text-accent ml-1" />
              </div>
              <p className="text-sm font-medium tracking-wide text-white/50 uppercase">Analysis Preview</p>
            </div>
            
            <div className="absolute top-4 left-4 right-4 flex justify-between">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-32 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <FeatureCard 
               icon={<Crosshair className="w-6 h-6 text-accent" />}
               title="Computer Vision"
               desc="YOLOv8-powered player tracking, object detection, and crosshair placement analysis."
             />
             <FeatureCard 
               icon={<BrainCircuit className="w-6 h-6 text-purple" />}
               title="AI Insights"
               desc="Context-aware coaching feedback on positioning, timing, and macro strategy."
             />
             <FeatureCard 
               icon={<Activity className="w-6 h-6 text-success" />}
               title="Heatmaps"
               desc="Visual representations of your map control, engagement zones, and danger areas."
             />
             <FeatureCard 
               icon={<Trophy className="w-6 h-6 text-warning" />}
               title="Highlight Generation"
               desc="Automatically extract kills, clutches, and key moments from long VODs."
             />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass p-6 rounded-xl hover:-translate-y-1 transition-transform cursor-default group border border-white/5 hover:border-white/10">
      <div className="w-12 h-12 rounded-lg bg-surface-2 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/60 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
