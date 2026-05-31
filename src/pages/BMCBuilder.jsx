import React, { useEffect, useState } from "react";
import { Project } from "@/entities/Project";
import { BMC } from "@/entities/BMC";
import { SavedItem } from "@/entities/SavedItem";
import { User } from "@/entities/User";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AutoTextarea from "@/components/common/AutoTextarea";
import { FLAGS } from "@/components/common/flags";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Trash2, 
  Download, 
  Sparkles, 
  Layers, 
  Layout, 
  FileText,
  DollarSign,
  Users,
  Search,
  Cpu,
  Loader2
} from "lucide-react";

const BLOCKS = [
  { key: "customer_segments", label: "Customer Segments", icon: Users },
  { key: "value_props", label: "Value Propositions", icon: Sparkles },
  { key: "channels", label: "Channels", icon: Layout },
  { key: "customer_relationships", label: "Customer Relationships", icon: Users },
  { key: "revenue_streams", label: "Revenue Streams", icon: DollarSign },
  { key: "key_resources", label: "Key Resources", icon: Layers },
  { key: "key_activities", label: "Key Activities", icon: FileText },
  { key: "key_partnerships", label: "Key Partnerships", icon: Layers },
  { key: "cost_structure", label: "Cost Structure", icon: DollarSign }
];

export default function BMCBuilder() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [blocks, setBlocks] = useState({});
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [valueHints, setValueHints] = useState("");
  const [customerHints, setCustomerHints] = useState("");
  const [revenueHints, setRevenueHints] = useState("");

  useEffect(()=>{
    Project.list("-created_date").then(p=>{
      setProjects(p || []);
      if (p && p.length > 0) {
        setProjectId(p[0].id);
        setSummary(p[0].description || "");
        setValueHints((p[0].value_props||[]).join("; "));
      }
    });
  }, []);

  useEffect(()=>{
    if (!projectId) return;
    const key = `bmc_${projectId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try { const parsed = JSON.parse(saved); setBlocks(parsed.blocks || {}); } catch (e) {
        console.error("Failed to parse saved BMC blocks", e);
      }
    }
  }, [projectId]);

  useEffect(()=>{
    if (!projectId) return;
    const id = setInterval(()=>{
      localStorage.setItem(`bmc_${projectId}`, JSON.stringify({ blocks }));
    }, 6000);
    return ()=>clearInterval(id);
  }, [blocks, projectId]);

  const generate = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
        const res = await InvokeLLM({
          prompt: `Build a Business Model Canvas for product summary: ${summary}`,
          response_json_schema: {
            type: "object",
            properties: Object.fromEntries(BLOCKS.map(b=>[b.key, {type:"string"}]))
          }
        });
        setBlocks(res || {});
    } catch (e) {
        console.error("BMC generation error", e);
    }
    setLoading(false);
  };

  const clearAllBlocks = () => {
    if (confirm("Clear all canvas blocks?")) {
        setBlocks({});
        if (projectId) localStorage.removeItem(`bmc_${projectId}`);
    }
  };

  return (
    <div className="space-y-12 pb-20 text-left animate-fade-in">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Badge className="bg-primary-container text-primary font-bold px-3 py-1 rounded-full text-[10px] mb-4 uppercase tracking-widest border-none">
            STRATEGY UNIT 03
          </Badge>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase mb-2">BMC Builder</h1>
          <p className="text-on-surface-variant font-medium text-lg">Architecting sustainable business models for technical products.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger className="w-56 bg-surface-container-low border-outline-variant/50 h-11 font-bold text-xs uppercase">
                    <SelectValue placeholder="SELECT PROJECT" />
                </SelectTrigger>
                <SelectContent>
                    {projects.map(p => (
                        <SelectItem key={p.id} value={p.id} className="font-bold text-xs uppercase">{p.product_name || p.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={generate} disabled={loading || !projectId} className="bg-primary text-white hover:bg-primary/90 h-11 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-widest">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Generate Canvas
            </Button>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Input Sidebar */}
        <div className="lg:col-span-4 space-y-6">
            <Card className="glass-card p-8 rounded-[24px]">
                <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-8 border-b border-outline-variant/30 pb-2">Synthesis Context</h4>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Product Summary</Label>
                        <AutoTextarea value={summary} onChange={(e)=>setSummary(e.target.value)} className="bg-surface-container-low border-outline-variant/50 font-medium" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Revenue Model</Label>
                        <AutoTextarea value={revenueHints} onChange={(e)=>setRevenueHints(e.target.value)} placeholder="Pricing, streams..." className="bg-surface-container-low border-outline-variant/50 font-medium" />
                    </div>
                    <Button variant="outline" onClick={clearAllBlocks} className="w-full border-outline-variant text-destructive font-black text-[10px] tracking-widest uppercase rounded-xl h-11">
                        <Trash2 className="w-4 h-4 mr-2" /> Reset Canvas
                    </Button>
                </div>
            </Card>

            <div className="bg-primary-container/40 p-6 rounded-[24px] border border-primary/20 relative overflow-hidden text-left">
                <Cpu size={100} className="absolute -right-4 -bottom-4 text-primary opacity-10" />
                <h4 className="text-[10px] font-black text-primary mb-3 tracking-[0.1em] uppercase">Architecture Logic</h4>
                <p className="text-on-primary-container font-bold text-xs leading-relaxed italic">
                    "Sustainable business models prioritize unit economics over raw growth in technical infrastructure segments."
                </p>
            </div>
        </div>

        {/* Canvas Grid */}
        <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BLOCKS.map(b => (
                    <Card key={b.key} className="glass-card border-outline-variant/30 rounded-2xl overflow-hidden group hover:border-primary/30 transition-all">
                        <CardHeader className="bg-surface-container/50 px-6 py-4 border-b border-outline-variant/20 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-3">
                                <b.icon className="w-4 h-4 text-primary opacity-60" />
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest">{b.label}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <AutoTextarea 
                                value={blocks[b.key] || ""} 
                                onChange={(e)=>setBlocks(prev=>({...prev,[b.key]: e.target.value}))} 
                                placeholder={`Enter data for ${b.label}...`}
                                className="border-none bg-transparent min-h-[120px] rounded-none focus:ring-0 font-medium text-sm leading-relaxed p-6"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
