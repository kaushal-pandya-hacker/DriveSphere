import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 footer-item">
            <h4>Car Rental Website</h4>
            <p>Vivamus tellus mi. Nulla ne cursus elit,vulputate. Sed ne cursus augue hasellus lacinia sapien vitae.</p>
            <ul className="social-icons">
              <li><a rel="nofollow noopener noreferrer" href="https://www.facebook.com/share/p/17tQuSUbJd/" target="_blank"><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
            </ul>
          </div>
          <div className="col-md-3 footer-item">
            <h4>Useful Links</h4>
            <ul className="menu-list">
              <li><a href="#">Vivamus ut tellus mi</a></li>
              <li><a href="#">Nulla nec cursus elit</a></li>
              <li><a href="#">Vulputate sed nec</a></li>
              <li><a href="#">Cursus augue hasellus</a></li>
              <li><a href="#">Lacinia ac sapien</a></li>
            </ul>
          </div>
          <div className="col-md-3 footer-item">
            <h4>Additional Pages</h4>
            <ul className="menu-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/">Terms</Link></li>
            </ul>
          </div>
          <div className="col-md-3 footer-item last-item">
            <h4>Contact Us</h4>
            <div className="contact-form">
              {success && (
                <div className="success-toast-alert animate-fade-in" style={{
                  backgroundColor: '#e8c720',
                  color: '#fff',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  marginBottom: '15px',
                  fontSize: '13px',
                  textAlign: 'center',
                  fontWeight: 600
                }}>
                  Message sent successfully!
                </div>
              )}
              
              <form id="contact footer-contact" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <fieldset>
                      <input 
                        name="name" 
                        type="text" 
                        className="form-control" 
                        id="footer-name" 
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <fieldset>
                      <input 
                        name="email" 
                        type="email" 
                        className="form-control" 
                        id="footer-email" 
                        placeholder="E-Mail Address" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea 
                        name="message" 
                        rows="4" 
                        className="form-control" 
                        id="footer-message" 
                        placeholder="Your Message" 
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="footer-form-submit" className="filled-button" style={{ border: 'none', cursor: 'pointer' }}>
                        Send Message
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;