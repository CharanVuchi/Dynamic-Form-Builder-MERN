import { randomUUID } from "node:crypto";

import mongoose from "mongoose";

import Submission from "../schema/submission.js";

const submissionQuery = (id) => (mongoose.isValidObjectId(id) ? { _id: id } : { submissionId: id });

export const createSubmission_dbServices = async (request) => {
  try {
    const { submissionId, formId, formName, submittedBy, email, mobile, status, answers } = request;

    const submission = await Submission.create({
      submissionId: submissionId || `SUB-${randomUUID().slice(0, 8).toUpperCase()}`,
      formId,
      formName,
      submittedBy,
      email,
      mobile,
      status,
      answers,
    });

    console.log(`Submission created: ${submission.submissionId}`);

    return {
      action: 1001,
      data: {
        submissionId: submission.submissionId,
        formId: submission.formId,
        formName: submission.formName,
        submittedBy: submission.submittedBy,
        status: submission.status,
      },
    };
  } catch (error) {
    console.error(`createSubmission_dbServices: ${error.message}`);
    throw error;
  }
};

export const getSubmissions_dbServices = async (request) => {
  try {
    const { formId, page = 1, limit = 10 } = request;

    const currentPage = Math.max(1, Number(page) || 1);
    const pageLimit = Math.min(100, Math.max(1, Number(limit) || 10));

    const filter = {};
    if (formId) filter.formId = formId;

    const [submissions, total] = await Promise.all([
      Submission.find(filter)
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * pageLimit)
        .limit(pageLimit)
        .lean(),

      Submission.countDocuments(filter),
    ]);

    return {
      action: 1000,
      data: submissions.map((submission) => ({
        id: submission._id,
        submissionId: submission.submissionId,
        formId: submission.formId,
        formName: submission.formName,
        submittedBy: submission.submittedBy,
        email: submission.email,
        mobile: submission.mobile,
        status: submission.status,
        answers: submission.answers,
        createdAt: submission.createdAt,
      })),
      pagination: {
        total,
        page: currentPage,
        limit: pageLimit,
        totalPages: Math.ceil(total / pageLimit),
      },
    };
  } catch (error) {
    console.error(`getSubmissions_dbServices: ${error.message}`);
    throw error;
  }
};

export const getSubmissionById_dbServices = async (request) => {
  try {
    const submission = await Submission.findOne(submissionQuery(request.id)).lean();

    if (!submission) {
      return { action: 1, data: null };
    }

    return { action: 1000, data: submission };
  } catch (error) {
    console.error(`getSubmissionById_dbServices: ${error.message}`);
    throw error;
  }
};

export const deleteSubmission_dbServices = async (request) => {
  try {
    const deleted = await Submission.deleteOne(submissionQuery(request.id));

    if (deleted.deletedCount === 0) {
      return { action: 1, data: null };
    }

    console.log(`Submission deleted: ${request.id}`);

    return { action: 1004, data: { id: request.id } };
  } catch (error) {
    console.error(`deleteSubmission_dbServices: ${error.message}`);
    throw error;
  }
};
