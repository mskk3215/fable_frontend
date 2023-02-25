//全画像を取得するカスタムフック
import { useEffect, useState } from "react";
import { getPosts } from "../urls";

export const useAllImages = () => {
  const [posts, setPosts] = useState([]);

  const handleGetPosts = async () => {
    const { data } = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    handleGetPosts();
  }, [posts]);

  return { posts, handleGetPosts };
};
