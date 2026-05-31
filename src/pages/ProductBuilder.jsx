import React, { useState } from "react";
import { Project } from "@/entities/Project";
import { Report } from "@/entities/Report";
import { InvokeLLM, UploadFile, ExtractDataFromUploadedFile } from "@/integrations/Core";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Loader2, 
  Sparkles, 
  Target, 
  Users, 
  TrendingUp, 
  Upload, 
  FileText, 
  Play,
  CheckCircle2,
  AlertCircle,
  Rocket,
  ArrowRight,
  Cpu,
  Terminal,
  Layers,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProductBuilder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    product_name: "",
    product_type: "digital",
    category: "",
    description: "",
    document_content: "",
    document_source: "",
    target_markets: "",
    target_budget: "",
    launch_date: "",
    primary_goal: "",
    price: "",
    currency: "USD",
    signals: ""
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runProgress, setRunProgress] = useState(0);
  const [runStage, setRunStage] = useState("");
  const [results, setResults] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      const extracted = await ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: "object",
          properties: {
            content: { type: "string" },
            title: { type: "string" }
          }
        }
      });

      if (extracted.status === "success" && extracted.output) {
        setFormData(prev => ({
          ...prev,
          document_content: extracted.output.content || "",
          document_source: file.name.endsWith('.pdf') ? 'pdf' : 'docx',
          product_name: extracted.output.title || prev.product_name
        }));
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
    setIsUploading(false);
  };

  const runProject = async () => {
    if (!formData.product_name) return;
    setIsRunning(true);
    setRunProgress(10);
    setRunStage("INITIALIZING CORES...");
    
    // Logic remains same, just updating UI flow
    setTimeout(() => {
        setRunProgress(40);
        setRunStage("ANALYZING INFRASTRUCTURE...");
    }, 1000);
    
    setTimeout(() => {
        setRunProgress(70);
        setRunStage("SYNTHESIZING MARKET DATA...");
    }, 2000);

    const content = formData.document_content || formData.description;
    try {
      const res = await InvokeLLM({
        prompt: `Analyze product: ${formData.product_name}. Content: ${content}`,
        response_json_schema: {
          type: "object",
          properties: {
            persona_fit_score: { type: "number" },
            executive_summary: { type: "string" },
            roi_forecast: { type: "number" },
            confidence_score: { type: "number" }
          }
        }
      });
      setResults(res);
      setRunProgress(100);
      setRunStage("COMPLETE");
      setTimeout(() => setStep(3), 500);
    } catch (e) {
      console.error(e);
      setIsRunning(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const project = await Project.create({
        ...formData,
        name: formData.product_name,
        status: "product_ready"
      });
      window.location.href = `/project/${project.id}`;
    } catch (error) {
      console.error(error);
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Badge className="bg-primary-container text-primary font-bold px-3 py-1 rounded-full text-[10px] mb-4 uppercase tracking-widest border-none">
            ENGINEERING UNIT 01
          </Badge>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase mb-2">Product Builder</h1>
          <p className="text-on-surface-variant font-medium text-lg">Synthesizing technical requirements into high-fidelity launch architectures.</p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all",
                        step >= s ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant opacity-50"
                    )}>
                        {s}
                    </div>
                    {s < 3 && <div className={cn("w-8 h-px bg-outline-variant/30", step > s && "bg-primary")} />}
                </div>
            ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-7 space-y-8">
              <Card className="glass-card p-8 rounded-[24px]">
                <div className="flex items-center gap-3 mb-8 border-b border-outline-variant/30 pb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                        <FileText className="text-primary w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight uppercase">Technical Specifications</h3>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">PRODUCT NAME</Label>
                            <Input 
                                value={formData.product_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, product_name: e.target.value }))}
                                placeholder="e.g. Tenax V4" 
                                className="bg-surface-container-low border-outline-variant/50 h-11 font-bold" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">INFRASTRUCTURE TYPE</Label>
                            <Select value={formData.product_type} onValueChange={(v) => setFormData(prev => ({ ...prev, product_type: v }))}>
                                <SelectTrigger className="bg-surface-container-low border-outline-variant/50 h-11 font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="digital" className="font-bold text-xs uppercase">Digital / SaaS</SelectItem>
                                    <SelectItem value="physical" className="font-bold text-xs uppercase">Physical / Hardware</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">DOCUMENT INGESTION</Label>
                        <Tabs defaultValue="paste" className="w-full">
                            <TabsList className="bg-surface-container-high/50 p-1 rounded-xl mb-4">
                                <TabsTrigger value="paste" className="flex-1 font-bold text-[10px] tracking-widest uppercase">TEXT PASTE</TabsTrigger>
                                <TabsTrigger value="upload" className="flex-1 font-bold text-[10px] tracking-widest uppercase">FILE UPLOAD</TabsTrigger>
                            </TabsList>
                            <TabsContent value="paste">
                                <Textarea 
                                    value={formData.document_content || formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value, document_content: e.target.value, document_source: 'paste' }))}
                                    placeholder="Paste PRD or system requirements..." 
                                    className="bg-surface-container-low border-outline-variant/50 min-h-[180px] font-medium" 
                                />
                            </TabsContent>
                            <TabsContent value="upload">
                                <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-12 text-center bg-surface-container-low/30 group hover:border-primary/50 transition-all cursor-pointer relative">
                                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <Upload size={32} className="mx-auto mb-4 text-on-surface-variant opacity-40 group-hover:text-primary transition-colors" />
                                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">DRAG & DROP TECHNICAL DOCS</p>
                                    <p className="text-[10px] text-on-surface-variant/60 mt-1 uppercase">PDF, DOCX, TXT</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Card className="glass-card p-8 rounded-[24px]">
                <div className="flex items-center gap-3 mb-8 border-b border-outline-variant/30 pb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                        <Target className="text-primary w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight uppercase">Launch Parameters</h3>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">TOTAL BUDGET (USD)</Label>
                            <Input 
                                type="number"
                                value={formData.target_budget}
                                onChange={(e) => setFormData(prev => ({ ...prev, target_budget: e.target.value }))}
                                placeholder="0.00" 
                                className="bg-surface-container-low border-outline-variant/50 h-11 font-bold" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">PRIMARY OBJECTIVE</Label>
                            <Select value={formData.primary_goal} onValueChange={(v) => setFormData(prev => ({ ...prev, primary_goal: v }))}>
                                <SelectTrigger className="bg-surface-container-low border-outline-variant/50 h-11 font-bold">
                                    <SelectValue placeholder="SELECT" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="awareness" className="font-bold text-xs uppercase">Market Awareness</SelectItem>
                                    <SelectItem value="leads" className="font-bold text-xs uppercase">Lead Gen</SelectItem>
                                    <SelectItem value="sales" className="font-bold text-xs uppercase">Conversion</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">TARGET MARKETS</Label>
                        <Input 
                            value={formData.target_markets}
                            onChange={(e) => setFormData(prev => ({ ...prev, target_markets: e.target.value }))}
                            placeholder="e.g. US, Germany, Nigeria" 
                            className="bg-surface-container-low border-outline-variant/50 h-11 font-bold" 
                        />
                    </div>

                    <Button 
                        onClick={() => setStep(2)} 
                        disabled={!formData.product_name}
                        className="w-full bg-primary text-white hover:bg-primary/90 h-14 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-[0.2em] mt-4"
                    >
                        PROCEED TO SYNTHESIS <ArrowRight size={16} className="ml-2" />
                    </Button>
                </div>
              </Card>

              <div className="bg-primary-container/40 p-6 rounded-[24px] border border-primary/20 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Terminal size={100} className="text-primary" />
                </div>
                <h4 className="text-[10px] font-black text-primary mb-3 tracking-[0.1em] uppercase">Layers Logic</h4>
                <p className="text-on-primary-container font-bold text-xs leading-relaxed italic">
                  "Defining clear technical specifications early reduces downstream integration debt by 40%."
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="glass-card p-12 rounded-[32px] text-center space-y-8 relative overflow-hidden">
                {!isRunning ? (
                    <>
                        <div className="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-primary/10">
                            <Layers className="text-primary w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-on-surface uppercase tracking-tight">Ready for Synthesis</h2>
                            <p className="text-on-surface-variant font-medium">The system is primed to generate your launch architecture.</p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button variant="outline" onClick={() => setStep(1)} className="h-12 px-8 border-outline-variant font-bold text-[10px] tracking-widest uppercase">BACK</Button>
                            <Button onClick={runProject} className="bg-primary text-white h-12 px-10 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-widest">INITIALIZE RUN</Button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-10 py-8">
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping" />
                            <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
                            <div className="absolute inset-4 bg-primary-container rounded-full flex items-center justify-center shadow-inner">
                                <Cpu className="w-10 h-10 text-primary animate-pulse-slow" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black text-primary uppercase tracking-[0.2em] animate-pulse">{runStage}</h2>
                            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden max-w-sm mx-auto">
                                <motion.div 
                                    className="h-full bg-primary" 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${runProgress}%` }} 
                                />
                            </div>
                            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{runProgress}% CALCULATED</p>
                        </div>
                    </div>
                )}
            </Card>
          </motion.div>
        )}

        {step === 3 && results && (
          <motion.div 
            key="step3" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="grid lg:grid-cols-12 gap-8 text-left"
          >
            <div className="lg:col-span-8 space-y-8">
                <Card className="glass-card p-8 rounded-[24px]">
                    <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                                <Sparkles className="text-primary w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight uppercase">Executive Summary</h3>
                        </div>
                        <div className="flex gap-2">
                             <Badge className="bg-primary-container text-primary font-bold border-none text-[10px]">FIT: {results.persona_fit_score}</Badge>
                             <Badge className="bg-surface-container text-on-surface-variant font-bold border-none text-[10px]">CONF: {results.confidence_score}%</Badge>
                        </div>
                    </div>
                    <p className="text-on-surface font-medium leading-relaxed italic text-lg">"{results.executive_summary || "Synthesis complete. Layers optimized for global deployment."}"</p>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="glass-card p-6 rounded-[24px]">
                        <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6 border-b border-outline-variant/30 pb-2">STRATEGIC ROI</h4>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-primary tracking-tighter">+{results.roi_forecast}%</span>
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Projected</span>
                        </div>
                    </Card>
                    <Card className="glass-card p-6 rounded-[24px]">
                        <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6 border-b border-outline-variant/30 pb-2">SYSTEM STABILITY</h4>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-on-surface tracking-tighter">STABLE</span>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> VERIFIED
                            </span>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                <Card className="glass-card p-8 rounded-[24px] h-full">
                    <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-8 border-b border-outline-variant/30 pb-2">VAULT ARCHITECTURE</h4>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-10">
                        Finalizing the build will commit these parameters to the system vault and initialize the active monitoring modules.
                    </p>
                    <div className="space-y-4">
                        <Button 
                            onClick={handleSave} 
                            disabled={isSaving}
                            className="w-full bg-primary text-white hover:bg-primary/90 h-14 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-widest"
                        >
                            {isSaving ? "VAULTING..." : "COMMIT TO VAULT"}
                        </Button>
                        <Button variant="outline" onClick={() => setStep(2)} className="w-full h-12 border-outline-variant font-bold text-[10px] tracking-widest uppercase">RE-SYNTHESIZE</Button>
                    </div>
                </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
