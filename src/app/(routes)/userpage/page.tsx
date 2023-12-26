import { Metadata } from "next";
import { UserPage } from "../../_components/userpage/UserPage";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";

export const metadata: Metadata = {
  title: "マイページ",
  description: "マイページ",
};

export default function UserPagePage() {
  return (
    <>
      <RouteAuthGuard>
        <UserPage />
      </RouteAuthGuard>
    </>
  );
}
