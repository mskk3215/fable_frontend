import axios from "axios";
import React, { useState } from "react";
import { registrationUrl } from "../../urls";

export default function Registration() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (event) => {
    axios
      .post(
        registrationUrl,
        {
          nickname: nickname,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        //cookieを含める
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    event.preventDefault();
  };

  return (
    <>
      <p>新規登録</p>

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
        <input
          type="password"
          name="password_confirmation"
          placeholder="確認用パスワード"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />

        <button type="submit">登録</button>
      </form>
    </>
  );
}
