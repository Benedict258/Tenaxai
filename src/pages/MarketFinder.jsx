import React, { useState, useEffect } from "react";
import { Project } from "@/entities/Project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, 
  Target, 
  TrendingUp, 
  Search, 
  Cpu, 
  Filter, 
  MoreHorizontal, 
  ArrowRight, 
  Loader2, 
  DollarSign, 
  Users, 
  Zap, 
  AlertCircle,
  MapPin,
  ChevronRight,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/integrations/Core";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function MarketFinder() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scopes, setScopes] = useState(["Country"]);
  const [locationInput, setLocationInput] = useState("");
  const [deepMode, setDeepMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await Project.list("-created_date");
      setProjects(data || []);
      if (data && data.length > 0) setSelectedProject(data[0]);
    } catch (e) {
      console.error("Discovery error:", e);
    }
  };

  const runDiscovery = async () => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const productContext = selectedProject.document_content || selectedProject.description || selectedProject.product_name;
      const res = await InvokeLLM({
        prompt: `SYSTEM: You are the Tenax Geographic Intelligence Engine. Analyze global market opportunities for: ${productContext}. 
        SCOPES: ${scopes.join(", ")}
        SPECIFIC LOCATIONS: ${locationInput}
        DEEP RESEARCH: ${deepMode}

        Generate a high-fidelity market analysis with:
        1. top_opportunities: Array of 3 objects (name, audience, score, cpm).
        2. kpis: growth_rate, total_reach, avg_cpa.
        3. full_data: Array of 5-10 records for table.
        4. breakdown: text summary of hierarchy.`,
        response_json_schema: {
          type: "object",
          properties: {
            top_opportunities: { type: "array", items: { type: "object", properties: { name: { type: "string" }, audience: { type: "string" }, score: { type: "number" }, cpm: { type: "string" } } } },
            kpis: { type: "object", properties: { growth_rate: { type: "string" }, total_reach: { type: "string" }, avg_cpa: { type: "string" } } },
            full_data: { type: "array", items: { type: "object", properties: { name: { type: "string" }, score: { type: "number" }, audience: { type: "string" }, cpm: { type: "string" } } } },
            breakdown: { type: "string" }
          }
        }
      });
      setResults(res);
    } catch (e) {
      console.error("Discovery synthesis failed:", e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-12 pb-20 text-left animate-fade-in">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Badge className="bg-primary-container text-primary font-bold px-3 py-1 rounded-full text-[10px] mb-4 uppercase tracking-widest border-none shadow-sm">
            AI-POWERED DISCOVERY
          </Badge>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase mb-2">Market Opportunity Finder</h1>
          <p className="text-on-surface-variant font-medium text-lg">Discover high-potential markets with AI-powered geographic analysis.</p>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Control Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Project Selection */}
          <Card className="glass-card p-8 rounded-[24px]">
            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-6 border-b border-outline-variant/30 pb-2">Select Project</h4>
            <div className="space-y-6">
              <Select 
                value={selectedProject?.id || ""} 
                onValueChange={(id) => setSelectedProject(projects.find(p => p.id === id))}
              >
                <SelectTrigger className="bg-surface-container-low border-outline-variant/50 h-11 font-bold text-xs uppercase">
                  <SelectValue placeholder="CHOOSE INFRASTRUCTURE" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id} className="font-bold text-xs uppercase">{p.product_name || p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedProject && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <h5 className="text-sm font-black text-on-surface uppercase truncate max-w-[150px]">{selectedProject.product_name}</h5>
                        <Badge className="bg-primary-container text-primary text-[9px] font-black uppercase border-none">{selectedProject.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/10 text-[10px] font-bold text-on-surface-variant uppercase">
                        <div className="flex items-center gap-2"><DollarSign size={12} className="text-primary" /> ${selectedProject.target_budget?.toLocaleString()}</div>
                        <div className="flex items-center gap-2"><TrendingUp size={12} className="text-primary" /> {selectedProject.launch_date ? format(new Date(selectedProject.launch_date), "MMM d") : "TBD"}</div>
                    </div>
                </motion.div>
              )}
            </div>
          </Card>

          {/* Scopes & Filters */}
          <Card className="glass-card p-8 rounded-[24px]">
            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-8 border-b border-outline-variant/30 pb-2">Scopes & Filters</h4>
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Geographic Scope</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Neighborhood/District", "City/LGA", "State/Province", "Country", "Region/Continent", "Global"].map(s => (
                    <button 
                      key={s} 
                      onClick={() => setScopes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                      className={cn(
                        "px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border text-left",
                        scopes.includes(s) 
                          ? "bg-primary text-white border-primary shadow-md" 
                          : "bg-surface-container-high text-on-surface-variant border-transparent hover:border-outline-variant"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Target Locations (be specific!)</Label>
                <div className="space-y-2">
                    <Input 
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="e.g. Lagos Nigeria, Texas USA..."
                        className="bg-surface-container-low border-outline-variant/50 h-11 font-bold"
                    />
                    <p className="text-[9px] text-on-surface-variant font-medium leading-relaxed italic">
                        Include country, state, city, or even specific districts for granular research
                    </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-surface-container/30 rounded-xl border border-outline-variant/20">
                <Checkbox id="deep-mode" checked={deepMode} onCheckedChange={(v) => setDeepMode(!!v)} className="border-primary" />
                <div className="space-y-0.5">
                    <label htmlFor="deep-mode" className="text-[10px] font-bold text-on-surface uppercase tracking-widest cursor-pointer">Deep Research Mode</label>
                    <p className="text-[9px] text-on-surface-variant font-medium">Include LGAs, districts, suburban areas</p>
                </div>
              </div>

              <Button 
                onClick={runDiscovery} 
                disabled={loading || !selectedProject}
                className="w-full bg-primary text-white hover:bg-primary/90 h-14 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-[0.2em]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                Run AI Discovery
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Results Column */}
        <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
                {!results ? (
                    <motion.div key="priming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[600px] rounded-[32px] border-2 border-dashed border-outline-variant/50 bg-surface-container-low/20 flex flex-col items-center justify-center text-center p-12">
                        <div className="w-20 h-20 rounded-[24px] bg-surface-container-high flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 bg-primary/5 rounded-[24px] animate-pulse" />
                            <Search size={40} className="text-on-surface-variant opacity-30" />
                        </div>
                        <h3 className="text-xl font-black text-on-surface-variant uppercase tracking-[0.3em]">Discovery Protocol Idle</h3>
                        <p className="text-sm text-on-surface-variant mt-4 max-w-sm font-medium">Select parameters and initialize discovery cores to begin geographic synthesis.</p>
                    </motion.div>
                ) : (
                    <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        {/* Top Opportunities Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {(results.top_opportunities || []).map((m, i) => (
                                <Card key={i} className="glass-card border-none rounded-[24px] overflow-hidden group hover:translate-y-[-4px] transition-all">
                                    <div className="p-6 bg-surface-container border-b border-outline-variant/20 flex justify-between items-center">
                                        <Badge className="bg-primary-container text-primary border-none text-[9px] font-black uppercase tracking-widest">RANK 0{i+1}</Badge>
                                        <TrendingUp size={14} className="text-primary opacity-50" />
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <div className="space-y-1">
                                            <h4 className="text-lg font-black text-on-surface uppercase tracking-tight truncate">{m.name}</h4>
                                            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Audience: {m.audience}</p>
                                        </div>
                                        <div className="flex justify-between items-end pt-2">
                                            <div className="text-3xl font-black text-primary tracking-tighter">{m.score}<span className="text-xs">/100</span></div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Est. CPM</p>
                                                <p className="text-sm font-black text-on-surface">{m.cpm}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* KPI Widgets */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: "Growth Rate", val: results.kpis?.growth_rate, icon: Zap },
                                { label: "Total Reach", val: results.kpis?.total_reach, icon: Users },
                                { label: "Avg CPA", val: results.kpis?.avg_cpa, icon: Target },
                            ].map((k, i) => (
                                <div key={i} className="bg-white/50 border border-outline-variant/30 p-6 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                                        <k.icon size={18} className="text-on-surface-variant" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">{k.label}</p>
                                        <p className="text-xl font-black text-on-surface tracking-tighter">{k.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Market Analysis Table */}
                        <Card className="glass-card overflow-hidden rounded-[24px]">
                            <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center">
                                <h3 className="text-xl font-bold uppercase tracking-tight">Market Analysis Data</h3>
                                <div className="flex gap-2">
                                    <Badge className="bg-primary-container text-primary border-none text-[10px] font-bold">STABLE</Badge>
                                    <Badge className="bg-surface-container text-on-surface-variant border-none text-[10px] font-bold uppercase tracking-widest">ENTITY: GEOGRAPHIC</Badge>
                                </div>
                            </div>
                            <div className="p-0">
                                <Table>
                                    <TableHeader className="bg-surface-container/50">
                                        <TableRow>
                                            <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8 w-1/3">Country / Territory</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Opp Score</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Audience</TableHead>
                                            <TableHead className="text-[10px] font-black uppercase tracking-widest pr-8 text-right">Est. CPM</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(results.full_data || []).map((m, i) => (
                                            <TableRow key={i} className="hover:bg-surface-container-low transition-colors group">
                                                <TableCell className="font-bold pl-8 uppercase text-xs flex items-center gap-3 py-5">
                                                    <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-[9px] font-black text-primary border border-outline-variant/20">{i+1}</div>
                                                    {m.name}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge className={cn("border-none text-[10px] font-black", m.score >= 80 ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant")}>
                                                        {m.score}/100
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center font-bold text-sm tracking-tight">{m.audience}</TableCell>
                                                <TableCell className="text-right pr-8 font-black text-primary text-sm tracking-tight">{m.cpm}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>

                        {/* Geographic Breakdown */}
                        <Card className="p-8 rounded-[24px] bg-primary-container/20 border border-primary/20 relative overflow-hidden group">
                            <Database size={120} className="absolute -right-8 -bottom-8 text-primary opacity-5 group-hover:scale-110 transition-transform" />
                            <div className="flex items-center gap-3 mb-6">
                                <Cpu size={20} className="text-primary" />
                                <h4 className="text-lg font-black text-primary uppercase tracking-widest">AI Geographic Breakdown</h4>
                            </div>
                            <p className="text-sm font-bold text-on-primary-container leading-relaxed whitespace-pre-line relative z-10 italic">
                                "{results.breakdown}"
                            </p>
                            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-primary/10">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Ready for localized deep research:</p>
                                <Input placeholder="e.g. Lagos, Southeast Asia..." className="bg-white/50 border-primary/20 h-9 text-xs flex-1" />
                                <Button size="sm" className="bg-primary text-white font-black text-[10px] tracking-widest h-9 px-4 rounded-lg uppercase shadow-md">DEEP RESEARCH</Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
