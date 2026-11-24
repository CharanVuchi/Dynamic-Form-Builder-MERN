import Form from "../schema/form.js";
import {
  createSubmission_dbServices,
  deleteSubmission_dbServices,
  getSubmissionById_dbServices,
  getSubmissions_dbServices,
} from "../repository/submission.js";
import { validateSubmissionValues } from "./formValidation.js";

export const createSubmission_services = (request) => createSubmission_dbServices(request);

export const getSubmissions_services = (request) => getSubmissions_dbServices(request);

export const getSubmissionById_services = (request) => getSubmissionById_dbServices(request);

export const deleteSubmission_services = (request) => deleteSubmission_dbServices(request);

export const createPublicSubmission_services = async (request) => {
  try {
    const { formId, values } = request;

    if (!formId || !values || typeof values !== "object" || Array.isArray(values)) {
      return { action: 2, data: null, missing_fields: ["Form ID and values are required."] };
    }

    const form = await Form.findOne({ formId, status: "Published", isDeleted: false }).lean();

    if (!form) {
      return { action: 1, data: null };
    }

    try {
      validateSubmissionValues(form.fields, values);
    } catch (error) {
      return { action: 2, data: null, missing_fields: [error.message] };
    }

    const answers = (form.fields || [])
      .map((field) => ({ label: field.label, value: values[field.fieldKey] ?? "" }))
      .filter((answer) => answer.value !== "" && answer.value !== null && answer.value !== undefined);

    const submittedBy = values.fullName || values.name || values.attendeeName || "Anonymous";
    const email = values.email || "";
    const mobile = values.mobile || values.phone || "";

    return createSubmission_dbServices({
      formId: form.formId,
      formName: form.name,
      submittedBy,
      email,
      mobile,
      answers,
    });
  } catch (error) {
    console.error(`createPublicSubmission_services: ${error.message}`);
    throw error;
  }
};
