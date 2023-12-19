"use client";

import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { PostList } from "../../_components/postlist/PostList";

export default function PostListPage() {
  return (
    <>
      <RouteAuthGuard>
        <PostList />
      </RouteAuthGuard>
    </>
  );
}
