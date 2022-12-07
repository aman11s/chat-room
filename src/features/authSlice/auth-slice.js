import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

export const signupHandler = createAsyncThunk(
  "auth/signupHandler",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { username, email, password } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: username });
      const { accessToken, displayName } = auth.currentUser;
      const user = {
        token: accessToken,
        username: displayName,
        email: auth.currentUser.email,
      };
      return { userData: user };
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

export const logoutHandler = createAsyncThunk(
  "auth/logoutHandler",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

export const loginHandler = createAsyncThunk(
  "auth/loginHandler",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { email, password } = formData;
      const res = await signInWithEmailAndPassword(auth, email, password);
      const { accessToken, displayName } = res.user;
      const user = {
        token: accessToken,
        username: displayName,
        email: res.user.email,
      };
      return { userData: user };
    } catch (e) {
      console.error(e);
      rejectWithValue(e);
    }
  }
);

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // Sign up Handler
    [signupHandler.pending]: (state) => {
      state.status = "pending";
    },
    [signupHandler.fulfilled]: (state, { payload }) => {
      state.fulfilled = "fulfilled";
      state.userData = payload.userData;
      localStorage.setItem("userData", JSON.stringify(payload.userData));
    },
    [signupHandler.rejected]: (state) => {
      state.status = "rejected";
    },

    // Logout Handler
    [logoutHandler.fulfilled]: (state) => {
      state.status = "fulfilled";
      state.userData = {};
      localStorage.removeItem("userData");
    },

    // Login Handler
    [loginHandler.pending]: (state) => {
      state.status = "pending";
    },
    [loginHandler.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.userData = payload.userData;
      localStorage.setItem("userData", JSON.stringify(payload.userData));
    },
    [loginHandler.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default authSlice.reducer;
