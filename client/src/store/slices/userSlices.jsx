import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer l'utilisateur
export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (token, { rejectWithValue }) => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/profile`,
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

// Action asynchrone pour mettre à jour l'utilisateur
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async ({ token, firstName, lastName }, { rejectWithValue }) => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
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
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.error = action.payload || "Une erreur s'est produite";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload || "Une erreur s'est produite";
      });
  },
});

// Export des actions
export const { setUser } = user.actions;

// Export du reducer
export default user.reducer;
