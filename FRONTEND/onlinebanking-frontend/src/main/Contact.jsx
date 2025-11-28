import React, { useState } from "react";
import "./maincss/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>
          Have questions or need assistance? Our support team is here to help you 24/7.
          Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="contact-content">
        {/* Contact Info */}
        <div className="contact-info-section">
          <h2>Contact Information</h2>
          <div className="contact-info">
            <div className="info-box">
              <div className="icon-wrapper">
                <i className="fas fa-envelope"></i>
              </div>
              <h4>Email</h4>
              <p>support@onlinebank.com</p>
              <p className="info-subtitle">We'll respond within 24 hours</p>
            </div>
            <div className="info-box">
              <div className="icon-wrapper">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h4>Phone</h4>
              <p>+91 8885277944</p>
              <p className="info-subtitle">Available 24/7</p>
            </div>
            <div className="info-box">
              <div className="icon-wrapper">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4>Address</h4>
              <p>KL University Banking</p>
              <p className="info-subtitle">Vijayawada, Andhra Pradesh</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="office-hours">
            <h3>Office Hours</h3>
            <div className="hours-grid">
              <div className="hours-item">
                <span className="day">Monday - Friday</span>
                <span className="time">9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Saturday</span>
                <span className="time">9:00 AM - 2:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Sunday</span>
                <span className="time">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="account">Account Inquiry</option>
                <option value="loan">Loan Information</option>
                <option value="technical">Technical Support</option>
                <option value="complaint">Complaint</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Enter your message here..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
