import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { useAllImages } from "../../hooks/useAllImages";
import { PostForm } from "../organisms/PostForm";
import { Grid } from "@mui/material";

export const UploadView = () => {
  const { handleGetPosts } = useAllImages();
  const { loggedInStatus } = useContext(UserContext);
  const navigate = useNavigate();

  // ログインしていない場合はログインページにリダイレクト
  useEffect(() => {
    if (!loggedInStatus) {
      navigate("/login");
    }
  }, [loggedInStatus, navigate]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "50px" }}
      >
        <PostForm handleGetPosts={handleGetPosts} />
      </Grid>
    </>
  );
};
