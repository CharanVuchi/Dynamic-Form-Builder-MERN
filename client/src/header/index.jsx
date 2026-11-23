import { FiBell } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const pageNames = {
  dashboard: "Dashboard",
  forms: "Forms",
  builder: "Builder",
  submissions: "Submissions",
  users: "Users",
  settings: "Settings",
};

const Header = () => {
  const location = useLocation();

  const currentPage = location.pathname.split("/").filter(Boolean).pop() || "dashboard";

  const pageTitle = pageNames[currentPage] || currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <header className="h-[70px] bg-white border-b border-[#E5E9F0] flex items-center justify-between px-9 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 text-base">
        <span className="text-[#52617D] font-medium">{pageTitle}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        {/* Notifications */}
        <button className="relative text-[#52617D] hover:text-[#161F42]">
          <FiBell size={23} strokeWidth={1.8} />

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E74C3C] border border-white" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#9CD3BB] text-[#161F42] flex items-center justify-center font-bold">C</div>

          <div>
            <p className="text-sm font-semibold text-[#1F1F1F]">Charan Vuchi</p>

            <p className="text-sm text-[#718096]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
