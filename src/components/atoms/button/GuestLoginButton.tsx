import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useAuthActions } from "../../../hooks/user/useAuthActions";

export const GuestLoginButton = () => {
  const { handleLoginAction } = useAuthActions();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGuestLogin = () => {
    handleLoginAction({
      email: "Ares@example.com",
      password: "111111",
      setIsLoading: setIsLoading,
    });
  };

  return (
    <SButton onClick={handleGuestLogin} disabled={isLoading}>
      ゲストログイン
    </SButton>
  );
};

const SButton = styled(Button)`
  font-size: 1rem;
  height: 40px;
  width: 100%;
  background-color: #f0f0f0;
`;
