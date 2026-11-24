import { apiResponse, internalServerResponse } from "../../shared/response";
import { login_sevices } from "../services/user";

export const login_controller = async (req, res) => {
  try {
    const body = req.body;
    const req_body = {
      ...body,
    };
    const result = await user.login_sevices(req_body);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};
