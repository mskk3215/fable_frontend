import { Grid } from "@mui/material";
import PostForm from "../organisms/PostForm";

export default function UploadView() {
  return (
    <>
      <Grid container direction="row" justifyContent={"center"}>
        <PostForm />
      </Grid>
    </>
  );
}
