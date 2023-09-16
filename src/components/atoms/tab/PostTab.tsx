import { Box, Tab, Tabs } from "@mui/material";

type Props = {
  tabValue: number;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
};

export const PostTab = (props: Props) => {
  const { tabValue, setTabValue } = props;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 7,
        width: "100%",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          maxWidth: 600,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tab label="新着" />
        <Tab label="フォロー" />
        <Tab label="注目" />
      </Tabs>
    </Box>
  );
};
