import React from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../../store/atoms/errorAtom";
import { InsertLink } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

export const CopyToTheLink = () => {
  const setMessage = useSetRecoilState(messageState);

  const handleCopyToTheLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);

    setMessage({
      message: "リンクをコピーしました。",
      type: "success",
    });
  };

  return (
    <>
      <Tooltip title="リンクをコピー" placement="right">
        <Button
          sx={{
            position: "absolute",
            top: 50,
            right: -75,
            cursor: "pointer",
            textDecoration: "none",
            color: "black",
            "&:hover": {
              backgroundColor: "transparent !important",
            },
          }}
          onClick={handleCopyToTheLink}
        >
          <InsertLink />
        </Button>
      </Tooltip>
    </>
  );
};
