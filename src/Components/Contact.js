import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };

  return (
    <div className="callback-form">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Request a <em>call back</em></h2>
              <span>We usually respond within 10-15 minutes during business hours</span>
            </div>
          </div>
          <div className="col-md-12">
            <div className="contact-form">
              {success && (
                <div className="success-toast-alert animate-fade-in" style={{
                  backgroundColor: '#e8c720',
                  color: '#fff',
                  padding: '15px 25px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>
                  Thank you! Your callback request has been received. Our team will contact you shortly.
                </div>
              )}
              
              <form id="contact" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <fieldset>
                      <input 
                        name="name" 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <fieldset>
                      <input 
                        name="email" 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="E-Mail Address" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <fieldset>
                      <input 
                        name="subject" 
                        type="text" 
                        className="form-control" 
                        id="subject" 
                        placeholder="Subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea 
                        name="message" 
                        rows="6" 
                        className="form-control" 
                        id="message" 
                        placeholder="Your Message" 
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="border-button" style={{ border: '2px solid #fff', cursor: 'pointer' }}>
                        Send Message
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </div>
  );
};

export default Contact;