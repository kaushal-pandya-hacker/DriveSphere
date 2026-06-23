import React, { useState } from 'react';
import BookingModal from './BookingModal';
import CarDetailsModal from './CarDetailsModal';

const offersList = [
  {
    id: 1,
    name: "Tata Nexon EV (Electric)",
    image: "tata_nexon_ev.png",
    price: 1800, // Special weekend rate
    passengers: 5,
    luggages: 4,
    doors: 4,
    transmission: "Automatic",
    category: "SUV",
    fuelType: "Electric (EV)",
    fuelEconomy: "315 km range",
    tagline: "Weekend special green rental, perfect for eco-conscious city travel.",
    originalPrice: 2200,
    desc: "Experience zero emissions with India's best-selling electric SUV, featuring Ziptron technology and premium cabin comfort."
  },
  {
    id: 2,
    name: "Mahindra Thar (Adventure 4x4)",
    image: "mahindra_thar.png",
    price: 2100, // Special weekend rate
    passengers: 4,
    luggages: 2,
    doors: 3,
    transmission: "Manual",
    category: "SUV",
    fuelType: "Diesel",
    fuelEconomy: "15.2 km/l",
    tagline: "Conquer rough terrains with the legendary Thar on your next weekend getaway.",
    originalPrice: 2500,
    desc: "The legendary Indian 4x4 off-roader designed to conquer any terrain with unmatched style and rugged power."
  },
  {
    id: 3,
    name: "Tata Safari (Luxury 7-Seater)",
    image: "tata_safari.png",
    price: 2900, // Special weekend rate
    passengers: 7,
    luggages: 5,
    doors: 5,
    transmission: "Automatic",
    category: "Luxury",
    fuelType: "Diesel",
    fuelEconomy: "14.0 km/l",
    tagline: "Spacious premium Indian SUV ideal for large family road trips.",
    originalPrice: 3500,
    desc: "Experience grand Indian luxury in this flagship 7-seater SUV, loaded with high-tech features and absolute comfort."
  }
];

const Offers = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [detailCar, setDetailCar] = useState(null);

  return (
    <div className="services">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Our Special <em>Offers</em></h2>
              <span>Save big with our discounted weekend and seasonal rates</span>
            </div>
          </div>
          
          {offersList.map(offer => (
            <div className="col-md-4" key={offer.id}>
              <div className="service-item offer-card">
                <div className="offer-img-wrap">
                  <img src={require(`../images/${offer.image}`)} alt={offer.name}/>
                  <span className="offer-promo-tag">WEEKEND DEAL</span>
                </div>
                <div className="down-content">
                  <h4>{offer.name}</h4>
                  <div style={{ marginBottom:"10px" }}>
                    <span className="price-tag">
                      from <strong className="price-num">₹{offer.price}</strong> per day 
                      <small className="original-price">₹{offer.originalPrice}</small>
                    </span>
                  </div>
                  <p>{offer.tagline}</p>
                  
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button 
                      onClick={() => setSelectedCar(offer)} 
                      className="filled-button book-now-offer-btn"
                      style={{ flex: 1, border: 'none', cursor: 'pointer', margin: 0 }}
                    >
                      Book Now
                    </button>
                    <button 
                      onClick={() => setDetailCar(offer)} 
                      className="border-button view-details-offer-btn"
                      style={{ flex: 1, padding: '10px 0', fontSize: '13px', border: '2px solid #e8c720', color: '#e8c720', cursor: 'pointer', background: 'transparent' }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
              <br/>
            </div>
          ))}
        </div>

        {selectedCar && (
          <BookingModal 
            car={selectedCar} 
            onClose={() => setSelectedCar(null)} 
          />
        )}

        {detailCar && (
          <CarDetailsModal 
            car={detailCar} 
            onClose={() => setDetailCar(null)} 
            onBookClick={(car) => {
              setDetailCar(null);
              setSelectedCar(car);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Offers;