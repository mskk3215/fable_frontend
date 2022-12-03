import axios from "axios";
import React, { useState } from "react";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    axios
      .post(
        "http://localhost:3001/signup",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        //cookieを含める
        { withCredentials: true }
      )
      .then((res) => {
        console.log("registration res", res);
      })
      .catch((error) => {
        console.log("registration error", error);
      });

    e.preventDefault();
  };

  return (
    <>
      <p>新規登録</p>
      <form>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="確認用パスワード"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
    </>
  );
}
