import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer les informations de l'utilisateur
export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (token, { rejectWithValue }) => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/profil`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message);
    }

    return data.body;
  }
);

// Slice pour la gestion de l'utilisateur
const user = createSlice({
  name: "user",
  initialState: {
    user: {},
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.error = action.payload || "Une erreur s'est produite";
      });
  },
});

// Export du reducer
export default user.reducer;