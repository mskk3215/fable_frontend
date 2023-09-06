import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loggedInStatusState,
  loginUserState,
} from "../../../store/atoms/userAtom";
import { userLogout } from "../../../urls";
import styled from "styled-components";

export const Header = () => {
  const [loggedInStatus, setLoggedInStatus] =
    useRecoilState(loggedInStatusState);
  const setLoginUser = useSetRecoilState(loginUserState);

  const handleLogoutClick = () => {
    userLogout()
      .then((response) => {
        if (response.data.logged_out) {
          setLoggedInStatus(false);
          setLoginUser(null);
        }
      })
      .catch((error) => {
        console.log("ログアウトエラー", error);
      });
  };

  return (
    <SHeader>
      {!loggedInStatus ? (
        <>
          <SLink to="/registration">新規登録</SLink>
          <SLink to="/login">ログイン</SLink>
        </>
      ) : (
        <>
          <SLink to="/userpage">マイページ</SLink>
          <SLink to="/" onClick={handleLogoutClick}>
            ログアウト
          </SLink>
          <SLink to="/map">地図</SLink>
          <SLink to="/uploadview">投稿</SLink>
          <SLink to="/postlist">投稿一覧</SLink>
          <SLink to="/">検索</SLink>
        </>
      )}
    </SHeader>
  );
};

const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #5555ff;
  color: #fff;
  text-align: center;
  padding: 8px 0;
  z-index: 100;
`;

const SLink = styled(Link)`
  margin: 0 8px;
  color: #ffff;
`;
