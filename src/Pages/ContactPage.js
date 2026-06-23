import React from 'react';
import Hero from '../Components/Hero';
import Contact from '../Components/Contact';
import FAQAccordion from '../Components/FAQAccordion';

const ContactPage = () => {
  return (
    <div>
        <Hero title="Contact"/>
        <div className="contact-information">
            <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <div className="contact-item">
                    <i className="fa fa-phone"></i>
                    <h4>Phone</h4>
                    <p>Vivamus ut tellus mi. Nulla nec cursus elit, id vulputate nec cursus augue.</p>
                    <a href="tel:+919624282521">+91 96242 82521</a>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="contact-item">
                    <i className="fa fa-envelope"></i>
                    <h4>Email</h4>
                    <p>Vivamus ut tellus mi. Nulla nec cursus elit, id vulputate nec cursus augue.</p>
                    <a href="mailto:pandyakaushal294@gmail.com">pandyakaushal294@gmail.com</a>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="contact-item">
                    <i className="fa fa-map-marker"></i>
                    <h4>Location</h4>
                    <p>Dholka, Ahmedabad, Gujarat <br/> India</p>
                    <a href="https://maps.google.com/?q=Dholka,+Ahmedabad,+Gujarat" target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        {/* Embedded Map Section */}
        <div className="map-section" style={{ margin: '60px 0 30px 0', padding: '0 15px' }}>
          <div className="container" style={{
            background: 'var(--card-bg, #fff)',
            border: '1px solid #eee',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Our <em>Location</em></h3>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29486.290538644026!2d72.43128913955078!3d22.4431872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e542ecb72ef75%3A0xc48e9185a49826f7!2sDholka%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
              width="100%" 
              height="350" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Dholka Ahmedabad Map"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section" style={{ padding: '30px 0 60px 0' }}>
          <div className="container">
            <FAQAccordion />
          </div>
        </div>

        <Contact/>
    </div>
  );
};

export default ContactPage;