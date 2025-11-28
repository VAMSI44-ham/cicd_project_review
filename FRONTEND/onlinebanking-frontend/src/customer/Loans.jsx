import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customercss/Loans.css';

const API_URL = `${import.meta.env.VITE_API_URL}/loan`;

export default function Loans() {
  const [customer, setCustomer] = useState(null);
  const [myLoans, setMyLoans] = useState([]);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    loanAmount: '',
    loanType: 'Personal Loan',
    tenureMonths: '',
    purpose: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCustomer = JSON.parse(sessionStorage.getItem('customer'));
    if (!storedCustomer) {
      setError('Please log in first');
      return;
    }
    setCustomer(storedCustomer);
    fetchMyLoans(storedCustomer.id);
  }, []);

  const fetchMyLoans = async (customerId) => {
    try {
      const res = await axios.get(`${API_URL}/customer/${customerId}`);
      setMyLoans(res.data);
    } catch (err) {
      setError('Failed to fetch loans');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/request/${customer.id}`, formData);
      
      setMessage('Loan request submitted successfully! Your request is pending approval.');
      setShowLoanForm(false);
      setFormData({ loanAmount: '', loanType: 'Personal Loan', tenureMonths: '', purpose: '' });
      fetchMyLoans(customer.id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit loan request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#ff9800',
      'Approved': '#4caf50',
      'Rejected': '#f44336',
      'Active': '#2196f3',
      'Completed': '#9e9e9e'
    };
    return colors[status] || '#666';
  };

  if (!customer) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="loans-container">
      <div className="loans-header">
        <h2>💰 Loan Services</h2>
        <button 
          className="request-loan-btn"
          onClick={() => setShowLoanForm(!showLoanForm)}
        >
          {showLoanForm ? 'Cancel' : '+ Request New Loan'}
        </button>
      </div>

      {message && (
        <div className="success-message">✓ {message}</div>
      )}

      {error && (
        <div className="error-message">✗ {error}</div>
      )}

      {showLoanForm && (
        <div className="loan-request-form">
          <h3>New Loan Request</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Loan Type *</label>
                <select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  required
                >
                  <option value="Personal Loan">Personal Loan (15% APR)</option>
                  <option value="Home Loan">Home Loan (8.5% APR)</option>
                  <option value="Car Loan">Car Loan (10.5% APR)</option>
                  <option value="Business Loan">Business Loan (12.5% APR)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Loan Amount (₹) *</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  min="10000"
                  max="10000000"
                  required
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tenure (Months) *</label>
                <input
                  type="number"
                  name="tenureMonths"
                  value={formData.tenureMonths}
                  onChange={handleChange}
                  min="12"
                  max="360"
                  required
                  placeholder="e.g., 60"
                />
              </div>

              <div className="form-group">
                <label>Purpose *</label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  placeholder="What will you use this loan for?"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-loan-btn"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Loan Request'}
            </button>
          </form>
        </div>
      )}

      <div className="my-loans-section">
        <h3>My Loan Requests</h3>
        {myLoans.length === 0 ? (
          <div className="no-loans">
            <p>You don't have any loan requests yet.</p>
            <p>Click "Request New Loan" to apply for a loan.</p>
          </div>
        ) : (
          <div className="loans-grid">
            {myLoans.map(loan => (
              <div key={loan.id} className="loan-card">
                <div className="loan-header">
                  <h4>{loan.loanType}</h4>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(loan.status) }}
                  >
                    {loan.status}
                  </span>
                </div>
                <div className="loan-details">
                  <div className="detail-item">
                    <span className="label">Amount:</span>
                    <span className="value">₹{loan.loanAmount?.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Interest Rate:</span>
                    <span className="value">{loan.interestRate}% APR</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Tenure:</span>
                    <span className="value">{loan.tenureMonths} months</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Purpose:</span>
                    <span className="value">{loan.purpose}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Requested:</span>
                    <span className="value">{new Date(loan.requestDate).toLocaleDateString()}</span>
                  </div>
                </div>
                {loan.comments && (
                  <div className="comments">
                    <strong>Comments:</strong> {loan.comments}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
