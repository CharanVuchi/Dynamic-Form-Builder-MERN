import { NavLink, useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import { FiGrid, FiFileText, FiInbox, FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const Sidebar = ({ collapsed = false, onToggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`
        ${collapsed ? "w-[80px]" : "w-[260px]"}
        h-screen bg-gradient-to-br from-[#161F42] via-[#26345F] to-[#9CD3BB]
        text-white flex flex-col shrink-0
        overflow-hidden transition-[width] duration-300 ease-in-out
        relative
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
                {() => (
                  <>
                    <Icon size={20} strokeWidth={1.8} className="shrink-0" />

                    {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout */}
      <div className={`pb-5 shrink-0 ${collapsed ? "px-3" : "px-4"}`}>
        <div className="border-t border-white/20 pt-4">
          <Popconfirm
            title="Logout"
            description="Are you sure you want to logout?"
            okText="Logout"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            placement="topRight"
            onConfirm={handleLogout}>
            <button
              type="button"
              title={collapsed ? "Logout" : undefined}
              className={`
                w-full flex items-center rounded-lg
                text-white transition-all duration-200
               cursor-pointer
                ${collapsed ? "justify-center py-3" : "gap-3 px-3 py-3"}
              `}>
              <FiLogOut size={20} strokeWidth={1.8} className="shrink-0" />

              {!collapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </Popconfirm>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleSidebar}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={`
            absolute right-2 z-20 cursor-pointer ${collapsed ? "top-[60px]" : "top-[60px]"} flex h-8 w-8 items-center justify-center
            rounded-full border border-white/30 bg-white text-[#161F42] shadow-md transition-all duration-200 hover:bg-[#BDE2D1] active:scale-95
  `      }>
        {collapsed ? <FaArrowRight size={13} /> : <FaArrowLeft size={13} />}
      </button>
    </aside>
  );
};

export default Sidebar;
