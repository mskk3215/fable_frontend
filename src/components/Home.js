import React from "react";
import { useNavigate } from "react-router-dom";
import Registration from "./auth/Registration";

export default function Home(props) {
  const navigate = useNavigate();
  const handleSuccessfulAuthentication = (data) => {
    props.handleLogin(data);
    navigate("/dashboard");
  };
  return (
    <>
      <h1>Home</h1>
      <h2>ログイン状態:{props.loggedInStatus}</h2>
      <Registration
        handleSuccessfulAuthentication={handleSuccessfulAuthentication}
      />
    </>
  );
}
