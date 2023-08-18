//特定のユーザーの全画像を取得するカスタムフック
import { useEffect, useState } from "react";
import { getPosts, getUserPosts } from "../urls";
import { Post, UseImages } from "../types/images";

export const useImages = (userId?: number): UseImages => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleGetPosts = async (userId?: number) => {
    const { data } = userId ? await getUserPosts(userId) : await getPosts();
    setPosts(data);
  };
  useEffect(() => {
    handleGetPosts(userId);
  }, []);

  return { posts, handleGetPosts };
};
