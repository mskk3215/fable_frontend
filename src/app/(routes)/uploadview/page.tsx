"use client";

import { useAuthCheck } from "../../../hooks/user/useAuthCheck";
import { UploadView } from "../../_components/uploadview/UploadView";

export default function UploadViewPage() {
  useAuthCheck();
  return (
    <>
      <UploadView />
    </>
  );
}
