import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./features/user/user";
import snackbarSlice from "./features/snackbar/snackbar";
import NavbarIndex from './features/navbar/navbar'
const persistConfig = {
  version: 1,
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  setSnackBar: snackbarSlice,
  logStatus: user,
  navStatus:NavbarIndex
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
