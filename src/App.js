import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  // const [user, setUser] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home loggedInStatus={loggedInStatus} />} />
          <Route
            path="/dashboard"
            element={<Dashboard loggedInStatus={loggedInStatus} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
