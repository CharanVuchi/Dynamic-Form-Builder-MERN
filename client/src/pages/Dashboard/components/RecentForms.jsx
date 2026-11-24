import { Card } from "antd";
import { FiFileText } from "react-icons/fi";

const RecentForms = ({ forms = [] }) => {
  return (
    <Card className="h-full rounded-xl border border-[#E5EAF2] shadow-sm" styles={{ body: { padding: 20 } }}>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[#161F42]">Recent Forms</h3>

        <p className="text-sm text-[#8190AA]">Recently created forms</p>
      </div>

      <div className="flex flex-col">
        {forms?.map((form) => (
          <div key={form.id} className="flex items-center justify-between py-4 border-b border-[#EDF0F5] last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EDF1FF] flex items-center justify-center">
                <FiFileText size={20} className="text-[#283B80]" />
              </div>

              <span className="text-sm font-medium text-[#253858]">{form.name}</span>
            </div>

            <span className="text-sm font-semibold text-[#52617D]">{form.submissions}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentForms;
