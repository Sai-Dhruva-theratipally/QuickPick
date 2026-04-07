import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const Chat = () => {
  const { user, setCartItems } = useAppContext();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! What would you like to cook or add to your cart today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Load chat history on mount when user is logged in
  useEffect(() => {
    if (!user?._id || historyLoaded) return;
    const loadHistory = async () => {
      try {
        const res = await axios.get('/api/chat/history');
        if (res.data?.success && res.data.messages?.length > 0) {
          setMessages([
            { sender: 'ai', text: 'Hi! What would you like to cook or add to your cart today?' },
            ...res.data.messages.map(m => ({ sender: m.sender, text: m.text }))
          ]);
        }
      } catch (err) {
        console.warn('Could not load chat history:', err.message);
      }
      setHistoryLoaded(true);
    };
    loadHistory();
  }, [user, historyLoaded]);

  const handleSend = async () => {
    if (!input.trim() || !user?._id) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input immediately after sending
    setLoading(true);
    try {
      const res = await axios.post('/api/chat/process', {
        userId: user._id,
        message: input
      });
      if (res.data && res.data.aiResult) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: res.data.reply
          }
        ]);
        // Update cart in context immediately after successful response
        if (res.data.cartItems) {
          setCartItems(res.data.cartItems);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: 'Sorry, I could not process your request.' }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'There was an error processing your request.' }
      ]);
    }
    setLoading(false);
  };

  const handleClearChat = async () => {
    try {
      await axios.delete('/api/chat/history');
    } catch (err) {
      console.warn('Could not clear chat history:', err.message);
    }
    setMessages([
      { sender: 'ai', text: 'Hi! What would you like to cook or add to your cart today?' }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading && user?._id) {
      handleSend();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>QuickPick Chat Assistant</h2>
        {user && messages.length > 1 && (
          <button
            onClick={handleClearChat}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              fontSize: 13,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Clear Chat
          </button>
        )}
      </div>
      <div style={{ minHeight: 300, maxHeight: 400, overflowY: 'auto', marginBottom: 16, padding: 8, background: '#f9f9f9', borderRadius: 8 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.sender === 'user' ? 'right' : 'left',
            margin: '8px 0'
          }}>
            <span style={{
              display: 'inline-block',
              background: msg.sender === 'user' ? '#d1e7dd' : '#e2e3e5',
              color: '#222',
              borderRadius: 16,
              padding: '8px 16px',
              maxWidth: '80%',
              wordBreak: 'break-word',
              whiteSpace: 'pre-line'
            }}>{msg.text}</span>
          </div>
        ))}
        {loading && <div style={{ textAlign: 'left', color: '#888' }}>AI is typing...</div>}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder={user ? "Type your recipe or grocery request..." : "Please login to use chat"}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
          disabled={loading || !user}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim() || !user}
          style={{ padding: '10px 18px', borderRadius: 8, background: '#198754', color: '#fff', border: 'none', fontWeight: 'bold' }}
        >
          Send
        </button>
      </div>
      {!user && <div style={{ fontSize: 14, color: '#c00', marginTop: 12 }}>Please login to use the chat assistant.</div>}
      <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
        Products will be added to your cart automatically after each chat.
      </div>
    </div>
  );
};

export default Chat;