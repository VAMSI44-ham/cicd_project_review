import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import "./customercss/CustomerLogin.css";

// API base URL from .env
const API_URL = `${import.meta.env.VITE_API_URL}/customer`;

export default function CustomerLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsCustomerLoggedIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      // JWT login - store token and user info
      const { token, id, username, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("userRole", role);
      
      // Get full customer data
      try {
        const customerRes = await axios.get(`${API_URL}/${id}`);
        sessionStorage.setItem("customer", JSON.stringify(customerRes.data));
      } catch (err) {
        // If fetch fails, store basic info
        sessionStorage.setItem("customer", JSON.stringify({ id, username }));
      }
      
      setIsCustomerLoggedIn(true);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data || "Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-hero">
            <div className="bank-icon">
              <i className="fas fa-university"></i>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to access your account and manage your finances securely. Your banking experience starts here.</p>
            <div className="security-features">
              <div className="security-item">
                <i className="fas fa-shield-alt"></i>
                <span>Bank-Level Security</span>
              </div>
              <div className="security-item">
                <i className="fas fa-lock"></i>
                <span>Encrypted Transactions</span>
              </div>
              <div className="security-item">
                <i className="fas fa-user-shield"></i>
                <span>Protected Account</span>
              </div>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <div className="form-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to continue</p>
            </div>

            {error && (
              <div className="alert-message error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fas fa-user"></i> Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="signin-button">
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </button>
            </form>

            <p className="signup-link">
              Don't have an account? <Link to="/customerregistration">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
