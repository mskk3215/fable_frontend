import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { paginatedPostsState } from "../../store/atoms/paginatedPostsState";
import { EditForm } from "../organisms/EditForm";
import { PostItem } from "../molecules/PostItem";
import { UserContext } from "../../providers/UserProvider";
import { useAllImages } from "../../hooks/useAllImages";
import { useAllParks } from "../../hooks/useAllParks";
import { useAllInsects } from "../../hooks/useAllInsects";
import { useAllPrefectures } from "../../hooks/useAllPrefectures";
import { PageNavigator } from "../organisms/PageNavigator";
import { Box, Divider, Grid } from "@mui/material";
import { Post } from "../../types/images";

export const PostEdit = () => {
  const { posts, handleGetPosts } = useAllImages();
  const { parks, parkOptions, handleGetParks } = useAllParks();
  const { insects, insectOptions } = useAllInsects();
  const { prefectures, prefectureOptions } = useAllPrefectures();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [isShiftDown, setIsShiftDown] = useState<boolean>(false);

  const { loggedInStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const paginatedPosts = useRecoilValue(paginatedPostsState);

  // ログインしていない場合はログインページにリダイレクト
  useEffect(() => {
    if (!loggedInStatus) {
      navigate("/login");
    }
  }, [loggedInStatus, navigate]);

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShiftDown(true);
    }
  };
  const keyupHandler = (e: KeyboardEvent) => {
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
    (id: number) => {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
          return i;
        }
      }
      return -1;
    },
    [posts]
  );

  const fill = (a: number, b: number) => {
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
    (post: Post) => {
      const index = idToIndex(post.id);
      if (index === undefined) return;

      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];

      if (!isShiftDown || lastSelectedIndex === undefined) {
        setSelectedIndexes((indexes) => [...indexes, index]);
        return;
      }
      const selectedIndexRange = fill(index, lastSelectedIndex);
      setSelectedIndexes((indexes) => [...indexes, ...selectedIndexRange]);
    },
    [isShiftDown, selectedIndexes, idToIndex]
  );

  //画像選択解除
  const handleRemove = useCallback(
    (post: Post) => {
      const selectedIndex = idToIndex(post.id);
      if (selectedIndex === undefined) return;

      if (!isShiftDown) {
        setSelectedIndexes((indexes) =>
          indexes.filter((index) => index !== selectedIndex)
        );
        return;
      }

      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];
      if (lastSelectedIndex === undefined) return;

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
      selectedIndexes.map((selectedIndexes) => posts[selectedIndexes].id)
    );
  }, [selectedIndexes, posts]);

  return (
    <div style={{ marginTop: "45px" }}>
      <Box display="flex" flexWrap="wrap">
        <Box sx={{ width: { xs: "100%", md: "80%" } }}>
          <Grid container spacing={0.5}>
            {paginatedPosts?.map((post) => (
              <Grid item xs={6} sm={4} md={2.4} key={post.id}>
                <PostItem
                  post={post}
                  handleSelect={() => {
                    handleSelect(post);
                  }}
                  handleRemove={() => {
                    handleRemove(post);
                  }}
                  checked={
                    selectedIndexes.includes(idToIndex(post.id)) &&
                    idToIndex(post.id) !== -1
                  }
                  isCheckboxVisible={true}
                  isDialogVisible={false}
                  parks={parks}
                />
              </Grid>
            ))}
          </Grid>
          <PageNavigator posts={posts} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            width: { xs: "100%", md: "15%" },
            pl: { md: 1 },
          }}
        >
          <EditForm
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            setSelectedIndexes={setSelectedIndexes}
            parkOptions={parkOptions}
            parks={parks}
            handleGetParks={handleGetParks}
            insects={insects}
            insectOptions={insectOptions}
            prefectures={prefectures}
            prefectureOptions={prefectureOptions}
            handleGetPosts={handleGetPosts}
          />
        </Box>
      </Box>
    </div>
  );
};
