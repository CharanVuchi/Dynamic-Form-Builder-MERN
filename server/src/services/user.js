import { login_dbServices, register_dbServices } from "../repository/user.js";

export const login_sevices = async (request) => {
  return await login_dbServices(request);
};

export const register_sevices = async (request) => {
  return await register_dbServices(request);
};
