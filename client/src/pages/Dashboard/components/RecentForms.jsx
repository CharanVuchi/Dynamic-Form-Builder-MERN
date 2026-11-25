import { Card } from "antd";
import { FiFileText } from "react-icons/fi";

const RecentForms = ({ forms = [] }) => {
  return (
    <Card className="h-full rounded-xl border border-[var(--theme-border-default)] shadow-sm" styles={{ body: { padding: 20 } }}>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[var(--theme-brand-primary)]">Recent Forms</h3>

        <p className="text-sm text-[var(--theme-text-subtle)]">Recently created forms</p>
      </div>

      <div className="flex flex-col">
        {forms?.map((form) => (
          <div key={form.id} className="flex items-center justify-between py-4 border-b border-[var(--theme-border-subtle)] last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--theme-brand-wash)] flex items-center justify-center">
                <FiFileText size={20} className="text-[var(--theme-brand-secondary)]" />
              </div>

              <span className="text-sm font-medium text-[var(--theme-text-body)]">{form.name}</span>
            </div>

            <span className="text-sm font-semibold text-[var(--theme-text-secondary)]">{form.submissions}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentForms;
