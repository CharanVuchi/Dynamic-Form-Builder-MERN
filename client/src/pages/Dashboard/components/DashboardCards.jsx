import { Card } from "antd";
import { FiFileText, FiInbox, FiCheckCircle, FiUsers } from "react-icons/fi";

const iconMap = {
  file: FiFileText,
  inbox: FiInbox,
  active: FiCheckCircle,
  users: FiUsers,
};

const DashboardCards = ({ cards = [] }) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {cards?.map((card) => {
        const Icon = iconMap[card.icon] || FiFileText;

        return (
          <Card key={card.id} className="rounded-xl border border-[var(--theme-border-default)] shadow-sm" styles={{ body: { padding: 20 } }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--theme-text-muted)] mb-2">{card.title}</p>

                <h2 className="text-2xl font-bold text-[var(--theme-brand-primary)] mb-1">{card.value.toLocaleString("en-IN")}</h2>

                <p className="text-xs text-[var(--theme-text-dim)]">{card.description}</p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[var(--theme-brand-wash)] flex items-center justify-center">
                <Icon size={23} className="text-[var(--theme-brand-secondary)]" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardCards;
