import React from "react";
import Registration from "./auth/Registration";

export default function Home(props) {
  return (
    <>
      <h1>Home</h1>
      <h2>ログイン状態:{props.loggedInStatus}</h2>
      <Registration />
    </>
  );
}
