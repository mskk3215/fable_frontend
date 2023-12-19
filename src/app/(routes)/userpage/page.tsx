"use client";
import { UserPage } from "../../_components/userpage/UserPage";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";

export default function UserPagePage() {
  return (
    <>
      <RouteAuthGuard>
        <UserPage />
      </RouteAuthGuard>
    </>
  );
}
