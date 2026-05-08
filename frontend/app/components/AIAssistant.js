'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './AIAssistant.module.css';

const mockResponses = [
  "Based on your travel preferences, I'd recommend visiting during the shoulder season for better prices and fewer crowds.",
  "For this destination, allocate about 30% of your budget to food — the local cuisine is one of the highlights!",
  "I can reroute your Day 3 itinerary to include the hidden gem you asked about. Want me to update the full plan?",
  "The weather looks perfect for your travel dates. I'd recommend packing light layers for the evenings.",
  "Based on your interest in photography, I found 3 underrated spots that most tourists miss. Shall I add them?",
  "Great choice! This destination is known for its incredible street food scene. I've bookmarked 5 must-try spots for you.",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your AI travel assistant. Ask me anything about your trip!" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: input }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages((m) => [...m, { role: 'ai', text: reply }]);
      setTyping(false);
    }, 1200);
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
              <div className={styles.aiIcon}>🤖</div>
              <div>
                <div className={styles.aiName}>AI Travel Assistant</div>
                <div className={styles.aiStatus}>● Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>✕</button>
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
              placeholder="Ask about your trip..."
            />
            <button className={styles.sendBtn} onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
      <button className={styles.fab} onClick={() => setOpen(!open)}>
        {open ? '✕' : '🤖'}
      </button>
    </div>
  );
}
