import { useMediaQuery, useTheme } from "@mui/material";

export const usePageSize = () => {
  // 画面サイズによって表示する画像の数を変更する
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const isMD = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLG = useMediaQuery(theme.breakpoints.up("lg"));

  let pageSize = 20;
  if (isSM) {
    pageSize = 8;
  } else if (isMD) {
    pageSize = 12;
  } else if (isLG) {
    pageSize = 15;
  }
  return pageSize;
};
