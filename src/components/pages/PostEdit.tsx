import { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { paginatedPostsState } from "../../store/atoms/paginatedPostsState";
// @ts-expect-error TS(6142): Module '../organisms/EditForm' was resolved to '/U... Remove this comment to see the full error message
import { EditForm } from "../organisms/EditForm";
// @ts-expect-error TS(6142): Module '../molecules/PostItem' was resolved to '/U... Remove this comment to see the full error message
import { PostItem } from "../molecules/PostItem";
// @ts-expect-error TS(6142): Module '../../providers/UserProvider' was resolved... Remove this comment to see the full error message
import { UserContext } from "../../providers/UserProvider";
// @ts-expect-error TS(6142): Module '../../hooks/useAllImages' was resolved to ... Remove this comment to see the full error message
import { useAllImages } from "../../hooks/useAllImages";
// @ts-expect-error TS(6142): Module '../../hooks/useAllParks' was resolved to '... Remove this comment to see the full error message
import { useAllParks } from "../../hooks/useAllParks";
// @ts-expect-error TS(6142): Module '../../hooks/useAllInsects' was resolved to... Remove this comment to see the full error message
import { useAllInsects } from "../../hooks/useAllInsects";
// @ts-expect-error TS(6142): Module '../../hooks/useAllPrefectures' was resolve... Remove this comment to see the full error message
import { useAllPrefectures } from "../../hooks/useAllPrefectures";
// @ts-expect-error TS(6142): Module '../organisms/PageNavigator' was resolved t... Remove this comment to see the full error message
import { PageNavigator } from "../organisms/PageNavigator";
import { Box, Divider, Grid } from "@mui/material";

export const PostEdit = () => {
  const { posts, handleGetPosts } = useAllImages();
  const { parks, parkOptions, handleGetParks } = useAllParks();
  const { insects, insectOptions } = useAllInsects();
  const { prefectures, prefectureOptions } = useAllPrefectures();
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isShiftDown, setIsShiftDown] = useState(false);
  // @ts-expect-error TS(2339): Property 'loggedInStatus' does not exist on type '... Remove this comment to see the full error message
  const { loggedInStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [paginatedPosts, setPaginatedPosts] =
    useRecoilState(paginatedPostsState);

  // ログインしていない場合はログインページにリダイレクト
  useEffect(() => {
    if (!loggedInStatus) {
      navigate("/login");
    }
  }, [loggedInStatus, navigate]);

  const keydownHandler = (e: any) => {
    if (e.key === "Shift") {
      setIsShiftDown(true);
    }
  };
  const keyupHandler = (e: any) => {
    if (e.key === "Shift") {
      setIsShiftDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  const idToIndex = useCallback(
    (id: any) => {
      for (let i = 0; i < posts.length; i++) {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        if (posts[i].id === id) {
          return i;
        }
      }
    },
    [posts]
  );

  const fill = (a: any, b: any) => {
    const array = [];
    const start = Math.min(a, b);
    const last = Math.max(a, b);
    for (let i = start; i <= last; i++) {
      array.push(i);
    }
    return array;
  };

  //画像選択追加
  const handleSelect = useCallback(
    (post: any) => {
      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];

      if (!isShiftDown || lastSelectedIndex === undefined) {
        // @ts-expect-error TS(2345): Argument of type '(indexes: never[]) => (number | ... Remove this comment to see the full error message
        setSelectedIndexes((indexes) => [...indexes, idToIndex(post.id)]);
        return;
      }
      const selectedIndex = idToIndex(post.id);
      const selectedIndexRange = fill(selectedIndex, lastSelectedIndex);
      // @ts-expect-error TS(2345): Argument of type '(indexes: never[]) => number[]' ... Remove this comment to see the full error message
      setSelectedIndexes((indexes) => [...indexes, ...selectedIndexRange]);
    },
    [isShiftDown, selectedIndexes, idToIndex]
  );

  //画像選択解除
  const handleRemove = useCallback(
    (post: any) => {
      if (!isShiftDown) {
        setSelectedIndexes((indexes) =>
          indexes.filter((index) => index !== idToIndex(post.id))
        );
        return;
      }

      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];
      const selectedIndex = idToIndex(post.id);
      const selectedIndexRange = fill(selectedIndex, lastSelectedIndex);

      setSelectedIndexes((indexes) =>
        indexes.filter((index) => !selectedIndexRange.includes(index))
      );
    },
    [isShiftDown, selectedIndexes, idToIndex]
  );

  //selectedIndexesの内容をselectedIdsにする
  useEffect(() => {
    setSelectedIds(
      // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
      selectedIndexes.map((selectedIndexes) => posts[selectedIndexes].id)
    );
  }, [selectedIndexes, posts]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div style={{ marginTop: "45px" }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box display="flex" flexWrap="wrap">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box sx={{ width: { xs: "100%", md: "80%" } }}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Grid container spacing={0.5}>
            {paginatedPosts?.map((post) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Grid item xs={6} sm={4} md={2.4} key={post.id}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <PostItem
                  // @ts-expect-error TS(2322): Type '{ post: never; handleSelect: () => void; han... Remove this comment to see the full error message
                  post={post}
                  handleSelect={() => {
                    handleSelect(post);
                  }}
                  handleRemove={() => {
                    handleRemove(post);
                  }}
                  // @ts-expect-error TS(2345): Argument of type 'number | undefined' is not assig... Remove this comment to see the full error message
                  checked={selectedIndexes.includes(idToIndex(post.id))}
                  isCheckboxVisible={true}
                  parks={parks}
                />
              </Grid>
            ))}
          </Grid>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <PageNavigator posts={posts} setPaginatedPosts={setPaginatedPosts} />
        </Box>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Divider orientation="vertical" flexItem />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box
          sx={{
            width: { xs: "100%", md: "15%" },
            pl: { md: 1 },
          }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditForm
            // @ts-expect-error TS(2322): Type '{ selectedIds: never[]; setSelectedIds: Disp... Remove this comment to see the full error message
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            setSelectedIndexes={setSelectedIndexes}
            handleGetPosts={handleGetPosts}
            parkOptions={parkOptions}
            parks={parks}
            handleGetParks={handleGetParks}
            insects={insects}
            insectOptions={insectOptions}
            prefectures={prefectures}
            prefectureOptions={prefectureOptions}
          />
        </Box>
      </Box>
    </div>
  );
};
