import { apiResponse, internalServerResponse } from "../../shared/response.js";
import {
  create_form_services,
  delete_form_services,
  get_form_services,
  get_forms_services,
  update_form_services,
} from "../services/form.js";

export const create_form_controller = async (req, res) => {
  try {
    const result = await create_form_services(req.body);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const get_form_controller = async (req, res) => {
  try {
    const result = await get_form_services(req.params.formId);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const get_forms_controller = async (req, res) => {
  try {
    const result = await get_forms_services();
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const update_form_controller = async (req, res) => {
  try {
    const result = await update_form_services(req.params.formId, req.body);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};

export const delete_form_controller = async (req, res) => {
  try {
    const result = await delete_form_services(req.params.formId);
    return apiResponse(res, result);
  } catch (error) {
    return internalServerResponse(res, error);
  }
};
