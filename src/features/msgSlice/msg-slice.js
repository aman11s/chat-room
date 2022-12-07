import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverTimestamp, addDoc } from "firebase/firestore";
import { msgsColRef } from "../../firebase";

export const sendMsgHandler = createAsyncThunk(
  "msgs/sendMsgHandler",
  async ({ text, username, userId }, { rejectWithValue }) => {
    const newMsg = {
      text,
      username,
      userId,
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(msgsColRef, newMsg);
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  msgs: [],
  status: "idle",
};

const msgSlice = createSlice({
  name: "msgs",
  initialState,
  reducers: {},
});

export default msgSlice.reducer;
