import { Metadata } from "next";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { InsectImageEdit } from "../../_components/insectimageedit/InsectImageEdit";

export const metadata: Metadata = {
  title: "画像編集",
  description: "画像編集ページ",
};

export default function InsectImageEditPage() {
  return (
    <>
      <RouteAuthGuard>
        <InsectImageEdit />
      </RouteAuthGuard>
    </>
  );
}
