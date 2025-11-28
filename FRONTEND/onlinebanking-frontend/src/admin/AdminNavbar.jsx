import { NavLink, useNavigate, Routes, Route } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contextapi/AuthContext";
import "./admincss/AdminNavbar.css";

 // import other pages when ready
// import CustomerTransactions from "../customer/Transactions";
 
// import LoanRequests from "../customer/LoanRequests";
// import StaffDashboard from "../staff/StaffDashboard";
// import Reports from "../staff/Reports";
import AddStaff from './AddStaff';
import AdminDashboard from './AdminDashboard';
import ManageCustomers from "./ManageCustomers";
import ManageStaff from './ManageStaff';
import Reports from './Reports';
import AllTransactions from './AllTransactions';

export default function AdminNavBar() {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn, setIsStaffLoggedIn, setIsCustomerLoggedIn } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsAdminLoggedIn(false);
    setIsStaffLoggedIn(false);
    setIsCustomerLoggedIn(false);
    navigate("/adminlogin", { replace: true });
  };

  return (
    <>
      <nav className="admin-navbar">
        <div className="logo">OnlineBank</div>

        <div className="nav-links">
        
          {/* Uncomment when pages are ready */}
          <NavLink to="/"> Dashboard</NavLink>
        
          <NavLink to="/addstaff">Add Staff</NavLink>
          <NavLink to="/managestaff"> All Staff</NavLink>
          <NavLink to="/managecustomers">All Customers</NavLink>
            <NavLink to="/customer/transactions">Transactions</NavLink>
         
          
          <NavLink to="/staff/reports">Reports</NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </nav>

      {/* Routed Pages */}
      <main className="content">
        <Routes>
         
           <Route path="/" element={<AdminDashboard/>} />
          {/* Uncomment when pages are ready */}
           <Route path="/customer/transactions" element={<AllTransactions/>} />
         
       
       
          <Route path="/staff/reports" element={<Reports/>} />
            <Route path="/managecustomers" element={<ManageCustomers/>} />
              <Route path="/managestaff" element={<ManageStaff/>} />
           <Route path="/addstaff" element={<AddStaff/>} />
             
        </Routes>
      </main>
    </>
  );
}
