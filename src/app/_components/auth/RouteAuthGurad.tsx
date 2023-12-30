"use client";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { Login } from "./Login";
import {
  authCheckedState,
  loginUserState,
} from "../../../store/atoms/userAtom";
import { Box, CircularProgress } from "@mui/material";

// ログインしていなければログイン画面へ遷移
export default function RouteAuthGuard({ children }: { children: ReactNode }) {
  const loginUser = useRecoilValue(loginUserState);
  const authChecked = useRecoilValue(authCheckedState);

  if (!authChecked) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={75} sx={{ color: "#2b3d51" }} />
        </Box>
      </>
    );
  } else {
    return loginUser === undefined ? <Login /> : <>{children}</>;
  }
}
