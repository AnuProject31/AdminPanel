import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("isAuthenticated", "true"); // Persist login
    },
    // logout: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("isAuthenticated");
    // },
  },
});

export const { setMode, setUser } = authSlice.actions;
export default authSlice.reducer;
