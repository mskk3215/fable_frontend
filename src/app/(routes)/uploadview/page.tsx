"use client";

import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { UploadView } from "../../_components/uploadview/UploadView";

export default function UploadViewPage() {
  return (
    <>
      <RouteAuthGuard>
        <UploadView />
      </RouteAuthGuard>
    </>
  );
}
