import mongoose from "mongoose";

import Form from "../schema/form.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const formIdQuery = (id) => (mongoose.isValidObjectId(id) ? { _id: id } : { formId: id });

export const createForm_dbServices = async (request) => {
  const { name, description = "", showName = true, showDescription = true, fields = [], status, CreatedBy } = request;

  const form = await Form.create({
    name,
    description,
    showName,
    showDescription,
    fields,
    status: status || "Draft",
    createdBy: CreatedBy,
    updatedBy: CreatedBy,
  });

  return {
    action: 1001,
    data: form,
  };
};

export const getForms_dbServices = async (request) => {
  const { search = "", status, page = 1, limit = 10, AccessedBy } = request;

  const currentPage = Math.max(1, Number(page) || 1);
  const pageLimit = Math.min(100, Math.max(1, Number(limit) || 10));

  const filter = {
    createdBy: AccessedBy,
    isDeleted: false,
  };

  if (["Draft", "Published"].includes(status)) {
    filter.status = status;
  }

  if (search.trim()) {
    const searchRegex = new RegExp(escapeRegex(search.trim()), "i");

    filter.$or = [{ name: searchRegex }, { formId: searchRegex }];
  }

  const [forms, total] = await Promise.all([
    Form.find(filter)
      .select("formId name status fields createdAt updatedAt")
      .sort({ updatedAt: -1, _id: -1 })
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit)
      .lean(),

    Form.countDocuments(filter),
  ]);

  return {
    action: 1000,
    data: forms.map((form) => ({
      id: form._id,
      _id: form._id,
      formId: form.formId,
      name: form.name,
      status: form.status,
      fields: form.fields.length,
      submissions: 0,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    })),
    pagination: {
      total,
      page: currentPage,
      limit: pageLimit,
      totalPages: Math.ceil(total / pageLimit),
    },
  };
};

export const getFormById_dbServices = async (request) => {
  const { id, AccessedBy } = request;

  const form = await Form.findOne({
    ...formIdQuery(id),
    createdBy: AccessedBy,
    isDeleted: false,
  }).lean();

  if (!form) {
    return {
      action: 1,
      data: null,
    };
  }

  return {
    action: 1000,
    data: form,
  };
};

export const updateForm_dbServices = async (request) => {
  const { id, name, description, showName, showDescription, fields, status, UpdatedBy } = request;

  const form = await Form.findOne({
    ...formIdQuery(id),
    createdBy: UpdatedBy,
    isDeleted: false,
  });

  if (!form) {
    return {
      action: 1,
      data: null,
    };
  }

  if (name !== undefined) form.name = name;
  if (description !== undefined) form.description = description;
  if (showName !== undefined) form.showName = showName;

  if (showDescription !== undefined) {
    form.showDescription = showDescription;
  }

  if (fields !== undefined) {
    form.fields = fields;
  }

  if (status !== undefined) {
    form.status = status;
  }

  form.updatedBy = UpdatedBy;

  await form.save();

  return {
    action: 1003,
    data: form,
  };
};

export const publishForm_dbServices = async (request) => {
  const { id, UpdatedBy } = request;

  const form = await Form.findOne({
    ...formIdQuery(id),
    createdBy: UpdatedBy,
    isDeleted: false,
  });

  if (!form) {
    return {
      action: 1,
      data: null,
    };
  }

  if (!form.name || !form.fields.length) {
    return {
      action: 2,
      data: null,
      missing_fields: ["Form name and at least one field are required."],
    };
  }

  form.status = "Published";
  form.updatedBy = UpdatedBy;

  await form.save();

  return {
    action: 1003,
    data: form,
  };
};

export const deleteForm_dbServices = async (request) => {
  const { id, UpdatedBy } = request;

  const form = await Form.findOneAndUpdate(
    {
      ...formIdQuery(id),
      createdBy: UpdatedBy,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        updatedBy: UpdatedBy,
      },
    },
    {
      new: true,
    },
  );

  if (!form) {
    return {
      action: 1,
      data: null,
    };
  }

  return {
    action: 1004,
    data: {
      id: form._id,
      formId: form.formId,
    },
  };
};

export const getPublicForm_dbServices = async (request) => {
  const { formId } = request;

  const form = await Form.findOne({
    formId,
    status: "Published",
    isDeleted: false,
  })
    .select("formId name description showName showDescription fields status")
    .lean();

  if (!form) {
    return {
      action: 1,
      data: null,
    };
  }

  return {
    action: 1000,
    data: form,
  };
};
