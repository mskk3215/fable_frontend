"use client";

import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { ProfileEdit } from "../../_components/profileedit/ProfileEdit";

export default function ProfileEditPage() {
  return (
    <>
      <RouteAuthGuard>
        <ProfileEdit />
      </RouteAuthGuard>
    </>
  );
}
