import { login_dbServices } from "../repository/user";

export const login_sevices = async (request) => {
  return await login_dbServices(request);
};
