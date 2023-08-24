import React, { memo } from "react";
import { deletePosts } from "../../../urls";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  postId: number;
};

export const DeleteButton = memo((props: Props) => {
  const { postId } = props;

  const handleDeleteButtonClick = async (postId: number) => {
    //サーバーに削除する投稿を送信
    await deletePosts(postId);
  };

  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleDeleteButtonClick(postId)}
        variant={"outlined"}
        color="secondary"
        style={{ minWidth: "120px" }}
      >
        {"削除する"}
      </Button>
    </>
  );
});
