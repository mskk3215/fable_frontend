"use client";

import { useAuthCheck } from "../../../hooks/user/useAuthCheck";
import { ImageEdit } from "../../_components/imageedit/ImageEdit";

export default function ImageEditPage() {
  useAuthCheck();
  return (
    <>
      <ImageEdit />
    </>
  );
}
