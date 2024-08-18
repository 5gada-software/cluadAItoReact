import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Login from "./auth/login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/common/header";
import Sidebar from "./components/sidebar";
import Slots from "./pages/slots";
import Register from "./auth/register";
import Logout from "./auth/Logout";
import { useSelector } from "react-redux";
import ViewSlots from "./pages/viewSlots";
import Users from "./pages/users";

function Pages() {
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {});
  return (
    <Routes>
      <>
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<div>{user?.role}</div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/slots" element={<Slots />} />
      </>

      <Route path="/check-in" element={<ProtectedRoute></ProtectedRoute>} />
      <Route path="/*" element={<>Not found</>} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/logout" element={<Logout />} />
    </Routes>
  );
}

function Routing() {
  const location = useLocation();
  const noSidebarRoutes = ["/auth/login", "/auth/register"];

  const user = useSelector((state) => state.auth.user);
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  if (location.pathname === "/auth/login") {
    return (
      <div className="md:mx-16 ">
        <Login />
      </div>
    );
  }
  return (
    <div>
      {shouldShowSidebar && <Header />}
      <div className="flex  mx-auto overflow-hidden p-0 m-0  bg-sky-50  w-full h-[100vh]">
        {shouldShowSidebar && user?.role === "admin" && (
          <div className="flex ">
            <div className="hidden  lg:block">
              <Sidebar />
            </div>
          </div>
        )}
        <div
          className={`lg:px-4 mt-14 pt-16 flex justify-center items-start mx-auto w-[99vw] max-w-[99vw] ${
            shouldShowSidebar ? "lg:w-[79.6vw]" : "w-full"
          } p-2 overflow-auto lg:pb-4`}
        >
          <Pages />
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);

export default App;
