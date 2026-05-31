import React from 'react';
import { Terminal, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20 border-t border-outline-variant/30 text-left">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Terminal className="text-white" size={18} />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Tenaxai</span>
          </div>
          <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed font-medium">
            Engineering the future of agentic product launches. Built with technical rigor for the next generation of scalable infrastructure.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Platform</h4>
          <ul className="space-y-2 text-sm font-bold text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">Infrastructure</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Simulations</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Agent SDK</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="text-on-surface-variant hover:text-on-surface transition-all"><Github size={20} /></a>
            <a href="#" className="text-on-surface-variant hover:text-on-surface transition-all"><Twitter size={20} /></a>
            <a href="#" className="text-on-surface-variant hover:text-on-surface transition-all"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Tenaxai Systems Architecture. All rights reserved.
        </p>
        <div className="flex gap-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          <a href="#" className="hover:text-primary">Security</a>
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
