import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { logged_inUrl } from "./urls";

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus("ログインnow");
    setUser(data.user);
  };

  useEffect(() => {
    checkLoginStatus();
  });

  const checkLoginStatus = () => {
    axios
      .get(logged_inUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインnow");
          setUser(response.data.user);
        } else if (
          !response.data.logged_in &&
          loggedInStatus === "ログインnow"
        ) {
          setLoggedInStatus("未ログイン");
          setUser({});
        }
      })
      .catch((error) => {
        console.log("ログインエラー", error);
      });
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
