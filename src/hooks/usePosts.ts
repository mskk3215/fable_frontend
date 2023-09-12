import { useEffect, useState } from "react";
import { getPosts } from "../urls";
import { useImages } from "./useImages";
import { Post } from "../types/posts";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";

export const usePosts = () => {
  const { updateLikedImage, updatedLikedCount } = useImages();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 投稿情報を取得する
  const handleGetPosts = async () => {
    setIsPostsLoading(true);
    const { data } = await getPosts();
    // 投稿画像を取得する
    setPosts(data);
    setIsPostsLoading(false);
    // すべての画像を取得する
    const allImages = data.flatMap((post: Post) => post.images);
    // いいねした画像を取得する
    updateLikedImage(allImages);
    // いいね数を取得する
    updatedLikedCount(allImages);
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return { posts, handleGetPosts, isPostsLoading };
};
