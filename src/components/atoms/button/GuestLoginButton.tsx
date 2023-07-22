import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { LoginAuthAction } from "../../../types/user";

type Props = {
  handleLoginAction: (data: LoginAuthAction) => void;
};

export const GuestLoginButton = (props: Props) => {
  const { handleLoginAction } = props;
  const SButton = styled(Button)`
    font-size: 1rem;
    height: 40px;
    width: 100%;
    background-color: #f0f0f0;
  `;

  const handleGuestLogin = () => {
    handleLoginAction({
      email: "test1@test.com",
      password: "111111",
    });
  };

  return <SButton onClick={handleGuestLogin}>ゲストログイン</SButton>;
};
