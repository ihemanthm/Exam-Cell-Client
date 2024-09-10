import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice  from "./features/snackbar/snackbar";
import { combineReducers } from "@reduxjs/toolkit";


const rootReducer=combineReducers(
    {
        setSnackBar:snackbarSlice
    }
)
export const store=configureStore(
    {
        reducer:rootReducer
    }
)
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;