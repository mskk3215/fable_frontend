import { useState, useEffect, memo } from "react";
import { Pagination, useMediaQuery, useTheme } from "@mui/material";

export const PageNavigator = memo((props) => {
  // @ts-expect-error TS(2339): Property 'posts' does not exist on type '{}'.
  const { posts, setPaginatedPosts } = props;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  // 画面サイズによって表示する画像の数を変更する
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const isMD = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLG = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (isSM) {
      setPageSize(8);
    } else if (isMD) {
      setPageSize(12);
    } else if (isLG) {
      setPageSize(15);
    }
  }, [isSM, isMD, isLG, setPageSize]);

  // ページネーション
  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedPosts = posts.slice(start, end);
    setPaginatedPosts(paginatedPosts);
  }, [page, pageSize, posts, setPaginatedPosts]);

  const handlePageChange = (e: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Pagination
        count={Math.ceil(posts.length / pageSize)}
        page={page}
        onChange={handlePageChange}
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />
    </>
  );
});
