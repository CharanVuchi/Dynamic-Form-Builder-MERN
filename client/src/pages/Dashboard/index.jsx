import { useEffect } from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Dashboard_Get_Action } from "src/redux/actions/dashboard";
import DashboardCards from "./components/DashboardCards";
import DashboardChart from "./components/DashboardChart";
import RecentForms from "./components/RecentForms";
import RecentSubmissions from "./components/RecentSubmissions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { cards, submissionAnalytics, recentForms, recentSubmissions } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(Dashboard_Get_Action());
  }, [dispatch]);

  const handleViewSubmission = (record) => {
    console.log("View submission:", record);
  };

  const handleDeleteSubmission = (record) => {
    console.log("Delete submission:", record);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard Cards */}
      <DashboardCards cards={cards} />

      {/* Analytics Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Submission Analytics */}
        <div className="col-span-7">
          <Card className="h-full rounded-xl border border-[#E5EAF2] shadow-sm" styles={{ body: { padding: 24 } }}>
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-[#161F42]">Submission Analytics</h3>

              <p className="text-sm text-[#8190AA]">Submission activity over the last 7 days</p>
            </div>

            <DashboardChart analytics={submissionAnalytics} />
          </Card>
        </div>

        {/* Recent Forms */}
        <div className="col-span-5">
          <RecentForms forms={recentForms} />
        </div>
      </div>

      {/* Recent Submissions */}
      <RecentSubmissions submissions={recentSubmissions} onView={handleViewSubmission} onDelete={handleDeleteSubmission} />
    </div>
  );
};

export default Dashboard;
