import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { followUserState } from "../../../store/atoms/userAtom";
import { usePosts } from "../../../hooks/usePosts";
import { Box, Tab, Tabs } from "@mui/material";
import { Post } from "../../../types/posts";

type Props = {
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const PostTab = (props: Props) => {
  const { setFilteredPosts } = props;
  const { posts } = usePosts();
  const followUser = useRecoilValue(followUserState);

  const [value, setValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //フォローしているユーザーの投稿を取得
  const followUserIds = Object.keys(followUser).map(Number);

  // 注目の投稿を取得
  // 1週間以内の投稿
  const isWithinAWeek = (post: Post) => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const postDate = new Date(post.created_at);
    return postDate > oneWeekAgo;
  };
  // いいね数の合計値を算出
  const getTotalLikes = (post: Post) => {
    return post.images.reduce((total, image) => {
      return total + image.likes_count;
    }, 0);
  };

  // タブの条件分岐
  useEffect(() => {
    if (value === 2) {
      setFilteredPosts(
        posts
          .filter((post) => isWithinAWeek(post))
          .sort((a, b) => getTotalLikes(b) - getTotalLikes(a))
      );
    } else if (value === 1) {
      setFilteredPosts(
        posts.filter((post) => followUserIds.includes(post.user_id))
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [value, posts, followUserIds]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 6,
        width: "100%",
      }}
    >
      <Tabs
        value={value}
        onChange={handleTabChange}
        sx={{
          maxWidth: 600,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tab label="新着" />
        <Tab label="フォロー" />
        <Tab label="注目" />
      </Tabs>
    </Box>
  );
};
