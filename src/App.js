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
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path={"/"}
            render={(props) => (
              <Home {...props} loggedInStatus={loggedInStatus} />
            )}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
