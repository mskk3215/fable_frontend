import { Button } from "@mui/material";

export default function Post() {
  return (
    <>
      <Button color="success" variant="outlined" component="label">
        アップロード
        <input hidden accept="image/*" multiple type="file"></input>
      </Button>
      写真をアップロードして下さい
    </>
  );
}
