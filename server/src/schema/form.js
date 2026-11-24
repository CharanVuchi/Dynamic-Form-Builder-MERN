import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Field type is required"],
      trim: true,
    },
    label: {
      type: String,
      required: [true, "Field label is required"],
      trim: true,
    },
    fieldKey: {
      type: String,
      required: [true, "Field key is required"],
      trim: true,
    },
    placeholder: {
      type: String,
      trim: true,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: [
      new mongoose.Schema(
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
        { _id: false },
      ),
    ],
    rows: Number,
    validation: new mongoose.Schema(
      {
        minLength: Number,
        maxLength: Number,
        minDate: Date,
        maxDate: Date,
      },
      { _id: false },
    ),
  },
  { _id: false },
);

const formSchema = new mongoose.Schema(
  {
    formId: {
      type: String,
      required: [true, "Form ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Form name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    fields: [fieldSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Form = mongoose.model("Form", formSchema);

export default Form;
