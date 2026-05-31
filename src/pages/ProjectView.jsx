import React, { useEffect, useState } from "react";
import { Project } from "@/entities/Project";
import { Report } from "@/entities/Report";
import { SavedItem } from "@/entities/SavedItem";
import { Creative } from "@/entities/Creative";
import { ChecklistTask } from "@/entities/ChecklistTask";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation, Link } from "react-router-dom";
import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  Users,
  Globe,
  TrendingUp,
  CheckCircle2,
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  Target,
  AlertCircle,
  Trash2,
  Copy,
  ExternalLink,
  ChevronLeft,
  Cpu,
  Terminal,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function ProjectView() {
  const [project, setProject] = useState(null);
  const [report, setReport] = useState(null);
  const [items, setItems] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const projectId = urlParams.get("project") || location.pathname.split("/").pop();

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    if (!projectId || projectId === "project") {
        setLoading(false);
        return;
    }
    try {
        const projects = await Project.list();
        const p = projects.find(x => x.id === projectId) || null;
        setProject(p);
        
        if (p) {
            const reports = await Report.filter({ project_id: projectId });
            setReport(reports[0] || null);
            setItems(await SavedItem.filter({ project_id: projectId }));
            setCreatives(await Creative.filter({ project_id: projectId }));
            setTasks(await ChecklistTask.filter({ project_id: projectId }));
        }
    } catch (e) {
        console.error("Failed to load project data", e);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping" />
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
          </div>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Accessing Entity Vault...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card p-12 rounded-[32px] max-w-md text-center space-y-6">
            <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto">
                <AlertCircle className="text-on-surface-variant opacity-40" size={32} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Access Denied</h2>
            <p className="text-on-surface-variant font-medium text-sm">The requested project architecture could not be located in the system vault.</p>
            <Button asChild className="bg-primary text-white h-11 px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest">
                <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
        </Card>
      </div>
    );
  }

  const statusColors = {
    idea: "bg-surface-container text-on-surface-variant border-outline-variant/30",
    mvp: "bg-secondary-container text-secondary border-secondary/20",
    prototype: "bg-tertiary-container text-tertiary border-tertiary/20",
    product_ready: "bg-primary-container text-primary border-primary/20",
    launched: "bg-primary-container text-primary border-primary/30 shadow-sm",
    growth: "bg-secondary-container text-secondary border-secondary/20",
    scaling: "bg-outline-variant text-on-surface border-outline/30"
  };

  return (
    <div className="space-y-10 pb-20 text-left animate-fade-in">
      {/* Header */}
      <section className="flex flex-col gap-6">
        <Link to="/dashboard" className="flex items-center text-[10px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest group">
            <ChevronLeft size={14} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Fleet
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Badge className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border", statusColors[project.status])}>
                        {project.status}
                    </Badge>
                    <Badge className="bg-surface-container text-on-surface-variant border-none text-[10px] font-bold uppercase tracking-widest">
                        {project.product_type}
                    </Badge>
                </div>
                <h1 className="text-5xl font-black text-on-surface tracking-tighter uppercase">{project.product_name}</h1>
                <p className="text-on-surface-variant font-medium text-xl max-w-3xl leading-relaxed italic">"{project.description}"</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-outline-variant hover:bg-surface-container h-11 px-6 rounded-xl font-bold text-[10px] tracking-widest uppercase">
                    <Download className="w-4 h-4 mr-2" /> Export
                </Button>
                <Button className="bg-primary text-white hover:bg-primary/90 h-11 px-8 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-widest">
                    <Share2 className="w-4 h-4 mr-2" /> Initialize Share
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-outline-variant/30">
            {[
                { label: "Launch Date", val: project.launch_date ? format(new Date(project.launch_date), "MMM d, yyyy") : "TBD" },
                { label: "Target Budget", val: project.target_budget ? `$${project.target_budget.toLocaleString()}` : "N/A" },
                { label: "Persona Fit", val: `${project.persona_fit_score || 0}/100` },
                { label: "ROI Forecast", val: `+${project.roi_forecast || 0}%` },
            ].map((stat, i) => (
                <div key={i} className="space-y-1">
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                    <p className="text-lg font-black text-on-surface">{stat.val}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
        <TabsList className="bg-surface-container-high/50 p-1 rounded-xl w-fit">
          {["overview", "personas", "markets", "roadmap", "assets"].map(t => (
            <TabsTrigger key={t} value={t} className="px-8 py-2 rounded-lg font-bold text-[10px] tracking-widest uppercase data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-0 outline-none">
            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    {project.executive_summary && (
                        <Card className="glass-card p-8 rounded-[24px]">
                            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant/30 pb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                                    <Sparkles className="text-primary w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight uppercase">Architecture Summary</h3>
                            </div>
                            <p className="text-on-surface font-medium leading-relaxed italic text-lg whitespace-pre-line">"{project.executive_summary}"</p>
                        </Card>
                    )}

                    {project.value_props?.length > 0 && (
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Core Value Propositions</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                                {project.value_props.map((prop, i) => (
                                    <Card key={i} className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all border-primary/5">
                                        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center mb-4 font-black text-[10px] text-primary">0{i+1}</div>
                                        <p className="text-sm font-bold text-on-surface leading-relaxed">{prop}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-card p-8 rounded-[24px]">
                        <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-8 border-b border-outline-variant/30 pb-2">Technical Indicators</h4>
                        <div className="space-y-6">
                            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Confidence</span>
                                    <span className="text-primary font-black text-xs">94%</span>
                                </div>
                                <div className="w-full h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[94%]" />
                                </div>
                            </div>
                            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">System Stability</span>
                                    <span className="text-primary font-black text-xs">Verified</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-medium text-on-surface-variant italic">Active monitoring enabled</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="bg-primary-container/40 p-6 rounded-[24px] border border-primary/20 relative overflow-hidden group">
                        <Terminal size={100} className="absolute -right-4 -bottom-4 text-primary opacity-10" />
                        <h4 className="text-[10px] font-black text-primary mb-3 tracking-[0.1em] uppercase">Core Recommendation</h4>
                        <p className="text-on-primary-container font-bold text-xs leading-relaxed italic">
                            "Initializing specialized agent protocols for the 'launched' state will optimize operational efficiency by 18%."
                        </p>
                    </div>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-10 mt-0 outline-none">
            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="space-y-6 text-left">
                        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                            <h4 className="text-xl font-black text-on-surface tracking-tight uppercase">High-Fidelity Creatives</h4>
                            <Badge className="bg-primary-container text-primary font-bold border-none text-[10px]">{creatives.length} UNITS</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {creatives.map(c => (
                                <Card key={c.id} className="glass-card rounded-[24px] overflow-hidden group hover:border-primary/40">
                                    <div className="h-32 bg-surface-container-high/50 flex flex-col justify-end p-6 border-b border-outline-variant/20">
                                        <div className="flex gap-2 mb-3">
                                            <Badge className="bg-white/80 text-primary border-none text-[9px] font-black tracking-widest uppercase">{c.channel}</Badge>
                                            <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black tracking-widest uppercase">{c.format}</Badge>
                                        </div>
                                        <h4 className="text-lg font-black tracking-tight uppercase text-on-surface truncate">{c.headline}</h4>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-on-surface-variant font-medium leading-relaxed line-clamp-3 mb-6 italic">"{c.body_copy}"</p>
                                        <Button variant="ghost" size="sm" className="w-full justify-between font-black text-[10px] tracking-widest uppercase rounded-xl border border-outline-variant/30 group-hover:bg-primary group-hover:text-white transition-all">
                                            Open Resource <ArrowUpRight size={14} />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                            {creatives.length === 0 && (
                                <div className="col-span-2 py-20 text-center glass-card rounded-[24px] border-dashed border-outline-variant flex flex-col items-center">
                                    <Layers size={32} className="text-on-surface-variant opacity-30 mb-4" />
                                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">No creative assets in vault</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                     <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Saved Snippets</h4>
                            <Badge className="bg-surface-container text-on-surface-variant border-none text-[10px] font-bold">{items.length}</Badge>
                        </div>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="p-5 glass-card rounded-2xl border-primary/5 hover:border-primary/20 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-3">
                                        <Badge className="bg-primary-container text-primary border-none text-[9px] font-black uppercase tracking-widest">{item.tab_name}</Badge>
                                        <span className="text-[9px] font-bold text-on-surface-variant uppercase">{format(new Date(item.created_date), "MMM d")}</span>
                                    </div>
                                    <h5 className="text-sm font-black text-on-surface group-hover:text-primary transition-colors mb-2">{item.title}</h5>
                                    {item.content_text && <p className="text-xs text-on-surface-variant line-clamp-2 font-medium leading-relaxed">{item.content_text}</p>}
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="personas" className="outline-none">
            <div className="grid md:grid-cols-3 gap-8 text-left">
                {project.personas?.map((persona, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-[32px] overflow-hidden group hover:border-primary/50"
                    >
                        <div className="h-40 bg-surface-container-high/50 flex flex-col justify-end p-8 border-b border-outline-variant/20 relative">
                            <div className="absolute top-6 right-6">
                                <Badge className="bg-primary-container text-primary font-black border-none text-[10px]">FIT: {persona.fit_score}</Badge>
                            </div>
                            <h3 className="text-3xl font-black text-on-surface tracking-tighter uppercase">{persona.name}</h3>
                            <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">SEGMENT {i+1}</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Demographics</h4>
                                <p className="text-sm font-medium text-on-surface leading-relaxed">{persona.demographics}</p>
                            </div>
                            <div className="space-y-3 pt-4 border-t border-outline-variant/30">
                                <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Pain Points</h4>
                                <p className="text-sm font-medium text-on-surface-variant leading-relaxed italic">"{persona.pain_points}"</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </TabsContent>

        {/* Other tabs follow same pattern... */}
      </Tabs>
    </div>
  );
}
