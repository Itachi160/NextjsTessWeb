'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  AlertCircle,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isError?: boolean;
  isStreaming?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: `Hello! Welcome to **Tesseract InfoSystems**.\n\nI am your AI assistant powered by **Tesseract AI**. How can I help you today?\n\n• Custom Software & Clean Architecture\n• Hyperscale Cloud & Kubernetes\n• AI & Deep Learning Orchestrations\n• Careers & Project Cost Estimations`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'Tell me about your AWS Cloud architecture',
  'How much does a project cost?',
  'What open positions do you have?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const setCursorType = useUIStore((state) => state.setCursorType);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp,
    };

    const botMsgId = `bot-${Date.now()}`;
    const botMsgPlaceholder: Message = {
      id: botMsgId,
      sender: 'bot',
      text: '',
      timestamp,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, botMsgPlaceholder]);
    if (!textToSend) setInput('');
    setIsLoading(true);
    setApiError(null);

    const historyPayload = messages
      .filter((m) => !m.isError && m.text.trim().length > 0)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || `HTTP ${response.status} error`);
      }

      const data = await response.json();
      let replyText = data?.reply || data?.error || '';

      if (typeof replyText === 'string' && replyText.startsWith('{') && replyText.endsWith('}')) {
        try {
          const parsed = JSON.parse(replyText);
          if (parsed.reply) replyText = parsed.reply;
        } catch (_) { }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, text: replyText, isStreaming: false }
            : m
        )
      );
      scrollToBottom();
    } catch (err: any) {
      console.error('Streaming Chat error:', err);
      const errMsg = err?.message || 'Failed to connect to Gemini AI service.';
      setApiError(errMsg);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? {
              ...m,
              text: `⚠️ **Connection Error**\n\n${errMsg}`,
              isError: true,
              isStreaming: false,
            }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    setApiError(null);
  };

  const renderFormattedText = (text: string, isStreaming?: boolean) => {
    if (!text && isStreaming) {
      return null;
    }

    const lines = text.split('\n');
    return (
      <>
        {lines.map((line, lIdx) => {
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedParts = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          return (
            <React.Fragment key={lIdx}>
              {formattedParts}
              {lIdx < lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
        {isStreaming && (
          <span className="inline-block w-2 h-3.5 ml-1 bg-cyber-cyan animate-pulse align-middle" />
        )}
      </>
    );
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#03050d]/90 border border-cyber-cyan/30 text-[10px] font-mono text-cyber-cyan tracking-wider font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md pointer-events-none"
            >
              <Sparkles className="w-3 h-3 text-cyber-cyan animate-pulse" />
              <span>Ask Tesseract AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#03050d]/90 border border-cyber-cyan/50 text-white flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:border-cyber-cyan transition-all duration-300 backdrop-blur-xl cursor-pointer overflow-hidden group"
          aria-label="Toggle AI Chat"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 via-cyber-blue/20 to-cyber-purple/20 opacity-50 group-hover:opacity-100 transition-opacity" />

          {isOpen ? (
            <ChevronDown className="w-6 h-6 text-cyber-cyan relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyber-cyan group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyber-green border-2 border-[#03050d]" />
            </div>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[85vh] rounded-3xl border border-white/10 bg-[#03050d]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden font-sans pointer-events-auto overscroll-contain"
          >

            <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyber-cyan/10 blur-[50px] pointer-events-none" />

            <div className="relative z-10 px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                      Tesseract AI
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan">
                      Tesseract AI
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                    <span className="text-[9px] font-mono text-gray-400">
                      ONLINE // STREAMING REALTIME
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                  className="p-2 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                  className="p-2 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              data-lenis-prevent="true"
              className="relative z-10 flex-grow p-4 overflow-y-auto space-y-4 font-sans text-xs scrollbar-thin scrollbar-thumb-white/10 overscroll-contain touch-pan-y"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[82%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl leading-relaxed break-words ${msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-cyan/40 text-white rounded-tr-none shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                        : msg.isError
                          ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-tl-none font-mono text-[11px]'
                          : 'bg-white/[0.04] border border-white/10 text-gray-200 rounded-tl-none font-normal'
                        }`}
                    >
                      {msg.text.length === 0 && msg.isStreaming ? (
                        <div className="flex items-center gap-1.5 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : (
                        renderFormattedText(msg.text, msg.isStreaming)
                      )}
                    </div>
                    <span className="text-[8px] font-mono text-gray-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && !isLoading && (
              <div className="relative z-10 px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                    className="text-[10px] font-mono font-medium text-cyber-cyan bg-cyber-cyan/5 border border-cyber-cyan/20 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/15 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="relative z-10 p-3 border-t border-white/10 bg-white/[0.02] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Gemini about Tesseract..."
                  disabled={isLoading}
                  className="flex-grow bg-white/[0.03] border border-white/10 focus:border-cyber-cyan/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all font-mono"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                  className="btn-cyber-primary p-2.5 rounded-xl text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
