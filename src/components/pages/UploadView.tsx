<<<<<<< HEAD
<<<<<<< HEAD
import { Grid } from "@mui/material";
=======
import { useContext, useEffect } from "react";
=======
import React, { useContext, useEffect } from "react";
>>>>>>> c5e0d1f (type definitions add to post-related components)
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
<<<<<<< HEAD
// @ts-expect-error TS(6142): Module '../../hooks/useAllImages' was resolved to ... Remove this comment to see the full error message
>>>>>>> e985f6b (error output by ts-migrate)
import { useAllImages } from "../../hooks/useAllImages";
// @ts-expect-error TS(6142): Module '../organisms/PostForm' was resolved to '/U... Remove this comment to see the full error message
=======
>>>>>>> c5e0d1f (type definitions add to post-related components)
import { PostForm } from "../organisms/PostForm";

export const UploadView = () => {
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
        <PostForm />
      </Grid>
    </>
  );
};
