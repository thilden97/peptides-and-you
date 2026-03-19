import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, CornerDownRight } from 'lucide-react';

const ChatbotPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I am the Peptides and You research assistant. How can I help with your scientific inquiries today?', sender: 'bot' }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-8 right-8 z-100">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-350 sm:w-400 h-[550px] mb-4 flex flex-col overflow-hidden shadow-2xl rounded-2xl border border-border"
          >
            {/* Header */}
            <div className="bg-primary p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                   <Bot size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold outfit-font">Lab Assistant AI</h4>
                  <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">Scientific Core Active</p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-white/70 hover:text-white transition-colors p-1">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-border rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest mt-2 px-1">
                 <CornerDownRight size={12} /> Typical response time: ~2s
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border flex gap-3">
              <input 
                type="text" 
                placeholder="Ask technical questions..." 
                className="flex-1 bg-slate-50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all font-medium"
              />
              <button className="bg-primary w-12 h-12 rounded-xl text-white flex items-center justify-center hover:bg-primary-hover shadow-lg shadow-primary/20">
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        className="w-16 h-16 rounded-full bg-primary shadow-xl shadow-primary/20 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95 border-4 border-white"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
};

export default ChatbotPlaceholder;
