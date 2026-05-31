import React, { useState, useEffect } from "react";
import { Project } from "@/entities/Project";
import { SavedItem } from "@/entities/SavedItem";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  Search, 
  Globe, 
  ExternalLink, 
  Bookmark, 
  Loader2, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  DollarSign,
  MapPin,
  Sparkles
} from "lucide-react";

export default function Resources() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("tools");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [savedItems, setSavedItems] = useState({});

  useEffect(() => {
    Project.list("-created_date").then(p => {
      setProjects(p);
      if (p.length > 0) setSelectedProject(p[0].id);
    });
  }, []);

  const getProductContext = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return "";
    return project.document_content || project.description || project.product_name || "";
  };

  const searchResources = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setResults(null);

    const productContext = getProductContext();
    
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `SYSTEM: You are a professional resource researcher. Search the web for the MOST UP-TO-DATE information and provide accurate, current results.

SEARCH QUERY: ${searchQuery}
CATEGORY: ${category}
FILTERS: ${filters || 'None'}
PRODUCT CONTEXT: ${productContext || 'General search'}

Search for real, current resources matching the query. For each result provide:
- name: exact tool/service/resource name
- url: actual working URL (verify it's a real website)
- description: what it does and key features
- pricing: current pricing information (free, freemium, paid with price range)
- regions: where it's available
- pros: 2-3 key advantages
- cons: 1-2 limitations
- fit_reason: why this fits the user's needs
- rating: estimated quality score 1-10
- last_updated: when the info was last verified (use current date)

Return 5-8 highly relevant, REAL resources with accurate current information.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                url: { type: "string" },
                description: { type: "string" },
                pricing: { type: "string" },
                regions: { type: "string" },
                pros: { type: "array", items: { type: "string" } },
                cons: { type: "array", items: { type: "string" } },
                fit_reason: { type: "string" },
                rating: { type: "number" },
                last_updated: { type: "string" }
              }
            }
          },
          search_summary: { type: "string" },
          related_searches: { type: "array", items: { type: "string" } }
        }
      }
    });

    setResults(res);
    setLoading(false);
  };

  const saveResource = async (resource) => {
    if (!selectedProject) {
      alert("Please select a project first");
      return;
    }
    
    await SavedItem.create({
      project_id: selectedProject,
      tab_name: "Resources",
      subtab_name: category,
      title: resource.name,
      content_type: "resource",
      content_text: resource.description,
      metadata: resource
    });
    
    setSavedItems(prev => ({ ...prev, [resource.name]: true }));
  };

  const categoryOptions = [
    { value: "tools", label: "Tools & Software" },
    { value: "suppliers", label: "Suppliers & Vendors" },
    { value: "talent", label: "Talent & Agencies" },
    { value: "marketing", label: "Marketing Platforms" },
    { value: "analytics", label: "Analytics & Data" },
    { value: "design", label: "Design Resources" },
    { value: "development", label: "Development Tools" },
    { value: "ai", label: "AI & Automation" }
  ];

  return (
    <div className="min-h-screen grid-bg px-6 lg:px-10 py-8">
      <div className="max-w-[1280px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="label-caps text-[#4d661c] mb-1">AI-Powered Search</p>
          <h1 className="text-3xl font-bold text-[#191c1e] dark:text-white tracking-tight mb-1">Resource Finder</h1>
          <p className="text-[#75796a] text-sm">Discover AI-curated tools, suppliers, and talent with real-time web search</p>
        </motion.div>

        {/* Search Card */}
        <div className="tenax-card mb-6">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e1e3e4]">
            <div className="w-8 h-8 rounded-lg bg-[#d9f99d] flex items-center justify-center">
              <Search className="w-4 h-4 text-[#364e03]" />
            </div>
            <h2 className="font-semibold text-[#191c1e] dark:text-white">Search Resources</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="font-medium">Product Context (optional)</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a product for context" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>No product context</SelectItem>
                    {projects.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.product_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="font-medium">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="font-medium">What are you looking for?</Label>
                <Textarea
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., CRM software with email automation for startups, free tier preferred..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
              
              <div>
                <Label className="font-medium">Filters (optional)</Label>
                <Input
                  value={filters}
                  onChange={(e) => setFilters(e.target.value)}
                  placeholder="e.g., free, US-based, team size 1-10, integrates with Slack"
                  className="mt-1"
                />
              </div>
              
              <button
                onClick={searchResources}
                disabled={loading || !searchQuery.trim()}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 h-11 text-sm font-semibold rounded-lg disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Searching the web...</>
                ) : (
                  <><Globe className="w-4 h-4" /> Search Resources</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {results.search_summary && (
              <div className="tenax-card p-4 bg-[#d9f99d]/20 border-[#b3d17a]">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#4d661c] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#364e03]">{results.search_summary}</p>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {(results.results || []).map((resource, i) => (
                <div key={i} className="tenax-card p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-foreground">{resource.name}</h3>
                          <Badge className={`${resource.rating >= 8 ? 'badge-green' : resource.rating >= 6 ? 'badge-blue' : 'badge-orange'}`}>
                            {resource.rating}/10
                          </Badge>
                        </div>
                        
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#4d661c] hover:underline flex items-center gap-1 mb-3"
                        >
                          {resource.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        
                        <p className="text-muted-foreground mb-4">{resource.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Pricing</p>
                              <p className="text-sm text-muted-foreground">{resource.pricing}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Regions</p>
                              <p className="text-sm text-muted-foreground">{resource.regions}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium mb-1">
                              <ThumbsUp className="w-4 h-4" /> Pros
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {(resource.pros || []).map((pro, j) => (
                                <li key={j} className="flex items-start gap-1">
                                  <span className="text-green-500">+</span> {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-orange-600 text-sm font-medium mb-1">
                              <ThumbsDown className="w-4 h-4" /> Cons
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {(resource.cons || []).map((con, j) => (
                                <li key={j} className="flex items-start gap-1">
                                  <span className="text-orange-500">-</span> {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {resource.fit_reason && (
                          <div className="mt-4 p-3 bg-[#d9f99d]/20 border border-[#b3d17a] rounded-lg">
                            <p className="text-sm text-[#364e03]">
                              <span className="font-medium">Why it fits: </span>
                              {resource.fit_reason}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button onClick={() => saveResource(resource)} disabled={savedItems[resource.name]}
                          className="btn-ghost-outline inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg disabled:opacity-60 whitespace-nowrap">
                          {savedItems[resource.name] ? <><Check className="w-3.5 h-3.5 text-[#4d661c]" /> Saved</> : <><Bookmark className="w-3.5 h-3.5" /> Save</>}
                        </button>
                        <button onClick={() => window.open(resource.url, '_blank')}
                          className="btn-ghost-outline inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg whitespace-nowrap">
                          <ExternalLink className="w-3.5 h-3.5" /> Visit
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {results.related_searches?.length > 0 && (
              <div className="tenax-card p-5">
                <p className="label-caps text-[#75796a] mb-3">Related Searches</p>
                <div className="flex flex-wrap gap-2">
                  {results.related_searches.map((search, i) => (
                    <button key={i} onClick={() => { setSearchQuery(search); searchResources(); }}
                      className="btn-ghost-outline text-xs px-3 py-1.5 rounded-lg">
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}