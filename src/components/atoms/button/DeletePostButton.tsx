import React, { memo } from "react";
import { deletePosts } from "../../../urls";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  postId: number;
};

export const DeletePostButton = memo((props: Props) => {
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
        size="small"
      >
        {"削除する"}
      </Button>
    </>
  );
});
