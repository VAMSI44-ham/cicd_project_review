import { useEffect, useState } from "react";
import axios from "axios";
import "./admincss/ManageCustomer.css";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/customers`);
      setCustomers(res.data);
    } catch (err) {
      setError("Failed to fetch customers: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.fullName?.toLowerCase().includes(q) ||
      c.username?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="customer-container">
      <h2 className="customer-title">All Customers</h2>

      <div className="filters">
        <input
          placeholder="🔍 Search by name, username, email, phone"
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
        />
      </div>

      {error ? (
        <div className="table-error">{error}</div>
      ) : loading ? (
        <div className="table-loading">Loading customers...</div>
      ) : filteredCustomers.length === 0 ? (
        <div className="table-empty">No Customer Data Found</div>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.fullName}</td>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
