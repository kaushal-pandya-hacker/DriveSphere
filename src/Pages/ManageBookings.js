import React, { useState, useEffect } from 'react';
import Hero from '../Components/Hero';

const ManageBookings = () => {
  const [searchId, setSearchId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [searchedBooking, setSearchedBooking] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Load all bookings from localStorage
  const loadBookings = () => {
    try {
      const stored = localStorage.getItem('rental_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading bookings", e);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const found = bookings.find(b => b.resId.toLowerCase() === searchId.trim().toLowerCase());
    setSearchedBooking(found || null);
  };

  const handleCancelBooking = (resId) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      const updatedBookings = bookings.map(b => {
        if (b.resId === resId) {
          return { ...b, status: 'Cancelled' };
        }
        return b;
      });
      localStorage.setItem('rental_bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      
      // Update searched result if displayed
      if (searchedBooking && searchedBooking.resId === resId) {
        setSearchedBooking(prev => ({ ...prev, status: 'Cancelled' }));
      }
      alert("Your reservation has been cancelled successfully.");
    }
  };

  const clearSearch = () => {
    setSearchId('');
    setSearchedBooking(null);
    setHasSearched(false);
  };

  return (
    <div>
      <Hero title="Manage Bookings" />
      
      <div className="bookings-dashboard-container" style={{ padding: '60px 0', minHeight: '60vh' }}>
        <div className="container">
          
          {/* Search Section */}
          <div className="search-booking-card" style={{
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            background: 'var(--card-bg, #fff)',
            border: '1px solid #eee',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            textAlign: 'center'
          }}>
            <h3>Retrieve Your Reservation</h3>
            <p style={{ color: '#777', margin: '10px 0 20px 0' }}>
              Enter the 8-digit Reservation ID (e.g. RH-123456) received upon booking confirmation to track or cancel your hire.
            </p>
            
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Reservation ID (e.g., RH-102948)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                required
                style={{
                  flex: 1,
                  height: '48px',
                  padding: '0 15px',
                  border: '1.5px solid #ddd',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '15px'
                }}
              />
              <button type="submit" className="filled-button" style={{ border: 'none', height: '48px', cursor: 'pointer' }}>
                Search
              </button>
            </form>

            {hasSearched && (
              <button onClick={clearSearch} style={{
                background: 'none',
                border: 'none',
                color: '#ff3b30',
                marginTop: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Show All Bookings
              </button>
            )}
          </div>

          {/* Searched Booking Result */}
          {hasSearched ? (
            searchedBooking ? (
              <div className="single-booking-detail-card" style={{
                maxWidth: '750px',
                margin: '0 auto',
                background: 'var(--card-bg, #fff)',
                border: '1px solid #eee',
                borderRadius: '16px',
                padding: '35px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                  <h4 style={{ margin: 0 }}>Booking details for <span style={{ color: '#e8c720' }}>{searchedBooking.resId}</span></h4>
                  <span className={`status-badge ${searchedBooking.status.toLowerCase()}`} style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: searchedBooking.status === 'Cancelled' ? 'rgba(255,59,48,0.1)' : 'rgba(40,167,69,0.1)',
                    color: searchedBooking.status === 'Cancelled' ? '#ff3b30' : '#28a745'
                  }}>
                    {searchedBooking.status}
                  </span>
                </div>

                <div className="dashboard-receipt-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '15px', lineHeight: '1.8' }}>
                  <div>
                    <p><strong>Customer Name:</strong> {searchedBooking.name}</p>
                    <p><strong>Email Address:</strong> {searchedBooking.email}</p>
                    <p><strong>Phone Number:</strong> {searchedBooking.phone}</p>
                    <p><strong>Vehicle:</strong> {searchedBooking.carName}</p>
                  </div>
                  <div>
                    <p><strong>Pick-up:</strong> {searchedBooking.pickupDate} at {searchedBooking.pickupTime} ({searchedBooking.pickupLocation})</p>
                    <p><strong>Return:</strong> {searchedBooking.returnDate} at {searchedBooking.returnTime} ({searchedBooking.dropoffLocation})</p>
                    <p><strong>Duration:</strong> {searchedBooking.bookingDays} {searchedBooking.bookingDays === 1 ? 'Day' : 'Days'}</p>
                    {searchedBooking.extras && searchedBooking.extras.length > 0 && (
                      <p><strong>Extras:</strong> {searchedBooking.extras.join(', ')}</p>
                    )}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '14px', color: '#666' }}>Total Amount:</span>
                    <h3 style={{ margin: 0, color: '#e8c720', fontWeight: 800 }}>₹{searchedBooking.price}</h3>
                  </div>
                  {searchedBooking.status === 'Active' && (
                    <button 
                      onClick={() => handleCancelBooking(searchedBooking.resId)}
                      style={{
                        backgroundColor: '#ff3b30',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <i className="fa fa-search-minus" style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }}></i>
                <h4>Reservation ID not found</h4>
                <p style={{ color: '#777' }}>Please check your reservation ID and try again.</p>
              </div>
            )
          ) : (
            /* All Bookings List */
            <div>
              <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>Recent Bookings Summary</h3>
              {bookings.length > 0 ? (
                <div style={{ maxWidth: '850px', margin: '0 auto', overflowX: 'auto' }}>
                  <table className="table bookings-table" style={{ width: '100%', background: 'var(--card-bg, #fff)', border: '1px solid #eee', borderRadius: '12px', borderCollapse: 'collapse', overflow: 'hidden' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#fcfcfc', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                        <th style={{ padding: '15px' }}>ID</th>
                        <th style={{ padding: '15px' }}>Vehicle</th>
                        <th style={{ padding: '15px' }}>Customer</th>
                        <th style={{ padding: '15px' }}>Dates</th>
                        <th style={{ padding: '15px' }}>Total Price</th>
                        <th style={{ padding: '15px' }}>Status</th>
                        <th style={{ padding: '15px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.resId} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '15px', fontWeight: 700, color: '#e8c720' }}>{b.resId}</td>
                          <td style={{ padding: '15px' }}>{b.carName}</td>
                          <td style={{ padding: '15px' }}>{b.name}</td>
                          <td style={{ padding: '15px', fontSize: '13px' }}>{b.pickupDate} to {b.returnDate}</td>
                          <td style={{ padding: '15px', fontWeight: 700 }}>₹{b.price}</td>
                          <td style={{ padding: '15px' }}>
                            <span className={`status-badge ${b.status.toLowerCase()}`} style={{
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '11px',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              backgroundColor: b.status === 'Cancelled' ? 'rgba(255,59,48,0.1)' : 'rgba(40,167,69,0.1)',
                              color: b.status === 'Cancelled' ? '#ff3b30' : '#28a745'
                            }}>
                              {b.status}
                            </span>
                          </td>
                          <td style={{ padding: '15px' }}>
                            {b.status === 'Active' ? (
                              <button 
                                onClick={() => handleCancelBooking(b.resId)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#ff3b30',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  fontSize: '13px'
                                }}
                              >
                                Cancel
                              </button>
                            ) : (
                              <span style={{ color: '#aaa', fontSize: '13px' }}>No Actions</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px 0', border: '1px dashed #ddd', borderRadius: '16px', maxWidth: '650px', margin: '0 auto' }}>
                  <i className="fa fa-calendar-times" style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }}></i>
                  <h4>No reservations found on this browser</h4>
                  <p style={{ color: '#777', marginTop: '5px' }}>
                    Once you make a reservation, it will show up here. Use the search bar above to query reservations from other devices.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
