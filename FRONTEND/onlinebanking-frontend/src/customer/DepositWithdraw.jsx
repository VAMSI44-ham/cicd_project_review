import React, { useEffect, useState } from "react";
import axios from "axios";
import './customercss/DepositWithdraw.css';

export default function DepositWithdraw() {
  const [customer, setCustomer] = useState(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/transaction`;

  useEffect(() => {
    const storedCustomer = JSON.parse(sessionStorage.getItem("customer"));
    if (!storedCustomer) {
      setError("Please log in first");
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
      setError("Failed to fetch balance");
    }
  };

  const handleTransaction = async (type) => {
    setMessage("");
    setError("");

    if (!customer) return setError("Customer not found");
    if (!amount) return setError("Enter amount");

    try {
      const res = await axios.post(`${API_URL}/add/${customer.id}`, {
        amount: parseFloat(amount),
        type: type,
        description: type + " via online portal",
      });

      setMessage(`Transaction successful: ${res.data.type} ₹${res.data.amount}`);
      setAmount("");
      fetchBalance(customer.id); // Update balance after transaction
    } catch (err) {
      setError("Transaction failed: " + (err.response?.data || ""));
    }
  };

  if (!customer) return <p>{error || "Loading..."}</p>;

  return (
    <div className="deposit-withdraw-container">
      <h2>Deposit / Withdraw</h2>
      <p className="balance">Current Balance: ₹{balance.toLocaleString()}</p>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <input
        type="number"
        value={amount}
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="button-group">
        <button onClick={() => handleTransaction("Credit")}>Deposit</button>
        <button onClick={() => handleTransaction("Debit")}>Withdraw</button>
      </div>
    </div>
  );
}
