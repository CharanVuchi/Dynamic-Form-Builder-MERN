import { createSlice } from "@reduxjs/toolkit";
import { CreateFormAction, DeleteFormAction, GetFormAction, GetFormsAction, GetPublicFormAction, UpdateFormAction } from "../actions/forms";

const initial_state = {
  forms: [],
  form: null,
  publicForm: null,
  pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
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
        state.pagination = payload?.meta?.pagination || initial_state.pagination;
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
      })
      .addCase(UpdateFormAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        state.form = payload?.data || state.form;
      })
      .addCase(DeleteFormAction.pending, (state) => {
        state.reduxLoading = true;
        state.reduxError = null;
      })
      .addCase(DeleteFormAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        const deletedId = payload?.data?.id;
        if (deletedId) {
          state.forms = state.forms.filter((form) => String(form.id || form._id) !== String(deletedId));
          state.pagination.total = Math.max(0, state.pagination.total - 1);
          state.pagination.totalPages = Math.ceil(state.pagination.total / state.pagination.limit);
        }
      })
      .addCase(DeleteFormAction.rejected, (state, { payload }) => {
        state.reduxLoading = false;
        state.reduxError = payload?.error || null;
      })
      .addCase(GetPublicFormAction.pending, (state) => {
        state.reduxLoading = true;
        state.reduxError = null;
        state.publicForm = null;
      })
      .addCase(GetPublicFormAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        state.publicForm = payload?.data || null;
      })
      .addCase(GetPublicFormAction.rejected, (state, { payload }) => {
        state.reduxLoading = false;
        state.publicForm = null;
        state.reduxError = payload?.error || null;
      });
  },
});

export default forms_slice.reducer;
