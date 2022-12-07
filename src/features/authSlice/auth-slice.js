import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

export const signupHandler = createAsyncThunk(
  "auth/signupHandler",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { username, email, password } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: username });
      const { accessToken, uid, displayName } = auth.currentUser;

      const user = {
        token: accessToken,
        userId: uid,
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
      const { accessToken, uid, displayName } = res.user;
      const user = {
        token: accessToken,
        userId: uid,
        username: displayName,
        email: res.user.email,
      };
      return { userData: user };
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  userData: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoginHandler: (state, { payload }) => {
      state.userData = payload;
    },
    userLogoutHandler: (state) => {
      state.userData = null;
    },
  },
  extraReducers: {
    // Sign up Handler
    [signupHandler.pending]: (state) => {
      state.status = "pending";
    },
    [signupHandler.fulfilled]: (state, { payload }) => {
      state.fulfilled = "fulfilled";
      state.userData = payload.userData;
      toast.success("Successfully signed up");
    },
    [signupHandler.rejected]: (state, { payload }) => {
      state.status = "rejected";
      toast.error(payload.message.slice(10));
    },

    // Logout Handler
    [logoutHandler.fulfilled]: (state) => {
      state.status = "fulfilled";
      state.userData = null;
      toast.success("Successfully logged out");
    },

    // Login Handler
    [loginHandler.pending]: (state) => {
      state.status = "pending";
    },
    [loginHandler.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.userData = payload.userData;
      toast.success("Successfully logged in");
    },
    [loginHandler.rejected]: (state, { payload }) => {
      state.status = "rejected";
      toast.error(payload.message.slice(10));
    },
  },
});

export const { userLoginHandler, userLogoutHandler } = authSlice.actions;

export default authSlice.reducer;
