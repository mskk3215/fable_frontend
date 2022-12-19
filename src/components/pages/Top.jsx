import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logoutUrl } from "../../urls";

export default function Top(props) {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    axios
      .delete(logoutUrl, { withCredentials: true })
      .then((response) => {
        props.handleLogout();
        navigate("/");
      })
      .catch((error) => {
        console.log("ログアウトエラー", error);
      });
  };

  return (
    <>
      <SConteiner>
        <h1>Top</h1>
        {/* <h2>ユーザー名: {props.user}</h2>
        <h2>ログイン状態: {props.loggedInStatus}</h2> */}
        <button onClick={handleLogoutClick}>ログアウト</button>
      </SConteiner>
    </>
  );
}

const SConteiner = styled.div`
  text-align: center;
`;
