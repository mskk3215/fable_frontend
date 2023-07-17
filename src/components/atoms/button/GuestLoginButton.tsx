import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const GuestLoginButton = (props: any) => {
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

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <SButton onClick={handleGuestLogin}>ゲストログイン</SButton>;
};
