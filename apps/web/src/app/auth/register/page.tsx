"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen flex text-foreground bg-background">
      
      {/* Left side cover */}
      <div className="hidden lg:flex flex-1 relative bg-surface-1 overflow-hidden">
        <div className="absolute inset-0 bg-accent/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-0 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-end p-12 pt-24 w-full h-full">
           <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 transition-colors">
             <ArrowLeft className="w-4 h-4" /> Back to Home
           </Link>
           <h2 className="text-4xl font-bold tracking-tight mb-4">Level Up Your Game.</h2>
           <p className="text-xl text-white/60 max-w-md mb-8">
             Stop guessing what went wrong. Let AI analyze your gameplay.
           </p>
           
           <div className="glass p-4 rounded-xl border border-white/10 shadow-2xl max-w-sm">
             <div className="flex gap-3">
               <div className="w-10 h-10 rounded-full bg-accent/20 flex flex-shrink-0 items-center justify-center">
                 <span className="text-accent text-xl">🚀</span>
               </div>
               <div>
                  <h4 className="font-semibold text-sm">Automated Highlights</h4>
                  <p className="text-xs text-white/50 mt-1">We automatically generate highlight reels from your matches.</p>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-32 relative">
        <div className="absolute lg:hidden top-8 left-8">
           <Link href="/" className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
             <ArrowLeft className="w-4 h-4" /> Home
           </Link>
        </div>
        
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create an Account</h1>
            <p className="text-foreground/60">Join Plai and start improving today.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground/80">Username</label>
              <input 
                type="text" 
                placeholder="display_name" 
                className="w-full bg-surface-1 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground/80">Email</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full bg-surface-1 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground/80">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-surface-1 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                required
                minLength={8}
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2.5 px-4 bg-accent hover:bg-accent-light text-white rounded-lg font-semibold transition-colors mt-6 glow-accent"
            >
              Start Free Trial
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-foreground/60">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent hover:text-accent-light font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
