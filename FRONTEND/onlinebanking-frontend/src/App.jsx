import { BrowserRouter } from "react-router-dom";
 
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import MainNavBar from './main/MainNavbar';
import AdminNavbar from './admin/AdminNavbar';
import CustomerNavbar from './customer/CustomerNavbar';
import StaffNavbar from './staff/StaffNavbar';

function AppContent() {
  const { isAdminLoggedIn, isCustomerLoggedIn, isStaffLoggedIn } = useAuth();

  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavbar/>
        ) : isCustomerLoggedIn ? (
          <CustomerNavbar/>
        ) : isStaffLoggedIn ? (
          <StaffNavbar/>
        ) : (
          <MainNavBar/>
        )}
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
