import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../urls";

export default function Login(props) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    axios
      .post(
        loginUrl,
        {
          nickname: nickname,
          email: email,
          password: password,
        },
        //cookieを含める
        { withCredentials: true }
      )
      .then((response) => {
        console.log("login condition", response);
        if (response.data.logged_in) {
          props.handleSuccessfulAuthentication(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  };

  return (
    <>
      <p>ログイン</p>

      <form onSubmit={handleSubmit}>
        <input
          type="nickname"
          name="nickname"
          placeholder="名前"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">登録</button>
      </form>
    </>
  );
}
