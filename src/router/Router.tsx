import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../components/pages/auth/Login' was resolv... Remove this comment to see the full error message
import { Login } from "../components/pages/auth/Login";
// @ts-expect-error TS(6142): Module '../components/pages/auth/Registration' was... Remove this comment to see the full error message
import { Registration } from "../components/pages/auth/Registration";
// @ts-expect-error TS(6142): Module '../components/pages/PostList' was resolved... Remove this comment to see the full error message
import { PostList } from "../components/pages/PostList";
// @ts-expect-error TS(6142): Module '../components/pages/Top' was resolved to '... Remove this comment to see the full error message
import { Top } from "../components/pages/Top";
// @ts-expect-error TS(6142): Module '../components/pages/Page404' was resolved ... Remove this comment to see the full error message
import { Page404 } from "../components/pages/Page404";
// @ts-expect-error TS(6142): Module '../components/templates/DefaultLayout' was... Remove this comment to see the full error message
import { DefaultLayout } from "../components/templates/DefaultLayout";
// @ts-expect-error TS(6142): Module '../components/templates/HeaderOnly' was re... Remove this comment to see the full error message
import { HeaderOnly } from "../components/templates/HeaderOnly";
// @ts-expect-error TS(6142): Module '../providers/UserProvider' was resolved to... Remove this comment to see the full error message
import { UserContext } from "../providers/UserProvider";
import { logged_inUrl } from "../urls/index";
// @ts-expect-error TS(6142): Module '../components/pages/UploadView' was resolv... Remove this comment to see the full error message
import { UploadView } from "../components/pages/UploadView";
// @ts-expect-error TS(6142): Module '../components/pages/PostEdit' was resolved... Remove this comment to see the full error message
import { PostEdit } from "../components/pages/PostEdit";
// @ts-expect-error TS(6142): Module '../components/pages/Map' was resolved to '... Remove this comment to see the full error message
import { Map } from "../components/pages/Map";
// @ts-expect-error TS(6142): Module '../components/pages/Direction' was resolve... Remove this comment to see the full error message
import { Direction } from "../components/pages/Direction";

export const Router = () => {
  // @ts-expect-error TS(2339): Property 'setUser' does not exist on type '{}'.
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <BrowserRouter>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Routes>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            path="/"
            element={
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <DefaultLayout>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Top />
              </DefaultLayout>
            }
          />

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            path="registration"
            element={
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderOnly>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Registration />
              </HeaderOnly>
            }
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            path="login"
            element={
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderOnly>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Login />
              </HeaderOnly>
            }
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            path="uploadview"
            element={
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderOnly>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <UploadView />
              </HeaderOnly>
            }
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            path="postlist"
            element={
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderOnly>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <PostList />
              </HeaderOnly>
            }
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            path="postedit"
            element={
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderOnly>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <PostEdit />
              </HeaderOnly>
            }
          />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route path="map" element={<Map />} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route path="direction" element={<Direction />} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Route
            path="*"
            element={
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderOnly>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Page404 />
              </HeaderOnly>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
