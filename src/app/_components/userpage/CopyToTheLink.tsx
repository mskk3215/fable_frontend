import React from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../../store/atoms/errorAtom";
import { InsertLink } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";

type Props = {
  url: string;
};
export const CopyToTheLink = (props: Props) => {
  const { url } = props;
  const setMessage = useSetRecoilState(messageState);

  const handleCopyToTheLink = () => {
    navigator.clipboard.writeText(url);

    setMessage({
      message: "リンクをコピーしました。",
      type: "success",
    });
  };

  return (
    <>
      <Tooltip title="リンクをコピー" placement="right">
        <IconButton
          sx={{
            p: 0,
            m: 0,
            gap: 1,
            cursor: "pointer",
            color: "black",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={handleCopyToTheLink}
        >
          <InsertLink />
          <Typography variant="body2">リンクをコピー</Typography>
        </IconButton>
      </Tooltip>
    </>
  );
};
