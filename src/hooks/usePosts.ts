import { useEffect, useState } from "react";
import { getPosts } from "../urls";
import { useImages } from "./useImages";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { Post } from "../types/posts";

export const usePosts = () => {
  const { updateLikedImage, updatedLikedCount } = useImages();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsInitialLoading, setIsPostsInitialLoading] =
    useState<boolean>(true);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const [postPage, setPostPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState(0);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 初回とTab切り替え時の投稿情報を取得する
  const handleGetPosts = async () => {
    setHasMorePosts(true);
    setIsPostsLoading(true);

    setPostPage(1);
    // 投稿画像を取得する
    const { data } = await getPosts(1, tabValue);
    setPosts(data);

    setIsPostsInitialLoading(false);
    setIsPostsLoading(false);

    // すべての画像を取得する
    const allImages = data.flatMap((post: Post) => post.images);
    // いいねした画像を取得する
    updateLikedImage(allImages);
    // いいね数を取得する
    updatedLikedCount(allImages);
  };

  // スクロールした時の投稿情報を取得する
  const handleGetMorePosts = async () => {
    if (!hasMorePosts) return;
    setIsPostsLoading(true);
    const { data } = await getPosts(postPage, tabValue);
    // 投稿画像を取得する
    setPosts((prevPosts) => {
      const newData = data.filter(
        (post: Post) => !prevPosts.some((prevItem) => prevItem.id === post.id)
      );
      return [...prevPosts, ...newData];
    });
    if (data.length === 0) setHasMorePosts(false);
    setIsPostsLoading(false);
    // すべての画像を取得する
    const allImages = data.flatMap((post: Post) => post.images);
    // いいねした画像を取得する
    updateLikedImage(allImages);
    // いいね数を取得する
    updatedLikedCount(allImages);
  };

  useEffect(() => {
    handleGetMorePosts();
  }, [postPage]);

  useEffect(() => {
    handleGetPosts();
  }, [tabValue]);

  return {
    posts,
    setPosts,
    setPostPage,
    handleGetPosts,
    isPostsInitialLoading,
    isPostsLoading,
    tabValue,
    setTabValue,
  };
};
