import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Rocket, PlayCircle, Terminal, Shield, Cpu, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left">
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Systems Architecture v4.0</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-on-surface leading-tight tracking-tighter"
            >
              Engineering high-fidelity product launches with <span className="text-primary italic">agentic precision.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-medium"
            >
              The first Product Launch OS built for technical founders. Replace guesswork with a fleet of specialized AI agents that architect your global market entry.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button size="lg" className="bg-primary-container text-primary hover:bg-primary-container/90 h-14 px-8 rounded-xl font-bold group shadow-md border border-primary/20" asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  Launch OS
                  <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl font-bold border-outline-variant hover:bg-surface-container-low transition-all">
                Watch Demo
                <PlayCircle className="ml-2" size={20} />
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-outline-variant/50"
            >
              <div>
                <div className="text-[10px] font-bold uppercase text-on-surface-variant mb-2 font-mono">Stability</div>
                <div className="text-2xl font-bold text-on-surface tracking-tighter">99.99%</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-on-surface-variant mb-2 font-mono">Simulations</div>
                <div className="text-2xl font-bold text-on-surface tracking-tighter">12M+</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-on-surface-variant mb-2 font-mono">Latency</div>
                <div className="text-2xl font-bold text-on-surface tracking-tighter">&lt;2ms</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-on-surface-variant mb-2 font-mono">Infrastructure</div>
                <div className="text-2xl font-bold text-on-surface tracking-tighter">Global</div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-xl border border-outline-variant p-8 md:p-10 rounded-[32px] soft-elevation relative z-10"
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    <Cpu size={40} className="text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary border-4 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase">Launch Architecture</h3>
                  <p className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Strategic Deployment Unit 01</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Specialized agents", val: "6" },
                  { label: "Strategic modules", val: "19" },
                  { label: "Core entities", val: "10" },
                  { label: "Simulation fidelity", val: "98%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-surface-container-lowest border border-outline-variant/50 p-6 rounded-2xl hover:border-primary/30 transition-all group text-left">
                    <div className="text-3xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-surface-container/50 rounded-xl flex items-center justify-between border border-outline-variant/30">
                <div className="flex items-center gap-3 text-left">
                  <Terminal size={18} className="text-primary" />
                  <span className="text-[10px] font-bold font-mono text-primary uppercase">system_status: stable</span>
                </div>
                <div className="h-1.5 w-24 bg-outline-variant rounded-full overflow-hidden text-left">
                  <motion.div 
                    animate={{ width: ["0%", "100%", "66%"] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-primary" 
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Decorations */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-surface-container-highest border border-outline-variant rounded-2xl rotate-12 -z-10 opacity-50 shadow-inner"></div>
            <div className="absolute top-20 -right-4 w-12 h-12 bg-primary-container rounded-lg -rotate-45 -z-10 shadow-sm border border-primary/20"></div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {[
          { title: "Market Research", desc: "Automated analysis of competitor landscape and regulatory requirements.", icon: Globe },
          { title: "Risk Simulation", desc: "High-fidelity 'what-if' scenarios to stress-test your launch strategy.", icon: Shield },
          { title: "Strategic Planning", desc: "Dynamic roadmaps that adapt to real-time market signals.", icon: Zap },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 bg-white/50 backdrop-blur-sm border border-outline-variant rounded-2xl hover:border-primary/30 transition-all shadow-sm"
          >
            <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-6 border border-primary/10">
              <f.icon className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">{f.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed font-medium">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
