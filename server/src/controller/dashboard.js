import { apiResponse, internalServerResponse } from "../../shared/response.js";

import { getDashboard_services } from "../services/dashboard.js";

export const getDashboard_controller = async (req, res) => {
  try {
    const result = await getDashboard_services({ AccessedBy: req.userId });
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};
