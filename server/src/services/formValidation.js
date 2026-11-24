import { randomUUID } from "node:crypto";

const SUPPORTED_TYPES = ["text", "email", "number", "phone", "textarea", "date", "select", "radio", "checkbox"];

const KEY_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/;

const isEmpty = (value) => value === undefined || value === null || value === "";

const normalizeOptions = (options = []) => {
  if (!Array.isArray(options)) return [];

  return options.map((option) => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
      };
    }

    return {
      label: String(option.label ?? ""),
      value: String(option.value ?? ""),
    };
  });
};

export const normalizeFields = (fields = []) => {
  if (!Array.isArray(fields)) {
    throw new Error("Fields must be an array.");
  }

  const usedKeys = new Set();

  return fields.map((field, index) => {
    const fieldKey = String(field.fieldKey ?? field.key ?? "").trim();

    if (!SUPPORTED_TYPES.includes(field.type)) {
      throw new Error(`Unsupported field type at position ${index + 1}.`);
    }

    if (!field.label || !String(field.label).trim()) {
      throw new Error(`Label is required for field ${index + 1}.`);
    }

    if (!KEY_PATTERN.test(fieldKey)) {
      throw new Error(`Invalid field key: ${fieldKey || "empty"}.`);
    }

    if (usedKeys.has(fieldKey)) {
      throw new Error(`Duplicate field key: ${fieldKey}.`);
    }

    usedKeys.add(fieldKey);

    const validation = field.validation || {};
    const options = normalizeOptions(field.options);

    if (["select", "radio", "checkbox"].includes(field.type)) {
      if (!options.length) {
        throw new Error(`${field.label} must have at least one option.`);
      }

      const optionValues = options.map((option) => option.value);

      if (options.some((option) => !option.label || !option.value) || new Set(optionValues).size !== optionValues.length) {
        throw new Error(`${field.label} has invalid or duplicate options.`);
      }
    }

    if (validation.minLength != null && validation.maxLength != null && Number(validation.minLength) > Number(validation.maxLength)) {
      throw new Error(`${field.label}: minimum length cannot exceed maximum length.`);
    }

    if (validation.min != null && validation.max != null && Number(validation.min) > Number(validation.max)) {
      throw new Error(`${field.label}: minimum value cannot exceed maximum value.`);
    }

    if (validation.minDate && validation.maxDate && new Date(validation.minDate) > new Date(validation.maxDate)) {
      throw new Error(`${field.label}: start date cannot be after end date.`);
    }

    return {
      id: field.id || randomUUID(),
      type: field.type,
      label: String(field.label).trim(),
      fieldKey,
      placeholder: field.placeholder || "",
      defaultValue: field.defaultValue ?? "",
      required: Boolean(field.required),
      order: index,
      validation,
      ...(field.type === "textarea" ? { rows: Number(field.rows) || 4 } : {}),
      ...(["select", "radio", "checkbox"].includes(field.type) ? { options } : {}),
    };
  });
};

export const validateFormPayload = (payload, isUpdate = false) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Invalid form payload.");
  }

  if (!isUpdate || payload.name !== undefined) {
    if (typeof payload.name !== "string" || !payload.name.trim()) {
      throw new Error("Form name is required.");
    }

    if (payload.name.trim().length > 120) {
      throw new Error("Form name cannot exceed 120 characters.");
    }
  }

  if (payload.description !== undefined && (typeof payload.description !== "string" || payload.description.length > 500)) {
    throw new Error("Description cannot exceed 500 characters.");
  }

  if (payload.status !== undefined && !["Draft", "Published"].includes(payload.status)) {
    throw new Error("Status must be either Draft or Published.");
  }

  if (payload.showName !== undefined && typeof payload.showName !== "boolean") {
    throw new Error("showName must be a boolean.");
  }

  if (payload.showDescription !== undefined && typeof payload.showDescription !== "boolean") {
    throw new Error("showDescription must be a boolean.");
  }

  if (payload.fields !== undefined) {
    payload.fields = normalizeFields(payload.fields);
  } else if (!isUpdate) {
    payload.fields = [];
  }

  return payload;
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value) => /^[0-9+\-\s()]{7,15}$/.test(value);

const isValidDate = (value) => {
  if (typeof value !== "string") return false;

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export const validateSubmissionValues = (fields, values) => {
  if (!values || typeof values !== "object" || Array.isArray(values)) {
    throw new Error("Invalid submission data.");
  }

  const allowedKeys = new Set(fields.map((field) => field.fieldKey));

  for (const key of Object.keys(values)) {
    if (!allowedKeys.has(key)) {
      throw new Error(`Unexpected field: ${key}.`);
    }
  }

  for (const field of fields) {
    const value = values[field.fieldKey];
    const validation = field.validation || {};

    if (isEmpty(value)) {
      if (field.required) {
        throw new Error(`${field.label} is required.`);
      }

      continue;
    }

    const stringValue = String(value);

    if (["text", "textarea"].includes(field.type) && typeof value !== "string") {
      throw new Error(`${field.label} must be text.`);
    }

    if (field.type === "email" && !isValidEmail(stringValue)) {
      throw new Error(`${field.label} must be a valid email.`);
    }

    if (field.type === "phone" && !isValidPhone(stringValue)) {
      throw new Error(`${field.label} must be a valid phone number.`);
    }

    if (field.type === "number") {
      const numberValue = Number(value);

      if (!Number.isFinite(numberValue)) {
        throw new Error(`${field.label} must be a valid number.`);
      }

      if (validation.min != null && numberValue < Number(validation.min)) {
        throw new Error(`${field.label} is below the minimum value.`);
      }

      if (validation.max != null && numberValue > Number(validation.max)) {
        throw new Error(`${field.label} exceeds the maximum value.`);
      }
    }

    if (["text", "textarea", "email", "phone"].includes(field.type)) {
      if (validation.minLength != null && stringValue.length < Number(validation.minLength)) {
        throw new Error(`${field.label} is too short.`);
      }

      if (validation.maxLength != null && stringValue.length > Number(validation.maxLength)) {
        throw new Error(`${field.label} is too long.`);
      }
    }

    if (validation.pattern) {
      let pattern;

      try {
        pattern = new RegExp(validation.pattern);
      } catch {
        throw new Error(`${field.label} has an invalid validation pattern.`);
      }

      if (!pattern.test(stringValue)) {
        throw new Error(`${field.label} has an invalid value.`);
      }
    }

    if (field.type === "date") {
      if (!isValidDate(stringValue)) {
        throw new Error(`${field.label} must be a valid date.`);
      }

      if (validation.minDate && stringValue < validation.minDate) {
        throw new Error(`${field.label} is before the allowed date.`);
      }

      if (validation.maxDate && stringValue > validation.maxDate) {
        throw new Error(`${field.label} is after the allowed date.`);
      }
    }

    if (["select", "radio"].includes(field.type)) {
      const allowedValues = field.options.map((option) => option.value);

      if (!allowedValues.includes(String(value))) {
        throw new Error(`${field.label} contains an invalid option.`);
      }
    }

    if (field.type === "checkbox") {
      if (!Array.isArray(value)) {
        throw new Error(`${field.label} must be an array of options.`);
      }

      const allowedValues = field.options.map((option) => option.value);

      if (value.some((item) => !allowedValues.includes(String(item)))) {
        throw new Error(`${field.label} contains an invalid option.`);
      }
    }
  }

  return true;
};
