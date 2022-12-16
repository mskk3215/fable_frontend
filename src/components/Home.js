import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUrl } from "../urls";
import Login from "./auth/Login";
import Registration from "./auth/Registration";

export default function Home(props) {
  const navigate = useNavigate();
  const handleSuccessfulAuthentication = (data) => {
    props.handleLogin(data);
    navigate("/dashboard");
  };

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
      <h2>ログイン状態:{props.loggedInStatus}</h2>
      <button onClick={handleLogoutClick}>ログアウト</button>
      <Registration
        handleSuccessfulAuthentication={handleSuccessfulAuthentication}
      />
      <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
    </>
  );
}
