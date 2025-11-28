import React from "react";
import { useNavigate } from "react-router-dom";
import "./maincss/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/customerlogin");
  };

  const handleRegister = () => {
    navigate("/customerregistration");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to OnlineBank</h1>
          <p className="hero-subtitle">Secure • Reliable • Fast</p>
          <p className="hero-description">
            Experience the future of banking with our comprehensive online platform.
            Manage your finances effortlessly from anywhere, anytime.
          </p>
          <div className="hero-buttons">
            <button className="get-started-btn primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="get-started-btn secondary" onClick={handleRegister}>
              Open Account
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose OnlineBank?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-wallet"></i>
            </div>
            <h3>Account Management</h3>
            <p>View balances, check statements, and manage multiple accounts easily. Get real-time updates on all your transactions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h3>Fund Transfers</h3>
            <p>Transfer money securely to any account anytime, anywhere. Instant transfers with complete security and transparency.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-credit-card"></i>
            </div>
            <h3>Bill Payments</h3>
            <p>Pay your bills online with just a few clicks – safe and convenient. Set up recurring payments for hassle-free banking.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-hand-holding-usd"></i>
            </div>
            <h3>Loan Services</h3>
            <p>Apply for personal, home, or business loans online. Track your application status and manage repayments easily.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Bank-Level Security</h3>
            <p>Your data is protected with advanced encryption, multi-factor authentication, and fraud detection systems.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Mobile Banking</h3>
            <p>Access your accounts on any device. Full functionality available on desktop, tablet, and mobile platforms.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">₹50Cr+</div>
          <div className="stat-label">Transactions</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create your account in minutes with just a few simple steps</p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Verify</h3>
            <p>Complete identity verification to activate your account</p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h3>Start Banking</h3>
            <p>Access all banking services and manage your finances</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="testimonial-text">
              "OnlineBank has made managing my finances so much easier. The interface is intuitive and the security features give me peace of mind."
            </p>
            <div className="testimonial-author">
              <strong>Rajesh Kumar</strong>
              <span>Business Owner</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="testimonial-text">
              "I love how fast the transactions are processed. Transferring money has never been this quick and secure."
            </p>
            <div className="testimonial-author">
              <strong>Priya Sharma</strong>
              <span>Software Engineer</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="testimonial-text">
              "The customer support is excellent. They're always available and ready to help with any questions I have."
            </p>
            <div className="testimonial-author">
              <strong>Amit Patel</strong>
              <span>Teacher</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers and experience seamless banking today.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={handleRegister}>
              Open an Account
            </button>
            <button className="cta-btn secondary" onClick={() => navigate("/about")}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
