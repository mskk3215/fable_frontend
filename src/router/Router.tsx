import React, { useContext, useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInStatusState } from "../store/atoms/userAtom";
import { useUser } from "../hooks/useUser";
import { Login } from "../components/pages/auth/Login";
import { Registration } from "../components/pages/auth/Registration";
import { PostList } from "../components/pages/PostList";
import { Top } from "../components/pages/Top";
import { Page404 } from "../components/pages/Page404";
import { DefaultLayout } from "../components/templates/DefaultLayout";
import { HeaderOnly } from "../components/templates/HeaderOnly";
import { UploadView } from "../components/pages/UploadView";
import { PostEdit } from "../components/pages/PostEdit";
import { Map } from "../components/pages/Map";
import { Direction } from "../components/pages/Direction";
import { ProfileEdit } from "../components/pages/ProfileEdit";

type RouteAuthGuardProps = {
  children: React.ReactNode;
};

export const Router = () => {
  const loggedInStatus = useRecoilValue(loggedInStatusState);
  const { checkLoginStatus } = useUser();

  const [authChecked, setAuthChecked] = useState(false);

  // ブラウザ更新時にログイン状態をチェック
  useEffect(() => {
    const init = async () => {
      await checkLoginStatus();
      return setAuthChecked(true);
    };
    init();
  }, []);

  // ログインしていなければログイン画面へ遷移
  const RouteAuthGuard: React.FC<RouteAuthGuardProps> = ({ children }) => {
    if (authChecked) {
      return loggedInStatus ? <>{children}</> : <Login />;
    } else {
      return <></>;
    }
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
            path="profileedit"
            element={
              <RouteAuthGuard>
                <HeaderOnly>
                  <ProfileEdit />
                </HeaderOnly>
              </RouteAuthGuard>
            }
          />
          <Route
            path="uploadview"
            element={
              <RouteAuthGuard>
                <HeaderOnly>
                  <UploadView />
                </HeaderOnly>
              </RouteAuthGuard>
            }
          />
          <Route
            path="postlist/:userId"
            element={
              <HeaderOnly>
                <PostList />
              </HeaderOnly>
            }
          />
          <Route
            path="postlist"
            element={
              <RouteAuthGuard>
                <HeaderOnly>
                  <PostList />
                </HeaderOnly>
              </RouteAuthGuard>
            }
          />
          <Route
            path="postedit"
            element={
              <RouteAuthGuard>
                <HeaderOnly>
                  <PostEdit />
                </HeaderOnly>
              </RouteAuthGuard>
            }
          />
          <Route path="map" element={<Map />} />
          <Route path="direction" element={<Direction />} />
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
