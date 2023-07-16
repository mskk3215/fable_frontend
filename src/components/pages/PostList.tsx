import * as React from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { paginatedPostsState } from "../../store/atoms/paginatedPostsState";
import { useAllImages } from "../../hooks/useAllImages";
import { useAllParks } from "../../hooks/useAllParks";
import { PostItem } from "../molecules/PostItem";
import { PageNavigator } from "../organisms/PageNavigator";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";

export const PostList = () => {
  const { posts } = useAllImages();
  const { parks } = useAllParks();
  const { loggedInStatus } = useContext(UserContext);
  const navigate = useNavigate();

  const [paginatedPosts, setPaginatedPosts] =
    useRecoilState(paginatedPostsState);

  // ログインしていない場合はログインページにリダイレクト
  useEffect(() => {
    if (!loggedInStatus) {
      navigate("/login");
    }
  }, [loggedInStatus, navigate]);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
      <Grid container spacing={0.5}>
        {paginatedPosts.map((post) => (
          <Grid item xs={6} sm={4} md={2.4} key={post.id}>
            <PostItem post={post} parks={parks} isCheckboxVisible={false} />
          </Grid>
        ))}
      </Grid>
      <PageNavigator posts={posts} setPaginatedPosts={setPaginatedPosts} />
      <Link
        to="/postedit"
        style={{ display: "block", textAlign: "right", marginTop: 10 }}
      >
        編集ページへ
      </Link>
    </Box>
  );
};
