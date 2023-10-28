import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAuthActions } from "../../../hooks/user/useAuthActions";
import { Button } from "@mui/material";

export const GuestLoginButton = () => {
  const { handleLoginAction } = useAuthActions();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGuestLogin = () => {
    handleLoginAction({
      email: "Ares@example.com",
      password: "111111",
      setIsLoading: setIsLoading,
      isGuest: true,
    });
  };

  return (
    <SButton onClick={handleGuestLogin} disabled={isLoading}>
      ゲストログイン
    </SButton>
  );
};

const SButton = styled(Button)`
  border-radius: 0px;
  background-color: #42a878;
  color: #ffffff;
  text-decoration: none;
  padding: 0px 12px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #388e6a;
  }
`;
