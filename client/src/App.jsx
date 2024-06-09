import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./Views/404 Not Found/404";
import Landing from "./views/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/landing"} />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
