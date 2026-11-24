import { randomUUID } from "node:crypto";

import FormModel from "../schema/form.js";

const generateFormId = () => `FC-${randomUUID().slice(0, 8).toUpperCase()}`;

export const create_form_dbServices = async (request) => {
  try {
    const { formId, name, description, status, fields } = request;

    if (!name) {
      return { action: 25, data: null, success: false, message: "Please fill in the fields to continue." };
    }

    const newFormId = formId || generateFormId();

    const existing = await FormModel.findOne({ formId: newFormId });
    if (existing) {
      return { action: 7, data: null, success: false, message: "A form with this ID already exists." };
    }

    const form = new FormModel({ formId: newFormId, name, description, status, fields });
    await form.save();

    console.log(`Form created: ${form.formId}`);

    return {
      action: 1001,
      data: {
        formId: form.formId,
        name: form.name,
        status: form.status,
        fields: (form.fields || []).length,
      },
    };
  } catch (error) {
    console.error(`create_form_dbServices: ${error.message}`);
    throw error;
  }
};

export const get_form_dbServices = async (formId) => {
  try {
    const form = await FormModel.findOne({ formId });
    if (!form) {
      return { action: 1, data: null, success: false, message: "Form not found." };
    }
    return { action: 1000, data: form.toObject() };
  } catch (error) {
    console.error(`get_form_dbServices: ${error.message}`);
    throw error;
  }
};

export const get_forms_dbServices = async () => {
  try {
    const forms = await FormModel.find();
    return {
      action: 1000,
      data: forms.map((form) => ({
        formId: form.formId,
        name: form.name,
        status: form.status,
        fields: (form.fields || []).length,
      })),
    };
  } catch (error) {
    console.error(`get_forms_dbServices: ${error.message}`);
    throw error;
  }
};

export const update_form_dbServices = async (formId, request) => {
  try {
    const form = await FormModel.findOne({ formId });
    if (!form) {
      return { action: 1, data: null, success: false, message: "Form not found." };
    }

    const update = {};
    if (request.name !== undefined) update.name = request.name;
    if (request.description !== undefined) update.description = request.description;
    if (request.status !== undefined) update.status = request.status;
    if (request.fields !== undefined) update.fields = request.fields;

    if (Object.keys(update).length === 0) {
      return { action: 26, data: null, success: false, message: "Record has no changes. Unable to update record" };
    }

    await form.set(update).save();

    console.log(`Form updated: ${form.formId}`);

    return {
      action: 1003,
      data: {
        formId: form.formId,
        name: form.name,
        status: form.status,
        fields: (form.fields || []).length,
      },
    };
  } catch (error) {
    console.error(`update_form_dbServices: ${error.message}`);
    throw error;
  }
};

export const delete_form_dbServices = async (formId) => {
  try {
    const deleted = await FormModel.deleteOne({ formId });
    if (deleted.deletedCount === 0) {
      return { action: 1, data: null, success: false, message: "Form not found." };
    }

    console.log(`Form deleted: ${formId}`);

    return { action: 1004, data: null };
  } catch (error) {
    console.error(`delete_form_dbServices: ${error.message}`);
    throw error;
  }
};
