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

const Sidebar = () => {
  return (
    <aside className="w-[280px] h-screen bg-[#161F42] text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-[70px] flex items-center px-7 gap-3 shrink-0">
        <div className="w-11 h-11 rounded-xl bg-[#9CD3BB] flex items-center justify-center text-[#161F42] font-bold text-lg">DFB</div>

        <h1 className="text-[26px] font-bold tracking-tight text-white">Form Builder</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-5 pt-7">
        <p className="text-xs font-bold tracking-[1.5px] text-[#9BAACB] px-4 mb-5">NAVIGATION</p>

        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className="flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 no-underline hover:no-underline"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#BDE2D1" : "transparent",

                  color: isActive ? "#161F42" : "#FFFFFF",
                })}>
                {({ isActive }) => (
                  <>
                    <Icon size={22} strokeWidth={1.8} color={isActive ? "#161F42" : "#FFFFFF"} />

                    <span
                      className="text-base font-medium"
                      style={{
                        color: isActive ? "#161F42" : "#FFFFFF",
                      }}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className="px-5 pb-6 shrink-0">
        <div className="border-t border-[#394466] pt-5">
          <button className="w-full flex items-center gap-3 px-2">
            <div className="w-11 h-11 rounded-full bg-[#9CD3BB] text-[#161F42] flex items-center justify-center font-bold text-lg shrink-0">C</div>

            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-white">Charan Vuchi</p>

              <p className="text-sm text-[#9BAACB]">Administrator</p>
            </div>

            <FiChevronDown size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
