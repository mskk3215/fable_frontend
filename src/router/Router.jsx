import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import Home from "../components/Home";
import { logged_inUrl } from "../urls/index";

export const Router = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState("");

  const handleLogin = (data) => {
    setLoggedInStatus("ログインnow");
    setUser(data.user.nickname);
  };

  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setUser("");
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
          setUser(response.data.user.nickname);
        } else if (
          !response.data.logged_in &&
          loggedInStatus === "ログインnow"
        ) {
          setLoggedInStatus("未ログイン");
          setUser("");
        }
      })
      .catch((error) => {
        console.log("ログインエラー", error);
      });
  };

  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                user={user}
                loggedInStatus={loggedInStatus}
              />
            }
          />
          <Route
            path="registration"
            element={
              <Registration
                handleSuccessfulAuthentication={handleSuccessfulAuthentication}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login
                handleSuccessfulAuthentication={handleSuccessfulAuthentication}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
