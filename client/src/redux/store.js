import { configureStore } from "@reduxjs/toolkit";
import unauthorized401Middleware from "./middleware";

import loader_slice from "./features/loader";
import login_slice from "./features/auth";
import forms_slice from "./features/forms";
import submissions_slice from "./features/submissions";
import dashboard_slice from "./features/dashboard";

export default configureStore({
  reducer: {
    loader: loader_slice,
    login_store: login_slice,
    forms: forms_slice,
    submissions: submissions_slice,
    dashboard: dashboard_slice,
  },

  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), unauthorized401Middleware],
});
