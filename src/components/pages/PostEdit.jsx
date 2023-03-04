import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { PostItem } from "../molcules/PostItem";
import { EditForm } from "../organisms/EditForm";
import { useAllImages } from "../../hooks/useAllImages";

export default function PostEdit() {
  const { posts } = useAllImages();
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isShiftDown, setIsShiftDown] = useState(false);

  const keydownHandler = (e) => {
    if (e.key === "Shift") {
      setIsShiftDown(true);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  const keyupHandler = (e) => {
    if (e.key === "Shift") {
      setIsShiftDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", keyupHandler);
    return () => {
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  const idToIndex = (id) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        return i;
      }
    }
  };
  const fill = (a, b) => {
    const array = [];
    const start = Math.min(a, b);
    const last = Math.max(a, b);
    for (let i = start + 1; i <= last; i++) {
      array.push(i);
    }
    return array;
  };

  return (
    <>
      <Grid container direction="row" sx={{ margin: "0 0 0 10px" }}>
        <Grid item xs={10}>
          {posts?.map((post) => {
            return (
              <PostItem
                key={post.id}
                post={post}
                handleSelect={() => {
                  if (isShiftDown) {
                    const lastSelectedIndex =
                      selectedIndexes[selectedIndexes.length - 1];
                    const selectedIndex = idToIndex(post.id);
                    setSelectedIndexes((indexes) => [
                      ...indexes,
                      ...fill(selectedIndex, lastSelectedIndex),
                    ]);
                  } else {
                    setSelectedIndexes((indexes) => [
                      ...indexes,
                      idToIndex(post.id),
                    ]);
                  }
                }}
                handleRemove={() => {
                  if (isShiftDown) {
                    const lastSelectedIndex =
                      selectedIndexes[selectedIndexes.length - 1];
                    const selectedIndex = idToIndex(post.id);
                    setSelectedIndexes((indexes) =>
                      indexes.filter((index) =>
                        fill(selectedIndex, lastSelectedIndex).includes(index)
                      )
                    );
                  } else {
                    setSelectedIndexes((indexes) =>
                      indexes.filter((index) => index !== idToIndex(post.id))
                    );
                  }
                }}
                checked={selectedIndexes.includes(idToIndex(post.id))}
                isCheckboxVisible={true}
              />
            );
          })}
        </Grid>
        <Grid item xs={2}>
          <EditForm selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </Grid>
      </Grid>
    </>
  );
}
