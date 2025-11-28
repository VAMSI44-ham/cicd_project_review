import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customercss/Statement.css";

export default function Statements() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/transaction`;

  useEffect(() => {
    const storedCustomer = JSON.parse(sessionStorage.getItem("customer"));
    if (!storedCustomer) return setError("Please log in first");
    setCustomer(storedCustomer);
  }, []);

  const handleDownload = async () => {
    setMessage("");
    setError("");

    if (!customer) return setError("Customer not found");
    if (!startDate || !endDate) return setError("Please select both start and end dates");
    if (new Date(startDate) > new Date(endDate)) return setError("Start date cannot be after end date");

    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/customer/${customer.id}/statement?fromDate=${startDate}&toDate=${endDate}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Bank_Statement_${startDate}_to_${endDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage("Statement downloaded successfully!");
    } catch (err) {
      setError("Failed to download statement: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="statement-container">
      <h2>Download Bank Statement</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="date-picker">
        <div className="date-input">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="date-input">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="download-btn"
        disabled={loading || !startDate || !endDate}
      >
        {loading ? "Downloading..." : "Download PDF"}
      </button>
    </div>
  );
}
