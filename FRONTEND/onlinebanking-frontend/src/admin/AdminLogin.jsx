import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
 
import { useAuth } from "../contextapi/AuthContext"
import "./admincss/AdminLogin.css";

// Vite environment variable for backend URL
const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      if (response.status === 200) {
        // JWT login - store token and user info
        const { token, id, username, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
        localStorage.setItem("userRole", role);
        sessionStorage.setItem("admin", JSON.stringify({ id, username, role }));
        
        setIsAdminLoggedIn(true);
        navigate("/");
      } else {
        setMessage(response.data);
      }
    } catch (err) {
      setError(err.response?.data || "An unexpected error occurred.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-hero">
            <div className="bank-icon">
              <i className="fas fa-user-shield"></i>
            </div>
            <h1>Admin Portal</h1>
            <p>Access the administrative dashboard to manage the banking system. Secure access with advanced authentication.</p>
            <div className="security-features">
              <div className="security-item">
                <i className="fas fa-shield-alt"></i>
                <span>Secure Access</span>
              </div>
              <div className="security-item">
                <i className="fas fa-cog"></i>
                <span>System Management</span>
              </div>
              <div className="security-item">
                <i className="fas fa-chart-line"></i>
                <span>Analytics & Reports</span>
              </div>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <div className="form-header">
              <h2>Admin Sign In</h2>
              <p>Enter your credentials to access the admin panel</p>
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
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fas fa-user"></i> Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="signin-button">
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </button>
            </form>

            <p className="signup-link">
              Not an Admin? <Link to="/">Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
