import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setFormData({
      name: '',
      email: '',
      message: '',
    });

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <footer>
      <div className="container">
        <div className="row">

          {/* Company */}
          <div className="col-md-3 footer-item">
            <h4>DriveSphere</h4>
            <p>
              DriveSphere is a modern car rental platform offering secure
              vehicle booking, flexible rentals, and a seamless user
              experience.
            </p>

            <ul className="social-icons">
              <li>
                <a
                  href="https://www.facebook.com/share/p/17tQuSUbJd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>

              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="col-md-3 footer-item">
            <h4>Useful Links</h4>

            <ul className="menu-list">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About Us</Link>
              </li>

              <li>
                <Link to="/cars">Cars</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>

              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Additional Pages */}
          <div className="col-md-3 footer-item">
            <h4>Additional Pages</h4>

            <ul className="menu-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>

              <li>
                <Link to="/">Blog</Link>
              </li>

              <li>
                <Link to="/">FAQ</Link>
              </li>

              <li>
                <Link to="/contact">Contact Us</Link>
              </li>

              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="col-md-3 footer-item last-item">
            <h4>Contact Us</h4>

            <div className="contact-form">
              {success && (
                <div
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}
                >
                  Message sent successfully!
                </div>
              )}

              <form id="footer-contact" onSubmit={handleSubmit}>
                <div className="row">

                  <div className="col-lg-12">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-lg-12 mt-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="E-Mail Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-lg-12 mt-3">
                    <textarea
                      rows="4"
                      name="message"
                      className="form-control"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-lg-12 mt-3">
                    <button
                      type="submit"
                      className="filled-button"
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Send Message
                    </button>
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
