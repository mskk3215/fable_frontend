"use client";

import { useAuthCheck } from "../../../hooks/user/useAuthCheck";
import { ProfileEdit } from "../../_components/profileedit/ProfileEdit";

export default function ProfileEditPage() {
  useAuthCheck();
  return (
    <>
      <ProfileEdit />
    </>
  );
}
