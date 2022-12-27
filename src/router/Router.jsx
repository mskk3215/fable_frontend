import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import Post from "../components/pages/Post";
import Top from "../components/pages/Top";
import { DefaultLayout } from "../components/templates/DefaultLayout";
import { HeaderOnly } from "../components/templates/HeaderOnly";
import { UserContext } from "../providers/UserProvider";
import { logged_inUrl } from "../urls/index";

export const Router = () => {
  const { setUser, loggedInStatus, setLoggedInStatus } =
    useContext(UserContext);

  const handleLogin = (data) => {
    setLoggedInStatus(true);
    setUser(data.user.nickname);
  };

  useEffect(() => {
    checkLoginStatus();
  });

  const checkLoginStatus = () => {
    axios
      .get(logged_inUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === false) {
          setLoggedInStatus(true);
          setUser(response.data.user.nickname);
        } else if (!response.data.logged_in && loggedInStatus === true) {
          setLoggedInStatus(false);
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
              <DefaultLayout>
                <Top />
              </DefaultLayout>
            }
          />

          <Route
            path="registration"
            element={
              <HeaderOnly>
                <Registration
                  handleSuccessfulAuthentication={
                    handleSuccessfulAuthentication
                  }
                />
              </HeaderOnly>
            }
          />
          <Route
            path="login"
            element={
              <HeaderOnly>
                <Login
                  handleSuccessfulAuthentication={
                    handleSuccessfulAuthentication
                  }
                />
              </HeaderOnly>
            }
          />
          <Route
            path="post"
            element={
              <HeaderOnly>
                <Post />
              </HeaderOnly>
            }
          />
          <Route path="camera" element={<HeaderOnly></HeaderOnly>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
