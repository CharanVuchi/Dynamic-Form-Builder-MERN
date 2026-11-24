import { createSlice } from "@reduxjs/toolkit";
import { Dashboard_Get_Action } from "../actions/dashboard";

const initial_state = {
  cards: [],
  submissionAnalytics: { labels: [], values: [] },
  recentForms: [],
  recentSubmissions: [],
  reduxLoading: false,
  reduxError: null,
};

const dashboard_get_Slice = createSlice({
  name: "dashboard_get_list",
  initialState: initial_state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Dashboard_Get_Action.pending, (state) => {
        state.reduxLoading = true;
        state.reduxError = null;
      })
      .addCase(Dashboard_Get_Action.fulfilled, (state, { payload }) => {
        state.reduxLoading = false;

        const data = payload?.data || {};

        state.cards = data.cards || [];
        state.submissionAnalytics = data.submissionAnalytics || { labels: [], values: [] };
        state.recentForms = data.recentForms || [];
        state.recentSubmissions = data.recentSubmissions || [];
      })
      .addCase(Dashboard_Get_Action.rejected, (state, { payload }) => {
        state.reduxLoading = false;
        state.reduxError = payload?.error || null;
      });
  },
});

export default dashboard_get_Slice.reducer;
