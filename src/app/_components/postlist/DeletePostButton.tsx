"use client";

import React, { memo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../../store/atoms/errorAtom";
import { useErrorAction } from "../../../hooks/error/useErrorAction";
import { deletePosts } from "../../../urls";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ApiError } from "../../../types/api";
import { Post } from "../../../types/posts";

type Props = {
  postId: number;
  handleGetPosts: () => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const DeletePostButton = memo((props: Props) => {
  const { postId, handleGetPosts, setPosts } = props;

  const setMessage = useSetRecoilState(messageState);
  const { handleGeneralErrorAction } = useErrorAction();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteButtonClick = async (postId: number) => {
    setIsLoading(true);

    //サーバーに削除する投稿を送信
    await deletePosts(postId)
      .then((response) => {
        if (response.data.status === "deleted") {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
          setMessage({ message: "削除しました", type: "success" });
          handleGetPosts();
        }
      })
      .catch((error: ApiError) => {
        handleGeneralErrorAction(error, setMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleDeleteButtonClick(postId)}
        variant={"outlined"}
        color="secondary"
        size="small"
        disabled={isLoading}
      >
        {"削除する"}
      </Button>
    </>
  );
});
DeletePostButton.displayName = "DeletePostButton";
