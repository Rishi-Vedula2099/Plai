import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { sampleAnalyses } from "@/lib/data";
import { Play, Upload, Clock, Activity, CheckCircle2, AlertCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-foreground/60 mt-1">Review your recent gameplay analyses.</p>
          </div>
          
          <Link
            href="/upload"
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-md font-medium transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Video
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: "Total Matches Analyzed", value: "14", icon: <Play className="w-5 h-5 text-accent" /> },
             { label: "Insights Generated", value: "342", icon: <Activity className="w-5 h-5 text-purple" /> },
             { label: "Hours Processed", value: "12.5", icon: <Clock className="w-5 h-5 text-warning" /> },
             { label: "Win Rate Tracked", value: "54%", icon: <TrophyIcon className="w-5 h-5 text-success" /> },
           ].map((stat, i) => (
             <div key={i} className="glass p-5 rounded-xl border border-white/5 flex items-center gap-4">
               <div className="w-12 h-12 rounded-lg bg-surface-2 flex items-center justify-center">
                 {stat.icon}
               </div>
               <div>
                 <p className="text-foreground/60 text-sm font-medium">{stat.label}</p>
                 <p className="text-2xl font-bold">{stat.value}</p>
               </div>
             </div>
           ))}
        </div>

        {/* Recent Analyses Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Recent Analyses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleAnalyses.map((analysis) => (
              <Link 
                key={analysis.id} 
                href={analysis.status === 'completed' ? `/analysis/${analysis.id}` : '#'}
                className="group flex flex-col glass rounded-xl border border-white/5 overflow-hidden hover:border-accent/40 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-surface-2 overflow-hidden flex items-center justify-center">
                   {analysis.status === "processing" ? (
                      <div className="absolute inset-0 bg-surface-1 flex flex-col items-center justify-center gap-3">
                         <div className="w-8 h-8 relative">
                           <div className="absolute inset-0 rounded-full border-2 border-accent/20"></div>
                           <div className="absolute inset-0 rounded-full border-t-2 border-accent animate-spin"></div>
                         </div>
                         <span className="text-xs font-medium text-accent">Analyzing with AI...</span>
                      </div>
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <img src={analysis.thumbnail} alt={analysis.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-0 to-transparent"></div>
                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                          <Play className="w-5 h-5 text-white ml-1" />
                        </div>
                     </div>
                   )}
                   
                   {/* Badges inside thumbnail */}
                   <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                     {analysis.game}
                   </div>
                   <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-xs font-mono text-white">
                     {analysis.duration}
                   </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-accent transition-colors">
                      {analysis.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xs text-foreground/50">{analysis.uploadedAt}</span>
                    
                    {analysis.status === "completed" ? (
                       <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded bg-success/10 text-success">
                         <CheckCircle2 className="w-3.5 h-3.5" />
                         {analysis.insights} Insights
                       </span>
                    ) : (
                       <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded bg-warning/10 text-warning">
                         <AlertCircle className="w-3.5 h-3.5" />
                         Processing
                       </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7c0 6 3 10 3 10h6s3-4 3-10V2z" />
    </svg>
  )
}
