import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Globe, Zap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsOverview({ projects }) {
  const activeProjects = projects.filter(p => p.status === 'launched').length;
  const totalBudget = projects.reduce((sum, p) => sum + (p.target_budget || 0), 0);
  const avgROI = projects.length > 0 ? 
    projects.reduce((sum, p) => sum + (p.roi_forecast || 0), 0) / projects.length : 0;
  const uniqueRegions = new Set();
  projects.forEach(p => {
    p.top_regions?.forEach(r => uniqueRegions.add(r.country));
  });

  const stats = [
    {
      title: "Active Launches",
      value: activeProjects.toString(),
      change: "+2 new",
      icon: Target,
    },
    {
      title: "Total Budget",
      value: `$${(totalBudget / 1000).toFixed(0)}k`,
      change: "Allocated",
      icon: TrendingUp, 
    },
    {
      title: "Avg ROI Forecast",
      value: projects.length > 0 ? `+${avgROI.toFixed(0)}%` : "0%",
      change: "Projected",
      icon: Zap,
    },
    {
      title: "Markets Explored",
      value: uniqueRegions.size > 0 ? uniqueRegions.size.toString() : projects.length.toString(),
      change: "Active regions",
      icon: Globe,
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-card hover:border-primary/30 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center border border-primary/10 transition-transform group-hover:scale-105">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="bg-surface-container px-2 py-1 rounded-md text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Live
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{stat.title}</p>
                <p className="text-3xl font-bold text-on-surface tracking-tighter">{stat.value}</p>
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-medium text-on-surface-variant italic">{stat.change}</span>
                  <ArrowUpRight className="w-3 h-3 text-primary opacity-50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
