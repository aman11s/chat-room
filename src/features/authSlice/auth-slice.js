import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
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
  },
});

export default authSlice.reducer;
