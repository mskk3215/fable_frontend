import * as React from "react";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../../providers/UserProvider' was resolved... Remove this comment to see the full error message
import { UserContext } from "../../providers/UserProvider";
// @ts-expect-error TS(6142): Module '../../hooks/useAllImages' was resolved to ... Remove this comment to see the full error message
import { useAllImages } from "../../hooks/useAllImages";
// @ts-expect-error TS(6142): Module '../../hooks/useAllParks' was resolved to '... Remove this comment to see the full error message
import { useAllParks } from "../../hooks/useAllParks";
// @ts-expect-error TS(6142): Module '../molecules/PostItem' was resolved to '/U... Remove this comment to see the full error message
import { PostItem } from "../molecules/PostItem";
// @ts-expect-error TS(6142): Module '../organisms/PageNavigator' was resolved t... Remove this comment to see the full error message
import { PageNavigator } from "../organisms/PageNavigator";
import { paginatedPostsState } from "../../store/atoms/paginatedPostsState";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";

export const PostList = () => {
  const { posts } = useAllImages();
  const { parks } = useAllParks();
  // @ts-expect-error TS(2339): Property 'loggedInStatus' does not exist on type '... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid container spacing={0.5}>
        {paginatedPosts.map((post) => (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Grid item xs={6} sm={4} md={2.4} key={post.id}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <PostItem post={post} parks={parks} isCheckboxVisible={false} />
          </Grid>
        ))}
      </Grid>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <PageNavigator posts={posts} setPaginatedPosts={setPaginatedPosts} />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Link
        to="/postedit"
        style={{ display: "block", textAlign: "right", marginTop: 10 }}
      >
        編集ページへ
      </Link>
    </Box>
  );
};
