import { NavLink } from "react-router-dom";
import { FiGrid, FiFileText, FiInbox, FiChevronDown } from "react-icons/fi";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: FiGrid,
  },
  {
    label: "Dynamic Forms",
    path: "/dynamic-forms",
    icon: FiFileText,
  },
  {
    label: "Submissions",
    path: "/submissions",
    icon: FiInbox,
  },
];

const Sidebar = ({ collapsed = false }) => {
  return (
    <aside
      className={`
        ${collapsed ? "w-[80px]" : "w-[260px]"}
        h-screen bg-[#161F42] text-white flex flex-col shrink-0
        overflow-hidden transition-[width] duration-300 ease-in-out
      `}>
      {/* Logo */}
      <div className={`h-[64px] flex items-center shrink-0 ${collapsed ? "justify-center px-3" : "px-6 gap-3"}`}>
        <div className="w-10 h-10 rounded-xl bg-[#9CD3BB] flex items-center justify-center text-[#161F42] font-bold text-base shrink-0">DFB</div>

        {!collapsed && <h1 className="text-[22px] font-bold tracking-tight text-white whitespace-nowrap">Form Builder</h1>}
      </div>

      {/* Navigation */}
      <div className={`flex-1 pt-6 ${collapsed ? "px-3" : "px-4"}`}>
        {!collapsed && <p className="text-[11px] font-bold tracking-[1.5px] text-[#9BAACB] px-3 mb-4 whitespace-nowrap">NAVIGATION</p>}

        <nav className="flex flex-col gap-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                title={collapsed ? item.label : undefined}
                aria-label={item.label}
                className={`
                  flex items-center rounded-lg transition-all duration-200
                  no-underline hover:no-underline whitespace-nowrap
                  ${collapsed ? "justify-center py-3" : "gap-3 px-3 py-2.5"}
                `}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#BDE2D1" : "transparent",

                  color: isActive ? "#161F42" : "#FFFFFF",
                })}>
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={1.8} color={isActive ? "#161F42" : "#FFFFFF"} className="shrink-0" />

                    {!collapsed && (
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isActive ? "#161F42" : "#FFFFFF",
                        }}>
                        {item.label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className={`pb-5 shrink-0 ${collapsed ? "px-3" : "px-4"}`}>
        <div className="border-t border-[#394466] pt-4">
          <button type="button" title={collapsed ? "Admin" : undefined} className={`w-full flex items-center rounded-lg ${collapsed ? "justify-center" : "gap-3 px-1.5"}`}>
            <div className="w-9 h-9 rounded-full bg-[#9CD3BB] text-[#161F42] flex items-center justify-center font-bold text-sm shrink-0">A</div>

            {!collapsed && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Admin</p>

                  <p className="text-xs text-[#9BAACB] truncate">Admin</p>
                </div>

                <FiChevronDown size={18} className="shrink-0" />
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
