import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { logoutUrl } from "../urls";

export default function Home(props) {
  const handleLogoutClick = () => {
    axios
      .delete(logoutUrl, { withCredentials: true })
      .then((response) => {
        props.handleLogout();
      })
      .catch((error) => {
        console.log("ログアウトエラー", error);
      });
  };

  return (
    <>
      <h1>Home</h1>
      <h2>ユーザー名: {props.user}</h2>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
      <button onClick={handleLogoutClick}>ログアウト</button>
      <br />
      <Link to="/registration">registration</Link>
      <br />
      <Link to="/login">login</Link>
    </>
  );
}
