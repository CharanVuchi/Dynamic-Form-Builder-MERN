import {
  create_form_dbServices,
  delete_form_dbServices,
  get_form_dbServices,
  get_forms_dbServices,
  update_form_dbServices,
} from "../repository/form.js";

export const create_form_services = (request) => create_form_dbServices(request);

export const get_form_services = (formId) => get_form_dbServices(formId);

export const get_forms_services = () => get_forms_dbServices();

export const update_form_services = (formId, request) => update_form_dbServices(formId, request);

export const delete_form_services = (formId) => delete_form_dbServices(formId);
