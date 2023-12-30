import { Metadata } from "next";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { ProfileEdit } from "../../_components/profileedit/ProfileEdit";

export const metadata: Metadata = {
  title: "プロフィール編集",
  description: "プロフィール編集ページ",
};

export default function ProfileEditPage() {
  return (
    <>
      <RouteAuthGuard>
        <ProfileEdit />
      </RouteAuthGuard>
    </>
  );
}
