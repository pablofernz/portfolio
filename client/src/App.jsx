import React, { lazy } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import useViewportWidth from "./Components/Hooks/useViewportSize";
// import Landing from "./Views/Landing/Landing";
const NotFound = lazy(() => import("./Views/404 Not Found/404"));
const Landing = lazy(() => import("./Views/Landing/Landing"));

const Disabled = () => {
  return (
    <div
      style={{
        height: "100svh",
        width: "100svw",
        position: "fixed",
        top: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        color: "white",
        fontSize: "10svw",
        fontFamily: "Trebuchet MS",
        textAlign: "center",
        padding: "20px 0px",
      }}
    >
      <p>
        Mobile preview temporarily disabled. Please check on a desktop device.
      </p>
    </div>
  );
};
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

// 3.1mb en imagenes solo en store
export default App;
