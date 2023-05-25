import { memo, useEffect } from "react";
import { useState } from "react";
import { updatePosts, deletePosts } from "../../urls";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const EditForm = memo((props) => {
  const {
    selectedIds,
    setSelectedIds,
    setSelectedIndexes,
    handleGetPosts,
    parkOptions,
    parks,
    handleGetParks,
    insects,
    insectOptions,
    prefectures,
    prefectureOptions,
  } = props;

  const [insectName, setInsectName] = useState("");
  const [insectSex, setInsectSex] = useState("");
  const [prefectureName, setPrefectureName] = useState("");
  const [cityName, setCityName] = useState("");
  const [takenDate, setTakenDate] = useState("");

  const [parkName, setParkName] = useState("");
  const [buttonName, setButtonName] = useState("");

  const handleUpdateDeletePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    try {
      if (buttonName === "edit") {
        data.append("image[name]", insectName);
        data.append("image[sex]", insectSex);
        data.append("image[parkName]", parkName);
        data.append("image[cityName]", cityName);
        data.append("image[taken_at]", takenDate);

        await updatePosts(selectedIds, data).then(() => {
          alert("更新しました");
        });
      } else if (buttonName === "delete") {
        await deletePosts(selectedIds).then(() => {
          alert("削除しました");
        });
      }
      setInsectName("");
      setValue("");
      setInputValue("");
      setPrefectureName("");
      setCityName("");
      setTakenDate("");

      handleGetParks();
      handleGetPosts();
      setSelectedIds([]);
      setSelectedIndexes([]);
    } catch (error) {
      console.error(error);
    }
  };

  const getSexes = () => {
    const insectNameValue = insects.find(
      (insect) => insect.name === insectName
    );
    return insectNameValue ? insectNameValue.availableSexes : [];
  };

  const getCities = () => {
    const prefectureNameValue = prefectures.find(
      (prefecture) => prefecture.name === prefectureName
    );
    return prefectureNameValue ? prefectureNameValue.cities : [];
  };

  const handleDateChange = (date) => {
    if (date === null) return setTakenDate("");
    const formattedDate = date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    setTakenDate(formattedDate);
  };

  // 公園名の選択、入力、削除に関する処理
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 公園名をautocompleteで選択した時に都道府県名と市町村名をセットする
  //handleInputChangeParkNameでoptionsから選択した公園名とfreeSoloで入力した公園名両方取得できるが
  //optionsから公園名を選択する場合disableとしたいので、handleChangeParkNameとhandleInputChangeParkNameで分けている
  const handleChangeParkName = (e, newValue) => {
    setValue(newValue);
    setParkName(newValue?.label);
    if (newValue === null) return;
    setPrefectureName(
      parks.find((park) => park.id === newValue.id)?.prefecture_name
    );
    setCityName(parks.find((park) => park.id === newValue.id)?.city_name);
  };
  // 公園名をテキスト入力した時に都道府県名と市町村名をセットする
  const handleInputChangeParkName = (e, newInputValue) => {
    setInputValue(newInputValue);
    setParkName(newInputValue);
  };
  // 公園名を削除した時に都道府県名と市町村名を削除する
  useEffect(() => {
    if (value === null && inputValue === "") {
      setParkName("");
      setPrefectureName("");
      setCityName("");
    }
  }, [value, inputValue]);

  // 保存、削除ボタンを押せるかどうかの判定
  const noSelectedIds = selectedIds.length === 0;
  const incompleteInsectInfo = insectName !== "" && insectSex === null;
  const incompleteLocationInfo = prefectureName !== "" && cityName === "";
  const incompleteAllInfo =
    insectSex === "" && cityName === "" && takenDate === "";

  const handleEditButton = () =>
    noSelectedIds ||
    incompleteInsectInfo ||
    incompleteLocationInfo ||
    incompleteAllInfo;

  const handleDeleteButton = () => noSelectedIds;

  return (
    <>
      <form onSubmit={handleUpdateDeletePost}>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Typography sx={{ my: 3, mx: 1 }} gutterBottom variant="h6">
              昆虫名
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Grid>
                <Autocomplete
                  value={insectName || null}
                  onChange={(e, value) => {
                    setInsectName(value?.label || "");
                    setInsectSex(value?.label ? "" : "");
                  }}
                  id="insectName"
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
                  value={insectSex || null}
                  onChange={(e, value) => {
                    setInsectSex(value);
                  }}
                  id="sex"
                  options={getSexes()}
                  sx={{ width: 120 }}
                  renderInput={(params) => (
                    <TextField {...params} label="例) オス" />
                  )}
                  disabled={!insectName}
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
                id="parkName"
                sx={{ width: 350 }}
                freeSolo
                value={value}
                onChange={handleChangeParkName}
                inputValue={inputValue}
                onInputChange={handleInputChangeParkName}
                options={parkOptions}
                renderOption={(props, option) => (
                  <Box {...props}>
                    {option.label} ({option.prefecture}
                    {option.city})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="公園名" />
                )}
              />
            </Grid>
          </Box>
          <Box sx={{ width: 100 }}>
            <Grid item xs={12}>
              <Autocomplete
                value={prefectureName || null}
                onChange={(e, value) => {
                  setPrefectureName(value?.label || "");
                  setCityName(value?.label ? "" : "");
                }}
                id="prefecture"
                options={prefectureOptions}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="都道府県" />
                )}
                disabled={!!value}
              />
            </Grid>
          </Box>
          <Box sx={{ width: 100 }}>
            <Grid item xs={12}>
              <Autocomplete
                value={cityName || null}
                onChange={(e, value) => {
                  setCityName(value);
                }}
                id="city"
                options={getCities()}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="市町村名" />
                )}
                disabled={!!value || !prefectureName}
              />
            </Grid>
          </Box>
          <Divider variant="fullWidth" sx={{ my: 2 }} />
          <Box sx={{ width: 200 }}>
            <Typography sx={{ my: 3, mx: 1 }} gutterBottom variant="h6">
              撮影日
            </Typography>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={takenDate}
                  onChange={handleDateChange}
                  format="YYYY/MM/DD"
                />
              </LocalizationProvider>
            </Grid>
          </Box>
          <Box sx={{ pt: 3, display: "flex" }}>
            <Grid>
              <Button
                size="large"
                disabled={handleEditButton()}
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
                disabled={handleDeleteButton()}
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
});
