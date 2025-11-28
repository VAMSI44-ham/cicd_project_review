import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admincss/AllTransactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });

  const API_URL = `${import.meta.env.VITE_API_URL}/transaction`;

  // Fetch all transactions (manual)
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setTransactions(res.data);
      setFilteredTransactions(res.data);
    } catch (err) {
      setError("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions(); // initial load
  }, []);

  // Filter input change
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  // Apply date filter
  const applyFilter = () => {
    let filtered = [...transactions];
    if (filter.startDate) {
      const start = new Date(filter.startDate);
      filtered = filtered.filter(
        (txn) => new Date(txn.transactionDate) >= start
      );
    }
    if (filter.endDate) {
      const end = new Date(filter.endDate);
      end.setHours(23, 59, 59, 999); // include entire end date
      filtered = filtered.filter(
        (txn) => new Date(txn.transactionDate) <= end
      );
    }
    setFilteredTransactions(filtered);
  };

  const resetFilter = () => {
    setFilter({ startDate: "", endDate: "" });
    setFilteredTransactions(transactions);
  };

  return (
    <div className="transactions-container">
      <h2>All Transactions</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Filter Section */}
      <div className="filter-section">
        <label>
          Start Date:
          <input
            type="date"
            id="startDate"
            value={filter.startDate}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            id="endDate"
            value={filter.endDate}
            onChange={handleFilterChange}
          />
        </label>
        <button onClick={applyFilter}>Apply Filter</button>
        <button onClick={resetFilter} className="reset-btn">
          Reset
        </button>
        <button onClick={fetchTransactions} className="reload-btn">
          Reload
        </button>
      </div>

      {/* Transactions Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={7}>No transactions found</td>
            </tr>
          ) : (
            filteredTransactions.map((txn) => {
              const txnDate = new Date(txn.transactionDate);
              const formattedDate = txnDate.toLocaleDateString("en-GB"); // DD/MM/YYYY
              const formattedTime = txnDate.toLocaleTimeString("en-GB"); // HH:MM:SS

              return (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.customer?.id}</td>
                  <td>{txn.customer?.fullName}</td>
                  <td>{txn.type}</td>
                  <td>₹{txn.amount.toLocaleString()}</td>
                  <td>{txn.description || "-"}</td>
                  <td>{`${formattedDate} ${formattedTime}`}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
