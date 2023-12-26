import { Metadata } from "next";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { ImageEdit } from "../../_components/imageedit/ImageEdit";

export const metadata: Metadata = {
  title: "画像編集",
  description: "画像編集ページ",
};

export default function ImageEditPage() {
  return (
    <>
      <RouteAuthGuard>
        <ImageEdit />
      </RouteAuthGuard>
    </>
  );
}
