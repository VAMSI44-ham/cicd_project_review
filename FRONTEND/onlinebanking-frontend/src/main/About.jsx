import React from "react";
import { useNavigate } from "react-router-dom";
import "./maincss/About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About OnlineBank</h1>
        <p className="about-subtitle">
          Your trusted partner in digital banking. Secure, fast, and convenient banking at your fingertips.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission-card">
          <div className="icon-circle">
            <i className="fas fa-bullseye"></i>
          </div>
          <h2>Our Mission</h2>
          <p>
            To provide accessible, secure, and innovative banking solutions that empower our customers
            to achieve their financial goals while maintaining the highest standards of service excellence.
          </p>
        </div>
        <div className="vision-card">
          <div className="icon-circle">
            <i className="fas fa-eye"></i>
          </div>
          <h2>Our Vision</h2>
          <p>
            To become the leading digital banking platform, recognized for innovation, customer satisfaction,
            and financial inclusion, making banking accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Security First</h3>
            <p>We prioritize your financial security with advanced encryption and multi-factor authentication.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-users"></i>
            <h3>Customer Centric</h3>
            <p>Your satisfaction is our success. We're committed to providing exceptional service.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-lightbulb"></i>
            <h3>Innovation</h3>
            <p>Continuously evolving our platform with cutting-edge technology and features.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-handshake"></i>
            <h3>Trust & Integrity</h3>
            <p>Building lasting relationships through transparency, honesty, and ethical practices.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="about-content">
        <h2 className="section-title">What We Offer</h2>
        <div className="services-grid">
          <div className="about-card">
            <div className="service-icon">
              <i className="fas fa-wallet"></i>
            </div>
            <h3>Account Management</h3>
            <p>
              Manage multiple accounts easily, track balances, view statements,
              and monitor transaction history in real-time. Get instant notifications
              for all account activities.
            </p>
          </div>

          <div className="about-card">
            <div className="service-icon">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h3>Fund Transfers & Payments</h3>
            <p>
              Transfer funds instantly between accounts, pay bills, and set up
              recurring payments safely and securely. Support for domestic and
              international transfers.
            </p>
          </div>

          <div className="about-card">
            <div className="service-icon">
              <i className="fas fa-hand-holding-usd"></i>
            </div>
            <h3>Loans & Services</h3>
            <p>
              Request personal, home, or business loans directly through your
              online account. Track approvals and disbursements efficiently with
              real-time status updates.
            </p>
          </div>

          <div className="about-card">
            <div className="service-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3>Advanced Security</h3>
            <p>
              Your security is our priority. We use multi-factor authentication,
              end-to-end encryption, and fraud detection to ensure your data and
              transactions remain safe.
            </p>
          </div>

          <div className="about-card">
            <div className="service-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Mobile Banking</h3>
            <p>
              Access your accounts anytime, anywhere with our responsive platform.
              Full functionality available on all devices - desktop, tablet, and mobile.
            </p>
          </div>

          <div className="about-card">
            <div className="service-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>
              Our dedicated support team is available round the clock to assist you
              with any queries or concerns. Multiple channels for your convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2 className="section-title">Why Choose OnlineBank?</h2>
        <div className="features-list">
          <div className="feature-item">
            <i className="fas fa-check-circle"></i>
            <div>
              <h4>Zero Hidden Charges</h4>
              <p>Transparent fee structure with no surprise charges</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-check-circle"></i>
            <div>
              <h4>Instant Transactions</h4>
              <p>Real-time processing for all your banking needs</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-check-circle"></i>
            <div>
              <h4>Easy Registration</h4>
              <p>Quick and simple account setup process</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-check-circle"></i>
            <div>
              <h4>Comprehensive Dashboard</h4>
              <p>All your banking information in one place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Active Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">₹50Cr+</div>
          <div className="stat-label">Transactions Processed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime Guarantee</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Customer Support</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Experience Seamless Banking Today</h2>
        <p>Join thousands of satisfied customers and manage your finances effortlessly with OnlineBank.</p>
        <div className="cta-buttons">
          <button className="cta-btn primary" onClick={() => navigate("/customerregistration")}>
            Open an Account
          </button>
          <button className="cta-btn secondary" onClick={() => navigate("/contact")}>
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
