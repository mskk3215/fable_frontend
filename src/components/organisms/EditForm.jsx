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
import { updatePosts } from "../../urls";

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

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("post[insect_id]", insectId);
    // data.append("post[sex]", sexId);
    data.append("post[park_id]", parkId);

    alert("更新しました");

    await updatePosts(selectedIds, data).then(() => {
      setSelectedIds([]);
    });
  };

  return (
    <>
      <form onSubmit={handleUpdatePost}>
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
              <Button type="submit" color="success" variant="contained">
                保存
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained">削除</Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};
