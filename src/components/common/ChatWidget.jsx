import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Save, Sparkles, Bot, User as UserIcon, Trash2, Cpu } from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";
import { Project } from "@/entities/Project";
import { SavedItem } from "@/entities/SavedItem";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const storageKey = `flux_chat_${projectId || "noproj"}`;

  useEffect(() => {
    Project.list("-created_date").then(p => { 
      setProjects(p || []); 
      if (p && p.length > 0) setProjectId(p[0].id); 
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch { setMessages(getDefaultMessage()); }
    } else {
      setMessages(getDefaultMessage());
    }
  }, [projectId, storageKey]);

  const getDefaultMessage = () => [{ 
    role: "system", 
    content: "You are MarketMentor, a helpful AI assistant specialized in product launches, marketing strategy, and growth tactics." 
  }];

  useEffect(() => {
    const id = setInterval(() => {
      if (messages.length > 1) {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      }
    }, 6000);
    return () => clearInterval(id);
  }, [messages, storageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input, ts: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    let context = "";
    const proj = projects.find(x => x.id === projectId);
    if (proj) {
      context = `PROJECT: name=${proj.product_name}; category=${proj.category}; goal=${proj.primary_goal}; price=${proj.price?proj.price+" "+(proj.currency||"USD"):"N/A"}`;
    }

    try {
        const res = await InvokeLLM({
          prompt: `SYSTEM: Act as MarketMentor. Reply in clean Markdown.
- Format links as [Source: Title](https://url).
- No stray symbols or raw JSON.
- Keep answers concise.
CONTEXT:
${context}
CHAT:
${messages.filter(m=>m.role!=="system").slice(-6).map(m=>`${m.role.toUpperCase()}: ${m.content}`).join("\n")}
USER: ${currentInput}
ASSISTANT:`,
          add_context_from_internet: true
        });

        const content = typeof res === "string" ? res : (res.reply || res.output || JSON.stringify(res));
        const assistantMsg = { role: "assistant", content, ts: new Date().toISOString() };
        setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
        console.error("Chat Error:", e);
        setMessages(prev => [...prev, { role: "assistant", content: "System connection interrupted. Please check your network and retry.", ts: new Date().toISOString() }]);
    }
    setLoading(false);
  };

  const saveThread = async () => {
    try {
        const me = await User.me().catch(()=>null);
        await SavedItem.create({
          user_id: me?.id || "",
          project_id: projectId || undefined,
          tab_name: "Learning Hub",
          subtab_name: "MarketMentor",
          title: `Chat Session: ${new Date().toLocaleDateString()}`,
          content_type: "text",
          content_text: messages.filter(m=>m.role!=="system").map(m=>`${m.role}: ${m.content}`).join("\n").slice(0, 500),
          content_json: { messages }
        });
        alert("Session committed to vault.");
    } catch (e) {
        console.error("Failed to save chat", e);
    }
  };

  const clearChat = () => {
    if (!confirm("Clear chat history?")) return;
    setMessages(getDefaultMessage());
    localStorage.removeItem(storageKey);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-[100] bg-[#191c1e] text-[#d9f99d] rounded-2xl w-14 h-14 flex items-center justify-center shadow-xl border border-white/10 transition-all"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[100] w-[420px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-xl rounded-[24px] shadow-2xl border border-outline-variant/50 overflow-hidden flex flex-col flex-left"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center border border-primary/10">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-on-surface text-sm uppercase tracking-widest">MarketMentor</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Agent Unit 06</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={projectId} 
                  onChange={(e) => setProjectId(e.target.value)} 
                  className="text-[10px] font-bold uppercase tracking-widest border border-outline-variant/30 rounded-lg px-3 py-1.5 bg-white/50 focus:ring-1 focus:ring-primary/20 outline-none max-w-[120px] truncate"
                >
                  <option value="">No Context</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.product_name || p.name}</option>)}
                </select>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-outline-variant">
              {messages.filter(m => m.role !== "system").map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div className={cn(
                    "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border",
                    m.role === "user" ? "bg-primary-container border-primary/10" : "bg-surface-container-highest border-outline-variant/30"
                  )}>
                    {m.role === "user" ? <UserIcon className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-on-surface" />}
                  </div>
                  <div className={cn("max-w-[85%] space-y-1 text-left", m.role === "user" ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                      m.role === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white border border-outline-variant/30 text-on-surface rounded-tl-none"
                    )}>
                      <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-li:my-0">
                        {m.content}
                      </ReactMarkdown>
                    </div>
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest px-1">
                      {new Date(m.ts || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                    <Bot className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="flex gap-1.5 p-3 bg-surface-container-low rounded-xl rounded-tl-none border border-outline-variant/20">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-outline-variant/30 bg-surface-container/20">
              <div className="relative group">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Inquire about strategy..."
                  className="w-full bg-white border border-outline-variant/50 rounded-2xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                />
                <button 
                  onClick={send} 
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-30 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button 
                  onClick={clearChat}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:text-destructive transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={12} /> Clear Logs
                </button>
                <button 
                  onClick={saveThread} 
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Save size={12} /> Commit to Vault
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
