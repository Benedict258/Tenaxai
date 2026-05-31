import React, { useEffect, useState } from "react";
import { Project } from "@/entities/Project";
import { base44 } from "@/api/base44Client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MessageSquare, Sparkles, Mail, Copy, Check, Send, Loader2,
  BarChart2, Globe, Filter, RefreshCw, ExternalLink, TrendingUp,
  TrendingDown, Minus, Users, ChevronDown, MoreHorizontal,
  Rocket, Terminal, Cpu, Languages, BarChart3
} from "lucide-react";

export default function CreativeMessaging() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [active, setActive] = useState("ad_creative");

  useEffect(() => {
    Project.list("-created_date").then(p => {
      setProjects(p || []);
      if (p && p.length > 0) setSelectedProjectId(p[0].id);
    });
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get("tool");
    if (t) setActive(t);
  }, []);

  const getProjectContext = (id) => {
    const p = projects.find(x => x.id === (id || selectedProjectId));
    if (!p) return "";
    return p.document_content || p.description || `${p.product_name}: ${p.category || "product"}`;
  };

  const tabs = [
    { value: "ad_creative", label: "AD CREATIVE", icon: Sparkles },
    { value: "email_generator", label: "EMAIL GENERATOR", icon: Mail },
    { value: "localization", label: "LOCALIZATION", icon: Globe },
    { value: "channel_recommender", label: "CHANNELS", icon: BarChart2 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
        <div>
          <Badge className="bg-primary-container text-primary font-bold px-3 py-1 rounded-full text-[10px] mb-4 uppercase tracking-widest border-none">
            CAMPAIGN ACTIVE
          </Badge>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase mb-2">Creative Messaging</h1>
          <p className="text-on-surface-variant font-medium text-lg">Engineering high-performance narratives for global technical infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
            <SelectTrigger className="w-56 bg-surface-container-low border-outline-variant/50 h-11 font-bold text-xs uppercase text-left">
              <SelectValue placeholder="Select architecture" />
            </SelectTrigger>
            <SelectContent>
              {projects.map(p => (
                <SelectItem key={p.id} value={p.id} className="text-xs font-bold uppercase">{p.product_name || p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={active} onValueChange={setActive} className="space-y-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/30 pb-4 text-left">
          <TabsList className="bg-transparent h-auto p-0 gap-2">
            {tabs.map(tab => (
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

        <div className="mt-0">
          <TabsContent value="ad_creative" className="outline-none">
            <AdCreativeTab selectedProjectId={selectedProjectId} getProjectContext={getProjectContext} />
          </TabsContent>

          <TabsContent value="email_generator" className="outline-none">
            <EmailGeneratorTab selectedProjectId={selectedProjectId} getProjectContext={getProjectContext} />
          </TabsContent>

          <TabsContent value="localization" className="outline-none">
            <LocalizationTab selectedProjectId={selectedProjectId} getProjectContext={getProjectContext} />
          </TabsContent>
          
          <TabsContent value="channel_recommender" className="outline-none">
            <ChannelRecommenderTab selectedProjectId={selectedProjectId} getProjectContext={getProjectContext} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function AdCreativeTab({ selectedProjectId, getProjectContext }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async () => {
    setLoading(true);
    try {
        const ctx = getProjectContext(selectedProjectId);
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `Generate creative ad variations for technical product: ${ctx}. Focus on high conversion for technical buyers.`,
          response_json_schema: {
            type: "object",
            properties: {
              variations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    variant_label: { type: "string" },
                    headline: { type: "string" },
                    body: { type: "string" },
                    is_champion: { type: "boolean" }
                  }
                }
              }
            }
          }
        });
        setResult(res);
    } catch (e) {
        console.error("Creative generation error", e);
    }
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 text-left">
      <div className="lg:col-span-8 space-y-8 text-left">
        <Card className="glass-card p-8 rounded-[24px]">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                <Cpu className="text-primary w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase">Generator Core</h3>
            </div>
            <Button onClick={run} disabled={loading || !selectedProjectId} className="bg-primary text-white font-bold text-[10px] tracking-widest px-8 rounded-xl h-11 shadow-lg uppercase">
              {loading ? "Synthesizing..." : "Initialize Generation"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Target Tone</Label>
              <Select defaultValue="rigorous">
                <SelectTrigger className="bg-surface-container-low border-outline-variant/50 h-11 font-bold text-xs uppercase text-left">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rigorous" className="font-bold text-xs uppercase">Engineering Rigor</SelectItem>
                  <SelectItem value="minimal" className="font-bold text-xs uppercase">Minimalist</SelectItem>
                  <SelectItem value="visionary" className="font-bold text-xs uppercase">Visionary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-left">
              <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Platform Matrix</Label>
              <Input placeholder="LinkedIn, X, technical docs" className="bg-surface-container-low border-outline-variant/50 h-11 font-medium" />
            </div>
          </div>
        </Card>

        {result ? (
          <div className="grid md:grid-cols-2 gap-6">
            {(result.variations || []).map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                <Card className={cn("glass-card rounded-[24px] overflow-hidden group hover:border-primary/40", v.is_champion && "border-primary/40 ring-1 ring-primary/20")}>
                   <div className={cn("h-40 bg-surface-container flex flex-col justify-end p-6", v.is_champion && "bg-primary-container/20")}>
                      <Badge className="bg-white/50 text-on-surface border-none text-[9px] font-black tracking-widest w-fit mb-3">{v.variant_label}</Badge>
                      <h4 className="text-xl font-bold tracking-tight text-on-surface uppercase">{v.headline}</h4>
                   </div>
                   <div className="p-6">
                      <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic mb-6">"{v.body}"</p>
                      <div className="flex items-center justify-between">
                         <div className="flex gap-4">
                            <div>
                               <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.15em] mb-1">CTR PROJ</p>
                               <p className="text-sm font-black text-primary">3.8%</p>
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.15em] mb-1">CONFIDENCE</p>
                               <p className="text-sm font-black text-on-surface">94%</p>
                            </div>
                         </div>
                         <Button variant="ghost" size="icon" className="rounded-xl border border-outline-variant/50 hover:bg-primary hover:text-white transition-all"><Copy size={16} /></Button>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-surface-container-low/30 rounded-[24px] border border-dashed border-outline-variant flex flex-col items-center">
            <Sparkles size={32} className="text-on-surface-variant opacity-30 mb-4" />
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Waiting for creative initialization</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 space-y-6">
         <Card className="glass-card p-6 rounded-[24px]">
            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-6 border-b border-outline-variant/30 pb-2 text-left">Performance Matrix</h4>
            <div className="space-y-5">
               {[
                 { name: "Technical Docs", roi: "5.2x", trend: "up" },
                 { name: "LinkedIn", roi: "4.1x", trend: "up" },
                 { name: "Direct Mail", roi: "2.8x", trend: "flat" },
               ].map((c, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                    <span className="text-xs font-bold text-on-surface uppercase">{c.name}</span>
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-black text-primary">{c.roi}</span>
                       <TrendingUp size={14} className="text-primary opacity-50" />
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <div className="bg-primary-container/40 p-6 rounded-[24px] border border-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Terminal size={100} className="text-primary" />
            </div>
            <h4 className="text-[10px] font-black text-primary mb-3 tracking-[0.1em] uppercase">Narrative Note</h4>
            <p className="text-on-primary-container font-bold text-xs leading-relaxed italic text-left">
              "Focusing on 'Engineering Rigor' increases developer-segment CTR by 24% over generic 'Efficiency' messaging."
            </p>
         </div>
      </div>
    </div>
  );
}

function EmailGeneratorTab({ selectedProjectId, getProjectContext }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async () => {
    setLoading(true);
    try {
        const ctx = getProjectContext(selectedProjectId);
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `Generate a high-performance cold outreach email sequence for: ${ctx}. Include a subject line and a concise body targeting technical decision makers.`,
          response_json_schema: {
            type: "object",
            properties: {
              sequence: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string" },
                    subject: { type: "string" },
                    body: { type: "string" }
                  }
                }
              }
            }
          }
        });
        setResult(res);
    } catch (e) {
        console.error("Email generation error", e);
    }
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 text-left">
      <div className="lg:col-span-8 space-y-8">
        <Card className="glass-card p-8 rounded-[24px]">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                <Mail className="text-primary w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase">Email Synthesizer</h3>
            </div>
            <Button onClick={run} disabled={loading || !selectedProjectId} className="bg-primary text-white font-bold text-[10px] tracking-widest px-8 rounded-xl h-11 shadow-lg uppercase">
              {loading ? "Generating..." : "Synthesize Sequence"}
            </Button>
          </div>
          
          <div className="space-y-4">
             <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-left block">Campaign Objective</Label>
             <Input placeholder="e.g. Schedule a technical deep-dive" className="bg-surface-container-low border-outline-variant/50 h-11 font-medium" />
          </div>
        </Card>

        {result ? (
          <div className="space-y-6">
            {(result.sequence || []).map((email, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card rounded-[24px] overflow-hidden">
                   <div className="p-6 bg-surface-container border-b border-outline-variant/20 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <Badge className="bg-primary text-white border-none text-[9px] font-black tracking-widest uppercase">EMAIL {i+1}</Badge>
                         <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">{email.type}</h4>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase hover:bg-primary hover:text-white transition-all"><Copy className="w-3.5 h-3.5 mr-2" /> Copy Text</Button>
                   </div>
                   <div className="p-8 space-y-6">
                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest text-left">SUBJECT</p>
                         <p className="text-sm font-bold text-on-surface text-left">{email.subject}</p>
                      </div>
                      <div className="space-y-2 pt-4 border-t border-outline-variant/20 text-left">
                         <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">BODY</p>
                         <p className="text-sm font-medium text-on-surface-variant leading-relaxed whitespace-pre-line">{email.body}</p>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-surface-container-low/30 rounded-[24px] border border-dashed border-outline-variant flex flex-col items-center">
            <Mail size={32} className="text-on-surface-variant opacity-30 mb-4" />
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Ready to synthesize outreach sequence</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 space-y-6">
         <Card className="glass-card p-6 rounded-[24px]">
            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-6 border-b border-outline-variant/30 pb-2 text-left">Engagement Projection</h4>
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-on-surface-variant uppercase">Open Rate</span>
                     <span className="text-primary font-black text-sm tracking-tight">28.4%</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[28%]" />
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-on-surface-variant uppercase">Reply Rate</span>
                     <span className="text-primary font-black text-sm tracking-tight">4.2%</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[4%]" />
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}

function LocalizationTab({ selectedProjectId, getProjectContext }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async () => {
    setLoading(true);
    try {
        const ctx = getProjectContext(selectedProjectId);
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `Localize the primary technical value proposition for: ${ctx}. Target markets: APAC, EMEA, LATAM. Explain cultural nuances for each.`,
          response_json_schema: {
            type: "object",
            properties: {
              regions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    region: { type: "string" },
                    adapted_headline: { type: "string" },
                    cultural_note: { type: "string" },
                    primary_language: { type: "string" }
                  }
                }
              }
            }
          }
        });
        setResult(res);
    } catch (e) {
        console.error("Localization error", e);
    }
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 text-left">
      <div className="lg:col-span-8 space-y-8">
        <Card className="glass-card p-8 rounded-[24px]">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                <Globe className="text-primary w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase">Cross-Border Engine</h3>
            </div>
            <Button onClick={run} disabled={loading || !selectedProjectId} className="bg-primary text-white font-bold text-[10px] tracking-widest px-8 rounded-xl h-11 shadow-lg uppercase">
              {loading ? "Localizing..." : "Initialize Adaptation"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Source Market</Label>
              <Select defaultValue="us">
                <SelectTrigger className="bg-surface-container-low border-outline-variant/50 h-11 font-bold text-xs uppercase text-left">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us" className="font-bold text-xs uppercase text-left">United States (Default)</SelectItem>
                  <SelectItem value="eu" className="font-bold text-xs uppercase text-left">European Union</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-left">
              <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Target Regions</Label>
              <Input placeholder="APAC, EMEA, LATAM" className="bg-surface-container-low border-outline-variant/50 h-11 font-medium" />
            </div>
          </div>
        </Card>

        {result ? (
          <div className="grid md:grid-cols-2 gap-6">
            {(result.regions || []).map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card rounded-[24px] overflow-hidden group hover:border-primary/40">
                   <div className="p-6 bg-surface-container border-b border-outline-variant/20 flex justify-between items-center">
                      <Badge className="bg-primary-container text-primary border-none text-[10px] font-black tracking-widest uppercase">{r.region}</Badge>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">{r.primary_language}</span>
                   </div>
                   <div className="p-8 space-y-6 text-left">
                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">ADAPTED HEADLINE</p>
                         <h4 className="text-lg font-black text-on-surface uppercase tracking-tight leading-tight">{r.adapted_headline}</h4>
                      </div>
                      <div className="space-y-2 pt-4 border-t border-outline-variant/20">
                         <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">CULTURAL SYNTHESIS</p>
                         <p className="text-xs font-medium text-on-surface-variant leading-relaxed italic">"{r.cultural_note}"</p>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-surface-container-low/30 rounded-[24px] border border-dashed border-outline-variant flex flex-col items-center">
            <Languages size={32} className="text-on-surface-variant opacity-30 mb-4" />
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Waiting for localization parameters</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 space-y-6">
         <div className="bg-surface-container/50 p-8 rounded-[32px] border border-outline-variant/30 text-left">
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-6">Regional Alignment</h4>
            <div className="space-y-5">
               {[
                 { label: "Technical Accuracy", val: "98%" },
                 { label: "Cultural Relevance", val: "94%" },
                 { label: "Semantic Integrity", val: "100%" }
               ].map((s, i) => (
                 <div key={i} className="flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface-variant">{s.label}</span>
                    <span className="text-primary font-black text-xs">{s.val}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function ChannelRecommenderTab({ selectedProjectId, getProjectContext }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async () => {
    setLoading(true);
    try {
        const ctx = getProjectContext(selectedProjectId);
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `Analyze technical product: ${ctx}. Recommend top 3 marketing channels with expected ROI and strategy for each.`,
          response_json_schema: {
            type: "object",
            properties: {
              channels: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    roi: { type: "string" },
                    strategy: { type: "string" },
                    confidence: { type: "number" }
                  }
                }
              }
            }
          }
        });
        setResult(res);
    } catch (e) {
        console.error("Channel recommendation error", e);
    }
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 text-left">
      <div className="lg:col-span-8 space-y-8">
        <Card className="glass-card p-8 rounded-[24px]">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                <BarChart3 className="text-primary w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase">Channel Strategy</h3>
            </div>
            <Button onClick={run} disabled={loading || !selectedProjectId} className="bg-primary text-white font-bold text-[10px] tracking-widest px-8 rounded-xl h-11 shadow-lg uppercase">
              {loading ? "Analyzing..." : "Initialize Simulation"}
            </Button>
          </div>
          <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic text-left">
             "Select a technical architecture to simulate multi-channel performance and ROI projections."
          </p>
        </Card>

        {result ? (
          <div className="grid md:grid-cols-3 gap-6">
            {(result.channels || []).map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card rounded-[24px] overflow-hidden group hover:border-primary/40 h-full flex flex-col">
                   <div className="p-6 bg-surface-container border-b border-outline-variant/20 text-left">
                      <h4 className="text-sm font-black text-on-surface uppercase tracking-widest">{c.name}</h4>
                   </div>
                   <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-4">
                         <div className="flex justify-between items-baseline">
                            <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">ROI</span>
                            <span className="text-xl font-black text-primary tracking-tighter">{c.roi}</span>
                         </div>
                         <p className="text-xs font-medium text-on-surface-variant leading-relaxed italic">"{c.strategy}"</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-outline-variant/20 flex justify-between items-center">
                         <span className="text-[9px] font-bold text-on-surface-variant uppercase">Confidence</span>
                         <span className="text-[10px] font-black text-on-surface">{c.confidence}%</span>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-surface-container-low/30 rounded-[24px] border border-dashed border-outline-variant flex flex-col items-center">
            <BarChart2 size={32} className="text-on-surface-variant opacity-30 mb-4" />
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Ready for channel simulation</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4">
         <Card className="glass-card p-8 rounded-[24px] border-primary/10">
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-8 border-b border-outline-variant/30 pb-2 text-left">Fleet Status</h4>
            <div className="space-y-6 text-left">
               <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 animate-pulse" />
                  <div>
                     <p className="text-xs font-bold text-on-surface uppercase">Optimization Active</p>
                     <p className="text-[10px] text-on-surface-variant font-medium">Real-time data flow synchronized.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-outline-variant mt-1.5" />
                  <div>
                     <p className="text-xs font-bold text-on-surface uppercase">Budget Locked</p>
                     <p className="text-[10px] text-on-surface-variant font-medium">Waiting for manual parameter input.</p>
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}
