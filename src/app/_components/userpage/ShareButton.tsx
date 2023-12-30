import React from "react";
import {
  TwitterShareButton,
  LineShareButton,
  TwitterIcon,
  LineIcon,
} from "react-share";

type Props = {
  title: string;
};

const ShareButtons = (props: Props) => {
  const { title } = props;
  const url = window.location.href;

  return (
    <>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={30} />
      </TwitterShareButton>
      <LineShareButton url={url} title={title}>
        <LineIcon size={30} />
      </LineShareButton>
    </>
  );
};

export default ShareButtons;
