import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ExternalLink, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Trash2, 
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Target
} from "lucide-react";
import { format } from "date-fns";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/entities/Project";

const statusConfig = {
  idea: { label: "Idea", color: "bg-surface-container text-on-surface-variant", dot: "bg-outline" },
  mvp: { label: "MVP", color: "bg-secondary-container text-secondary", dot: "bg-secondary" },
  prototype: { label: "Prototype", color: "bg-tertiary-container text-tertiary", dot: "bg-tertiary" },
  product_ready: { label: "Ready", color: "bg-primary-container text-primary", dot: "bg-primary" },
  launched: { label: "Launched", color: "bg-primary-container text-primary shadow-sm", dot: "bg-primary" },
  growth: { label: "Growth", color: "bg-secondary-container text-secondary", dot: "bg-secondary" },
  scaling: { label: "Scaling", color: "bg-outline-variant text-on-surface", dot: "bg-outline" }
};

export default function ProjectCard({ project }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const updateStatus = async (v) => {
    await Project.update(project.id, { status: v });
    window.location.reload();
  };

  const remove = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setIsDeleting(true);
    await Project.delete(project.id);
    window.location.reload();
  };

  const status = statusConfig[project.status] || statusConfig.idea;

  return (
    <div className={`group relative glass-card p-6 rounded-2xl overflow-hidden hover:border-primary/50 ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold text-on-surface truncate tracking-tight group-hover:text-primary transition-colors">
              {project.product_name || project.name}
            </h3>
            <Badge className={`${status.color} border-none text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot} mr-1.5`} />
              {status.label}
            </Badge>
          </div>
          
          <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
            {project.description || "System architecture for scalable technical infrastructure."}
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            {project.target_budget > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Budget</span>
                <div className="flex items-center gap-1.5 text-on-surface font-bold">
                  <DollarSign className="w-3 h-3 text-primary" />
                  <span>${project.target_budget?.toLocaleString()}</span>
                </div>
              </div>
            )}
            {project.launch_date && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Launch</span>
                <div className="flex items-center gap-1.5 text-on-surface font-bold">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span>{format(new Date(project.launch_date), "MMM d, yyyy")}</span>
                </div>
              </div>
            )}
            {project.roi_forecast > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Forecast</span>
                <div className="flex items-center gap-1.5 text-primary font-bold">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{project.roi_forecast}% ROI</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-3 items-end shrink-0 pt-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5 text-on-surface-variant" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <Link to={`/project/${project.id}`} className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Technical Analysis
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={remove} className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Decommission
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Select value={project.status} onValueChange={updateStatus}>
            <SelectTrigger className="w-36 h-9 text-[11px] font-bold uppercase tracking-wider border-outline-variant/50 bg-surface-container-low">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key} className="text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                    {config.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Link to={`/project/${project.id}`}>
            <Button size="sm" className="bg-primary-container text-primary hover:bg-primary/10 border border-primary/20 h-9 px-4 rounded-lg font-bold group/btn shadow-sm">
              Launch OS <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      
      {project.top_regions && project.top_regions.length > 0 && (
        <div className="mt-8 pt-6 border-t border-outline-variant/30">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-3.5 h-3.5 text-primary" />
            <h4 className="font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Market Alignment</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.top_regions.slice(0, 4).map((region, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/50"
              >
                <span className="text-[11px] font-bold text-on-surface uppercase tracking-wide">{region.country}</span>
                <div className="w-px h-3 bg-outline-variant" />
                <span className="text-[11px] font-black text-primary">{region.opportunity_score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
