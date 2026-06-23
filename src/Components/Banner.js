import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    subTitle: "FIND YOUR PERFECT RIDE",
    title: "Premium Cars. Best Daily Rates.",
    description: "Explore our fleet of top-tier luxury, electric, and family vehicles. Rent by the day, week, or weekend with zero hidden fees.",
    image: "slider.jpg",
    btnText: "Explore Fleet",
    btnLink: "/fleet"
  },
  {
    id: 2,
    subTitle: "SIMPLE & FAST RESERVATIONS",
    title: "Reserve Your Rental In Seconds",
    description: "Select your pick-up point, choose your dates, and secure your vehicle instantly with our real-time quotation booking flow.",
    image: "banner-image-1-1920x500.jpg",
    btnText: "Book Now",
    btnLink: "/fleet"
  },
  {
    id: 3,
    subTitle: "ROAD TRIP PLANS?",
    title: "Helpful 24/7 Roadside Assistance",
    description: "Have questions? Our support team is here to assist with any booking inquiries, roadside issues, or custom rental terms.",
    image: "blog-image-fullscren-1-1920x700.jpg",
    btnText: "Contact Us",
    btnLink: "/contact"
  }
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="main-banner header-text" id="top">
      <div className="Modern-Slider" style={{ position: 'relative', overflow: 'hidden', height: '95vh' }}>
        
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          // Dynamically load slide image path
          const bgImg = require(`../images/${slide.image}`);
          
          return (
            <div 
              className={`slide-item ${isActive ? 'active-slide' : 'inactive-slide'}`} 
              key={slide.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                transition: 'opacity 1s ease-in-out',
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div className="container">
                <div className="text-content" style={{ width: '75%', color: '#fff' }}>
                  <h6 style={{ 
                    color: '#e8c720', 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    letterSpacing: '1px', 
                    textTransform: 'uppercase',
                    marginBottom: '15px'
                  }}>
                    {slide.subTitle}
                  </h6>
                  <h4 style={{ 
                    fontSize: '48px', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    lineHeight: '1.2'
                  }}>
                    {slide.title}
                  </h4>
                  <p style={{ 
                    maxWidth: '600px', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '35px',
                    color: '#ddd'
                  }}>
                    {slide.description}
                  </p>
                  <Link to={slide.btnLink} className="filled-button">{slide.btnText}</Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel controls */}
        <button 
          onClick={handlePrev} 
          className="carousel-control prev-arrow" 
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button 
          onClick={handleNext} 
          className="carousel-control next-arrow" 
          aria-label="Next Slide"
        >
          &#10095;
        </button>

        {/* Slide indicator dots */}
        <div className="carousel-indicators-dots">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === activeSlide ? 'active-dot' : ''}`}
              onClick={() => setActiveSlide(index)}
            ></span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Banner;