import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../../providers/UserProvider";
import { logoutUrl } from "../../../urls";

export const Header = (props) => {
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
          <SLink to="/camera">カメラ</SLink>
          <SLink to="/map">地図</SLink>
          <SLink to="/uploadview">投稿する</SLink>
        </>
      )}
    </SHeader>
  );
};

const SHeader = styled.header`
  background-color: #5555ff;
  color: #fff;
  text-align: center;
  padding: 8px 0;
`;

const SLink = styled(Link)`
  margin: 0 8px;
  color: #ffff;
`;
