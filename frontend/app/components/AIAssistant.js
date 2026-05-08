'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './AIAssistant.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const IconBot = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am YatrAI — your India travel companion. Ask me about trains, budgets, hidden gems, weather, or anything about your trip!' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: 'user', text: userMsg }]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch(`${API_URL}/api/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'ai', text: data.reply || 'Sorry, I could not get a response. Please try again.' }]);
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: 'Unable to reach AI right now. Please check your connection and try again.' }]);
    } finally {
      setTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.aiIcon}><IconBot /></div>
              <div>
                <div className={styles.aiName}>YatrAI Assistant</div>
                <div className={styles.aiStatus}>Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}><IconClose /></button>
          </div>
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.message} ${m.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className={`${styles.message} ${styles.aiMsg}`}>
                <span className={styles.typing}>
                  <span></span><span></span><span></span>
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about trains, budget, places..."
            />
            <button className={styles.sendBtn} onClick={sendMessage}><IconSend /></button>
          </div>
        </div>
      )}
      <button className={styles.fab} onClick={() => setOpen(!open)}>
        {open ? <IconClose /> : <IconBot />}
      </button>
    </div>
  );
}
