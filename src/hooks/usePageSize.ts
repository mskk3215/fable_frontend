import { useMediaQuery, useTheme } from "@mui/material";

export const usePageSize = () => {
  // 画面サイズによって表示する画像の数を変更する
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const isMD = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLG = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXL = useMediaQuery(theme.breakpoints.up("xl"));

  let pageSize = 20;
  if (isXS) {
    pageSize = 6;
  } else if (isSM) {
    pageSize = 8;
  } else if (isMD) {
    pageSize = 12;
  } else if (isLG) {
    pageSize = 15;
  } else if (isXL) {
    pageSize = 20;
  }
  return pageSize;
};
