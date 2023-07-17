import { memo, useEffect, useState } from "react";
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
    // @ts-expect-error TS(2339): Property 'selectedIds' does not exist on type '{}'... Remove this comment to see the full error message
    selectedIds,
    // @ts-expect-error TS(2339): Property 'setSelectedIds' does not exist on type '... Remove this comment to see the full error message
    setSelectedIds,
    // @ts-expect-error TS(2339): Property 'setSelectedIndexes' does not exist on ty... Remove this comment to see the full error message
    setSelectedIndexes,
    // @ts-expect-error TS(2339): Property 'handleGetPosts' does not exist on type '... Remove this comment to see the full error message
    handleGetPosts,
    // @ts-expect-error TS(2339): Property 'parkOptions' does not exist on type '{}'... Remove this comment to see the full error message
    parkOptions,
    // @ts-expect-error TS(2339): Property 'parks' does not exist on type '{}'.
    parks,
    // @ts-expect-error TS(2339): Property 'handleGetParks' does not exist on type '... Remove this comment to see the full error message
    handleGetParks,
    // @ts-expect-error TS(2339): Property 'insects' does not exist on type '{}'.
    insects,
    // @ts-expect-error TS(2339): Property 'insectOptions' does not exist on type '{... Remove this comment to see the full error message
    insectOptions,
    // @ts-expect-error TS(2339): Property 'prefectures' does not exist on type '{}'... Remove this comment to see the full error message
    prefectures,
    // @ts-expect-error TS(2339): Property 'prefectureOptions' does not exist on typ... Remove this comment to see the full error message
    prefectureOptions,
  } = props;

  const [insectName, setInsectName] = useState("");
  const [insectSex, setInsectSex] = useState("");
  const [prefectureName, setPrefectureName] = useState("");
  const [cityName, setCityName] = useState("");
  const [takenDate, setTakenDate] = useState("");

  const [parkName, setParkName] = useState("");
  const [buttonName, setButtonName] = useState("");

  const handleUpdateDeletePost = async (e: any) => {
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
      (insect: any) => insect.name === insectName
    );
    return insectNameValue ? insectNameValue.availableSexes : [];
  };

  const getCities = () => {
    const prefectureNameValue = prefectures.find(
      (prefecture: any) => prefecture.name === prefectureName
    );
    return prefectureNameValue ? prefectureNameValue.cities : [];
  };

  const handleDateChange = (date: any) => {
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
  const handleChangeParkName = (e: any, newValue: any) => {
    setValue(newValue);
    setParkName(newValue?.label);
    if (newValue === null) return;
    setPrefectureName(
      parks.find((park: any) => park.id === newValue.id)?.prefecture_name
    );
    setCityName(parks.find((park: any) => park.id === newValue.id)?.city_name);
  };
  // 公園名をテキスト入力した時に都道府県名と市町村名をセットする
  const handleInputChangeParkName = (e: any, newInputValue: any) => {
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

  const handleFormSize = () => {
    if (window.innerWidth >= 576) {
      return "middle";
    } else {
      return "small";
    }
  };
  const handleVariantSize = () => {
    if (window.innerWidth >= 576) {
      return "h6";
    } else {
      return "body1";
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <form onSubmit={handleUpdateDeletePost}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box sx={{ width: "100%" }}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Typography
              sx={{ my: { xs: 1, md: 3 }, mx: 1 }}
              gutterBottom
              variant={handleVariantSize()}
            >
              昆虫名
            </Typography>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{ display: "flex" }}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Grid>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Autocomplete
                  value={insectName || null}
                  onChange={(e, value) => {
                    // @ts-expect-error TS(2339): Property 'label' does not exist on type 'string'.
                    setInsectName(value?.label || "");
                    // @ts-expect-error TS(2339): Property 'label' does not exist on type 'string'.
                    setInsectSex(value?.label ? "" : "");
                  }}
                  id="insectName"
                  // @ts-expect-error TS(2322): Type '"middle" | "small"' is not assignable to typ... Remove this comment to see the full error message
                  size={handleFormSize()}
                  options={insectOptions}
                  sx={{
                    width: { xs: 220, md: 250 }, // 画面サイズによって変更
                  }}
                  renderInput={(params) => (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <TextField {...params} label="例)カブトムシ" />
                  )}
                />
              </Grid>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Grid item xs={1} />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Grid item xs={4}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Autocomplete
                  value={insectSex || null}
                  onChange={(e, value) => {
                    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
                    setInsectSex(value);
                  }}
                  id="sex"
                  // @ts-expect-error TS(2322): Type '"middle" | "small"' is not assignable to typ... Remove this comment to see the full error message
                  size={handleFormSize()}
                  options={getSexes()}
                  sx={{ width: 120 }} // 画面サイズによって変更
                  renderInput={(params) => (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <TextField {...params} label="例) オス" />
                  )}
                  disabled={!insectName}
                />
              </Grid>
            </Box>
          </Box>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Divider variant="fullWidth" sx={{ my: { xs: 1, md: 2 } }} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ width: 100 }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Typography
              sx={{ my: { xs: 1, md: 3 }, mx: 1 }}
              gutterBottom
              variant={handleVariantSize()}
            >
              撮影場所
            </Typography>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid item xs={12}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Autocomplete
                id="parkName"
                // @ts-expect-error TS(2322): Type '"middle" | "small"' is not assignable to typ... Remove this comment to see the full error message
                size={handleFormSize()}
                sx={{ width: { xs: 300, md: 350 } }}
                freeSolo
                value={value}
                onChange={handleChangeParkName}
                inputValue={inputValue}
                onInputChange={handleInputChangeParkName}
                options={parkOptions}
                renderOption={(props, option) => (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Box {...props}>
                    // @ts-expect-error TS(2339): Property 'label' does not exist on type 'string'.
                    {option.label} ({option.prefecture}
                    // @ts-expect-error TS(2339): Property 'city' does not exist on type 'string'.
                    {option.city})
                  </Box>
                )}
                renderInput={(params) => (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <TextField {...params} label="公園名" />
                )}
              />
            </Grid>
          </Box>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ width: 100 }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid item xs={12}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Autocomplete
                value={prefectureName || null}
                onChange={(e, value) => {
                  // @ts-expect-error TS(2339): Property 'label' does not exist on type 'string'.
                  setPrefectureName(value?.label || "");
                  // @ts-expect-error TS(2339): Property 'label' does not exist on type 'string'.
                  setCityName(value?.label ? "" : "");
                }}
                id="prefecture"
                // @ts-expect-error TS(2322): Type '"middle" | "small"' is not assignable to typ... Remove this comment to see the full error message
                size={handleFormSize()}
                options={prefectureOptions}
                sx={{ width: { xs: 150, md: 200 } }}
                renderInput={(params) => (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <TextField {...params} label="都道府県" />
                )}
                disabled={!!value}
              />
            </Grid>
          </Box>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ width: 100 }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid item xs={12}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Autocomplete
                value={cityName || null}
                onChange={(e, value) => {
                  // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
                  setCityName(value);
                }}
                id="city"
                // @ts-expect-error TS(2322): Type '"middle" | "small"' is not assignable to typ... Remove this comment to see the full error message
                size={handleFormSize()}
                options={getCities()}
                sx={{ width: { xs: 150, md: 200 } }}
                renderInput={(params) => (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <TextField {...params} label="市町村名" />
                )}
                disabled={!!value || !prefectureName}
              />
            </Grid>
          </Box>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Divider variant="fullWidth" sx={{ my: { xs: 1, md: 2 } }} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ width: 200 }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Typography
              sx={{ my: { xs: 1, md: 3 }, mx: 1 }}
              gutterBottom
              variant={handleVariantSize()}
            >
              撮影日
            </Typography>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid item xs={12}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <DatePicker
                  value={takenDate}
                  onChange={handleDateChange}
                  format="YYYY/MM/DD"
                  sx={{
                    width: { xs: 150, md: 200 },
                  }}
                  // @ts-expect-error TS(2322): Type '"middle" | "small"' is not assignable to typ... Remove this comment to see the full error message
                  slotProps={{ textField: { size: handleFormSize() } }}
                />
              </LocalizationProvider>
            </Grid>
          </Box>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ pt: { xs: 1, md: 3 }, display: "flex" }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Button
                // @ts-expect-error TS(2769): No overload matches this call.
                size={handleFormSize()}
                disabled={handleEditButton()}
                type="submit"
                onClick={() => setButtonName("edit")}
                color="success"
                variant="contained"
              >
                保存
              </Button>
            </Grid>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid sx={{ pl: 2 }}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Button
                // @ts-expect-error TS(2769): No overload matches this call.
                size={handleFormSize()}
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
