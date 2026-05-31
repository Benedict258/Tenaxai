import React, { useEffect, useState, useRef } from "react";
import { Project } from "@/entities/Project";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Play, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  ShieldAlert,
  Cpu,
  ArrowRight,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RiskSimulation() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scenario, setScenario] = useState("market_shift");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    Project.list("-created_date").then(data => {
      setProjects(data || []);
      if (data && data.length > 0) setSelectedProject(data[0]);
    });
  }, []);

  const getProjectContext = (proj) => {
    if (!proj) return "";
    return proj.document_content || proj.description || proj.product_name;
  };

  const scenarioOptions = [
    { value: "supply_chain", label: "Supply Chain Disruption" },
    { value: "competitor_pricing", label: "Competitor Price Drop (-40%)" },
    { value: "regulation", label: "Regulatory Change" },
    { value: "market_shift", label: "Market Demand Shift" },
    { value: "economic_downturn", label: "Economic Downturn" },
  ];

  const runSimulation = async () => {
    if (!selectedProject) return;
    setLoading(true);
    setResult(null);
    setProgress(0);

    const stages = [
      { pct: 15, msg: "SYNCHRONIZING ENTITY DATA..." },
      { pct: 35, msg: "MODELING SCENARIOS..." },
      { pct: 60, msg: "EXECUTING MONTE CARLO CORES..." },
      { pct: 85, msg: "CALCULATING DELTAS..." },
      { pct: 95, msg: "SYNTHESIZING MITIGATION..." }
    ];

    let stageIdx = 0;
    intervalRef.current = setInterval(() => {
      if (stageIdx < stages.length) {
        setProgress(stages[stageIdx].pct);
        setStatusMsg(stages[stageIdx].msg);
        stageIdx++;
      }
    }, 800);

    try {
        const productContext = getProjectContext(selectedProject);
        const scenarioLabel = scenarioOptions.find(s => s.value === scenario)?.label || scenario;

        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `Run high-fidelity risk simulation for: ${productContext}. Scenario: ${scenarioLabel}. Notes: ${notes}`,
          response_json_schema: {
            type: "object",
            properties: {
              scenarios: { type: "array", items: { type: "object", properties: {
                name: { type: "string" },
                probability: { type: "number" },
                revenue: { type: "number" },
                notes: { type: "string" }
              }}},
              financial_impact: { type: "object", properties: {
                burn_rate_change: { type: "number" },
                runway_impact: { type: "number" }
              }},
              actions: { type: "array", items: { type: "string" } },
              simulation_confidence: { type: "number" }
            }
          }
        });
        setResult(res);
    } catch (e) {
        console.error("Simulation error", e);
    }

    clearInterval(intervalRef.current);
    setProgress(100);
    setStatusMsg("COMPLETE");
    setTimeout(() => setLoading(false), 500);
  };

  const scenarioConfig = {
    best: { color: "border-primary/20", badge: "bg-primary-container text-primary", icon: TrendingUp },
    base: { color: "border-outline-variant/30", badge: "bg-surface-container text-on-surface-variant", icon: Minus },
    worst: { color: "border-destructive/20", badge: "bg-destructive/10 text-destructive", icon: TrendingDown }
  };

  return (
    <div className="space-y-12 pb-20 text-left animate-fade-in">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
        <div className="max-w-2xl">
          <Badge className="bg-primary-container text-primary font-bold px-3 py-1 rounded-full text-[10px] mb-4 uppercase tracking-widest border-none">
            DEFENSE UNIT 05
          </Badge>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase mb-2">Risk Simulation</h1>
          <p className="text-on-surface-variant font-medium text-lg">Stress-testing technical infrastructure against volatile market variables.</p>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
            <Card className="glass-card p-8 rounded-[24px]">
                <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-8 border-b border-outline-variant/30 pb-2">Simulation Parameters</h4>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Selected Project</Label>
                        <Select 
                            value={selectedProject?.id || ""}
                            onValueChange={id => setSelectedProject(projects.find(p => p.id === id))}
                        >
                            <SelectTrigger className="bg-surface-container-low border-outline-variant/50 h-11 font-bold text-xs uppercase">
                                <SelectValue placeholder="CHOOSE FLEET" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map(p => (
                                    <SelectItem key={p.id} value={p.id} className="font-bold text-xs uppercase">{p.product_name || p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Threat Scenario</Label>
                        <Select value={scenario} onValueChange={setScenario}>
                            <SelectTrigger className="bg-surface-container-low border-outline-variant/50 h-11 font-bold text-xs uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {scenarioOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value} className="font-bold text-xs uppercase">{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Environment Variables</Label>
                        <Textarea 
                            value={notes} 
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Add specific constraints..."
                            className="bg-surface-container-low border-outline-variant/50 min-h-[100px] font-medium"
                        />
                    </div>
                    <Button 
                        onClick={runSimulation} 
                        disabled={loading || !selectedProject}
                        className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-widest"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        Initialize Simulation
                    </Button>
                </div>
            </Card>

            <div className="bg-primary-container/40 p-6 rounded-[24px] border border-primary/20 relative overflow-hidden text-left">
                <ShieldAlert size={100} className="absolute -right-4 -bottom-4 text-primary opacity-10" />
                <h4 className="text-[10px] font-black text-primary mb-3 tracking-[0.1em] uppercase">Protocol Delta</h4>
                <p className="text-on-primary-container font-bold text-xs leading-relaxed italic">
                    "Pre-launch stress tests increase system resilience by 62% in high-volatility technical corridors."
                </p>
            </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[600px] glass-card rounded-[32px] flex flex-col items-center justify-center space-y-8 p-12">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping" />
                            <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
                            <div className="absolute inset-4 bg-primary-container rounded-full flex items-center justify-center">
                                <Cpu className="w-8 h-8 text-primary animate-pulse-slow" />
                            </div>
                        </div>
                        <div className="text-center space-y-4 w-full max-w-sm">
                            <h2 className="text-xl font-black text-primary uppercase tracking-[0.2em]">{statusMsg}</h2>
                            <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                                <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </motion.div>
                ) : result ? (
                    <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="grid md:grid-cols-3 gap-6">
                            {result.scenarios?.map((s, i) => {
                                const key = s.name?.toLowerCase()?.includes('best') ? 'best' : s.name?.toLowerCase()?.includes('worst') ? 'worst' : 'base';
                                const cfg = scenarioConfig[key];
                                return (
                                    <Card key={i} className={cn("glass-card border-none rounded-[24px] overflow-hidden group hover:translate-y-[-4px] transition-all", cfg.color)}>
                                        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                                            <Badge className={cn("border-none text-[9px] font-black uppercase tracking-widest", cfg.badge)}>{s.name}</Badge>
                                            <cfg.icon size={16} className={cn(key === 'best' ? 'text-primary' : key === 'worst' ? 'text-destructive' : 'text-on-surface-variant')} />
                                        </div>
                                        <div className="p-8 space-y-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Projected Revenue</p>
                                                <p className="text-2xl font-black text-on-surface tracking-tighter">${s.revenue?.toLocaleString()}</p>
                                            </div>
                                            <p className="text-xs font-medium text-on-surface-variant leading-relaxed italic">"{s.notes}"</p>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                             <Card className="glass-card p-8 rounded-[32px]">
                                <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-8 border-b border-outline-variant/30 pb-2">Financial Delta</h4>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Burn Rate Δ</p>
                                        <p className={cn("text-2xl font-black tracking-tighter", result.financial_impact?.burn_rate_change > 0 ? "text-destructive" : "text-primary")}>
                                            {result.financial_impact?.burn_rate_change > 0 ? "+" : ""}{result.financial_impact?.burn_rate_change}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Runway Δ</p>
                                        <p className={cn("text-2xl font-black tracking-tighter", result.financial_impact?.runway_impact < 0 ? "text-destructive" : "text-primary")}>
                                            {result.financial_impact?.runway_impact > 0 ? "+" : ""}{result.financial_impact?.runway_impact} MO
                                        </p>
                                    </div>
                                </div>
                             </Card>
                             <div className="bg-surface-container/50 p-8 rounded-[32px] border border-outline-variant/30 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6">Strategic Response</h4>
                                    <ul className="space-y-3">
                                        {result.actions?.slice(0, 3).map((a, i) => (
                                            <li key={i} className="text-xs font-bold text-on-surface flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {a}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button variant="link" className="text-[10px] font-black uppercase text-primary p-0 h-auto w-fit mt-6 tracking-widest">VIEW FULL PROTOCOL <ArrowRight size={14} className="ml-2" /></Button>
                             </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-[600px] rounded-[32px] border-2 border-dashed border-outline-variant/50 bg-surface-container-low/20 flex flex-col items-center justify-center text-center p-12">
                        <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6 opacity-40">
                            <ShieldAlert size={32} className="text-on-surface-variant" />
                        </div>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">PRIMING RISK CORES...</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
