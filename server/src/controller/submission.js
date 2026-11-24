import { apiResponse, internalServerResponse } from "../../shared/response.js";

import {
  createSubmission_services,
  createPublicSubmission_services,
  deleteSubmission_services,
  getSubmissionById_services,
  getSubmissions_services,
} from "../services/submission.js";

export const createSubmission_controller = async (req, res) => {
  try {
    const result = await createSubmission_services(req.body);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const getSubmissions_controller = async (req, res) => {
  try {
    const result = await getSubmissions_services({
      formId: req.query.formId,
      search: req.query.search,
      status: req.query.status,
      page: req.query.page,
      limit: req.query.limit,
    });
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const getSubmissionById_controller = async (req, res) => {
  try {
    const result = await getSubmissionById_services({ id: req.params.id });
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const deleteSubmission_controller = async (req, res) => {
  try {
    const result = await deleteSubmission_services({ id: req.params.id });
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const createPublicSubmission_controller = async (req, res) => {
  try {
    const result = await createPublicSubmission_services({
      formId: req.params.formId,
      values: req.body,
    });
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};
