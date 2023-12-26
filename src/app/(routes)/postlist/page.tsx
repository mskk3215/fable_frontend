import { Metadata } from "next";
import RouteAuthGuard from "../../_components/auth/RouteAuthGurad";
import { PostList } from "../../_components/postlist/PostList";

export const metadata: Metadata = {
  title: "投稿一覧",
  description: "投稿一覧ページ",
};

export default function PostListPage() {
  return (
    <>
      <RouteAuthGuard>
        <PostList />
      </RouteAuthGuard>
    </>
  );
}
