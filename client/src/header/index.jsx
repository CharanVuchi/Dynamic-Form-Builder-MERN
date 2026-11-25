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
    <header className="h-[64px] bg-[var(--theme-surface)] border-b border-[var(--theme-border-header)] flex items-center justify-between px-6 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-sm">
        {/* <button
          type="button"
          onClick={onToggleSidebar}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--theme-text-secondary)] hover:bg-[var(--theme-surface-muted)] hover:text-[var(--theme-brand-primary)] transition-colors">
          <FiMenu size={20} strokeWidth={1.8} />
        </button> */}

        <span className="text-[var(--theme-text-secondary)] font-medium">{pageTitle}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-[var(--theme-text-secondary)] hover:text-[var(--theme-brand-primary)]">
          <FiBell size={20} strokeWidth={1.8} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--theme-danger-dot)] border border-[var(--theme-white)]" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[var(--theme-brand-accent)] text-[var(--theme-brand-primary)] flex items-center justify-center font-bold text-sm">A</div>

          <div>
            <p className="text-sm font-semibold text-[var(--theme-text-primary)] leading-tight">Admin</p>

            <p className="text-xs text-[var(--theme-text-muted)] leading-tight">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
