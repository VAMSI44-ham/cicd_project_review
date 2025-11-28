import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./admincss/ManageStaff.css";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/staff`);
      setStaffList(res.data);
    } catch (err) {
      setError("Failed to fetch staff: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletestaff?staffId=${id}`);
      setError("");
      fetchStaff();
    } catch (err) {
      setError("Unexpected error: " + err.message);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.fullName?.toLowerCase().includes(q) ||
      s.username?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="staff-container">
      <h2 className="staff-title">Manage Staff</h2>

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
        <div className="table-loading">Loading staff...</div>
      ) : filteredStaff.length === 0 ? (
        <div className="table-empty">No Staff Data Found</div>
      ) : (
        <table className="staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.fullName}</td>
                <td>{staff.username}</td>
                <td>{staff.email}</td>
                <td>{staff.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteStaff(staff.id)}
                  >
                    <DeleteIcon /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
