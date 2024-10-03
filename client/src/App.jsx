import React, { lazy } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
// import Landing from "./Views/Landing/Landing";
const NotFound = lazy(() => import("./Views/404 Not Found/404"));
const Landing = lazy(() => import("./Views/Landing/Landing"));
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
