import { createSlice } from "@reduxjs/toolkit";
import { CreateFormAction, GetFormAction, GetFormsAction } from "../actions/forms";

const initial_state = {
  forms: [],
  form: null,
  reduxLoading: false,
  reduxError: null,
};

const forms_slice = createSlice({
  name: "forms_slice",
  initialState: initial_state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFormsAction.pending, (state) => {
        state.reduxLoading = true;
        state.reduxError = null;
      })
      .addCase(GetFormsAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        state.forms = payload?.data || [];
      })
      .addCase(GetFormsAction.rejected, (state, { payload }) => {
        state.reduxLoading = false;
        state.reduxError = payload?.error || null;
      })
      .addCase(GetFormAction.pending, (state) => {
        state.reduxLoading = true;
        state.reduxError = null;
      })
      .addCase(GetFormAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        state.form = payload?.data || null;
      })
      .addCase(GetFormAction.rejected, (state, { payload }) => {
        state.reduxLoading = false;
        state.reduxError = payload?.error || null;
      })
      .addCase(CreateFormAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        state.form = payload?.data || state.form;
      });
  },
});

export default forms_slice.reducer;
