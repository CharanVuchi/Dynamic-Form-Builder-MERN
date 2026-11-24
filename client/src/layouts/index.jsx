import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";
import useAuth from "../hooks/useAuth";

const DEFAULT_COLLAPSED_PATHS = ["/dynamic-forms/create"];

const ProtectedLayout = () => {
  const location = useLocation();
  const [userCollapsed, setUserCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  const isSideBarCollapsed = DEFAULT_COLLAPSED_PATHS.includes(location.pathname) || userCollapsed;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setUserCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar collapsed={isSideBarCollapsed} onToggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <Header sidebarCollapsed={isSideBarCollapsed} onToggleSidebar={toggleSidebar} />

        {/* Page Outlet */}
        <main className="flex-1 overflow-y-auto p-6 thin-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const PublicLayout = () => {
  const { isAuthenticated } = useAuth();
  return <div className="h-screen w-full overflow-hidden bg-[#F5F7FA]">{isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />}</div>;
};

export default ProtectedLayout;
export { ProtectedLayout, PublicLayout };
