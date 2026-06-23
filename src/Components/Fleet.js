import React, { useState } from 'react';
import BookingModal from './BookingModal';
import CarDetailsModal from './CarDetailsModal';

const carsList = [
  {
    id: 1,
    name: "Tata Nexon EV (Electric)",
    image: "tata_nexon_ev.png",
    passengers: 5,
    luggages: 4,
    doors: 4,
    transmission: "Automatic",
    price: 2200,
    category: "SUV",
    fuelType: "Electric (EV)",
    fuelEconomy: "315 km range",
    desc: "Experience zero emissions with India's best-selling electric SUV, featuring Ziptron technology and premium cabin comfort."
  },
  {
    id: 2,
    name: "Mahindra Thar (Adventure 4x4)",
    image: "mahindra_thar.png",
    passengers: 4,
    luggages: 2,
    doors: 3,
    transmission: "Manual",
    price: 2500,
    category: "SUV",
    fuelType: "Diesel",
    fuelEconomy: "15.2 km/l",
    desc: "The legendary Indian 4x4 off-roader designed to conquer any terrain with unmatched style and rugged power."
  },
  {
    id: 3,
    name: "Tata Harrier (Premium)",
    image: "tata_harrier.png",
    passengers: 5,
    luggages: 4,
    doors: 5,
    transmission: "Automatic",
    price: 3000,
    category: "Luxury",
    fuelType: "Diesel",
    fuelEconomy: "14.6 km/l",
    desc: "A premium Indian SUV engineered on the legendary Land Rover D8 platform, offering dynamic performance and luxury styling."
  },
  {
    id: 4,
    name: "Tata Safari (Luxury 7-Seater)",
    image: "tata_safari.png",
    passengers: 7,
    luggages: 5,
    doors: 5,
    transmission: "Automatic",
    price: 3500,
    category: "Luxury",
    fuelType: "Diesel",
    fuelEconomy: "14.0 km/l",
    desc: "Experience grand Indian luxury in this flagship 7-seater SUV, loaded with high-tech features and absolute comfort."
  },
  {
    id: 5,
    name: "Tata Altroz (Premium Hatch)",
    image: "tata_altroz.png",
    passengers: 5,
    luggages: 3,
    doors: 5,
    transmission: "Manual",
    price: 1500,
    category: "Economy",
    fuelType: "Petrol",
    fuelEconomy: "18.5 km/l",
    desc: "India's safest premium hatchback with a 5-star Global NCAP rating, offering agile handling and high fuel efficiency."
  },
  {
    id: 6,
    name: "Mahindra XUV700 (Luxury ADAS)",
    image: "mahindra_xuv700.png",
    passengers: 7,
    luggages: 4,
    doors: 5,
    transmission: "Automatic",
    price: 3800,
    category: "Luxury",
    fuelType: "Petrol",
    fuelEconomy: "13.5 km/l",
    desc: "A world-class Indian SUV equipped with ADAS technology, immersive panoramic sunroof, and powerful performance."
  }
];

const Fleet = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [detailCar, setDetailCar] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    transmission: 'All',
    sort: 'default'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      transmission: 'All',
      sort: 'default'
    });
  };

  // Filter and sort cars
  const filteredCars = carsList
    .filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'All' || car.category === filters.category;
      const matchesTransmission = filters.transmission === 'All' || car.transmission === filters.transmission;
      return matchesSearch && matchesCategory && matchesTransmission;
    })
    .sort((a, b) => {
      if (filters.sort === 'low-to-high') return a.price - b.price;
      if (filters.sort === 'high-to-low') return b.price - a.price;
      return 0; // Default sorting (unsorted)
    });

  return (
    <div className="services">
      <div className="container">
        
        {/* Modern Interactive Search and Filter Bar */}
        <div className="filter-wrapper">
          <div className="filter-grid">
            <div className="filter-item-box search-box">
              <label><i className="fa fa-search"></i> Search Vehicle</label>
              <input 
                type="text" 
                name="search" 
                placeholder="Type model name..." 
                value={filters.search} 
                onChange={handleFilterChange} 
              />
            </div>
            
            <div className="filter-item-box">
              <label>Vehicle Category</label>
              <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="All">All Categories</option>
                <option value="Economy">Economy</option>
                <option value="SUV">SUV / Utility</option>
                <option value="Luxury">Luxury / Sport</option>
              </select>
            </div>
            
            <div className="filter-item-box">
              <label>Transmission</label>
              <select name="transmission" value={filters.transmission} onChange={handleFilterChange}>
                <option value="All">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            
            <div className="filter-item-box">
              <label>Sort By</label>
              <select name="sort" value={filters.sort} onChange={handleFilterChange}>
                <option value="default">Relevance</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {(filters.search || filters.category !== 'All' || filters.transmission !== 'All' || filters.sort !== 'default') && (
            <div className="reset-bar">
              <span>Showing {filteredCars.length} results</span>
              <button onClick={resetFilters} className="reset-btn">Clear Filters</button>
            </div>
          )}
        </div>

        {/* Dynamic Cars Grid */}
        <div className="row">
          {filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <div className="col-md-4 col-sm-6 animate-card" key={car.id}>
                <div className="service-item car-card">
                  <div className="car-card-img-wrap">
                    <img src={require(`../images/${car.image}`)} alt={car.name}/>
                    <span className="car-category-tag">{car.category}</span>
                  </div>
                  <div className="down-content">
                    <h4>{car.name}</h4>
                    <div style={{ marginBottom: "15px" }}>
                      <span className="price-tag">from <strong className="price-num">₹{car.price}</strong> / day</span>
                    </div>
                    <p className="car-card-desc">{car.desc}</p>
                    <div className="car-specs-row">
                      <span><i className="fa fa-user" title="Passengers"></i> {car.passengers} Seats</span>
                      <span><i className="fa fa-briefcase" title="Luggages"></i> {car.luggages} Luggage</span>
                      <span><i className="fa fa-cog" title="Transmission"></i> {car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <button 
                        onClick={() => setSelectedCar(car)} 
                        className="filled-button book-now-card-btn"
                        style={{ flex: 1, border: 'none' }}
                      >
                        Book Now
                      </button>
                      <button 
                        onClick={() => setDetailCar(car)} 
                        className="border-button view-details-card-btn"
                        style={{ flex: 1, padding: '10px 0', fontSize: '13px', border: '2px solid #e8c720', color: '#e8c720', cursor: 'pointer', background: 'transparent' }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
                <br/>
              </div>
            ))
          ) : (
            <div className="col-md-12 text-center no-cars-found">
              <i className="fa fa-car-crash"></i>
              <h3>No vehicles matches your filters</h3>
              <p>Try resetting the search filters or choosing other categories.</p>
              <button onClick={resetFilters} className="filled-button">Reset Filters</button>
            </div>
          )}
        </div>

        {/* Dynamic Booking Modal Rendering */}
        {selectedCar && (
          <BookingModal 
            car={selectedCar} 
            onClose={() => setSelectedCar(null)} 
          />
        )}

        {/* Dynamic Specifications Modal Rendering */}
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

export default Fleet;