import { Metadata } from "next";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { UploadView } from "../../_components/uploadview/UploadView";

export const metadata: Metadata = {
  title: "アップロード",
  description: "アップロードページ",
};

export default function UploadViewPage() {
  return (
    <>
      <RouteAuthGuard>
        <UploadView />
      </RouteAuthGuard>
    </>
  );
}
