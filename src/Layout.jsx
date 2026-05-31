import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  BarChart3, 
  Search, 
  Lightbulb, 
  Rocket, 
  ShieldAlert, 
  Settings,
  Plus,
  HelpCircle,
  User,
  Bell,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from './lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChatWidget from './components/common/ChatWidget';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Product Builder', path: '/product-builder', icon: Layers },
  { name: 'Market & Fit', path: '/market-product-fit', icon: Search },
  { name: 'Creative Messaging', path: '/creative-messaging', icon: Lightbulb },
  { name: 'Risk Simulation', path: '/risk-simulation', icon: ShieldAlert },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Resources', path: '/resources', icon: Rocket },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background font-sans antialiased">
        {/* Background Grid */}
        <div className="geometric-grid-fixed" />

        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isCollapsed ? 80 : 256 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant fixed h-screen z-50 overflow-hidden"
        >
          {/* Logo Trigger (Replaces the Chevron button) */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-6 mb-4 whitespace-nowrap hover:bg-surface-container-low transition-colors w-full text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-primary/10">
                <Layers className="text-primary" size={24} />
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="overflow-hidden"
                  >
                    <h1 className="font-bold text-xl text-primary leading-none tracking-tighter uppercase">Tenaxai</h1>
                    <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mt-1 uppercase">PRODUCT OS</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>

          <div className="px-4 mb-6 whitespace-nowrap">
            <button className={cn(
              "bg-primary-container text-primary font-bold transition-all active:scale-95 shadow-sm flex items-center gap-2 hover:opacity-90 overflow-hidden",
              isCollapsed ? "w-12 h-12 rounded-xl justify-center" : "w-full py-3 px-4 rounded-lg justify-center"
            )}>
              <Plus size={18} className="shrink-0" />
              {!isCollapsed && <span className="text-xs uppercase tracking-wider">New Project</span>}
            </button>
          </div>
          
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Tooltip key={item.path} delayDuration={0} disableHoverableContent={!isCollapsed}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center rounded-lg transition-all duration-200 whitespace-nowrap overflow-hidden",
                        isCollapsed ? "justify-center p-3" : "px-4 py-3 text-sm font-medium",
                        isActive 
                          ? "bg-primary-container text-primary shadow-sm" 
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                      )}
                    >
                      <Icon className={cn("w-5 h-5 shrink-0", isCollapsed ? "" : "mr-3", isActive ? "text-primary" : "text-on-surface-variant")} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" className="bg-primary text-white border-none font-bold text-[10px] tracking-widest uppercase shadow-xl">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>

          <div className="p-4 border-t border-outline-variant/30 space-y-1 whitespace-nowrap">
            <button className={cn(
                "flex items-center text-on-surface-variant rounded-lg hover:bg-surface-container-high transition-colors overflow-hidden",
                isCollapsed ? "justify-center p-3" : "w-full px-4 py-3 text-sm font-medium"
            )}>
              <HelpCircle className={cn("w-5 h-5 shrink-0", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>Help Center</span>}
            </button>
            <button className={cn(
                "flex items-center text-on-surface-variant rounded-lg hover:bg-surface-container-high transition-colors overflow-hidden",
                isCollapsed ? "justify-center p-3" : "w-full px-4 py-3 text-sm font-medium"
            )}>
              <User className={cn("w-5 h-5 shrink-0", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>Account</span>}
            </button>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <motion.div 
          initial={false}
          animate={{ paddingLeft: isCollapsed ? 80 : 256 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 flex flex-col min-h-screen"
        >
          {/* Top Bar */}
          <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/50 h-16 flex items-center justify-between px-gutter">
            <div className="flex items-center gap-8">
              <nav className="hidden lg:flex items-center gap-6">
                <Link to="/" className="text-on-surface-variant hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">Overview</Link>
                <Link to="/dashboard" className="text-on-surface-variant hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">Performance</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                <input 
                  type="text" 
                  placeholder="Search markets..." 
                  className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                />
              </div>
              <button className="p-2 rounded-full hover:bg-surface-container-low transition-all">
                <Bell size={20} className="text-on-surface-variant" />
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-secondary-container">
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-primary">JD</div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto animate-fade-in relative">
            <div className="max-w-container-max mx-auto p-8">
              {children}
            </div>
          </main>
        </motion.div>

        <ChatWidget />
      </div>
    </TooltipProvider>
  );
};

export default Layout;
