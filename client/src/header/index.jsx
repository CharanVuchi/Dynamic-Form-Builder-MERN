import { FiBell, FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const pageNames = {
  dashboard: "Dashboard",
  forms: "Forms",
  builder: "Builder",
  submissions: "Submissions",
  users: "Users",
  settings: "Settings",
  create: "Form Builder",
};

const Header = ({ sidebarCollapsed = false, onToggleSidebar }) => {
  const location = useLocation();

  const currentPage = location.pathname.split("/").filter(Boolean).pop() || "dashboard";

  const pageTitle = pageNames[currentPage] || currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <header className="h-[64px] bg-white border-b border-[#E5E9F0] flex items-center justify-between px-6 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-sm">
        {/* <button
          type="button"
          onClick={onToggleSidebar}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[#52617D] hover:bg-[#F0F4FA] hover:text-[#161F42] transition-colors">
          <FiMenu size={20} strokeWidth={1.8} />
        </button> */}

        <span className="text-[#52617D] font-medium">{pageTitle}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-[#52617D] hover:text-[#161F42]">
          <FiBell size={20} strokeWidth={1.8} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E74C3C] border border-white" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#9CD3BB] text-[#161F42] flex items-center justify-center font-bold text-sm">A</div>

          <div>
            <p className="text-sm font-semibold text-[#1F1F1F] leading-tight">Admin</p>

            <p className="text-xs text-[#718096] leading-tight">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
