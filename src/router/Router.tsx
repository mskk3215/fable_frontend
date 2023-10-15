import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authCheckedState, loginUserState } from "../store/atoms/userAtom";
import { useUsers } from "../hooks/user/useUsers";
import { Login } from "../components/pages/auth/Login";
import { Registration } from "../components/pages/auth/Registration";
import { UserPage } from "../components/pages/UserPage";
import { Top } from "../components/pages/Top";
import { Page404 } from "../components/pages/Page404";
import { DefaultLayout } from "../components/templates/DefaultLayout";
import { HeaderOnly } from "../components/templates/HeaderOnly";
import { UploadView } from "../components/pages/UploadView";
import { ImageEdit } from "../components/pages/ImageEdit";
import { Map } from "../components/pages/Map";
import { Direction } from "../components/pages/Direction";
import { ProfileEdit } from "../components/pages/ProfileEdit";
import { PostList } from "../components/pages/PostList";

type RouteAuthGuardProps = {
  children: React.ReactNode;
};

// ログインしていなければログイン画面へ遷移
const RouteAuthGuard: React.FC<RouteAuthGuardProps> = ({ children }) => {
  const loginUser = useRecoilValue(loginUserState);
  const authChecked = useRecoilValue(authCheckedState);

  if (authChecked) {
    return loginUser !== undefined ? (
      <>{children}</>
    ) : (
      <HeaderOnly>
        <Login />
      </HeaderOnly>
    );
  } else {
    return <></>;
  }
};

export const Router = () => {
  const setAuthChecked = useSetRecoilState(authCheckedState);
  const { checkLoginStatus } = useUsers();

  // ブラウザ更新時にログイン状態をチェック
  useEffect(() => {
    const init = async () => {
      await checkLoginStatus();
      return setAuthChecked(true);
    };
    init();
  }, []);

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
            path="userpage/:userId"
            element={
              <RouteAuthGuard>
                <HeaderOnly>
                  <UserPage />
                </HeaderOnly>
              </RouteAuthGuard>
            }
          />
          <Route
            path="userpage"
            element={
              <RouteAuthGuard>
                <HeaderOnly>
                  <UserPage />
                </HeaderOnly>
              </RouteAuthGuard>
            }
          />
          <Route
            path="imageedit"
            element={
              <RouteAuthGuard>
                <HeaderOnly>
                  <ImageEdit />
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
