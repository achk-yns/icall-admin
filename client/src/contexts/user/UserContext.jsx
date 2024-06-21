// contexts/user/UserContext.js

import React, { createContext, useContext, useReducer } from 'react';

// Create context
const UserContext = createContext();

// Initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
};

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
