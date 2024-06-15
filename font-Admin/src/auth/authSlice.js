import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("From auth", { email, password });
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EMAIL: email, PASSWORD: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error response", errorData);
        return rejectWithValue(errorData);
      }

      const user = await response.json();
      console.log("Login success", user);
      return { user: user.user, token: user.Token }; // Adjust based on actual response structure
    } catch (error) {
      console.error("Login error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to load user
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      
      const response = await fetch("http://localhost:3001/users/token", {
        headers: {
          "Content-Type": "application/json",
          "token": `${token}`
        },
      });
      const data = await response.json();
      console.log("fetch Token" , data);
      if (token && data) {
        return { user: data.data, token };
      }
      return null;
    } catch (error) {
      console.error("Load user error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Update to store the user directly
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user; // Update to store the user directly
          state.token = action.payload.token;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
