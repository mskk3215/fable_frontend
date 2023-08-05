//全画像を取得するカスタムフック
import { useEffect, useState } from "react";
import { getUserPosts } from "../urls";
import { Post, UseImages } from "../types/images";

export const useUserImages = (userId: number | undefined): UseImages => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleGetUserPosts = async () => {
    const { data } = await getUserPosts(userId);
    setPosts(data);
  };
  useEffect(() => {
    handleGetUserPosts();
  }, []);

  return { posts, handleGetUserPosts };
};
