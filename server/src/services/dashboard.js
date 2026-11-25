import { getDashboardStats_dbServices } from "../repository/dashboard.js";

export const getDashboard_services = async (request) => {
  return await getDashboardStats_dbServices(request);
};
