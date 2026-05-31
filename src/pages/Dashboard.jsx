import React, { useState, useEffect } from "react";
import { Project } from "@/entities/Project";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  Target, 
  Globe, 
  Sparkles, 
  Zap,
  ArrowRight,
  Rocket,
  TrendingUp,
  Play
} from "lucide-react";
import { motion } from "framer-motion";

import ProjectCard from "../components/dashboard/ProjectCard";
import StatsOverview from "../components/dashboard/StatsOverview";
import RecentActivity from "../components/dashboard/RecentActivity";

const base44 = { entities: { Project } };

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [me, setMe] = useState(null);

  useEffect(() => {
    (async () => {
      try { 
        const u = await User.me(); 
        setMe(u || null); 
      } catch (error) {
        console.error("Failed to load user:", error);
        setMe(null);
      }
      await loadProjects();
    })();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await Project.list("-created_date");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let needsRefresh = false;
    for (const p of data) {
      if (p.launch_date) {
        const launchDate = new Date(p.launch_date);
        launchDate.setHours(0, 0, 0, 0);
        if (launchDate < today && p.status !== "launched") {
          await Project.update(p.id, { status: "launched" });
          needsRefresh = true;
        }
      }
    }
    const finalProjects = needsRefresh ? await Project.list("-created_date") : data;
    setProjects(finalProjects);
    setIsLoading(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen grid-bg px-6 lg:px-10 py-8">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <p className="label-caps text-[#4d661c] mb-1">Command Center</p>
            <h1 className="text-3xl font-bold text-[#191c1e] dark:text-white tracking-tight">
              {getGreeting()}, <span className="text-[#4d661c] dark:text-[#d9f99d]">{me?.full_name?.split(' ')[0] || 'there'}</span>
            </h1>
            <p className="text-[#75796a] mt-1">Your AI-powered launch command center</p>
          </div>
          <Link to={createPageUrl("ProductBuilder")}>
            <button className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg">
              <Plus className="w-4 h-4" />
              New Launch
            </button>
          </Link>
        </motion.div>

        {/* Pricing warning */}
        {projects.some(p => p.status === "launched" && !p.pricing_info) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-[#fef3c7] border border-[#fcd34d] rounded-xl text-[#92400e] flex items-center gap-3"
          >
            <div className="p-2 bg-[#fcd34d]/40 rounded-lg flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-sm">Action Required</p>
              <p className="text-xs opacity-80">One or more launched projects are missing pricing information.</p>
            </div>
          </motion.div>
        )}

        {/* Stats Overview */}
        <StatsOverview projects={projects} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="tenax-card overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e1e3e4]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d9f99d] flex items-center justify-center">
                    <Target className="w-4 h-4 text-[#364e03]" />
                  </div>
                  <h2 className="font-semibold text-[#191c1e] dark:text-white">Active Projects</h2>
                </div>
                <span className="badge-lime label-caps px-2.5 py-1 rounded-full">{projects.length} total</span>
              </div>
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="skeleton h-24 rounded-xl" />
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 mx-auto mb-5 bg-[#d9f99d] rounded-2xl flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-[#364e03]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#191c1e] dark:text-white mb-2">Ready to Launch?</h3>
                    <p className="text-[#75796a] text-sm mb-6 max-w-xs mx-auto">
                      Create your first project to unlock AI-powered market insights
                    </p>
                    <Link to={createPageUrl("ProductBuilder")}>
                      <button className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg">
                        <Sparkles className="w-4 h-4" />
                        Create Your First Project
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <RecentActivity projects={projects} />

            {/* Quick Actions */}
            <div className="tenax-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#d9f99d] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#364e03]" />
                </div>
                <h3 className="font-semibold text-[#191c1e] dark:text-white text-sm">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Run Project", icon: Play, page: "ProductBuilder" },
                  { label: "Explore Markets", icon: Globe, page: "MarketFinder" },
                  { label: "Generate Ads", icon: Sparkles, page: "CreativeMessaging" },
                  { label: "View Analytics", icon: TrendingUp, page: "AnalyticsForecasting" },
                ].map((action, i) => (
                  <Link key={i} to={createPageUrl(action.page)} className="block">
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#f3f4f5] dark:hover:bg-[#252830] transition-colors cursor-pointer group">
                      <span className="flex items-center gap-2.5 text-sm text-[#44483b] dark:text-[#c5c8b7] font-medium">
                        <action.icon className="w-4 h-4 text-[#75796a]" />
                        {action.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c5c8b7] group-hover:text-[#4d661c] transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}