import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    submissionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    formId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    formName: {
      type: String,
      trim: true,
      default: "",
    },

    submittedBy: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      default: "",
    },

    mobile: {
      type: String,
      trim: true,
      default: "",
    },

    answers: [
      {
        label: { type: String, required: true },
        value: { type: String, default: "" },
      },
    ],

    status: {
      type: String,
      enum: ["New", "Reviewed"],
      default: "New",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

submissionSchema.index({ formId: 1, createdAt: -1 });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
