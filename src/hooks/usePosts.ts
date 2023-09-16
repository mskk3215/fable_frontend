import { useEffect, useState } from "react";
import { getPosts } from "../urls";
import { useImages } from "./useImages";
import { Post } from "../types/posts";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";

export const usePosts = () => {
  const { updateLikedImage, updatedLikedCount } = useImages();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsInitialLoading, setIsPostsInitialLoading] =
    useState<boolean>(true);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const [postPage, setPostPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 投稿情報を取得する
  const handleGetPosts = async () => {
    if (!hasMorePosts) return;
    setIsPostsLoading(true);
    const { data } = await getPosts(postPage);
    // 投稿画像を取得する
    setPosts((prevPosts) => {
      const newData = data.filter(
        (post: Post) => !prevPosts.some((prevItem) => prevItem.id === post.id)
      );
      return [...prevPosts, ...newData];
    });
    setIsInitialLoading(false);
    setIsPostsLoading(false);
    // すべての画像を取得する
    const allImages = data.flatMap((post: Post) => post.images);
    // いいねした画像を取得する
    updateLikedImage(allImages);
    // いいね数を取得する
    updatedLikedCount(allImages);
    // 投稿がない場合は取得をやめる
    if (data.length === 0) setHasMorePosts(false);
  };

  useEffect(() => {
    handleGetPosts();
  }, [postPage]);

  return {
    posts,
    setPosts,
    setPostPage,
    handleGetPosts,
    isPostsInitialLoading,
    isPostsLoading,
  };
};
