// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {  login } from './auth/authSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers if you have them
  },
});

// const initializeApp = async () => {
//   try {
    
//     if (userData) {
//       const user = JSON.parse(userData);
//       store.dispatch(login(user));
//     }
//   } catch (error) {
//     console.error('Error loading user data from AsyncStorage:', error);
//   }
// };

// initializeApp();

export default store;
