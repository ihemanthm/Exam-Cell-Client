import { createSlice } from "@reduxjs/toolkit";

interface snackbarState {
  message: string;
  variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined;
}
const initialState: snackbarState = {
  message: "",
  variant: undefined,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
    },
    resetSnackbar: (state) => {
      state.message = "";
      state.variant = undefined;
    },
  },
});

export const {setSnackBar,resetSnackbar}=snackbarSlice.actions;
export default snackbarSlice.reducer;