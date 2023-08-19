//特定のユーザーの全画像を取得するカスタムフック
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { likedCountState, likedImageState } from "../store/atoms/imageAtom";
import { loginUserState } from "../store/atoms/userAtom";
import { getPosts, getUserPosts } from "../urls";
import { Post, UseImages } from "../types/images";
import { User } from "../types/user";

export const useImages = (userId?: number): UseImages => {
  const loginUser = useRecoilValue<User | null>(loginUserState);

  // 画像情報
  const [posts, setPosts] = useState<Post[]>([]);
  // いいね情報
  const setLikedImage = useSetRecoilState(likedImageState);
  const setLikedCount = useSetRecoilState(likedCountState);

  // ユーザーの全画像を取得する
  const handleGetPosts = async (userId?: number) => {
    const { data } = userId ? await getUserPosts(userId) : await getPosts();
    setPosts(data);
    // いいね情報を取得する
    updateLikedImage(data);
    updatedLikedCount(data);
  };
  useEffect(() => {
    handleGetPosts(userId);
  }, []);

  // いいね状態がtrueの画像を取得する
  const updateLikedImage = (allImageData: Post[] | undefined) => {
    if (!allImageData || !loginUser) return;

    const updatedLikedImage = allImageData.reduce<{ [key: number]: boolean }>(
      (acc, post) => {
        acc[post.id] = !!post.liked_user_ids?.includes(loginUser?.id);
        return acc;
      },
      {}
    );
    setLikedImage(updatedLikedImage);
  };
  // いいね数を取得する
  const updatedLikedCount = (allImageData: Post[] | undefined) => {
    if (!allImageData) return;
    const updatedLikedCount = allImageData.reduce<{ [key: number]: number }>(
      (acc, post) => {
        acc[post.id] = post.likes_count || 0;
        return acc;
      },
      {}
    );
    setLikedCount(updatedLikedCount);
  };

  return { posts, handleGetPosts };
};
