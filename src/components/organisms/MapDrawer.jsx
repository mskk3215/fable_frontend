import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

const SButton = styled(Button)`
  position: relative;
  z-index: 1;
`;

export const SwipeableTemporaryDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    },
    []
  );

  const list = useMemo(
    () => (
      <Box
        sx={{ width: 400 }}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List></List>
      </Box>
    ),
    [toggleDrawer]
  );

  return (
    <>
      <SButton onClick={toggleDrawer(true)}>left</SButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </>
  );
};
