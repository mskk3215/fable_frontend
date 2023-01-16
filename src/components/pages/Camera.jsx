import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const Camera = () => {
  return (
    <form encType="multipart/form-data">
      <label htmlFor="environment">
        <CameraAltIcon>
          <input type="file" accept="image/*" capture="environment" />
        </CameraAltIcon>
      </label>
    </form>
  );
};
