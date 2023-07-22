//全画像を取得するカスタムフック
import { useEffect, useState } from "react";
import { getPosts } from "../urls";
import { Post, UseAllImages } from "../types/images";

export const useAllImages = (): UseAllImages => {
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
