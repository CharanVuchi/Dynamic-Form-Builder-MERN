import { apiResponse, internalServerResponse } from "../../shared/response.js";
import { login_sevices, register_sevices } from "../services/user.js";

export const login_controller = async (req, res) => {
  try {
    const result = await login_sevices(req.body);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const register_controller = async (req, res) => {
  try {
    const result = await register_sevices(req.body);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};
