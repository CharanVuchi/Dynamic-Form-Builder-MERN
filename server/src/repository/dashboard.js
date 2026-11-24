import Form from "../schema/form.js";
import Submission from "../schema/submission.js";
import User from "../schema/user.js";

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const getDashboardStats_dbServices = async (request) => {
  try {
    const [totalForms, activeForms, totalSubmissions, totalUsers] = await Promise.all([
      Form.countDocuments({ isDeleted: false }),
      Form.countDocuments({ status: "Published", isDeleted: false }),
      Submission.countDocuments({}),
      User.countDocuments({}),
    ]);

    const cards = [
      { id: 1, title: "Total Forms", value: totalForms, description: "Total forms created", icon: "file" },
      { id: 2, title: "Total Submissions", value: totalSubmissions, description: "Total responses received", icon: "inbox" },
      { id: 3, title: "Active Forms", value: activeForms, description: "Currently published forms", icon: "active" },
      { id: 4, title: "Total Users", value: totalUsers, description: "Registered users", icon: "users" },
    ];

    const [formSubmissions, recentForms, recentSubmissions] = await Promise.all([
      Submission.aggregate([{ $group: { _id: "$formId", total: { $sum: 1 } } }]),
      Form.find({ isDeleted: false }).sort({ updatedAt: -1, _id: -1 }).limit(5).lean(),
      Submission.find({}).sort({ createdAt: -1, _id: -1 }).limit(5).lean(),
    ]);

    const submissionsByForm = new Map(formSubmissions.map((row) => [row._id, row.total]));

    // Submission activity over the last 7 days
    const today = startOfToday();
    const dateKeys = [];

    for (let i = 6; i >= 0; i--) {
      dateKeys.push(new Date(today.getTime() - i * DAY_MS).toISOString().slice(0, 10));
    }

    const analyticsValues = dateKeys.map(() => 0);

    const analyticsRows = await Submission.aggregate([
      { $match: { createdAt: { $gte: new Date(today.getTime() - 6 * DAY_MS) } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    for (const row of analyticsRows) {
      const idx = dateKeys.indexOf(row._id);
      if (idx !== -1) analyticsValues[idx] = row.count;
    }

    const labels = dateKeys.map((key) => new Date(`${key}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric" }));

    return {
      action: 1000,
      data: {
        cards,
        submissionAnalytics: {
          labels,
          values: analyticsValues,
        },
        recentForms: recentForms.map((form) => ({
          formId: form.formId,
          name: form.name,
          submissions: submissionsByForm.get(form.formId) || 0,
        })),
        recentSubmissions: recentSubmissions.map((submission) => ({
          name: submission.submittedBy || "Anonymous",
          submissionId: submission.submissionId,
          email: submission.email,
          mobile: submission.mobile,
          submittedAt: submission.createdAt,
        })),
      },
    };
  } catch (error) {
    console.error(`getDashboardStats_dbServices: ${error.message}`);
    throw error;
  }
};
