import React from "react";
import { Button } from "@mui/material";

type Props = {
  isFollowed: boolean;
  handleFollowButtonClick: (userId?: number) => void;
};

export const FollowButton = (props: Props) => {
  const { isFollowed, handleFollowButtonClick } = props;
  return (
    <>
      <Button
        onClick={() => handleFollowButtonClick()}
        variant={isFollowed ? "outlined" : "contained"}
        color="primary"
        style={{ minWidth: "120px" }}
      >
        {isFollowed ? "フォロー中" : "フォローする"}
      </Button>
    </>
  );
};
