import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});
  const handleLogin = (data) => {
    setLoggedInStatus("ログインnow");
    setUser(data.user);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home handleLogin={handleLogin} loggedInStatus={loggedInStatus} />
            }
          />
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
