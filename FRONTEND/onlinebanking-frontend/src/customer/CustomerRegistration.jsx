import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./customercss/CustomerRegistration.css";

// Use Vite environment variable

const API_URL = `${import.meta.env.VITE_API_URL}/customer`;

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, formData);

      // ✅ Success case (201 Created)
      if (response.status === 201) {
        setMessage(response.data);
        setError("");
        // Reset form
        setFormData({
          fullName: "",
          gender: "",
          dob: "",
          email: "",
          username: "",
          password: "",
          phone: "",
          address: "",
        });
      }
    } catch (err) {
      // ✅ Duplicate / Conflict (409)
      if (err.response?.status === 409) {
        setError(err.response.data); // "Username already exists!"
        setMessage("");
      } 
      // ✅ Any other error
      else {
        setError("An unexpected error occurred.");
        setMessage("");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-left">
          <div className="register-hero">
            <div className="bank-icon">
              <i className="fas fa-university"></i>
            </div>
            <h1>Join OnlineBank</h1>
            <p>Create your account and start managing your finances with ease. Secure, fast, and reliable banking at your fingertips.</p>
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Instant Account Setup</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Secure Banking</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>24/7 Access</span>
              </div>
            </div>
          </div>
        </div>
        <div className="register-right">
          <div className="register-form">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

            {message && (
              <div className="alert-message success">
                <i className="fas fa-check-circle"></i>
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className="alert-message error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">
                    <i className="fas fa-user"></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="form-row two-columns">
                <div className="form-group">
                  <label htmlFor="gender">
                    <i className="fas fa-venus-mars"></i> Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dob">
                    <i className="fas fa-calendar-alt"></i> Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row two-columns">
                <div className="form-group">
                  <label htmlFor="username">
                    <i className="fas fa-user-circle"></i> Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Choose a username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fas fa-lock"></i> Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create password"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">
                    <i className="fas fa-map-marker-alt"></i> Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <i className="fas fa-user-plus"></i>
                Create Account
              </button>
            </form>

            <p className="login-link">
              Already have an account? <Link to="/customerlogin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
