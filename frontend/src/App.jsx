import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function Pages() {
  useEffect(() => {});
  return (
    <Routes>
      <Route path="/*" element={<>Not found</>} />
    </Routes>
  );
}

function Routing() {
  const location = useLocation();
  const noSidebarRoutes = ["/auth/login", "/auth/register"];

  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div>
      <Pages />
    </div>
  );
}

const App = () => (
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);

export default App;
