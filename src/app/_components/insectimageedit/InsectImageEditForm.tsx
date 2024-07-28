"use client";

import React, { FormEvent, memo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../../store/atoms/errorAtom";
import { useErrorAction } from "../../../hooks/error/useErrorAction";
import { convertHiraganaToKatakana } from "../../../hooks/useConvertHiraganaToKatakana";
import {
  updateCollectedInsectImages,
  deleteCollectedInsectImages,
} from "../../../urls";
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
import { Park, ParkOption } from "../../../types/parks";
import { Prefecture, PrefectureOption } from "../../../types/prefectures";
import dayjs, { Dayjs } from "dayjs";
import { HandleGetImages, Image } from "../../../types/images";
import { ApiError } from "../../../types/api";

type Props = {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  handleGetParks: () => void;
  parkOptions: ParkOption[];
  parks: Park[];
  insectOptions: string[];
  prefectureOptions: PrefectureOption[];
  prefectures: Prefecture[];
  handleGetImages: HandleGetImages;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  pageSize: number;
  setQueryWord: (queryWord: string) => void;
};

export const InsectImageEditForm = memo((props: Props) => {
  const {
    selectedIds,
    setSelectedIds,
    handleGetParks,
    parkOptions,
    parks,
    insectOptions,
    prefectures,
    prefectureOptions,
    handleGetImages,
    setImages,
    pageSize,
    setQueryWord,
  } = props;

  const [insectName, setInsectName] = useState("");
  const [insectSex, setInsectSex] = useState("");
  const [prefectureName, setPrefectureName] = useState("");
  const [cityName, setCityName] = useState("");
  const [takenDate, setTakenDate] = useState<Dayjs | null>(null);
  const [parkName, setParkName] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setMessage = useSetRecoilState(messageState);
  const { handleGeneralErrorAction } = useErrorAction();

  const handleUpdateDeleteImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (buttonName === "edit") {
      updateCollectedInsectImages({
        id: selectedIds,
        collectedInsect: {
          name: insectName,
          sex: insectSex,
          parkName,
          cityName,
          takenDateTime: takenDate ? takenDate.format() : "",
        },
      })
        .then(() => {
          handleGetParks();
          handleGetImages(pageSize, undefined);
          setMessage({ message: "更新しました", type: "success" });
        })
        .catch((error: ApiError) => handleGeneralErrorAction(error, setMessage))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (buttonName === "delete") {
      await deleteCollectedInsectImages(selectedIds)
        .then((response) => {
          if (response.data.status === "deleted") {
            setImages((prevImages) =>
              prevImages.filter((image) => !selectedIds.includes(image.id))
            );
            setMessage({ message: "削除しました", type: "success" });
          }
        })
        .catch((error: ApiError) => handleGeneralErrorAction(error, setMessage))
        .finally(() => {
          setIsLoading(false);
        });
    }

    setInsectName("");
    setInsectSex("");
    setValue("");
    setInputValue("");
    setParkName("");
    setPrefectureName("");
    setCityName("");
    setTakenDate(null);
    setSelectedIds([]);
  };

  const sexOptions = ["オス", "メス"];

  const getCities = () => {
    const prefectureNameValue = prefectures.find(
      (prefecture: Prefecture) => prefecture.name === prefectureName
    );
    return prefectureNameValue ? prefectureNameValue.cities : [];
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date === null) return setTakenDate(null);
    const formattedDate = date.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    setTakenDate(dayjs(formattedDate));
  };

  // 公園名の選択、入力、削除に関する処理
  const [value, setValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  // 公園名をautocompleteで選択した時に都道府県名と市町村名をセットする
  //handleInputChangeParkNameでoptionsから選択した公園名とfreeSoloで入力した公園名両方取得できるが
  //optionsから公園名を選択する場合disableとしたいので、handleChangeParkNameとhandleInputChangeParkNameで分けている
  const handleChangeParkName = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: string | ParkOption | null
  ) => {
    if (typeof newValue === "string") return;
    if (newValue) {
      setValue(newValue.label);
      setParkName(newValue?.label);
      if (newValue === null) return;
      setPrefectureName(
        parks.find((park: Park) => park.id === newValue.id)?.prefectureName ||
          ""
      );
      setCityName(
        parks.find((park: Park) => park.id === newValue.id)?.cityName || ""
      );
    } else {
      setValue("");
      setParkName("");
      setPrefectureName("");
      setCityName("");
    }
  };
  // 公園名をテキスト入力した時に都道府県名と市町村名をセットする
  const handleInputChangeParkName = (
    e: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    setParkName(newInputValue);

    // 公園名を削除した時に都道府県名と市町村名を削除する
    if (newInputValue === "") {
      setPrefectureName("");
      setCityName("");
    }
  };
  // 都道府県名を選択した時に市町村名をセットする
  const handleChangePrefectureName = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: PrefectureOption | null
  ) => {
    if (newValue) {
      setPrefectureName(newValue.label);
    } else {
      setPrefectureName("");
      setCityName("");
    }
  };

  // 保存、削除ボタンが無効になる条件
  const isSelectedIdsEmpty = selectedIds.length === 0;
  const isInsectInfoNotFilled = insectName !== "" && insectSex === "";
  const isLocationInfoPartiallyFilled =
    prefectureName !== "" && cityName === "";
  const isAllInfoNotFilled =
    insectSex === "" && cityName === "" && takenDate === null;

  const handleEditButton = () =>
    isSelectedIdsEmpty ||
    isInsectInfoNotFilled ||
    isLocationInfoPartiallyFilled ||
    isAllInfoNotFilled;

  const handleDeleteButton = () => isSelectedIdsEmpty;

  const handleFormSize = () => {
    if (window.innerWidth >= 576) {
      return "medium";
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
    <>
      <form onSubmit={handleUpdateDeleteImage}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ my: { xs: 1, md: 1 }, mx: 1 }}
              gutterBottom
              variant={handleVariantSize()}
            >
              昆虫名
            </Typography>
            <Autocomplete
              value={insectName ? insectName : null}
              onChange={(e, value) => {
                setInsectName(value || "");
                setInsectSex(value ? "" : "");
              }}
              onInputChange={(e, newInputValue) => {
                const convertedInputValue =
                  convertHiraganaToKatakana(newInputValue);
                setQueryWord(convertedInputValue);
              }}
              id="insectName"
              size={handleFormSize()}
              sx={{ maxWidth: 400 }}
              options={insectOptions}
              noOptionsText="昆虫名を入力してください"
              filterOptions={(options, params) => {
                const filtered = options.filter((option) => {
                  const inputValue = convertHiraganaToKatakana(
                    params.inputValue
                  );
                  return option.includes(inputValue);
                });
                return filtered;
              }}
              renderInput={(params) => (
                <TextField {...params} label="例)カブトムシ" />
              )}
            />
            <Autocomplete
              value={insectSex || null}
              onChange={(e, value) => {
                if (value !== null) {
                  setInsectSex(value);
                }
              }}
              id="sex"
              size={handleFormSize()}
              options={sexOptions}
              renderInput={(params) => (
                <TextField {...params} label="例) オス" />
              )}
              disabled={!insectName}
              sx={{ maxWidth: 150, pt: 1 }}
            />
          </Box>
          <Divider variant="fullWidth" sx={{ my: { xs: 1, md: 2 } }} />
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{ my: { xs: 1, md: 3 }, mx: 1 }}
              gutterBottom
              variant={handleVariantSize()}
            >
              撮影場所
            </Typography>
            <Grid item xs={12}>
              <Autocomplete
                id="parkName"
                size={handleFormSize()}
                sx={{ maxWidth: 400 }}
                freeSolo
                value={value}
                onChange={handleChangeParkName}
                inputValue={inputValue}
                onInputChange={handleInputChangeParkName}
                options={parkOptions}
                renderOption={(props, option) => (
                  <Box
                    {...(props as {
                      [key: string]: React.HtmlHTMLAttributes<HTMLElement>;
                    })}
                  >
                    {option.label} ({option.prefecture} {option.city})
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
                value={
                  prefectureName !== ""
                    ? { label: prefectureName, value: prefectureName }
                    : null
                }
                onChange={handleChangePrefectureName}
                id="prefecture"
                size={handleFormSize()}
                options={prefectureOptions}
                sx={{ width: { xs: 150, md: 200 }, pt: 1 }}
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
                  if (value !== null) {
                    setCityName(value);
                  }
                }}
                id="city"
                size={handleFormSize()}
                options={getCities()}
                sx={{ width: { xs: 150, md: 200 }, pt: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="市町村名" />
                )}
                disabled={!!value || !prefectureName}
              />
            </Grid>
          </Box>
          <Divider variant="fullWidth" sx={{ my: { xs: 1, md: 2 } }} />
          <Box sx={{ width: 200 }}>
            <Typography
              sx={{ my: { xs: 1, md: 3 }, mx: 1 }}
              gutterBottom
              variant={handleVariantSize()}
            >
              撮影日
            </Typography>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={takenDate}
                  onChange={handleDateChange}
                  format="YYYY/MM/DD"
                  sx={{
                    width: { xs: 150, md: 200 },
                  }}
                  slotProps={{
                    textField: { size: handleFormSize() },
                    actionBar: { actions: ["clear"] },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Box>
          <Box sx={{ pt: { xs: 1, md: 3 }, display: "flex" }}>
            <Grid>
              <Button
                size={handleFormSize()}
                disabled={handleEditButton() || isLoading}
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
                size={handleFormSize()}
                disabled={handleDeleteButton() || isLoading}
                type="submit"
                onClick={() => setButtonName("delete")}
                variant="contained"
                sx={{
                  backgroundColor: "#2b3d51",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#2b3d51",
                    opacity: 0.7,
                  },
                }}
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
InsectImageEditForm.displayName = "InsectImageEditForm";
