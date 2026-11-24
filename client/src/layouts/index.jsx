import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";

const DEFAULT_COLLAPSED_PATHS = [
  "/dynamic-forms/create",
];

const ProtectedLayout = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    setIsSidebarCollapsed(DEFAULT_COLLAPSED_PATHS.includes(location.pathname));
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar collapsed={isSidebarCollapsed} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <Header sidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />

        {/* Page Outlet */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
