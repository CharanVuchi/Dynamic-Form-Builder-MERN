import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { is_loading_false, is_loading_true } from "src/redux/features/loader";

const apiUri = () => `${import.meta.env.VITE_API_URI?.trim() || ""}`;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const GetFormsAction = createAsyncThunk("forms/get_list", async (params = {}, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.get(`${apiUri()}/forms`, { ...getHeaders(), params });
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

export const GetFormAction = createAsyncThunk("forms/get", async (id, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.get(`${apiUri()}/forms/${id}`, getHeaders());
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

export const CreateFormAction = createAsyncThunk("forms/create", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.post(`${apiUri()}/forms`, payload, getHeaders());
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

export const UpdateFormAction = createAsyncThunk("forms/update", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.put(`${apiUri()}/forms/${payload.id}`, payload, getHeaders());
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

export const DeleteFormAction = createAsyncThunk("forms/delete", async (id, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.delete(`${apiUri()}/forms/${id}`, getHeaders());
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});

export const GetPublicFormAction = createAsyncThunk("forms/get_public", async (formId, { rejectWithValue, dispatch }) => {
  try {
    dispatch(is_loading_true());
    const result = await axios.get(`${apiUri()}/public/forms/${formId}`);
    dispatch(is_loading_false());
    return result?.data;
  } catch (err) {
    dispatch(is_loading_false());
    return rejectWithValue(err.response?.data);
  }
});
