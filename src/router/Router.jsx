import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/pages/auth/Login";
import { Registration } from "../components/pages/auth/Registration";
import { PostList } from "../components/pages/PostList";
import { Top } from "../components/pages/Top";
import { Page404 } from "../components/pages/Page404";
import { DefaultLayout } from "../components/templates/DefaultLayout";
import { HeaderOnly } from "../components/templates/HeaderOnly";
import { UserContext } from "../providers/UserProvider";
import { logged_inUrl } from "../urls/index";
import { UploadView } from "../components/pages/UploadView";
import { PostEdit } from "../components/pages/PostEdit";
import { Map } from "../components/pages/Map";

export const Router = () => {
  const { setUser, loggedInStatus, setLoggedInStatus } =
    useContext(UserContext);

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
                <Registration />
              </HeaderOnly>
            }
          />
          <Route
            path="login"
            element={
              <HeaderOnly>
                <Login />
              </HeaderOnly>
            }
          />
          <Route
            path="uploadview"
            element={
              <HeaderOnly>
                <UploadView />
              </HeaderOnly>
            }
          />
          <Route
            path="postlist"
            element={
              <HeaderOnly>
                <PostList />
              </HeaderOnly>
            }
          />
          <Route
            path="postedit"
            element={
              <HeaderOnly>
                <PostEdit />
              </HeaderOnly>
            }
          />
          <Route path="map" element={<Map />} />
          <Route
            path="*"
            element={
              <HeaderOnly>
                <Page404 />
              </HeaderOnly>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
