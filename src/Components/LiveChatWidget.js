import React, { useState, useEffect, useRef } from 'react';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Namaste! Welcome to RentalHub. How can I help you choose your rental vehicle today?' }
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText
    };

    setMessages(prev => [...prev, userMessage]);
    const query = messageText.toLowerCase();
    setMessageText('');

    // Automated helpful responses
    setTimeout(() => {
      let botResponseText = "Thank you for messaging! A support representative will join the chat in a few moments. For urgent reservation queries, please call us at +91 96242 82521.";
      
      if (query.includes('price') || query.includes('cost') || query.includes('rate') || query.includes('cheap')) {
        botResponseText = "Our daily rates start as low as ₹80/day for economy models and up to ₹150/day for premium electric vehicles. Insurance and breakdown recovery are included!";
      } else if (query.includes('document') || query.includes('license') || query.includes('id')) {
        botResponseText = "To pick up a vehicle, you need a valid Driving License, Aadhar or PAN Card, and a credit/debit card. International travelers require an International Driving Permit.";
      } else if (query.includes('cancel') || query.includes('refund')) {
        botResponseText = "Cancellations are 100% free up to 24 hours before your pick-up time. You can manage or cancel reservations easily on our 'Manage Bookings' dashboard.";
      } else if (query.includes('dholka') || query.includes('ahmedabad') || query.includes('gujarat') || query.includes('where')) {
        botResponseText = "We are located at Dholka, Ahmedabad, Gujarat, India. We also offer vehicle drop-offs at Ahmedabad Airport (AMD) and Kalupur Railway Station.";
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="live-chat-widget-wrap" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999999 }}>
      
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="chat-window-content animate-slide-up" style={{
          width: '350px',
          height: '450px',
          background: 'var(--card-bg, #fff)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#e8c720',
            color: '#fff',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#28a745', borderRadius: '50%', border: '1.5px solid #fff' }}></div>
              <h4 style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: 700 }}>RentalHub Support</h4>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}
            >
              &times;
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            background: 'var(--bg-secondary, #fafafa)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map(m => {
              const isBot = m.sender === 'bot';
              return (
                <div 
                  key={m.id} 
                  style={{
                    alignSelf: isBot ? 'flex-start' : 'flex-end',
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: isBot ? '12px 12px 12px 0' : '12px 12px 0 12px',
                    fontSize: '13.5px',
                    lineHeight: '1.5',
                    backgroundColor: isBot ? 'var(--card-bg, #fff)' : '#e8c720',
                    color: isBot ? 'var(--text-primary, #333)' : '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                    border: isBot ? '1px solid #eee' : 'none'
                  }}
                >
                  {m.text}
                </div>
              );
            })}
            <div ref={scrollToBottom} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} style={{
            display: 'flex',
            borderTop: '1px solid #eee',
            padding: '10px',
            background: 'var(--card-bg, #fff)'
          }}>
            <input 
              type="text" 
              placeholder="Ask a question..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              style={{
                flex: 1,
                height: '38px',
                border: 'none',
                outline: 'none',
                padding: '0 10px',
                fontSize: '14px',
                background: 'transparent'
              }}
            />
            <button 
              type="submit" 
              style={{
                background: 'none',
                border: 'none',
                color: '#e8c720',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '0 10px'
              }}
            >
              &#10148;
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#e8c720',
          border: 'none',
          borderRadius: '50%',
          boxShadow: '0 4px 15px rgba(232, 199, 32, 0.4)',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s',
          float: 'right'
        }}
        className="chat-fab-btn"
        aria-label="Toggle Live Chat"
      >
        {isOpen ? '💬' : '💬'}
      </button>

    </div>
  );
};

export default LiveChatWidget;
