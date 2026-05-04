import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, CornerDownRight, Sparkles, Loader2 } from 'lucide-react';

const ChatbotPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I am the Peptides & You AI Assistant. How can I help you find the right peptide today?', sender: 'bot' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // READY FOR GEMINI API INTEGRATION
  // This function is built to immediately plug into Gemini 1.5 Flash / 2.5
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            // We pass the full conversation history to maintain context
            messages: [...messages, userMessage] 
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data.reply) {
          setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
        } else {
          setMessages(prev => [...prev, { text: "I'm having trouble thinking right now. Please try again later.", sender: 'bot' }]);
        }
        setIsTyping(false);

      } catch (error) {
        console.error("Error connecting to Chat API:", error);
        setMessages(prev => [...prev, { text: "Connection error. Ensure the Gemini API key is configured in the Cloudflare dashboard.", sender: 'bot' }]);
        setIsTyping(false);
      }
  };

  return (
    <div style={{position: 'fixed', bottom: 24, right: 24, zIndex: 200}}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            style={{
              width: 360, height: 520, marginBottom: 12,
              background: '#fff', borderRadius: 16,
              boxShadow: '0 16px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(31,111,178,0.1)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #1F6FB2, #4FBF9F)', padding: '16px 18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff',
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{background: 'rgba(255,255,255,0.2)', padding: 7, borderRadius: 8}}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="montserrat" style={{fontSize: 15, fontWeight: 700}}>Gemini AI Assistant</div>
                  <div style={{fontSize: 10, opacity: 0.9, fontWeight: 600, letterSpacing: '0.06em'}}>POWERED BY GOOGLE REASONING</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{background: 'none', color: 'rgba(255,255,255,0.8)', padding: 4, cursor: 'pointer', border: 'none'}}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{flex: 1, padding: '20px 16px', overflowY: 'auto', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 16}}>
              {messages.map((msg, i) => (
                <div key={i} style={{display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'}}>
                  <div style={{
                    maxWidth: '85%', padding: '12px 16px', borderRadius: 14,
                    fontSize: 14, lineHeight: 1.6,
                    ...(msg.sender === 'user'
                      ? { background: 'var(--primary)', color: '#fff', borderBottomRightRadius: 4 }
                      : { background: '#fff', color: 'var(--text)', border: '1px solid var(--border)', borderBottomLeftRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }
                    ),
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                  <div style={{
                    background: '#fff', border: '1px solid var(--border)', borderRadius: 14, borderBottomLeftRadius: 4,
                    padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-light)'
                  }}>
                    <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1.5s linear infinite' }} />
                    <span style={{fontSize: 13}}>Gemini is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} style={{padding: '14px 16px', background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', gap: 10}}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about our peptides..."
                style={{
                  flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10,
                  padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'inherit', color: 'var(--text)',
                }} 
              />
              <button 
                type="submit"
                disabled={!inputText.trim()}
                style={{
                  background: inputText.trim() ? 'linear-gradient(135deg, #1F6FB2, #4FBF9F)' : '#e2e8f0', 
                  width: 42, height: 42, borderRadius: 10,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: inputText.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1F6FB2, #4FBF9F)', color: '#fff',
          boxShadow: '0 8px 24px rgba(31,111,178,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '3px solid #fff', transition: 'transform 0.25s', cursor: 'pointer'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={26} /> : <Bot size={26} />}
      </button>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ChatbotPlaceholder;
