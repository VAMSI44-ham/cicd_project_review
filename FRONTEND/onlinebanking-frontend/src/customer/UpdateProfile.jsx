import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './customercss/UpdateProfile.css';

const API_URL = `${import.meta.env.VITE_API_URL}/customer`;

export default function CustomerUpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    address: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) setFormData(JSON.parse(storedCustomer));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/updateprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        sessionStorage.setItem('customer', JSON.stringify(formData));
        setTimeout(() => navigate('/profile'), 1000);
      }
    } catch (err) {
      setError(err.response?.data || 'Unexpected error occurred.');
    }
  };

  return (
    <div className="customer-update-container">
      <h3>Update Customer Profile</h3>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="update-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input 
          type="text" 
          id="fullName" 
          value={formData.fullName} 
          onChange={handleChange} 
          required 
        />

        <label>Gender</label>
        <input type="text" id="gender" value={formData.gender} readOnly />

        <label>Date of Birth</label>
        <input type="date" id="dob" value={formData.dob} readOnly />

        <label>Email</label>
        <input type="email" id="email" value={formData.email} readOnly />

        <label>Username</label>
        <input type="text" id="username" value={formData.username} readOnly />

        <label>Password</label>
        <input 
          type="password" 
          id="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />

       
       <label>Phone Number</label>
        <input type="tel" id="phone" value={formData.phone} readOnly />

        <label>Address</label>
        <input 
          type="text" 
          id="address" 
          value={formData.address} 
          onChange={handleChange} 
          required 
        />

        <button type="submit" className="update-btn">Update Profile</button>
      </form>
    </div>
  );
}
