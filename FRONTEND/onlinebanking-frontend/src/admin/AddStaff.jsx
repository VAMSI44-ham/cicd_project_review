import { useState } from "react";
import axios from "axios";
import "./admincss/AddStaff.css";

const API_URL = `${import.meta.env.VITE_API_URL}/staff`; // updated endpoint

export default function AddStaff() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phone: ""
  });

  const [message, setMessage] = useState(""); // success message
  const [error, setError] = useState("");     // error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/add`, formData); // backend add staff
      setMessage(response.data);
      setError("");
      setFormData({
        fullName: "",
        username: "",
        password: "",
        email: "",
        phone: ""
      });
    } catch (err) {
      setMessage("");
      if (err.response && err.response.data) {
        setError(err.response.data); // show duplicate or other backend error
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="addstaff-container">
      <form className="addstaff-form" onSubmit={handleSubmit}>
        {message && <h3 className="success-msg">{message}</h3>}
        {error && <p className="error-msg">{error}</p>}

        <div>
          <label>Full Name</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
}
