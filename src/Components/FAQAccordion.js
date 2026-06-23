import React, { useState } from 'react';

const faqs = [
  {
    question: "What documents are required to rent a vehicle?",
    answer: "You will need a valid Driving License, an identity proof (Aadhar Card, PAN Card, or Passport), and a valid credit/debit card. Drivers must be at least 21 years of age."
  },
  {
    question: "Is there a security deposit involved?",
    answer: "Yes, a refundable security deposit of ₹5,000 is authorized on your card at the start of the rental. This authorization is fully released once the vehicle is returned in its original condition."
  },
  {
    question: "What is your fuel policy?",
    answer: "Our policy is Full-to-Full. We supply the vehicle with a full tank of fuel, and we ask that you return it full. If it's returned with less fuel, refuelling charges will be applied."
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer: "Absolutely! You can cancel or modify your reservation up to 24 hours prior to the scheduled pick-up time for a full refund. Simply visit our 'Manage Bookings' dashboard."
  },
  {
    question: "What happens in case of an accident or breakdown?",
    answer: "We provide complimentary 24/7 roadside assist. In the event of a breakdown, contact our roadside team immediately via the support number. In case of an accident, secure the occupants first, then notify the police and report to us."
  }
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion-wrap" style={{ maxWidth: '750px', margin: '40px auto 0 auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Frequently Asked <em>Questions</em></h3>
      
      <div className="accordion-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              className={`accordion-item ${isOpen ? 'open' : ''}`} 
              key={index}
              style={{
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                background: 'var(--card-bg, #fff)',
                overflow: 'hidden',
                boxShadow: isOpen ? '0 4px 15px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.3s'
              }}
            >
              <button 
                onClick={() => toggleAccordion(index)}
                style={{
                  width: '100%',
                  padding: '18px 25px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '15.5px',
                  fontWeight: 700,
                  color: isOpen ? '#e8c720' : '#1e1e1e',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <span>{faq.question}</span>
                <span style={{ 
                  fontSize: '18px', 
                  transition: 'transform 0.3s',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0)'
                }}>
                  &#43;
                </span>
              </button>
              
              <div 
                className="accordion-content"
                style={{
                  maxHeight: isOpen ? '200px' : '0',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0, 1, 0, 1)',
                  padding: isOpen ? '0 25px 20px 25px' : '0 25px',
                  fontSize: '14.5px',
                  lineHeight: '1.7',
                  color: '#666'
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;
