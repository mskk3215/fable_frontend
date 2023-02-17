import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { updatePosts, deletePosts } from "../../urls";

export const EditForm = (props) => {
  const { selectedIds, setSelectedIds } = props;
  const insectNameOptions = [
    { label: "カブトムシ", id: 1 },
    { label: "ノコギリクワガタ", id: 2 },
  ];
  const sexOptions = [
    { label: "オス", id: 1 },
    { label: "メス", id: 2 },
  ];
  const parkOptions = [
    { label: "高尾山", id: 1 },
    { label: "昭和記念公園", id: 2 },
  ];

  const [insectId, setInsectId] = useState("");
  const [sexId, setSexId] = useState("");
  const [parkId, setParkId] = useState("");
  const [buttonName, setButtonName] = useState("");

  const handleUpdateDeletePost = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (buttonName === "edit") {
      data.append("image[insect_id]", insectId);
      data.append("image[park_id]", parkId);

      alert("更新しました");

      await updatePosts(selectedIds, data).then(() => {
        setSelectedIds([]);
      });
    } else if (buttonName === "delete") {
      await deletePosts(selectedIds).then(() => {
        setSelectedIds([]);
      });
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateDeletePost}>
        <Box sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
          <Box sx={{ my: 3, mx: 1 }}>
            <Typography gutterBottom variant="h6">
              昆虫名
            </Typography>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={8}>
                <Autocomplete
                  onChange={(e, value) => {
                    setInsectId(value.id);
                  }}
                  id="demo"
                  options={insectNameOptions}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="例)カブトムシ" />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  onChange={(e, value) => {
                    setSexId(value.id);
                  }}
                  id="demo"
                  options={sexOptions}
                  sx={{ width: 100 }}
                  renderInput={(params) => (
                    <TextField {...params} label="例) オス" />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ my: 3, mx: 1 }}>
            <Typography gutterBottom variant="h6">
              撮影場所
            </Typography>
            <Grid item xs={8}>
              <Autocomplete
                onChange={(e, value) => {
                  setParkId(value.id);
                }}
                id="demo"
                options={parkOptions}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="例)高尾山" />
                )}
              />
            </Grid>
          </Box>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Button
                type="submit"
                onClick={() => setButtonName("edit")}
                color="success"
                variant="contained"
              >
                保存
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                onClick={() => setButtonName("delete")}
                variant="contained"
              >
                削除
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};
