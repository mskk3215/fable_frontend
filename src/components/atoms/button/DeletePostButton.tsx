import React, { memo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../../store/atoms/errorAtom";
import { deletePosts } from "../../../urls";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  postId: number;
};

export const DeletePostButton = memo((props: Props) => {
  const { postId } = props;

  const setMessage = useSetRecoilState(messageState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteButtonClick = async (postId: number) => {
    setIsLoading(true);

    //サーバーに削除する投稿を送信
    await deletePosts(postId)
      .then((response) => {
        if (response.data.status === "deleted") {
          setMessage("削除しました");
        }
      })
      .catch((error) => {
        if (!error.response || error.response.status >= 500) {
          setMessage(
            "ネットワークエラーが発生しました。しばらくしてから再試行してください。"
          );
        } else {
          setMessage(error.response.data.error_messages);
        }
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
