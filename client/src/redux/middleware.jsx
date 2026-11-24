import { logout_success } from "./features/auth";

const unauthorized401Middleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected")) {
    const payload = action.payload;
    if (payload && (payload.code === 401 || payload.code === 403)) {
      localStorage.clear();
       sessionStorage.removeItem("FODateFilter")
      store.dispatch(logout_success());
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  }
  return next(action);
};
export default unauthorized401Middleware;
