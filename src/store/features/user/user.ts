import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  authToken: "",
  name: "",
  email: "",
};

export const logged = createSlice({
  name: "Login",
  initialState,
  reducers: {
    loggedStatus: (state, action) => {
      state.name = action.payload.name;
      state.logged = action.payload.logged;
      state.authToken = action.payload.token;
      state.email = action.payload.email;
    },
  },
});

export const { loggedStatus } = logged.actions;
export default logged.reducer;