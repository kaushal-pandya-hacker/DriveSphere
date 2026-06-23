import React, { useState, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: "Rajesh Patel",
    role: "Business Traveler",
    text: "Excellent service! The Tata Nexon EV was delivered clean and fully charged at Ahmedabad airport. The smooth electric drive and booking experience was seamless. Will use again!",
    rating: 5,
    avatar: "client-01.png"
  },
  {
    id: 2,
    name: "Priyanka Sharma",
    role: "Family Vacationer",
    text: "Rented the Tata Safari for a family road trip to Gir. Extremely comfortable seats and massive boot space for our bags. Roadside assistance was helpful when we had queries.",
    rating: 5,
    avatar: "client-01.png"
  },
  {
    id: 3,
    name: "Amit Mehta",
    role: "Local Commuter",
    text: "Reliable rates and highly responsive team. The Tata Altroz premium hatchback was extremely fuel efficient and saved me a lot. Booking was cancelled and refunded instantly when my plans shifted.",
    rating: 4,
    avatar: "client-01.png"
  }
];

const Testimonials = () => {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview(prev => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonials animate-fade-in" style={{ padding: '80px 0', backgroundColor: '#fcfcfc', borderTop: '1px solid #f0f0f0' }}>
      <div className="container">
        <div className="section-heading">
          <h2>Client <em>Reviews</em></h2>
          <span>What our valued customers say about our vehicle services</span>
        </div>

        <div className="reviews-carousel-wrap" style={{ position: 'relative', maxWidth: '650px', margin: '0 auto', minHeight: '260px' }}>
          {reviews.map((review, index) => {
            const isActive = index === activeReview;
            return (
              <div 
                className="testimonial-item" 
                key={review.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  zIndex: isActive ? 2 : 1,
                  display: isActive ? 'block' : 'none'
                }}
              >
                <div className="inner-content" style={{
                  textAlign: 'center',
                  background: 'var(--card-bg, #fff)',
                  padding: '40px',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
                  border: '1px solid #eee'
                }}>
                  <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#555', lineHeight: '1.8' }}>
                    "{review.text}"
                  </p>
                  
                  <div className="stars-wrap" style={{ margin: '15px 0 10px 0', color: '#ffb300' }}>
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fa ${i < review.rating ? 'fa-star' : 'fa-star-o'}`}
                        style={{ margin: '0 2px' }}
                      ></i>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                    <img 
                      src={require(`../images/${review.avatar}`)} 
                      alt={review.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #e8c720' }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{review.name}</h4>
                      <span style={{ fontSize: '13px', color: '#777' }}>{review.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {reviews.map((_, index) => (
            <span 
              key={index} 
              onClick={() => setActiveReview(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: index === activeReview ? '#e8c720' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            ></span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
