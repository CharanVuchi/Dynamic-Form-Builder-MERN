import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { is_loading_false, is_loading_true } from "src/redux/features/loader";

const apiUri = () => `${import.meta.env.VITE_API_URI?.trim() || ""}`;

// Login
export const LoginAction = createAsyncThunk("sd/login_action", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.post(`${apiUri()}/user/login`, payload);
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

// Register
export const RegisterAction = createAsyncThunk("sd/register_action", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.post(`${apiUri()}/user/register`, payload);
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});
