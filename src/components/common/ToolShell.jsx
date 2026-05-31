import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Trash2,
  ChevronDown,
  ChevronUp,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ExportButtons from "./ExportButtons";
import { Artifact } from "@/entities/Artifact";
import AutoTextarea from "./AutoTextarea";
import { base44 } from "@/api/base44Client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ToolShell({
  title,
  description,
  category,
  toolKey,
  projectOptions = [],
  fields = [],
  defaultValues = {},
  onRun,
  renderResult,
}) {
  const [values, setValues] = React.useState(defaultValues);
  const [projectId, setProjectId] = React.useState(projectOptions[0]?.id || "");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState(null);
  const [regenCount, setRegenCount] = React.useState(0);
  const [showRaw, setShowRaw] = React.useState(false);
  const [isInputOpen, setIsInputOpen] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        if (base44 && base44.auth && typeof base44.auth.me === 'function') {
            const me = await base44.auth.me();
            setUserProfile(me || null);
        }
      } catch (e) {
        console.warn("Auth check skipped in ToolShell:", e);
        setUserProfile(null);
      }
    })();
  }, []);

  const handleChange = (name, value) => setValues(prev => ({ ...prev, [name]: value }));

  const run = async () => {
    setSaved(false);
    setLoading(true);
    try {
      const out = await onRun(values, projectId, userProfile, regenCount);
      setResult(out);
      setIsInputOpen(false);
    } catch (e) {
      console.error("AI Run Error:", e);
    }
    setLoading(false);
  };

  const regenerate = async () => {
    setRegenCount(c => c + 1);
    await run();
  };

  const clearResults = () => {
    setResult(null);
    setRegenCount(0);
    setIsInputOpen(true);
  };

  const saveArtifact = async () => {
    if (!result || !Artifact) return;
    try {
        await Artifact.create({
          project_id: projectId || undefined,
          category,
          tool_key: toolKey,
          title: `${title} Result`,
          data: result
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    } catch (e) {
        console.error("Failed to save artifact:", e);
    }
  };

  const FieldInput = ({ field }) => {
    if (field.type === "textarea") {
      return (
        <div className="space-y-2 text-left">
          <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{field.label}</Label>
          <AutoTextarea
            value={values[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="bg-surface-container-low border-outline-variant/50 focus:ring-primary/20"
          />
        </div>
      );
    }
    if (field.type === "select") {
      return (
        <div className="space-y-2 text-left">
          <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{field.label}</Label>
          <Select
            value={values[field.name] || ""}
            onValueChange={(v) => handleChange(field.name, v)}
          >
            <SelectTrigger className="bg-surface-container-low border-outline-variant/50">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return (
      <div className="space-y-2 text-left">
        <Label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{field.label}</Label>
        <Input
          placeholder={field.placeholder}
          value={values[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className="bg-surface-container-low border-outline-variant/50 h-11"
        />
      </div>
    );
  };

  return (
    <Card className="glass-card rounded-[24px] overflow-hidden border-primary/10 shadow-xl text-left">
      <CardHeader className="p-8 border-b border-outline-variant/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center border border-primary/10 shadow-sm">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-on-surface tracking-tight uppercase">{title}</CardTitle>
              <p className="text-sm text-on-surface-variant font-medium mt-1">{description}</p>
            </div>
          </div>
          {projectOptions.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge className="bg-primary-container text-primary font-bold border-none text-[10px] tracking-widest uppercase">CONTEXT</Badge>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger className="w-48 bg-surface-container-low border-outline-variant/50 h-9 font-bold text-xs uppercase">
                  <SelectValue placeholder="Select context" />
                </SelectTrigger>
                <SelectContent>
                  {projectOptions.map(p => (
                    <SelectItem key={p.id} value={p.id} className="text-xs font-bold uppercase">{p.product_name || p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        <Collapsible open={isInputOpen} onOpenChange={setIsInputOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between h-12 px-4 bg-surface-container-low/50 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all border border-outline-variant/20">
              <span className="text-[10px] font-black uppercase tracking-widest">Input Parameters</span>
              {isInputOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {fields.map(f => <FieldInput key={f.name} field={f} />)}
            </motion.div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex flex-wrap items-center gap-3">
          <Button 
            onClick={run} 
            disabled={loading} 
            className="bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-xl font-bold shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px] transition-all uppercase text-[10px] tracking-widest"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Synthesizing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Initialize AI Run
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            disabled={!result || loading} 
            onClick={regenerate}
            className="h-12 px-6 rounded-xl border-outline-variant font-bold text-[10px] tracking-widest uppercase hover:bg-surface-container-low"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Re-simulate
          </Button>

          <Button 
            variant="ghost" 
            disabled={!result || loading} 
            onClick={clearResults}
            className="h-12 px-6 rounded-xl text-on-surface-variant font-bold text-[10px] tracking-widest uppercase hover:bg-destructive/5 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          
          {result && (
            <div className="flex items-center gap-2 ml-auto">
              <ExportButtons data={result} fileName={toolKey} />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={saveArtifact}
                className="font-bold text-[10px] tracking-widest uppercase"
              >
                <Save className="w-4 h-4 mr-1.5" />
                {saved ? "Vaulted" : "Commit Result"}
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 bg-surface-container-lowest rounded-[24px] border border-dashed border-outline-variant"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping" />
                  <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
                  <div className="absolute inset-4 bg-primary-container rounded-full flex items-center justify-center shadow-inner">
                    <Cpu className="w-8 h-8 text-primary animate-pulse-slow" />
                  </div>
                </div>
                <p className="mt-6 text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Executing Agentic Logic...</p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Output Generated</h3>
                  <Button variant="link" size="sm" onClick={() => setShowRaw(!showRaw)} className="text-[10px] font-bold text-on-surface-variant hover:text-primary p-0 h-auto">
                    {showRaw ? "VIEW RENDERED" : "VIEW RAW DATA"}
                  </Button>
                </div>
                {showRaw ? (
                  <div className="p-6 bg-surface-container rounded-2xl border border-outline-variant overflow-auto max-h-[500px]">
                    <pre className="text-xs font-mono text-on-surface">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                ) : (
                  renderResult(result)
                )}
              </motion.div>
            ) : (
              <div className="py-20 text-center bg-surface-container-low/30 rounded-[24px] border border-dashed border-outline-variant flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6 opacity-40">
                  <Cpu size={32} className="text-on-surface-variant" />
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Ready for infrastructure synthesis</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
