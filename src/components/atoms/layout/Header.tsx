import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
// @ts-expect-error TS(6142): Module '../../../providers/UserProvider' was resol... Remove this comment to see the full error message
import { UserContext } from "../../../providers/UserProvider";
import { logoutUrl } from "../../../urls";

export const Header = () => {
  // @ts-expect-error TS(2339): Property 'setUser' does not exist on type '{}'.
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SHeader>
      {!loggedInStatus ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SLink to="/registration">新規登録</SLink>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SLink to="/login">ログイン</SLink>
        </>
      ) : (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SLink to="/postlist">マイページ</SLink>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SLink to="/" onClick={handleLogoutClick}>
            ログアウト
          </SLink>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SLink to="/map">地図</SLink>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SLink to="/uploadview">投稿</SLink>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
