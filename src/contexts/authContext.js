import React, { createContext, useContext, useState, useEffect } from 'react';


// Create a context object
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null or initial user state
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Initialize with null or initial token state
  const [loading, setLoading] = useState(false); // Set initial loading state

  // Example login function
  const login = async (email, password) => {
    try {
      setLoading(true); // Set loading state
      // Example fetch to your backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EMAIL: email, PASSWORD: password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set user state from response
        setToken(data.Token);
        localStorage.setItem("token", data.Token); // Set token state from response
        setLoading(false);
        return true; // Set loading state after login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setLoading(false); // Ensure loading state is false on error
      throw new Error('Login failed'); // Handle login failure
    }
  };
  
  const register = async (DATA) => {
    try {
      setLoading(true); // Set loading state
      // Example fetch to your backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DATA),
      });
      if (response.ok) {
        setLoading(false);
        return true; 
      } else {
        throw new Error('Registration File failed');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      setLoading(false); // Ensure loading state is false on error
      throw new Error('Registration failed'); // Handle login failure
    }
  };

  // Example logout function
  const logout = async () => {
    try {
      setUser(null); // Clear user state
      setToken(null); // Clear token state
      setLoading(false); // Set loading state
      localStorage.removeItem("token"); // Remove token from localStorage
    } catch (error) {
      console.error('Logout error:', error.message);
      throw new Error('Logout failed'); // Handle logout failure
    }
  };

  // Function to load user data from server
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return; // No token found, return
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}users/token`, {
        headers: {
          'Content-Type': 'application/json',
          'token': `${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data); // Set user state from response
        setLoading(false); // Set loading state after successful load
      } else {
        setLoading(false); // Set loading state even on failure
      }
    } catch (error) {
      console.error('Load user error:', error.message);
      setLoading(false); // Ensure loading state is false on error
    }
  };

  // UseEffect hook to load user data on component mount
  useEffect(() => {
      if(token){
        loadUser(); // Load user data when component mounts
      }
  }, [token]);

  // Context value to be consumed by useContext
  const authContextValue = {
    user,
    token,
    loading,
    setLoading,
    register,
    login,
    logout,
  };

  // Provide the context value to the entire application
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to consume AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
