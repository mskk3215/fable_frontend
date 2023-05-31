import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const GuestLoginButton = (props) => {
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
