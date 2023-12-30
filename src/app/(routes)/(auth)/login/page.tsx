import { Metadata } from "next";
import { Login } from "../../../_components/auth/Login";

export const metadata: Metadata = {
  title: "ログイン",
  description: "ログインページ",
};

export default function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}
