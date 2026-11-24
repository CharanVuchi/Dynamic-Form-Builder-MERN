import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedLayout, PublicLayout } from "../layouts";
import useAuth from "../hooks/useAuth";
import { Login, Dashboard, DynamicForms, FormBuilder, Submissions } from "../pages";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dynamic-forms", element: <DynamicForms /> },
  { path: "/dynamic-forms/create", element: <FormBuilder /> },
  { path: "/submissions", element: <Submissions /> },
];

const publicRoutes = [{ path: "/login", element: <Login /> }];

const RouteComponent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <PublicLayout>{route.element}</PublicLayout>} />
      ))}

      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

      {isAuthenticated ? (
        <Route element={<ProtectedLayout />}>{protectedRoutes.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}</Route>
      ) : (
        <Route path="/dashboard" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default RouteComponent;
