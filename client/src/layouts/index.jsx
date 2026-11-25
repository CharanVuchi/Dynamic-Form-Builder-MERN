import { useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";

const DEFAULT_COLLAPSED_PATHS = ["/dynamic-forms/create"];

const ProtectedLayout = () => {
  const location = useLocation();
  const [isSideBarCollapsed, setIsSideCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));


  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsSideCollapsed(DEFAULT_COLLAPSED_PATHS.includes(location.pathname));
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setIsSideCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--theme-page-background)]">
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
  const isAuthenticated = !!localStorage.getItem("token");
  return <div className="h-screen w-full overflow-hidden bg-[var(--theme-page-background)]">{!isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />}</div>;
};

export default ProtectedLayout;
export { ProtectedLayout, PublicLayout };
