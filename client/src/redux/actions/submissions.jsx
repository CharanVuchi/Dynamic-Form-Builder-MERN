import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { is_loading_false, is_loading_true } from "src/redux/features/loader";

const apiUri = () => `${import.meta.env.VITE_API_URI?.trim() || ""}`;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const GetSubmissionsAction = createAsyncThunk("submissions/get_list", async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.get(`${apiUri()}/submissions`, getHeaders());
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

export const CreateSubmissionAction = createAsyncThunk("submissions/create", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.post(`${apiUri()}/public/submissions/forms/${payload.formId}/submissions`, payload.values || {});
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

export const DeleteSubmissionAction = createAsyncThunk("submissions/delete", async (id, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.delete(`${apiUri()}/submissions/${id}`, getHeaders());
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});
