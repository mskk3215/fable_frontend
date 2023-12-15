"use client";

import { useAuthCheck } from "../../../hooks/user/useAuthCheck";
import { PostList } from "../../_components/postlist/PostList";

export default function PostListPage() {
  useAuthCheck();
  return (
    <>
      <PostList />
    </>
  );
}
