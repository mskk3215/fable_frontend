import { useEffect, useState } from "react";
import { getPosts } from "../urls";
import { useInsectImages } from "./useInsectImages";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { Post } from "../types/posts";

export const usePosts = () => {
  const { updateLikedImage, updatedLikedCount } = useInsectImages();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsInitialLoading, setIsPostsInitialLoading] =
    useState<boolean>(false);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const [postPage, setPostPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState(0);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 初回とTab切り替え時の投稿情報を取得する
  const handleGetPosts = async () => {
    setHasMorePosts(true);
    setIsPostsInitialLoading(true);
    setIsPostsLoading(true);

    setPostPage(1);
    // 投稿画像を取得する
    const { data } = await getPosts(1, tabValue);
    setPosts(data);
    setIsPostsInitialLoading(false);
    setIsPostsLoading(false);

    // すべての画像を取得する
    const allInsectImages = data.flatMap((post: Post) => post.collectedInsects);
    // いいねした画像を取得する
    updateLikedImage(allInsectImages);
    // いいね数を取得する
    updatedLikedCount(allInsectImages);
  };

  // スクロールした時の投稿情報を取得する
  const handleGetMorePosts = async () => {
    if (!hasMorePosts) return;
    setIsPostsLoading(true);
    setTimeout(async () => {
      const { data } = await getPosts(postPage, tabValue);
      // 投稿画像を取得する
      setPosts((prevPosts) => {
        const newData = data.filter(
          (post: Post) => !prevPosts.some((prevItem) => prevItem.id === post.id)
        );
        return [...prevPosts, ...newData];
      });
      if (data.length === 0) setHasMorePosts(false);
      // すべての画像を取得する
      const allInsectImages = data.flatMap(
        (post: Post) => post.collectedInsects
      );
      // いいねした画像を取得する
      updateLikedImage(allInsectImages);
      // いいね数を取得する
      updatedLikedCount(allInsectImages);
      setIsPostsLoading(false);
    }, 500);
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
