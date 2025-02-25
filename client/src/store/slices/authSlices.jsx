import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour la connexion
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message);
    }

    return data.body.token;
  }
);

// Slice pour la gestion de l'authentification
const login = createSlice({
  name: "login",
  initialState: {
    token: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload?.split(":")[1] || "Une erreur s'est produite";
      });
  },
});

// Export des actions
export const { logout } = login.actions;

// Export du reducer
export default login.reducer;
