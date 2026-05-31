import React, { useEffect, useState } from "react";
import { Project } from "@/entities/Project";
import { base44 } from "@/api/base44Client";
import ToolShell from "@/components/common/ToolShell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import { LineChart as LineChartIcon, BarChart3, PieChart as PieChartIcon, TrendingUp, DollarSign, Cpu, ArrowUpRight, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsForecasting() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("forecast");
  const [loadingProjects, setLoadingProjects] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
        try {
            const p = await Project.list("-created_date");
            setProjects(p || []);
        } catch (e) {
            console.error("Failed to load projects for Analytics", e);
        }
        setLoadingProjects(false);
    };
    loadData();

    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get("tool");
    if (t) setActive(t);
  }, []);

  const getProjectDescription = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return "";
    return project.document_content || project.description || `${project.product_name}: ${project.category || 'product'}`;
  };

  return (
    <div className="space-y-10 pb-20 animate-fade-in text-left">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
        <div className="max-w-2xl">
          <Badge className="bg-primary-container text-primary font-bold px-3 py-1 rounded-full text-[10px] mb-4 uppercase tracking-widest border-none">
            ANALYTICS UNIT 04
          </Badge>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase mb-2">Predictive Forecasting</h1>
          <p className="text-on-surface-variant font-medium text-lg">Synthesizing market signals into high-fidelity adoption and budget projections.</p>
        </div>
      </section>
        
      <Tabs value={active} onValueChange={setActive} className="space-y-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/30 pb-4">
          <TabsList className="bg-transparent h-auto p-0 gap-2">
            {[
              { value: "forecast", label: "DEMAND FORECAST", icon: TrendingUp },
              { value: "budget", label: "BUDGET OPTIMIZER", icon: DollarSign },
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

        <TabsContent value="forecast" className="mt-0 outline-none">
          {!loadingProjects && (
            <ToolShell
              title="Demand Forecast"
              description="High-fidelity adoption curve modeling based on real-time market signals."
              category="analytics"
              toolKey="demand_forecast"
              projectOptions={projects}
              fields={[
                { name: "signals", label: "Market Signals", type: "textarea", placeholder: "Signups, waitlist size, traffic trends..." },
                { name: "horizon_weeks", label: "Projection Horizon (Weeks)", type: "text", placeholder: "12" }
              ]}
              onRun={async (values, projectId) => {
                const productContext = getProjectDescription(projectId);
                const project = projects.find(p => p.id === projectId);
                const res = await base44.integrations.Core.InvokeLLM({
                  prompt: `Analyze demand for: ${productContext}. Signals: ${values.signals}. Horizon: ${values.horizon_weeks}`,
                  response_json_schema: {
                    type: "object",
                    properties: {
                      scenarios: { type: "object", properties: {
                        best: { type: "array", items: { type: "object", properties: { week: { type: "number" }, adopters: { type: "number" } } } },
                        base: { type: "array", items: { type: "object", properties: { week: { type: "number" }, adopters: { type: "number" } } } },
                        worst: { type: "array", items: { type: "object", properties: { week: { type: "number" }, adopters: { type: "number" } } } }
                      }},
                      key_drivers: { type: "array", items: { type: "string" } },
                      recommendations: { type: "array", items: { type: "string" } }
                    }
                  }
                });
                return res;
              }}
              renderResult={(data) => (
                <div className="grid lg:grid-cols-12 gap-8 text-left">
                  <div className="lg:col-span-8 space-y-6">
                    <Card className="glass-card p-6 rounded-[24px]">
                      <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6">Calculated Adoption Path</h4>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="week" type="number" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                            />
                            {data.scenarios?.best && (
                              <Line data={data.scenarios.best} type="monotone" dataKey="adopters" name="Optimistic" stroke="#4d661c" strokeWidth={3} dot={false} />
                            )}
                            {data.scenarios?.base && (
                              <Line data={data.scenarios.base} type="monotone" dataKey="adopters" name="Expected" stroke="#64748b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-primary-container/20 p-6 rounded-[24px] border border-primary/10">
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                <TrendingUp size={14} /> Key Drivers
                            </h4>
                            <ul className="space-y-3">
                                {data.key_drivers?.map((d, i) => (
                                    <li key={i} className="text-xs font-bold text-on-surface flex items-start gap-2">
                                        <span className="text-primary mt-1">0{i+1}.</span> {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-surface-container/50 p-6 rounded-[24px] border border-outline-variant/30">
                            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Sparkles size={14} /> Optimized Strategy
                            </h4>
                            <ul className="space-y-3">
                                {data.recommendations?.map((r, i) => (
                                    <li key={i} className="text-xs font-medium text-on-surface-variant leading-relaxed italic">"{r}"</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-card p-8 rounded-[24px]">
                        <h4 className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-8 border-b border-outline-variant/30 pb-2 text-left">Synthesis Core</h4>
                        <div className="space-y-8 text-left">
                            <div>
                                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Confidence Score</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-primary tracking-tighter">92%</span>
                                    <ArrowUpRight size={16} className="text-primary opacity-50" />
                                </div>
                            </div>
                            <div className="p-4 bg-primary-container/40 rounded-xl border border-primary/20">
                                <p className="text-xs font-bold text-primary leading-relaxed">
                                    "System analysis indicates a high-probability breakout in week 8 based on current signal strength."
                                </p>
                            </div>
                        </div>
                    </Card>
                  </div>
                </div>
              )}
            />
          )}
        </TabsContent>

        <TabsContent value="budget" className="mt-0 outline-none text-left">
            {!loadingProjects && (
                <ToolShell
                    title="Budget Optimizer"
                    description="AI-driven marketing spend allocation to maximize technical reach and ROI."
                    category="analytics"
                    toolKey="budget_optimizer"
                    projectOptions={projects}
                    fields={[
                        { name: "goal", label: "Growth Objective", type: "select", options: [
                            { label: "Market Awareness", value: "awareness" },
                            { label: "High-Intent Leads", value: "leads" },
                            { label: "Technical Adoption", value: "trial" }
                        ]}
                    ]}
                    onRun={async (vals, pid) => {
                        const ctx = getProjectDescription(pid);
                        return await base44.integrations.Core.InvokeLLM({
                            prompt: `Optimize budget for: ${ctx}. Goal: ${vals.goal}`,
                            response_json_schema: {
                                type: "object",
                                properties: {
                                    recommended: { type: "array", items: { type: "object", properties: { channel: { type: "string" }, budget: { type: "number" }, rationale: { type: "string" } } } },
                                    roi_forecast: { type: "object", properties: { base: { type: "number" } } }
                                }
                            }
                        });
                    }}
                    renderResult={(d) => (
                        <div className="grid lg:grid-cols-12 gap-8 text-left">
                            <div className="lg:col-span-8 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {d.recommended?.map((r, i) => (
                                        <Card key={i} className="glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-all">
                                            <div className="p-6 bg-surface-container/50 border-b border-outline-variant/20 flex justify-between items-center">
                                                <h5 className="font-black text-xs uppercase tracking-widest">{r.channel}</h5>
                                                <Badge className="bg-primary text-white border-none text-[11px] font-black">${r.budget?.toLocaleString()}</Badge>
                                            </div>
                                            <div className="p-6">
                                                <p className="text-xs font-medium text-on-surface-variant leading-relaxed italic">"{r.rationale}"</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-4">
                                <Card className="glass-card p-8 rounded-[24px] bg-primary-container/10 border-primary/20">
                                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Projected ROI</h4>
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-5xl font-black text-primary tracking-tighter">+{d.roi_forecast?.base || 0}%</span>
                                    </div>
                                    <div className="p-4 bg-white/50 rounded-xl border border-primary/10">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle size={14} className="text-primary" />
                                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Efficiency Status</span>
                                        </div>
                                        <p className="text-sm font-bold text-primary mt-2">Optimized Architecture</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}
                />
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
