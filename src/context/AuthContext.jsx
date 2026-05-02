import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on initial load to keep the user logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Register a new user and save to the 'users' array in localStorage
   * Also performs an auto-login after registration
   */
  const register = (email, password, role) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists!");
    }

    const newUser = { email, password, role };
    users.push(newUser);

    // Save updated users list and set the current session
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  /**
   * Login logic that enforces role-based access
   */
  const login = (email, password, requestedRole) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find the user by email and password
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      throw new Error("Invalid email or password.");
    }

    // STRICT ROLE CHECK: Prevent Buyer from logging in as Seller and vice-versa
    if (foundUser.role !== requestedRole) {
      throw new Error(
        `Access Denied: This account is registered as a ${foundUser.role}.`,
      );
    }

    // Set the session
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setUser(foundUser);
  };

  /**
   * Logout clears the current session but keeps the 'users' list intact
   */
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  /**
   * Update Password logic (requires current password for verification)
   */
  const updatePassword = (email, oldPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(
      (u) => u.email === email && u.password === oldPassword,
    );

    if (userIndex === -1) {
      throw new Error("Current password incorrect.");
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    // Update current session password as well
    const updatedUser = { ...users[userIndex] };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updatePassword, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
