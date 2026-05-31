import React, { useEffect, useState } from "react";
import { Project } from "@/entities/Project";
import { base44 } from "@/api/base44Client";
import ToolShell from "@/components/common/ToolShell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button as UIButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { 
  Target, 
  DollarSign, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Filter, 
  MoreVertical,
  Lightbulb,
  ArrowRight,
  Loader2,
  MoreHorizontal,
  MessageSquare,
  Globe,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  Brain,
  Fingerprint,
  Search,
  Zap,
  MapPin,
  Database,
  Layers
} from "lucide-react";

export default function MarketProductFit() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("discovery");
  const [loadingProjects, setLoadingProjects] = useState(true);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        if (Project && typeof Project.list === 'function') {
          const p = await Project.list("-created_date");
          setProjects(p || []);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    loadProjects();

    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get("tool");
    if (t) setActive(t);
  }, []);

  const renderDiscoveryResult = (res) => (
    <div className="space-y-8 animate-fade-in text-left">
        {/* Top Opportunities Grid */}
        <div className="grid md:grid-cols-3 gap-6">
            {(res.top_opportunities || []).map((m, i) => (
                <Card key={i} className="glass-card border-none rounded-[24px] overflow-hidden group hover:translate-y-[-4px] transition-all">
                    <div className="p-6 bg-surface-container border-b border-outline-variant/20 flex justify-between items-center text-left">
                        <Badge className="bg-primary-container text-primary border-none text-[9px] font-black uppercase tracking-widest">RANK 0{i+1}</Badge>
                        <TrendingUp size={14} className="text-primary opacity-50" />
                    </div>
                    <div className="p-8 space-y-4 text-left">
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
                { label: "Growth Rate", val: res.kpis?.growth_rate, icon: Zap },
                { label: "Total Reach", val: res.kpis?.total_reach, icon: Users },
                { label: "Avg CPA", val: res.kpis?.avg_cpa, icon: Target },
            ].map((k, i) => (
                <div key={i} className="bg-white/50 border border-outline-variant/30 p-6 rounded-2xl flex items-center gap-4 text-left">
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
            <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center text-left">
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
                        {(res.full_data || []).map((m, i) => (
                            <TableRow key={i} className="hover:bg-surface-container-low transition-colors group">
                                <TableCell className="font-bold pl-8 uppercase text-xs flex items-center gap-3 py-5 text-left">
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
        <Card className="p-8 rounded-[24px] bg-primary-container/20 border border-primary/20 relative overflow-hidden group text-left">
            <Database size={120} className="absolute -right-8 -bottom-8 text-primary opacity-5 group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-3 mb-6">
                <Cpu size={20} className="text-primary" />
                <h4 className="text-lg font-black text-primary uppercase tracking-widest">AI Geographic Breakdown</h4>
            </div>
            <div className="space-y-4 relative z-10">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Detailed Region → Country → State → City Hierarchy</p>
                <p className="text-sm font-bold text-on-primary-container leading-relaxed whitespace-pre-line italic">
                    "{res.breakdown}"
                </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-primary/10 relative z-10">
                <div className="flex-1 w-full space-y-1">
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest">Localized Deep Research Focus</p>
                    <Input placeholder="e.g. Nigeria, Southeast Asia, Texas USA" className="bg-white/50 border-primary/20 h-10 text-xs font-bold" />
                </div>
                <UIButton className="bg-primary text-white font-black text-[10px] tracking-widest h-10 px-6 rounded-xl uppercase shadow-lg hover:translate-y-[-2px] transition-all">
                    Initialize Deep Research <ArrowRight size={14} className="ml-2" />
                </UIButton>
            </div>
        </Card>
    </div>
  );

  const renderPersonaResults = (res) => (
    <div className="space-y-10 animate-fade-in text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
          {/* Dynamic Persona Cards */}
          {(res.personas || []).map((persona, i) => (
              <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="lg:col-span-4 glass-card rounded-[24px] overflow-hidden group hover:border-primary/50 flex flex-col"
              >
                  <div className="h-48 relative overflow-hidden bg-surface-container-high">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <Users size={64} className="text-primary opacity-10 group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="absolute bottom-5 left-6 z-20 text-left">
                          <h3 className="text-2xl font-bold text-white tracking-tight uppercase">{persona.name}</h3>
                          <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">{persona.archetype_label || "TARGET SEGMENT"}</p>
                      </div>
                      <div className="absolute top-4 right-4 bg-primary-container text-primary px-2.5 py-1 rounded-lg font-black text-[10px] flex items-center gap-1.5 shadow-lg border border-primary/20 z-20">
                          <CheckCircle2 size={12} className="fill-primary text-white" /> {persona.fit_score || 0} FIT
                      </div>
                  </div>
                  <div className="p-8 space-y-8 flex-1 flex flex-col text-left">
                      <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1 text-left">
                                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Demographics</p>
                                  <p className="text-xs font-bold text-on-surface">{persona.demographics}</p>
                              </div>
                              <div className="space-y-1 text-right">
                                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Behavior</p>
                                  <p className="text-xs font-bold text-primary uppercase tracking-tighter">{persona.behavior_type}</p>
                              </div>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-outline-variant/20 text-left">
                              <h4 className="text-[10px] font-black text-on-surface-variant tracking-[0.15em] uppercase text-left">Core Challenges</h4>
                              <div className="flex flex-wrap gap-2">
                                  {(persona.challenges || []).map(t => (
                                      <span key={t} className="bg-surface-container-high px-3 py-1.5 rounded-lg text-[10px] font-bold text-on-surface uppercase tracking-wide border border-outline-variant/20">{t}</span>
                                  ))}
                              </div>
                          </div>
                          <div className="space-y-4 text-left">
                              <h4 className="text-[10px] font-black text-on-surface-variant tracking-[0.15em] uppercase flex items-center gap-2 text-left">
                                  <Brain size={12} /> Interests
                              </h4>
                              <p className="text-xs font-medium text-on-surface-variant leading-relaxed italic">
                                  {persona.interests}
                              </p>
                          </div>
                      </div>
                      <div className="mt-auto pt-8">
                        <UIButton variant="outline" className="w-full h-12 border-outline-variant hover:bg-surface-container font-black text-[10px] tracking-[0.1em] uppercase rounded-xl">DEEP DIVE REPORT</UIButton>
                      </div>
                  </div>
              </motion.div>
          ))}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
              <Card className="glass-card p-8 rounded-[24px] flex-1 border-primary/5 text-left">
                  <h4 className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-8 border-b border-outline-variant/30 pb-2 text-left">Market Fit Insights</h4>
                  <div className="space-y-6 text-left">
                      {(res.personas || []).map((s, i) => (
                          <div key={i} className="space-y-3 text-left">
                              <div className="flex justify-between items-center text-left">
                                  <span className="text-[10px] font-black text-on-surface-variant tracking-widest uppercase">{s.name} CLASS</span>
                                  <span className="text-primary font-black text-sm">{s.fit_score}% FIT</span>
                              </div>
                              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden text-left">
                                  <div className="h-full bg-primary text-left" style={{ width: `${s.fit_score}%` }} />
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="mt-10 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 text-left">
                      <h5 className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Behavioral Synthesis</h5>
                      <p className="text-xs font-medium text-on-surface-variant leading-relaxed italic">
                          "The aggregate data indicates a high preference for local infrastructure stability and price transparency across all segments."
                      </p>
                  </div>
              </Card>
              <div className="bg-primary-container/40 p-8 rounded-[24px] border border-primary/20 relative overflow-hidden group text-left">
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                      <Fingerprint size={160} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-black text-primary mb-4 tracking-tight uppercase tracking-wider text-left">AI Recommendation</h4>
                  <p className="text-on-primary-container font-bold text-sm leading-relaxed mb-6 italic text-left">
                      "{res.synthesis_recommendation || "Synthesis complete. Market alignment verified."}"
                  </p>
                  <UIButton className="bg-primary text-white font-black text-[10px] tracking-widest px-6 h-11 rounded-xl shadow-lg hover:translate-y-[-2px] transition-all uppercase">
                      APPLY LOGIC <ArrowRight size={14} className="ml-2" />
                  </UIButton>
              </div>
          </div>
      </div>
    </div>
  );

  const renderStressTestResult = (res) => (
    <div className="space-y-8 animate-fade-in text-left">
        <div className="grid md:grid-cols-12 gap-8 text-left">
            <div className="md:col-span-7 space-y-8 text-left">
                <Card className="glass-card p-8 rounded-[24px] text-left">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-left">
                        <MessageSquare size={14} /> Market Survey Protocol
                    </h4>
                    <div className="space-y-4 text-left">
                        {(res.survey_questions || []).map((q, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 text-left">
                                <span className="font-black text-primary text-xs shrink-0">0{i+1}.</span>
                                <p className="text-sm font-bold text-on-surface leading-relaxed">{q}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="glass-card p-8 rounded-[24px] text-left">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-left">
                        <AlertTriangle size={14} /> Feature Confusion Detector
                    </h4>
                    <div className="space-y-6 text-left">
                        {(res.feature_confusion || []).map((f, i) => (
                            <div key={i} className="space-y-3 text-left">
                                <h5 className="text-sm font-black uppercase tracking-tight text-on-surface text-left">{f.feature_name}</h5>
                                <div className="grid grid-cols-1 gap-2 text-left">
                                    <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/10 text-xs text-left">
                                        <span className="font-bold text-destructive uppercase text-[9px] block mb-1 text-left">Issue</span>
                                        {f.issue}
                                    </div>
                                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-xs text-left">
                                        <span className="font-bold text-primary uppercase text-[9px] block mb-1 text-left">Localized Solution</span>
                                        {f.local_fix}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="md:col-span-5 space-y-6 text-left">
                <Card className="bg-primary-container/30 border border-primary/20 p-8 rounded-[24px] text-center relative overflow-hidden group text-left">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                        <Target size={160} className="text-primary" />
                    </div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 text-center">PERSONA FIT SCORE</p>
                    <div className="text-6xl font-black text-primary tracking-tighter mb-4 text-center">{res.fit_score}/100</div>
                    <div className="space-y-2 text-left">
                        {(res.fit_notes || []).map((note, i) => (
                            <div key={i} className="flex items-start gap-2 text-left bg-white/50 p-3 rounded-xl border border-primary/5 text-left">
                                <ArrowRight size={12} className="text-primary shrink-0 mt-1" />
                                <p className="text-[11px] font-bold text-on-primary-container leading-tight">{note}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="glass-card p-8 rounded-[24px] text-left">
                    <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-6 text-left border-b border-outline-variant/30 pb-2">Market-Specific Insights</h4>
                    <div className="space-y-5 text-left">
                        <div className="text-left">
                            <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Local Competitors</p>
                            <p className="text-sm font-bold text-left">{res.market_insights?.competitors}</p>
                        </div>
                        <div className="pt-4 border-t border-outline-variant/20 text-left">
                            <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Price Sensitivity</p>
                            <p className="text-sm font-bold text-primary text-left">{res.market_insights?.price_sensitivity}</p>
                        </div>
                        <div className="pt-4 border-t border-outline-variant/20 text-left">
                            <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Preferred Channels</p>
                            <p className="text-sm font-bold text-left">{res.market_insights?.channels}</p>
                        </div>
                        <div className="pt-4 border-t border-outline-variant/20 bg-destructive/5 -mx-8 px-8 py-4 text-left">
                            <p className="text-[9px] font-black text-destructive uppercase tracking-widest mb-2">Regulatory Protocols</p>
                            <p className="text-xs font-medium text-destructive leading-relaxed text-left italic">"{res.market_insights?.regulatory}"</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Workspace Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 text-left">
        <div className="max-w-2xl text-left">
          <Badge className="bg-primary-container text-primary font-bold px-3 py-1 rounded-full text-[10px] mb-4 uppercase tracking-widest border-none">
            WORKSPACE ACTIVE
          </Badge>
          <h1 className="text-4xl font-black text-on-surface leading-tight mb-3 tracking-tighter uppercase">
            Market & Fit <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg leading-relaxed">
            Validating global market alignment across diverse technical segments to ensure engineering rigor meets real-world user requirements.
          </p>
        </div>

        {/* Fit Score Card */}
        <div className="glass-card p-6 rounded-[24px] flex items-center gap-6 min-w-[300px] shadow-lg border-primary/10 text-left">
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-surface-container-highest" strokeWidth="3" />
              <motion.circle 
                cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3" 
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 12 }} // 88%
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-primary text-lg">88</span>
            </div>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-on-surface-variant mb-1 uppercase tracking-widest">FIT COEFFICIENT</p>
            <p className="text-2xl font-black text-on-surface tracking-tight uppercase">Optimized</p>
          </div>
        </div>
      </section>

      {/* Action Tabs */}
      <Tabs value={active} onValueChange={setActive} className="space-y-8 text-left">
        <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/30 pb-4 text-left">
          <TabsList className="bg-transparent h-auto p-0 gap-2 text-left">
            {[
              { value: "discovery", label: "MARKET EXPLORER", icon: Search },
              { value: "stress", label: "STRESS TEST", icon: Target },
              { value: "pricing", label: "PRICING", icon: DollarSign },
              { value: "value", label: "VALUE OPT", icon: Sparkles },
              { value: "personas", label: "PERSONA BUILDER", icon: Users },
            ].map(tab => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="px-6 py-2.5 rounded-lg font-bold text-[10px] tracking-widest text-on-surface-variant data-[state=active]:bg-primary data-[state=active]:text-white shadow-none transition-all uppercase border border-transparent data-[state=active]:border-primary/20"
              >
                <tab.icon className="w-3.5 h-3.5 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="discovery" className="mt-0 outline-none text-left">
          {!loadingProjects ? (
            <ToolShell
                title="Market Opportunity Finder"
                description="Discover high-potential markets with AI-powered geographic analysis and infrastructure fit scores."
                category="market_fit"
                toolKey="market_discovery"
                projectOptions={projects}
                fields={[
                    { name: "scope", label: "Geographic Scope", type: "select", options: [
                        { label: "Neighborhood/District", value: "Neighborhood/District" },
                        { label: "City/LGA", value: "City/LGA" },
                        { label: "State/Province", value: "State/Province" },
                        { label: "Country", value: "Country" },
                        { label: "Region/Continent", value: "Region/Continent" },
                        { label: "Global", value: "Global" }
                    ]},
                    { name: "locations", label: "Target Locations (be specific!)", type: "text", placeholder: "e.g., Lagos Nigeria, Texas USA, Bavaria Germany, Bangalore Karnataka India" }
                ]}
                onRun={async (vals, pid) => {
                    const project = projects.find(p => p.id === pid);
                    const ctx = project ? (project.document_content || project.description || project.product_name) : "";
                    const res = await base44.integrations.Core.InvokeLLM({
                        prompt: `SYSTEM: You are the Tenax Geographic Intelligence Engine. Analyze global market opportunities for: ${ctx}. 
                        GEOGRAPHIC SCOPE: ${vals.scope}
                        TARGET LOCATIONS: ${vals.locations}
                        DEEP RESEARCH MODE: ENABLED (Include LGAs, districts, suburban areas, niche communities)

                        Generate a high-fidelity geographic synthesis:
                        1. top_opportunities: Array of 3 objects (name, audience, score, cpm).
                        2. kpis: growth_rate, total_reach, avg_cpa.
                        3. full_data: Array of 5 technical market records.
                        4. breakdown: A detailed Region → Country → State → City hierarchy text.`,
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
                    return res;
                }}
                renderResult={renderDiscoveryResult}
            />
          ) : (
            <div className="py-20 text-center glass-card rounded-[24px] border-dashed border-outline-variant flex flex-col items-center">
               <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
               <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Accessing Entity Vault...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="personas" className="mt-0 outline-none text-left">
          {!loadingProjects ? (
            <ToolShell
              title="Persona Builder"
              description="Generate detailed buyer personas with demographics, interests, behaviors, and market fit insights."
              category="market_fit"
              toolKey="persona_builder"
              projectOptions={projects}
              fields={[
                { name: "regions", label: "Target Regions (comma-separated)", type: "text", placeholder: "Nigeria, Kenya, Ghana, South Africa, Egypt" },
                { name: "focus", label: "Specific Location Focus", type: "text", placeholder: "e.g., Lagos Nigeria, Nairobi Kenya" }
              ]}
              onRun={async (vals, pid) => {
                const project = projects.find(p => p.id === pid);
                const ctx = project ? (project.document_content || project.description || project.product_name) : "";
                
                const res = await base44.integrations.Core.InvokeLLM({
                  prompt: `SYSTEM: You are the Tenax Persona Architect. Generate high-fidelity buyer personas with demographics, interests, behaviors, and market fit insights for: ${ctx}. 
                  TARGET REGIONS: ${vals.regions}
                  LOCATION FOCUS: ${vals.focus}

                  Provide 2 distinct personas. For each:
                  - name
                  - archetype_label (e.g. The Strategic Founder)
                  - fit_score (0-100)
                  - challenges: Array of 3 strings
                  - motivation: short quote
                  - demographics: short description
                  - interests: comma-separated list
                  - behavior_type: one word (e.g. Analytical, Risk-Averse, Visionary)

                  Include a 'synthesis_recommendation' for the segment.`,
                  response_json_schema: { 
                    type: "object", 
                    properties: { 
                      personas: { 
                        type: "array", 
                        items: { 
                          type: "object", 
                          properties: { 
                            name: { type: "string" },
                            archetype_label: { type: "string" },
                            fit_score: { type: "number" },
                            challenges: { type: "array", items: { type: "string" } },
                            motivation: { type: "string" },
                            demographics: { type: "string" },
                            interests: { type: "string" },
                            behavior_type: { type: "string" }
                          } 
                        } 
                      },
                      synthesis_recommendation: { type: "string" }
                    } 
                  }
                });
                return res;
              }}
              renderResult={renderPersonaResults}
            />
          ) : (
            <div className="py-20 text-center glass-card rounded-[24px] border-dashed border-outline-variant flex flex-col items-center">
               <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
               <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Accessing Entity Vault...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="stress" className="mt-0 outline-none text-left">
          {!loadingProjects ? (
            <ToolShell
              title="Market Strategy Stress Test"
              description="Rigorously validating product-market fit against localized variables, competition, and regulatory protocols."
              category="market_fit"
              toolKey="stress_test"
              projectOptions={projects}
              fields={[
                { name: "target_location", label: "Target Market Location", type: "text", placeholder: "e.g., Lagos Nigeria, Berlin Germany" }
              ]}
              onRun={async (vals, pid) => {
                const project = projects.find(p => p.id === pid);
                const ctx = project ? (project.document_content || project.description || project.product_name) : "";
                
                const res = await base44.integrations.Core.InvokeLLM({
                  prompt: `SYSTEM: You are the Tenax Strategy Simulator. Perform a high-fidelity MARKET STRATEGY STRESS TEST for a product launch in ${vals.target_location}.
                  
PRODUCT CONTEXT: ${ctx}

You must analyze cultural nuances, local infrastructure, competition, and regulations.

Generate:
1. survey_questions: 5-10 deep, non-obvious discovery questions for this specific market.
2. fit_score: 0-100 score for this market.
3. fit_notes: 3-5 specific bullet points explaining the fit reality (challenges vs opportunities).
4. feature_confusion: list of 3 potential technical or marketing misunderstandings and how to fix them locally.
5. local_adaptations: list of 3-5 mandatory changes (payments, language, marketing).
6. market_insights: object with: competitors (local list), price_sensitivity (Low/Med/High), channels (best local platforms), regulatory (key compliance notes).

Return JSON only. Focus on REAL strategic value, not load testing.`,
                  response_json_schema: { 
                    type: "object", 
                    properties: { 
                      survey_questions: { type: "array", items: { type: "string" } },
                      fit_score: { type: "number" },
                      fit_notes: { type: "array", items: { type: "string" } },
                      feature_confusion: { type: "array", items: { 
                          type: "object", 
                          properties: { feature_name: { type: "string" }, issue: { type: "string" }, local_fix: { type: "string" } } 
                      }},
                      local_adaptations: { type: "array", items: { type: "string" } },
                      market_insights: { 
                          type: "object", 
                          properties: { competitors: { type: "string" }, price_sensitivity: { type: "string" }, channels: { type: "string" }, regulatory: { type: "string" } } 
                      }
                    } 
                  }
                });
                return res;
              }}
              renderResult={renderStressTestResult}
            />
          ) : (
            <div className="py-20 text-center glass-card rounded-[24px] border-dashed border-outline-variant flex flex-col items-center">
               <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
               <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Accessing Entity Vault...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pricing" className="mt-0 outline-none text-left">
          {!loadingProjects ? (
            <ToolShell
              title="Pricing Synthesis"
              description="AI-driven unit economic analysis and global pricing strategy optimization."
              category="market_fit"
              toolKey="pricing_strategy"
              projectOptions={projects}
              fields={[
                { name: "current_price", label: "Base Price (USD)", type: "text", placeholder: "e.g. 29.00" },
                { name: "model", label: "Billing Model", type: "select", options: [
                    { label: "Subscription (SaaS)", value: "sub" },
                    { label: "One-time Purchase", value: "once" },
                    { label: "Usage-based", value: "usage" }
                ]}
              ]}
              onRun={async (vals, pid) => {
                const res = await base44.integrations.Core.InvokeLLM({
                  prompt: `Synthesize pricing strategy for project ${pid} with base price ${vals.current_price} and model ${vals.model}`,
                  response_json_schema: { type: "object", properties: { strategy: { type: "string" } } }
                });
                return res;
              }}
              renderResult={(res) => (
                <Card className="bg-surface-container-low border-outline-variant/30 p-6 rounded-2xl text-left">
                  <p className="text-sm font-medium leading-relaxed italic text-left">"{res?.strategy || "Pricing matrix calculated. Localized price adjustments recommended for emerging markets."}"</p>
                </Card>
              )}
            />
          ) : (
            <div className="py-20 text-center glass-card rounded-[24px] border-dashed border-outline-variant flex flex-col items-center text-center">
               <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
               <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Accessing Entity Vault...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="value" className="mt-0 outline-none text-left">
          {!loadingProjects ? (
            <ToolShell
              title="Value Optimization"
              description="Refining core value propositions to maximize relevance across technical buyer segments."
              category="market_fit"
              toolKey="value_prop_refiner"
              projectOptions={projects}
              fields={[
                { name: "competitor", label: "Primary Competitor", type: "text", placeholder: "e.g. AWS, Stripe, Vercel" },
                { name: "differentiator", label: "Unique Edge", type: "textarea", placeholder: "What makes your architecture unique?" }
              ]}
              onRun={async (vals, pid) => {
                const res = await base44.integrations.Core.InvokeLLM({
                  prompt: `Refine value prop for project ${pid} vs competitor ${vals.competitor}. Edge: ${vals.differentiator}`,
                  response_json_schema: { type: "object", properties: { refined_props: { type: "array", items: { type: "string" } } } }
                });
                return res;
              }}
              renderResult={(res) => (
                <div className="grid gap-4 text-left">
                  {(res?.refined_props || ["Prop 1", "Prop 2"]).map((p, i) => (
                    <Card key={i} className="bg-surface-container-low border-outline-variant/30 p-4 rounded-xl flex items-center gap-3 text-left">
                        <div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center text-[10px] font-black text-primary">0{i+1}</div>
                        <p className="text-sm font-bold text-left">{p}</p>
                    </Card>
                  ))}
                </div>
              )}
            />
          ) : (
            <div className="py-20 text-center glass-card rounded-[24px] border-dashed border-outline-variant flex flex-col items-center text-center">
               <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
               <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Accessing Entity Vault...</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
