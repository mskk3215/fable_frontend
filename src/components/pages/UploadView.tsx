<<<<<<< HEAD
import { Grid } from "@mui/material";
=======
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../../providers/UserProvider' was resolved... Remove this comment to see the full error message
import { UserContext } from "../../providers/UserProvider";
// @ts-expect-error TS(6142): Module '../../hooks/useAllImages' was resolved to ... Remove this comment to see the full error message
>>>>>>> e985f6b (error output by ts-migrate)
import { useAllImages } from "../../hooks/useAllImages";
// @ts-expect-error TS(6142): Module '../organisms/PostForm' was resolved to '/U... Remove this comment to see the full error message
import { PostForm } from "../organisms/PostForm";

export const UploadView = () => {
  const { handleGetPosts } = useAllImages();
  // @ts-expect-error TS(2339): Property 'loggedInStatus' does not exist on type '... Remove this comment to see the full error message
  const { loggedInStatus } = useContext(UserContext);
  const navigate = useNavigate();

  // ログインしていない場合はログインページにリダイレクト
  useEffect(() => {
    if (!loggedInStatus) {
      navigate("/login");
    }
  }, [loggedInStatus, navigate]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "50px" }}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <PostForm handleGetPosts={handleGetPosts} />
      </Grid>
    </>
  );
};
