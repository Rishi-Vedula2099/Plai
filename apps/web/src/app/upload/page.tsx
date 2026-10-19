import { Navbar } from "@/components/Navbar";
import { Upload as UploadIcon, FileVideo, AlertCircle } from "lucide-react";

export default function Upload() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl glass p-8 rounded-2xl border border-white/10 glow-accent relative overflow-hidden">
          {/* Decorative background blurs inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Gameplay</h1>
            <p className="text-foreground/60">Upload your game footage for AI analysis.</p>
          </div>

          <div className="relative z-10">
            <div className="border-2 border-dashed border-white/20 hover:border-accent/50 hover:bg-accent/5 transition-all rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer group bg-surface-1">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <UploadIcon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Drag and drop your video here</h3>
              <p className="text-sm text-foreground/50 mb-6">Supports MP4, MKV, AVI (Max 5GB)</p>
              
              <button className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
                Browse Files
              </button>
            </div>
            
            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-surface-2 border border-white/5 text-sm text-foreground/70">
              <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p>
                Our AI model supports CS2, Valorant, and Apex Legends. Make sure your HUD/UI is visible and not cropped for the best analysis results.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
