import { Header } from "../atoms/layout/Header";
import { DestinationBox } from "../molcules/DestinationBox";
import { OriginBox } from "../molcules/OriginBox";
import styled from "styled-components";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

export const DirectionDrawer = (props) => {
  const {
    listItem,
    open,
    originRef,
    destinationRef,
    calculateRoute,
    clearRoute,
    address,
    setAddress,
  } = props;

  const DirectionBoxStyled = styled.div`
    position: absolute;
    top: 55px;
    left: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  const IconButtonStyled = styled.div`
    padding: 0 0 0 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  `;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header />
      </AppBar>
      <DirectionBoxStyled>
        <OriginBox
          style={{ marginBottom: "10px" }}
          originRef={originRef}
          address={address}
          setAddress={setAddress}
        />
        <DestinationBox listItem={listItem} destinationRef={destinationRef} />
        <IconButtonStyled>
          <Button onClick={clearRoute}>button</Button>
          <IconButton>
            <DirectionsCarIcon />
          </IconButton>
          <IconButton>
            <DirectionsTransitIcon />
          </IconButton>
          <IconButton>
            <DirectionsBikeIcon />
          </IconButton>
          <IconButton>
            <DirectionsWalkIcon />
          </IconButton>
        </IconButtonStyled>
        <Button onClick={calculateRoute}>経路を算出</Button>
      </DirectionBoxStyled>
      <Drawer
        variant="persistent"
        sx={{
          zIndex: 1,
          width: 400,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 400,
            boxSizing: "border-box",
          },
        }}
        open={open}
      >
        <Toolbar style={{ height: "110px" }} />
        <Box sx={{ overflow: "auto" }}></Box>
      </Drawer>
    </Box>
  );
};
