import React, { useEffect, useState, useRef } from 'react';
import { MessageCircleIcon, XIcon, SendIcon, RefreshCwIcon, MinimizeIcon, SparklesIcon } from 'lucide-react';
import { useOpenAI } from '../hooks/useOpenAI';
import { Button } from './Button';
export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat
  } = useOpenAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen]);
  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };
  const suggestedQuestions = ['What is civil asset forfeiture?', 'How do I claim my seized property?', 'What are the deadlines for filing?', 'Do I need an attorney?'];
  return <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div className={`
          pointer-events-auto
          bg-white rounded-2xl shadow-2xl border border-gray-200
          w-full sm:w-[400px] h-[600px] max-h-[80vh]
          flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out origin-bottom-right
          mb-4
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none absolute'}
        `} role="dialog" aria-label="AI Legal Assistant Chat">
        {/* Header */}
        <div className="bg-[var(--color-navy)] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <SparklesIcon className="w-5 h-5 text-[var(--color-gold)]" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">
                Legal Assistant
              </h2>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={resetChat} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white" title="Reset conversation" aria-label="Reset conversation">
              <RefreshCwIcon className="w-4 h-4" />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white" title="Close chat" aria-label="Close chat">
              <MinimizeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg, index) => <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                  max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user' ? 'bg-[var(--color-gold)] text-[var(--color-navy)] font-medium rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}
                `}>
                {msg.content}
              </div>
            </div>)}

          {isLoading && <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '0ms'
            }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '150ms'
            }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '300ms'
            }} />
              </div>
            </div>}

          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
              {error}
            </div>}

          {/* Suggested Questions (only show if just initial message) */}
          {messages.length === 1 && !isLoading && <div className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ml-1">
                Suggested Questions
              </p>
              <div className="flex flex-col gap-2">
                {suggestedQuestions.map((q, i) => <button key={i} onClick={() => sendMessage(q)} className="text-left p-3 bg-white hover:bg-[var(--color-gold)]/10 border border-gray-200 hover:border-[var(--color-gold)] rounded-xl text-sm text-[var(--color-navy)] transition-colors duration-200">
                    {q}
                  </button>)}
              </div>
            </div>}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
            <input ref={inputRef} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your question..." disabled={isLoading} className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent focus:bg-white transition-all disabled:opacity-60 text-sm" />
            <button type="submit" disabled={!inputValue.trim() || isLoading} className="absolute right-2 p-2 bg-[var(--color-navy)] text-white rounded-lg hover:bg-[#2a3b5e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Send message">
              <SendIcon className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            AI can make mistakes. Verify important legal information.
          </p>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className={`
          pointer-events-auto
          group relative flex items-center justify-center
          w-14 h-14 rounded-full shadow-lg
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-[var(--color-gold)]/50
          ${isOpen ? 'bg-gray-200 text-gray-600 rotate-90 hover:bg-gray-300' : 'bg-[var(--color-navy)] text-white hover:bg-[#2a3b5e] hover:scale-105'}
        `} aria-label={isOpen ? 'Close chat' : 'Open AI Legal Assistant'} aria-expanded={isOpen}>
        {isOpen ? <XIcon className="w-6 h-6 transition-transform duration-300 -rotate-90" /> : <>
            <MessageCircleIcon className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-gold)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-gold)]"></span>
            </span>
          </>}
      </button>
    </div>;
}