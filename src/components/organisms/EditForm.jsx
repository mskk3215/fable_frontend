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
import { useAllInsects } from "../../hooks/useAllInsects";
import { useAllParks } from "../../hooks/useAllParks";
import { updatePosts, deletePosts } from "../../urls";

export const EditForm = (props) => {
  const { selectedIds, setSelectedIds } = props;
  const { insects, insectOptions } = useAllInsects();
  const { parkOptions } = useAllParks();
  const [insectName, setInsectName] = useState("");
  const [insectSex, setInsectSex] = useState("");

  const [parkId, setParkId] = useState("");
  const [buttonName, setButtonName] = useState("");

  const handleUpdateDeletePost = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (buttonName === "edit") {
      data.append("image[name]", insectName);
      data.append("image[sex]", insectSex);
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

  const getSexes = () => {
    if (!insectName) {
      return [];
    }
    const insectNameValue = insects.find(
      (insect) => insect.name === insectName
    );
    return insectNameValue ? insectNameValue.availableSexes : [];
  };

  return (
    <>
      <form onSubmit={handleUpdateDeletePost}>
        <Box sx={{ width: "100%", pl: 2 }}>
          <Box>
            <Typography sx={{ my: 3, mx: 1 }} gutterBottom variant="h6">
              昆虫名
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Grid>
                <Autocomplete
                  onChange={(e, value) => {
                    setInsectName(value.label);
                  }}
                  id="demo"
                  options={insectOptions}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="例)カブトムシ" />
                  )}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4}>
                <Autocomplete
                  onChange={(e, value) => {
                    setInsectSex(value);
                  }}
                  id="demo"
                  options={getSexes()}
                  getOptionLabel={(option) => option}
                  sx={{ width: 120 }}
                  renderInput={(params) => (
                    <TextField {...params} label="例) オス" />
                  )}
                />
              </Grid>
            </Box>
          </Box>
          <Divider variant="fullWidth" sx={{ my: 2 }} />
          <Box sx={{ width: 100 }}>
            <Typography sx={{ my: 3, mx: 1 }} gutterBottom variant="h6">
              撮影場所
            </Typography>
            <Grid item xs={12}>
              <Autocomplete
                onChange={(e, value) => {
                  setParkId(value.id);
                }}
                id="demo"
                options={parkOptions}
                sx={{ width: 410 }}
                renderInput={(params) => (
                  <TextField {...params} label="例)高尾山" />
                )}
              />
            </Grid>
          </Box>
          <Box sx={{ pt: 3, display: "flex" }}>
            <Grid>
              <Button
                size="large"
                disabled={selectedIds.length === 0}
                type="submit"
                onClick={() => setButtonName("edit")}
                color="success"
                variant="contained"
              >
                保存
              </Button>
            </Grid>
            <Grid sx={{ pl: 2 }}>
              <Button
                size="large"
                disabled={selectedIds.length === 0}
                type="submit"
                onClick={() => setButtonName("delete")}
                variant="contained"
              >
                削除
              </Button>
            </Grid>
          </Box>
        </Box>
      </form>
    </>
  );
};
