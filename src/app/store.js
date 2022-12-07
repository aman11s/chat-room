import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/auth-slice";
import msgReducer from "../features/msgSlice/msg-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    msgs: msgReducer,
  },
});
