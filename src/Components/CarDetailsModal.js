import React from 'react';

const CarDetailsModal = ({ car, onClose, onBookClick }) => {
  if (!car) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-content car-details-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header-desc">
          <h2>{car.name}</h2>
          <span className="rate-badge">₹{car.price} / day</span>
        </div>

        <div className="modal-grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
          {/* Left Column: Picture and Description */}
          <div>
            <img 
              src={require(`../images/${car.image}`)} 
              alt={car.name} 
              style={{ width: '100%', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}
            />
            <h4>Overview</h4>
            <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#666', marginTop: '10px' }}>
              {car.desc}
            </p>
            
            <h4 style={{ marginTop: '20px' }}>What is Included in Price?</h4>
            <ul style={{ marginTop: '10px', fontSize: '13.5px', color: '#555', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 15px' }}>
              <li><i className="fa fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i> Unlimited Mileage</li>
              <li><i className="fa fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i> 24/7 Roadside Assist</li>
              <li><i className="fa fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i> Free 24h Cancellation</li>
              <li><i className="fa fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i> Collision Damage Cover</li>
              <li><i className="fa fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i> Local Taxes & Fees</li>
              <li><i className="fa fa-check" style={{ color: '#28a745', marginRight: '8px' }}></i> Third Party Cover</li>
            </ul>
          </div>

          {/* Right Column: Detailed Specifications Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="specifications-sheet" style={{
              background: '#fcfcfc',
              border: '1px solid #f0f0f0',
              borderRadius: '12px',
              padding: '20px',
              height: '100%'
            }}>
              <h4 style={{ borderBottom: '1.5px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Technical Specs</h4>
              
              <div className="specs-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Transmission:</span>
                  <strong style={{ color: '#333' }}>{car.transmission}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Category:</span>
                  <strong style={{ color: '#333' }}>{car.category}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Passengers:</span>
                  <strong style={{ color: '#333' }}>{car.passengers} Seats</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Luggage Capacity:</span>
                  <strong style={{ color: '#333' }}>{car.luggages} Suitcases</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Fuel Type:</span>
                  <strong style={{ color: '#333' }}>{car.fuelType || 'Petrol'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Avg. Fuel Economy:</span>
                  <strong style={{ color: '#333' }}>{car.fuelEconomy || '14.5 km/l'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Safety Rating:</span>
                  <strong style={{ color: '#333' }}><i className="fa fa-star" style={{ color: '#ffb300' }}></i> 5.0 / 5 NCAP</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Air Conditioning:</span>
                  <strong style={{ color: '#28a745' }}>Yes (Climate Control)</strong>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => onBookClick(car)} 
              className="confirm-btn"
              style={{ width: '100%', margin: 0 }}
            >
              Book This Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;
