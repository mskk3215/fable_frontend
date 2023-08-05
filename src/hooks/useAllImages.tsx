//全画像を取得するカスタムフック
import { useEffect, useState } from "react";
import { getPosts } from "../urls";
import { Post, UseImages } from "../types/images";

export const useAllImages = (): UseImages => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleGetPosts = async () => {
    const { data } = await getPosts();
    setPosts(data);
  };
  useEffect(() => {
    handleGetPosts();
  }, []);

  return { posts, handleGetPosts };
};
