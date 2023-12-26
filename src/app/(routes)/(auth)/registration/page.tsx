import { Metadata } from "next";
import { Registration } from "../../../_components/auth/Registration";

export const metadata: Metadata = {
  title: "新規登録",
  description: "新規登録ページ",
};

export default function RegistrationPage() {
  return (
    <>
      <Registration />
    </>
  );
}
