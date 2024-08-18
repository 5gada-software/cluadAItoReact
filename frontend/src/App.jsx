import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function Pages() {
  useEffect(() => {});
  return (
    <Routes>
      <Route path="/*" element={<>Not found</>} />
    </Routes>
  );
}

function Routing() {

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
