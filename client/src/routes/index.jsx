import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedLayout, PublicLayout } from "../layouts";
import { Login, Dashboard, DynamicForms, FormBuilder, Submissions } from "../pages";

const publicRoutes = [{ path: "login", element: <Login /> }];

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dynamic-forms", element: <DynamicForms /> },
  { path: "/dynamic-forms/create", element: <FormBuilder /> },
  { path: "/dynamic-forms/:id/edit", element: <FormBuilder /> },
  { path: "/submissions", element: <Submissions /> },
];

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<PublicLayout />}>
        {publicRoutes?.map((route) => (
          <Route key={route?.path} path={route?.path} element={route?.element} />
        ))}
      </Route>

      <Route element={<ProtectedLayout />}>
        {protectedRoutes?.map((route) => (
          <Route key={route?.path} path={route?.path} element={route?.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default RouteComponent;
