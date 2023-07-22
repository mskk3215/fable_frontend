import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../providers/UserProvider";
import { logoutUrl } from "../../../urls";
import styled from "styled-components";

export const Header = () => {
  const { setUser, loggedInStatus, setLoggedInStatus } =
    useContext(UserContext);

  const handleLogout = () => {
    setLoggedInStatus(false);
    setUser("");
  };

  const handleLogoutClick = () => {
    axios
      .delete(logoutUrl, { withCredentials: true })
      .then((response) => {
        handleLogout();
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
          <SLink to="/postlist">マイページ</SLink>
          <SLink to="/" onClick={handleLogoutClick}>
            ログアウト
          </SLink>
          <SLink to="/map">地図</SLink>
          <SLink to="/uploadview">投稿</SLink>

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
