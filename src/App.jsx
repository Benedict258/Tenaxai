import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from './lib/AuthContext';
import { Loader2, ShieldAlert, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

// Error Boundary for debugging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-20 text-center bg-white min-h-screen">
          <h1 className="text-2xl font-bold text-destructive uppercase tracking-tighter">System Failure</h1>
          <pre className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-left overflow-auto max-w-2xl mx-auto font-mono">
            {this.state.error?.toString()}
          </pre>
          <Button onClick={() => window.location.reload()} className="mt-8 bg-primary text-white h-12 px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest">Re-Initialize Core</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Import all pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import AnalyticsForecasting from './pages/AnalyticsForecasting';
import AudienceChannels from './pages/AudienceChannels';
import BMCBuilder from './pages/BMCBuilder';
import Copilot from './pages/Copilot';
import CreativeLab from './pages/CreativeLab';
import CreativeMessaging from './pages/CreativeMessaging';
import Insights from './pages/Insights';
import MarketFinder from './pages/MarketFinder';
import MarketProductFit from './pages/MarketProductFit';
import PlanningReadiness from './pages/PlanningReadiness';
import PlaybooksModes from './pages/PlaybooksModes';
import PostLaunch from './pages/PostLaunch';
import ProductBuilder from './pages/ProductBuilder';
import ProjectView from './pages/ProjectView';
import Resources from './pages/Resources';
import RiskSimulation from './pages/RiskSimulation';
import PageNotFound from './lib/PageNotFound';

function App() {
  const { isLoadingPublicSettings, isLoadingAuth, authError, navigateToLogin, isAuthenticated, user } = useAuth();

  // 1. Show loader while checking state
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center justify-center space-y-4 text-left">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-[#4d661c]/20 rounded-full animate-ping" />
          <Loader2 className="w-16 h-16 animate-spin text-[#4d661c]" />
        </div>
        <p className="text-[10px] font-black text-[#44483b] uppercase tracking-[0.2em]">Synchronizing Systems...</p>
      </div>
    );
  }

  // 2. If Authenticated, ALWAYS allow access to routes
  if (isAuthenticated && user) {
    return (
        <ErrorBoundary>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/analytics-forecasting" element={<AnalyticsForecasting />} />
                <Route path="/audience-channels" element={<AudienceChannels />} />
                <Route path="/bmc-builder" element={<BMCBuilder />} />
                <Route path="/copilot" element={<Copilot />} />
                <Route path="/creative-lab" element={<CreativeLab />} />
                <Route path="/creative-messaging" element={<CreativeMessaging />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/market-finder" element={<MarketFinder />} />
                <Route path="/market-product-fit" element={<MarketProductFit />} />
                <Route path="/planning-readiness" element={<PlanningReadiness />} />
                <Route path="/playbooks-modes" element={<PlaybooksModes />} />
                <Route path="/post-launch" element={<PostLaunch />} />
                <Route path="/product-builder" element={<ProductBuilder />} />
                <Route path="/project/:id" element={<ProjectView />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/risk-simulation" element={<RiskSimulation />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
      );
  }

  // 3. Handle specific errors for unauthenticated users
  if (authError && authError.type === 'auth_required') {
    return (
        <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 text-left animate-fade-in">
            <div className="max-w-md w-full bg-white border border-[#c5c8b7] p-12 rounded-[32px] shadow-xl text-center space-y-8">
                <div className="w-20 h-20 bg-[#d9f99d] rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-[#4d661c]/10">
                    <Lock className="text-[#4d661c] w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-[#191c1e] uppercase tracking-tight">System Locked</h2>
                    <p className="text-[#44483b] font-medium leading-relaxed">Authentication is required to access the Tenaxai Fleet Command.</p>
                </div>
                <Button onClick={navigateToLogin} className="w-full bg-[#4d661c] text-white h-14 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-widest hover:bg-[#364e03] transition-all">
                    Initialize Login Sequence
                </Button>
            </div>
        </div>
    );
  }

  if (authError && authError.type === 'user_not_registered') {
    return (
        <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 text-left animate-fade-in">
            <div className="max-w-md w-full bg-white border border-[#c5c8b7] p-12 rounded-[32px] shadow-xl text-center space-y-8">
                <div className="w-20 h-20 bg-secondary-container rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-secondary/10">
                    <ShieldAlert className="text-secondary w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-[#191c1e] uppercase tracking-tight text-center">Access Denied</h2>
                    <p className="text-[#44483b] font-medium leading-relaxed text-center">Your identity is verified, but you are not registered for this technical architecture.</p>
                    <p className="text-xs text-on-surface-variant italic text-center">Contact the system administrator to request unit access.</p>
                </div>
                <Button asChild variant="outline" className="w-full border-outline-variant h-14 rounded-xl font-bold uppercase text-[10px] tracking-widest">
                    <a href="https://tenaxai.base44.app" target="_blank" rel="noopener noreferrer">Request Registration</a>
                </Button>
                <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="text-[10px] font-bold text-on-surface-variant uppercase hover:text-primary transition-colors">Switch Account</button>
            </div>
        </div>
    );
  }

  // 4. Default Fallback (Critical Error)
  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 text-left animate-fade-in">
        <div className="max-w-md w-full bg-white border border-[#c5c8b7] p-12 rounded-[32px] shadow-xl text-center space-y-8">
            <div className="w-20 h-20 bg-destructive/10 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-destructive/10">
                <AlertCircle className="text-destructive w-10 h-10" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#191c1e] uppercase tracking-tight text-center">Sync Failure</h2>
                <p className="text-[#44483b] font-medium leading-relaxed italic text-center">"{authError?.message || "Critical connection timeout"}"</p>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full bg-[#191c1e] text-white h-14 rounded-xl font-bold shadow-lg uppercase text-[10px] tracking-widest">
                Retry Synchronization
            </Button>
        </div>
    </div>
  );
}

export default App;
