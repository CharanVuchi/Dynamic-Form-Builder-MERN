import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import { Dashboard, DynamicForms, Submissions } from "../pages";

const layout = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dynamic-forms", element: <DynamicForms /> },
  { path: "/submissions", element: <Submissions /> },
];
const RouteComponent = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    <Route element={<Layout />}>
      {layout?.map((route) => (
        <Route key={route?.path} path={route?.path} element={route?.element} />
      ))}
    </Route>
  </Routes>
);

export default RouteComponent;
