import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Provider component to manage login states
export function AuthProvider({ children }) {
  // Load initial state from localStorage or default to false
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
    return localStorage.getItem("isCustomerLoggedIn") === "true";
  });

  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(() => {
    return localStorage.getItem("isStaffLoggedIn") === "true";
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
    localStorage.setItem("isCustomerLoggedIn", isCustomerLoggedIn);
    localStorage.setItem("isStaffLoggedIn", isStaffLoggedIn);
  }, [isAdminLoggedIn, isCustomerLoggedIn, isStaffLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isCustomerLoggedIn,
        setIsCustomerLoggedIn,
        isStaffLoggedIn,
        setIsStaffLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);
