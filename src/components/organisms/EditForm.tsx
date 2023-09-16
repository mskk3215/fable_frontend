import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useEffect,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { useErrorAction } from "../../hooks/error/useErrorAction";
import { updateImages, deleteImages } from "../../urls";
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
import { Insect, InsectOption } from "../../types/insects";
import { Park, ParkOption } from "../../types/parks";
import { Prefecture, PrefectureOption } from "../../types/prefectures";
import dayjs, { Dayjs } from "dayjs";
import { HandleGetImages, Image } from "../../types/images";
import { ApiError } from "../../types/api";

type Props = {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  setSelectedIndexes: (indexes: number[]) => void;
  handleGetParks: () => void;
  parkOptions: ParkOption[];
  parks: Park[];
  insectOptions: InsectOption[];
  insects: Insect[];
  prefectureOptions: PrefectureOption[];
  prefectures: Prefecture[];
  handleGetImages: HandleGetImages;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
};

export const EditForm = memo((props: Props) => {
  const {
    selectedIds,
    setSelectedIds,
    setSelectedIndexes,
    handleGetParks,
    parkOptions,
    parks,
    insects,
    insectOptions,
    prefectures,
    prefectureOptions,
    handleGetImages,
    setImages,
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

    const data = new FormData();
    if (buttonName === "edit") {
      data.append("image[name]", insectName);
      data.append("image[sex]", insectSex);
      data.append("image[parkName]", parkName);
      data.append("image[cityName]", cityName);
      data.append("image[taken_at]", takenDate ? takenDate.format() : "");

      await updateImages(selectedIds, data)
        .then(() => {
          setMessage({ message: "更新しました", type: "success" });
        })
        .catch((error: ApiError) => handleGeneralErrorAction(error, setMessage))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (buttonName === "delete") {
      await deleteImages(selectedIds)
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
    setValue("");
    setInputValue("");
    setPrefectureName("");
    setCityName("");
    setTakenDate(null);

    handleGetParks();
    handleGetImages(undefined);
    setSelectedIds([]);
    setSelectedIndexes([]);
  };

  const getSexes = () => {
    const insectNameValue = insects.find(
      (insect: Insect) => insect.name === insectName
    );
    return insectNameValue ? insectNameValue.availableSexes : [];
  };

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
    e: ChangeEvent<{}>,
    newValue: string | ParkOption | null
  ) => {
    if (typeof newValue === "string") return;
    if (newValue) {
      setValue(newValue.label);
      setParkName(newValue?.label);
      if (newValue === null) return;
      setPrefectureName(
        parks.find((park: Park) => park.id === newValue.id)?.prefecture_name ||
          ""
      );
      setCityName(
        parks.find((park: Park) => park.id === newValue.id)?.city_name || ""
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
    e: ChangeEvent<{}>,
    newInputValue: string
  ) => {
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
    insectSex === "" && cityName === "" && takenDate === null;

  const handleEditButton = () =>
    noSelectedIds ||
    incompleteInsectInfo ||
    incompleteLocationInfo ||
    incompleteAllInfo;

  const handleDeleteButton = () => noSelectedIds;

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
              value={
                insectName ? { label: insectName, value: insectName } : null
              }
              onChange={(e, value) => {
                setInsectName(value?.label || "");
                setInsectSex(value?.label ? "" : "");
              }}
              id="insectName"
              size={handleFormSize()}
              sx={{ maxWidth: 400 }}
              options={insectOptions}
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
              options={getSexes()}
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
                  <div
                    {...(props as {
                      [key: string]: React.HtmlHTMLAttributes<HTMLDivElement>;
                    })}
                  >
                    {option.label} ({option.prefecture} {option.city})
                  </div>
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
                onChange={(e, value) => {
                  if (value !== null) {
                    setPrefectureName(value?.label || "");
                    setCityName(value?.label ? "" : "");
                  }
                }}
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
                  slotProps={{ textField: { size: handleFormSize() } }}
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
