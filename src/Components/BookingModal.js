import React, { useState, useEffect } from 'react';

const BookingModal = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: 'Ahmedabad Airport (AMD)',
    dropoffLocation: 'Ahmedabad Airport (AMD)',
    pickupDate: '',
    returnDate: '',
    pickupTime: '10:00',
    returnTime: '10:00',
  });

  const [extras, setExtras] = useState({
    gps: false,
    seat: false,
    insurance: false
  });

  const [bookingDays, setBookingDays] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [resId, setResId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Default dates (today and tomorrow)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setFormData(prev => ({
      ...prev,
      pickupDate: formatDate(today),
      returnDate: formatDate(tomorrow),
    }));
  }, []);

  // Calculate booking duration and price including add-ons
  useEffect(() => {
    if (formData.pickupDate && formData.returnDate) {
      const start = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
      const end = new Date(`${formData.returnDate}T${formData.returnTime}`);
      
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const days = diffDays > 0 ? diffDays : 1;
      setBookingDays(days);
      
      if (car) {
        let dailyExtra = 0;
        if (extras.gps) dailyExtra += 150;
        if (extras.seat) dailyExtra += 200;
        if (extras.insurance) dailyExtra += 500;
        
        setEstimatedPrice(days * car.price + dailyExtra * days);
      }
    }
  }, [formData, car, extras]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const randomId = 'RH-' + Math.floor(100000 + Math.random() * 900000);
    setResId(randomId);

    // Save list of selected extras names
    const extraList = [];
    if (extras.gps) extraList.push("GPS Navigation");
    if (extras.seat) extraList.push("Child Seat");
    if (extras.insurance) extraList.push("Full Insurance Waiver");

    const newBooking = {
      resId: randomId,
      carName: car.name,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      pickupTime: formData.pickupTime,
      returnTime: formData.returnTime,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bookingDays: bookingDays,
      extras: extraList,
      price: estimatedPrice,
      status: 'Active'
    };

    // Web3Forms payload
    const payload = {
      access_key: "7a28c603-974f-4a99-9f13-76b8a4d160f5",
      subject: `New Rental Booking: ${car.name} (${randomId})`,
      from_name: "RentalHub Reservations",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      carName: car.name,
      resId: randomId,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      returnDate: formData.returnDate,
      returnTime: formData.returnTime,
      bookingDays: bookingDays,
      extras: extraList.join(', ') || 'None',
      price: `₹${estimatedPrice}`
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!result.success) {
        console.error("Web3Forms booking submission failed:", result);
      }
    } catch (error) {
      console.error("Error submitting booking form to Web3Forms:", error);
    }

    // Save booking to localStorage
    try {
      const existing = localStorage.getItem('rental_bookings');
      const bookingsList = existing ? JSON.parse(existing) : [];
      bookingsList.unshift(newBooking);
      localStorage.setItem('rental_bookings', JSON.stringify(bookingsList));
    } catch (err) {
      console.error("Error saving reservation to storage", err);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const getSelectedExtrasNames = () => {
    const list = [];
    if (extras.gps) list.push("GPS Navigation");
    if (extras.seat) list.push("Child Seat");
    if (extras.insurance) list.push("Full Insurance Cover");
    return list.join(', ');
  };

  if (!car) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="booking-form-wrap">
            <div className="modal-header-desc">
              <h2>Book {car.name}</h2>
              <span className="rate-badge">₹{car.price} / day</span>
            </div>
            
            <div className="modal-grid">
              {/* Left Column: Car Details Summary */}
              <div className="modal-car-summary">
                <img 
                  src={require(`../images/${car.image}`)} 
                  alt={car.name} 
                  className="modal-car-img"
                />
                <div className="spec-grid">
                  <div className="spec-pill"><i className="fa fa-user"></i> {car.passengers} Seats</div>
                  <div className="spec-pill"><i className="fa fa-briefcase"></i> {car.luggages} bags</div>
                  <div className="spec-pill"><i className="fa fa-cog"></i> {car.transmission}</div>
                  <div className="spec-pill"><i className="fa fa-car"></i> {car.category}</div>
                </div>
                
                <div className="pricing-box">
                  <div className="price-row">
                    <span>Daily Rate:</span>
                    <span>₹{car.price}</span>
                  </div>
                  <div className="price-row">
                    <span>Rental Duration:</span>
                    <span>{bookingDays} {bookingDays === 1 ? 'Day' : 'Days'}</span>
                  </div>
                  
                  {/* Show summary of extras in calculation */}
                  {(extras.gps || extras.seat || extras.insurance) && (
                    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '10px', marginTop: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#444' }}>Selected Extras:</span>
                      {extras.gps && <div className="price-row" style={{ fontSize: '12px', marginTop: '4px' }}><span>GPS Navigation (₹150/day):</span><span>+₹{150 * bookingDays}</span></div>}
                      {extras.seat && <div className="price-row" style={{ fontSize: '12px', marginTop: '4px' }}><span>Child Safety Seat (₹200/day):</span><span>+₹{200 * bookingDays}</span></div>}
                      {extras.insurance && <div className="price-row" style={{ fontSize: '12px', marginTop: '4px' }}><span>Insurance Waiver (₹500/day):</span><span>+₹{500 * bookingDays}</span></div>}
                    </div>
                  )}

                  <hr />
                  <div className="price-row total-price">
                    <span>Estimated Total:</span>
                    <span>₹{estimatedPrice}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Inputs */}
              <div className="modal-inputs">
                <h4>Reservation Details</h4>
                <div className="input-group-row">
                  <div className="form-field">
                    <label>Pick-up Location</label>
                    <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required>
                      <option value="Ahmedabad Airport (AMD)">Ahmedabad Airport (AMD)</option>
                      <option value="Ahmedabad Railway Station (Kalupur)">Ahmedabad Railway Station (Kalupur)</option>
                      <option value="Dholka Service Center">Dholka Service Center</option>
                      <option value="SG Highway Hub, Ahmedabad">SG Highway Hub, Ahmedabad</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Drop-off Location</label>
                    <select name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} required>
                      <option value="Ahmedabad Airport (AMD)">Ahmedabad Airport (AMD)</option>
                      <option value="Ahmedabad Railway Station (Kalupur)">Ahmedabad Railway Station (Kalupur)</option>
                      <option value="Dholka Service Center">Dholka Service Center</option>
                      <option value="SG Highway Hub, Ahmedabad">SG Highway Hub, Ahmedabad</option>
                    </select>
                  </div>
                </div>

                <div className="input-group-row">
                  <div className="form-field">
                    <label>Pick-up Date</label>
                    <input 
                      type="date" 
                      name="pickupDate" 
                      value={formData.pickupDate} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-field">
                    <label>Pick-up Time</label>
                    <input 
                      type="time" 
                      name="pickupTime" 
                      value={formData.pickupTime} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="input-group-row">
                  <div className="form-field">
                    <label>Return Date</label>
                    <input 
                      type="date" 
                      name="returnDate" 
                      value={formData.returnDate} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-field">
                    <label>Return Time</label>
                    <input 
                      type="time" 
                      name="returnTime" 
                      value={formData.returnTime} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                {/* Optional Add-ons Checkbox List */}
                <div style={{ marginTop: '10px', background: '#fafafa', padding: '12px 15px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                  <label style={{ fontWeight: 700, fontSize: '13px', display: 'block', marginBottom: '8px', color: '#333' }}>Optional Add-ons</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 'normal', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={extras.gps} 
                        onChange={() => setExtras(prev => ({ ...prev, gps: !prev.gps }))} 
                      />
                      GPS Navigation (+ ₹150/day)
                    </label>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 'normal', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={extras.seat} 
                        onChange={() => setExtras(prev => ({ ...prev, seat: !prev.seat }))} 
                      />
                      Child Safety Seat (+ ₹200/day)
                    </label>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 'normal', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={extras.insurance} 
                        onChange={() => setExtras(prev => ({ ...prev, insurance: !prev.insurance }))} 
                      />
                      Full Damage Waiver Insurance Cover (+ ₹500/day)
                    </label>
                  </div>
                </div>

                <h4 style={{ marginTop: '15px' }}>Contact Information</h4>
                <div className="form-field">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="input-group-row">
                  <div className="form-field">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="name@example.com" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Enter phone number" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <button 
                   type="submit" 
                   className="confirm-btn" 
                   style={{ cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
                   disabled={submitting}
                 >
                   {submitting ? 'Confirming...' : 'Confirm Reservation'}
                 </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="success-screen animate-fade-in">
            <div className="success-icon">&#10004;</div>
            <h2>Booking Confirmed!</h2>
            <p className="success-tagline">Thank you, {formData.name}. Your rental car is reserved.</p>
            
            <div className="summary-receipt">
              <div className="receipt-row">
                <span>Reservation ID:</span>
                <strong className="res-id">{resId}</strong>
              </div>
              <div className="receipt-row">
                <span>Vehicle:</span>
                <span>{car.name}</span>
              </div>
              <div className="receipt-row">
                <span>Pick-up:</span>
                <span>{formData.pickupDate} at {formData.pickupTime} ({formData.pickupLocation})</span>
              </div>
              <div className="receipt-row">
                <span>Return:</span>
                <span>{formData.returnDate} at {formData.returnTime} ({formData.dropoffLocation})</span>
              </div>
              
              {/* Show selected extras on receipt */}
              {(extras.gps || extras.seat || extras.insurance) && (
                <div className="receipt-row">
                  <span>Selected Extras:</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{getSelectedExtrasNames()}</span>
                </div>
              )}

              <div className="receipt-row price-summary">
                <span>Total Charge:</span>
                <span className="total-val">₹{estimatedPrice}</span>
              </div>
            </div>
            
            <p className="info-note">A confirmation email has been sent to {formData.email}. Show this receipt at pick-up.</p>
            <button className="done-btn" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
