import dayjs from "dayjs";

import formSchemas from "../data/formSchemas.json";
import submissionsData from "../data/submissions.json";

// Replace the mock calls in this file with real axios calls when the backend is ready.
const NETWORK_DELAY = 400;

const wait = () => new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY));

const clone = (value) => JSON.parse(JSON.stringify(value));

const LOCAL_SUBMISSIONS_KEY = "dfb_local_submissions";

const readLocalSubmissions = () => {
  try {
    const stored = window.localStorage.getItem(LOCAL_SUBMISSIONS_KEY);

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeLocalSubmission = (submission) => {
  try {
    const current = readLocalSubmissions();

    window.localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify([submission, ...current]));
  } catch {
    // Ignore storage errors in the demo.
  }
};

/**
 * PUBLIC form read endpoint.
 *
 * Real route: GET /api/public/forms/:formId
 *
 * This endpoint intentionally does NOT require authentication:
 * it is what a shared/public form link opens in the browser.
 * It returns only the published form schema, never submissions.
 * Keep it rate-limited and restrict CORS to your frontend domain.
 */
export const getPublicForm = async (formId) => {
  await wait();

  const form = formSchemas.forms.find((item) => item.formId === formId);

  if (!form) {
    throw new Error(`Form ${formId} was not found.`);
  }

  if (form.status !== "Published") {
    throw new Error("This form is not published yet.");
  }

  return clone(form);
};

/**
 * PUBLIC submit endpoint.
 *
 * Real route: POST /api/public/forms/:formId/submissions
 *
 * No login is required for someone filling a shared form.
 * The backend must still validate every value against the form schema,
 * enforce required fields/lengths/date ranges, and rate-limit abuse.
 */
export const createFormSubmission = async (form, values) => {
  await wait();

  const submissionId = `SUB-${Math.floor(1000 + Math.random() * 9000)}`;

  const answers = (form.fields || [])
    .map((field) => ({
      label: field.label,
      value: values[field.fieldKey] ?? "",
    }))
    .filter((answer) => answer.value !== "" && answer.value !== null && answer.value !== undefined);

  const fullName = values.fullName || values.name || values.attendeeName || "Unknown";

  const submission = {
    id: Date.now(),
    submissionId,
    formId: form.formId,
    formName: form.name,
    submittedBy: fullName,
    email: values.email || "—",
    mobile: values.mobile || values.phone || "—",
    submittedAt: dayjs().format("MMM DD, YYYY hh:mm A"),
    status: "New",
    answers,
  };

  writeLocalSubmission(submission);

  return submission;
};

/**
 * ADMIN submission list endpoint.
 *
 * Real route: GET /api/submissions (JWT/session required)
 *
 * Never expose this list publicly. Only an authenticated admin/owner
 * should be able to read submitted records.
 */
export const getSubmissions = async () => {
  await wait();

  return clone([...readLocalSubmissions(), ...submissionsData.submissions]);
};

/**
 * ADMIN form list endpoint.
 *
 * Real route: GET /api/forms (JWT/session required)
 */
export const getForms = async () => {
  await wait();

  return clone(formSchemas.forms.map(({ id, formId, name, status, fields }) => ({ id, formId, name, status, fields: fields.length })));
};
