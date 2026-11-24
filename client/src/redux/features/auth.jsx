import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  user_id: null,
  user_name: null,
  is_verified: false,
  token: null,
  loading: false,
};

const login_slice = createSlice({
  name: "login_slice",
  initialState: initial_state,
  reducers: {
    login_request: (state) => {
      state.loading = true;
    },

    login_success: (state, action) => {
      const data = action.payload?.data || {};

      state.user_id = data.uid;
      state.user_name = data.userName;
      state.is_verified = data.isVerified;
      state.token = data.token;
      state.loading = false;
    },

    login_faliure: (state) => {
      state.loading = false;
    },

    logout_success: (state) => {
      state.loading = false;
      state.token = null;
      state.user_id = null;
      state.user_name = null;
      state.is_verified = false;
    },
  },
});

export const { login_request, login_success, login_faliure, logout_success } = login_slice.actions;

export default login_slice.reducer;
