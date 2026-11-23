import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <Header />

        {/* Page Outlet */}
        <main className="flex-1 overflow-y-auto p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
