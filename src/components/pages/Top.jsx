import React from "react";
import styled from "styled-components";

export default function Top(props) {
  return (
    <>
      <SConteiner>
        <h1>Top</h1>
        {/* <h2>ユーザー名: {props.user}</h2>
        <h2>ログイン状態: {props.loggedInStatus}</h2> */}
        {/* <button onClick={handleLogoutClick}>ログアウト</button> */}
      </SConteiner>
    </>
  );
}

const SConteiner = styled.div`
  text-align: center;
`;
