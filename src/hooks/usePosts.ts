import { useEffect, useRef, useState } from "react";
import { getPosts } from "../urls";
import { useImages } from "./useImages";
import { Post } from "../types/posts";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";

export const usePosts = () => {
  const { updateLikedImage, updatedLikedCount } = useImages();
  const [posts, setPosts] = useState<Post[]>([]);
  const prevPostsRef = useRef<Post[]>([]);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 投稿情報を取得する
  const handleGetPosts = async () => {
    const { data } = await getPosts();
    // 投稿画像を取得する
    setPosts(data);
    // すべての画像を取得する
    const allImages = data.flatMap((post: Post) => post.images);
    // いいねした画像を取得する
    updateLikedImage(allImages);
    // いいね数を取得する
    updatedLikedCount(allImages);
  };

  // マウント時の投稿情報を保持する
  useEffect(() => {
    prevPostsRef.current = posts;
    handleGetPosts();
  }, []);

  // 前回の投稿情報と現在の投稿情報が異なる場合は投稿情報を取得する
  useEffect(() => {
    if (JSON.stringify(prevPostsRef.current) !== JSON.stringify(posts)) {
      handleGetPosts();
    }
  }, [posts]);

  return { posts, handleGetPosts };
};
