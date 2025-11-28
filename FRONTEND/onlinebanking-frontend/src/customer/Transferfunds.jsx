import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customercss/Transferfunds.css';

function Transferfunds() {
  const [customer, setCustomer] = useState(null);
  const [balance, setBalance] = useState(0);
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/transaction`;

  useEffect(() => {
    const storedCustomer = JSON.parse(sessionStorage.getItem('customer'));
    if (!storedCustomer) {
      setError('Please log in first');
      return;
    }
    setCustomer(storedCustomer);
    fetchBalance(storedCustomer.id);
  }, []);

  const fetchBalance = async (customerId) => {
    try {
      const res = await axios.get(`${API_URL}/balance/${customerId}`);
      setBalance(res.data.balance);
    } catch (err) {
      setError('Failed to fetch balance');
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!toAccountNumber) {
      setError('Please enter receiver account number');
      return;
    }

    if (toAccountNumber.length !== 12) {
      setError('Account number must be 12 digits');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > balance) {
      setError('Insufficient balance');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/transfer/by-account`,
        null,
        {
          params: {
            fromCustomerId: customer.id,
            toAccountNumber: toAccountNumber,
            amount: parseFloat(amount)
          }
        }
      );

      setMessage(res.data.message || res.data);
      setAmount('');
      setToAccountNumber('');
      fetchBalance(customer.id); // Refresh balance
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  if (!customer) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="transfer-container">
      <div className="transfer-header">
        <h2>💰 Fund Transfer</h2>
        <p className="current-balance">Current Balance: ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      </div>

      {message && (
        <div className="success-message">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          ✗ {error}
        </div>
      )}

      <div className="my-account-info">
        <p>
          <strong>Your Account Number:</strong> {customer.accountNumber || 'Not Assigned'}
        </p>
        {!customer.accountNumber && (
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#d32f2f' }}>
            ⚠️ Please contact admin to get your account number assigned.
          </p>
        )}
      </div>

      <form onSubmit={handleTransfer} className="transfer-form">
        <div className="form-group">
          <label htmlFor="toAccountNumber">
            Receiver Account Number <span className="required">*</span>
          </label>
          <input
            type="text"
            id="toAccountNumber"
            value={toAccountNumber}
            onChange={(e) => setToAccountNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter receiver's 12-digit account number"
            required
            maxLength="12"
            minLength="12"
          />
          <small>Enter 12-digit account number</small>
        </div>

        <div className="form-group">
          <label htmlFor="amount">
            Transfer Amount <span className="required">*</span>
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to transfer"
            required
            min="0.01"
            step="0.01"
            max={balance}
          />
        </div>

        <button
          type="submit"
          className="transfer-button"
          disabled={loading || !toAccountNumber || !amount || toAccountNumber.length !== 12}
        >
          {loading ? 'Processing...' : 'Transfer Funds'}
        </button>
      </form>

      <div className="transfer-info">
        <h3>📋 Transfer Information</h3>
        <ul>
          <li>Enter the receiver's 12-digit account number to transfer funds</li>
          <li>Ensure you have sufficient balance before transferring</li>
          <li>Transfer will be recorded in your transaction history</li>
          <li>Both sender and receiver will receive transaction notifications</li>
          <li>Your account number is displayed at the top</li>
        </ul>
      </div>
    </div>
  );
}

export default Transferfunds;
