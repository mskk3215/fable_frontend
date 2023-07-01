import { Grid } from "@mui/material";
import { useAllImages } from "../../hooks/useAllImages";
import { PostForm } from "../organisms/PostForm";

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
