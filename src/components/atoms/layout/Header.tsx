import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../../store/atoms/userAtom";
import { LogoutButton } from "../button/LogoutButton";
import styled from "styled-components";
import { GuestLoginButton } from "../button/GuestLoginButton";

export const Header = () => {
  const loginUser = useRecoilValue(loginUserState);

  return (
    <SHeader>
      <SiteNameText>
        <TopSLink to="/">fabre</TopSLink>
      </SiteNameText>
      {loginUser === undefined ? (
        <ButtonContainer>
          <GuestLoginButton />
          <SLink to="/registration">新規登録</SLink>
          <SLink to="/login">ログイン</SLink>
        </ButtonContainer>
      ) : (
        <>
          <ButtonContainer>
            <SLink to="/userpage">マイページ</SLink>
            <SLink to="/">
              <LogoutButton />
            </SLink>
            <SLink to="/uploadview">投稿</SLink>
            <SLink to="/postlist">投稿一覧</SLink>
            <SLink to="/">検索</SLink>
          </ButtonContainer>
        </>
      )}
    </SHeader>
  );
};

const SHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #2b3d51;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0px 16px;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 48px;
`;

const TopSLink = styled(Link)`
  margin: 0 8px;
  color: #ffffff;
  text-decoration: none;
`;
const SLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  padding: 0px 12px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SiteNameText = styled.div`
  margin-left: 16px;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 2px;
  font-family: "Noto Serif", serif;
  font-style: italic;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-right: 16px;
`;
