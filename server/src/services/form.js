import mongoose from "mongoose";

import {
  createForm_dbServices,
  getForms_dbServices,
  getFormById_dbServices,
  updateForm_dbServices,
  publishForm_dbServices,
  deleteForm_dbServices,
  getPublicForm_dbServices,
} from "../repository/form.js";

import { validateFormPayload } from "./formValidation.js";

const hasFormRef = (id) => mongoose.isValidObjectId(id) || (typeof id === "string" && id.trim().length > 0);

export const createForm_services = async (request) => {
  let payload;
  try {
    payload = validateFormPayload(request);
  } catch (error) {
    return { action: 2, data: null, missing_fields: [error.message] };
  }

  if (!payload.CreatedBy) {
    return { action: 3, data: null };
  }

  return createForm_dbServices(payload);
};

export const getForms_services = async (request) => {
  return getForms_dbServices(request);
};

export const getFormById_services = async (request) => {
  if (!hasFormRef(request.id)) {
    return {
      action: 35,
      data: null,
    };
  }

  return getFormById_dbServices(request);
};

export const updateForm_services = async (request) => {
  if (!hasFormRef(request.id)) {
    return { action: 35, data: null };
  }

  let payload;

  try {
    payload = validateFormPayload(request, true);
  } catch (error) {
    return { action: 2, data: null, missing_fields: [error.message] };
  }

  if (payload.name === undefined && payload.description === undefined && payload.showName === undefined && payload.showDescription === undefined && payload.fields === undefined && payload.status === undefined) {
    return { action: 26, data: null };
  }

  return updateForm_dbServices(payload);
};


export const publishForm_services = async (request) => {
  if (!hasFormRef(request.id)) {
    return {
      action: 35,
      data: null,
    };
  }

  return publishForm_dbServices(request);
};

export const deleteForm_services = async (request) => {
  if (!hasFormRef(request.id)) {
    return {
      action: 35,
      data: null,
    };
  }

  return deleteForm_dbServices(request);
};

export const getPublicForm_services = async (request) => {
  return getPublicForm_dbServices(request);
};
