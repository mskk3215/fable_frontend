import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../../store/atoms/userAtom";
import { LogoutButton } from "../button/LogoutButton";
import styled from "styled-components";

export const Header = () => {
  const loginUser = useRecoilValue(loginUserState);

  return (
    <SHeader>
      {loginUser === undefined ? (
        <>
          <SLink to="/registration">新規登録</SLink>
          <SLink to="/login">ログイン</SLink>
        </>
      ) : (
        <>
          <SLink to="/userpage">マイページ</SLink>
          <SLink to="/">
            <LogoutButton />
          </SLink>
          <SLink to="/uploadview">投稿</SLink>
          <SLink to="/postlist">投稿一覧</SLink>
          <SLink to="/">検索</SLink>
          <SLink to="/statistics">分析</SLink>
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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px 0;
  z-index: 100;
`;

const SLink = styled(Link)`
  margin: 0 8px;
  color: #ffff;
`;
