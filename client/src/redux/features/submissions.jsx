import { createSlice } from "@reduxjs/toolkit";
import { CreateSubmissionAction, DeleteSubmissionAction, GetSubmissionsAction } from "../actions/submissions";

const initial_state = {
  submissions: [],
  reduxLoading: false,
  reduxError: null,
};

const submissions_slice = createSlice({
  name: "submissions_slice",
  initialState: initial_state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSubmissionsAction.pending, (state) => {
        state.reduxLoading = true;
        state.reduxError = null;
      })
      .addCase(GetSubmissionsAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        state.submissions = payload?.data || [];
      })
      .addCase(GetSubmissionsAction.rejected, (state, { payload }) => {
        state.reduxLoading = false;
        state.reduxError = payload?.error || null;
      })
      .addCase(CreateSubmissionAction.pending, (state) => {
        state.reduxLoading = true;
        state.reduxError = null;
      })
      .addCase(CreateSubmissionAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        const newSubmission = payload?.data;

        state.submissions = newSubmission ? [newSubmission, ...(state.submissions || [])] : state.submissions;
      })
      .addCase(DeleteSubmissionAction.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;
        state.submissions = (state.submissions || []).filter((submission) => submission.id !== payload?.data?.id);
      });
  },
});

export default submissions_slice.reducer;
