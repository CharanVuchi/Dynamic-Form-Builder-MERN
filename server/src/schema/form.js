import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const formSchema = new mongoose.Schema(
  {
    formId: {
      type: String,
      unique: true,
      required: true,
      default: () => `FC-${randomUUID().slice(0, 8).toUpperCase()}`,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    showName: {
      type: Boolean,
      default: true,
    },

    showDescription: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
      index: true,
    },

    fields: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    createdBy: {
      type: String,
      required: true,
      index: true,
    },

    updatedBy: {
      type: String,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

formSchema.index({
  createdBy: 1,
  status: 1,
  updatedAt: -1,
});

formSchema.index({
  formId: 1,
  status: 1,
  isDeleted: 1,
});

const Form = mongoose.model("Form", formSchema);

export default Form;
