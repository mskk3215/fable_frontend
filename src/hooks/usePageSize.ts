import { useMediaQuery, useTheme } from "@mui/material";

export const usePageSize = () => {
  const theme = useTheme();
  const breakpoints = theme.breakpoints;

  const isXS = useMediaQuery(breakpoints.down("sm"));
  const isSMorMD = useMediaQuery(breakpoints.down("md"));
  const isLGorXL = useMediaQuery(breakpoints.up("lg"));

  let pageSize = 10;

  if (isXS) {
    pageSize = 6;
  } else if (isSMorMD) {
    pageSize = 8;
  } else if (isLGorXL) {
    pageSize = 10;
  }

  return pageSize;
};
