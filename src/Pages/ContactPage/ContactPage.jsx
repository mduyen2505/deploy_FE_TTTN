import React from 'react';
import { FaFacebook, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'; // Import icons
import './ContactPage.css';
import Header from "../../Components/Header/Header"; 
import Footer from "../../Components/Footer/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />
      
      <div className="contact-container">
        <header className="contact-header">
          <h1>Liên Hệ Với Chúng Tôi</h1>
        </header>
        
        <div className="contact-info">
          <div className="contact-item">
            <p><FaFacebook /> Facebook: <a href="https://web.facebook.com/tham.letham.908" target="_blank" rel="noopener noreferrer">Glowify</a></p>
            <p><FaEnvelope /> Email: <a href="mailto:Glowify@gmail.com">Glowify@gmail.com</a></p>
            <p><FaPhoneAlt /> SĐT: <a href="tel:+0843604370">0843604370</a></p>
            <p><FaWhatsapp /> Zalo: <a href="https://zalo.me/0843604370" target="_blank" rel="noopener noreferrer">Zalo - 0843604370</a></p>
          </div>
        </div>

        <div className="contact-location">
          <h3>Địa Chỉ</h3>
          <p>18A, Cộng Hòa, Phường 4, Tân Bình, HCM</p>

          <div className="map-container">
            <iframe
              title="Glowify Cosmetic Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11526.312209871148!2d106.6560921!3d10.8037785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529beae599313%3A0x49f0a22e8c66a1ef!2zMThBLCBDb8OqbiBIb8OhaSBQaCwgUGh1b2xndSA0LCBUYW4gYmluaCwgSMOgbSDEkXk!5e0!3m2!1sen!2s!4v1660219932420!5m2!1sen!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <footer className="contact-footer">
          <p>&copy; 2025 Glowify Cosmetic. All rights reserved.</p>
        </footer>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
