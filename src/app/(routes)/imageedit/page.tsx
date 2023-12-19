"use client";

import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { ImageEdit } from "../../_components/imageedit/ImageEdit";

export default function ImageEditPage() {
  return (
    <>
      <RouteAuthGuard>
        <ImageEdit />
      </RouteAuthGuard>
    </>
  );
}
