// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     mode:"light",
//     userId:"63701cc1f03239b7f700000e"
// }

// export const globalSlice = createSlice({
//     name:"global",
//     initialState,
//     reducers:{
//         setMode:(state) =>{
//             state.mode = state.mode === "dark" ? "light" : "dark";
//         }
//     }
// })

// export const { setMode } = globalSlice.actions
// export default globalSlice.reducer
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
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { setMode, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
