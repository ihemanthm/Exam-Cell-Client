import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    index:0,
};

export const navIndex = createSlice({
  name: "NavbarIndex",
  initialState,
  reducers: {
    navbarStatus: (state, action) => {
      state.index = action.payload.index;
    },
  },
});

export const { navbarStatus } = navIndex.actions;
export default navIndex.reducer;