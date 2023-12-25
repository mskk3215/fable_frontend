"use client";

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
        width: "100%",
        marginTop: "48px",
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
