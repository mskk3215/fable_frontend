import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <SHeader>
      {loggedInStatus === "ログインnow" ? (
        <>
          <SLink to="/registration">新規登録</SLink>
          <SLink to="/login">ログイン</SLink>
        </>
      ) : (
        <SLink to="/logout">ログアウト</SLink>
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
