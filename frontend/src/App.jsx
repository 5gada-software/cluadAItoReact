import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page1 from "./pages/page1";

function Pages() {
  useEffect(() => {});
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/*" element={<>Not found</>} />
    </Routes>
  );
}

function Routing() {
  return (
    <div className="w-screen">
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
