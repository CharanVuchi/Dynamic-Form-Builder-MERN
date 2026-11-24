import { apiResponse, internalServerResponse } from "../../shared/response.js";

import {
  createForm_services,
  getForms_services,
  getFormById_services,
  updateForm_services,
  publishForm_services,
  deleteForm_services,
  getPublicForm_services,
} from "../services/form.js";

export const createForm_controller = async (req, res) => {
  try {
    const result = await createForm_services({
      ...req.body,
      CreatedBy: req.userId,
    });

    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const getForms_controller = async (req, res) => {
  try {
    const result = await getForms_services({
      ...req.query,
      AccessedBy: req.userId,
    });

    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const getFormById_controller = async (req, res) => {
  try {
    const result = await getFormById_services({
      id: req.params.id,
      AccessedBy: req.userId,
    });

    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const updateForm_controller = async (req, res) => {
  try {
    const result = await updateForm_services({
      ...req.body,
      id: req.params.id,
      UpdatedBy: req.userId,
    });

    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const publishForm_controller = async (req, res) => {
  try {
    const result = await publishForm_services({
      id: req.params.id,
      UpdatedBy: req.userId,
    });

    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const deleteForm_controller = async (req, res) => {
  try {
    const result = await deleteForm_services({
      id: req.params.id,
      UpdatedBy: req.userId,
    });

    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const getPublicForm_controller = async (req, res) => {
  try {
    const result = await getPublicForm_services({
      formId: req.params.formId,
    });

    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};
