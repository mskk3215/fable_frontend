import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../atoms/layout/Header";
import { DestinationBox } from "../molecules/DestinationBox";
import { OriginBox } from "../molecules/OriginBox";
import styled from "styled-components";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import Tooltip from "@mui/material/Tooltip";

export const DirectionDrawer = memo((props) => {
  const {
    originRef,
    destinationRef,
    calculateRoute,
    clearRoute,
    travelMode,
    setTravelMode,
    distance,
    duration,
    anchor,
    drawerWidth,
    drawerHeight,
  } = props;

  const navigate = useNavigate();

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
  const SIconButton = styled(IconButton)`
    transition: background-color 0.3s ease;
    &:hover {
      color: gray;
    }
  `;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Header />
      </AppBar>
      <DirectionBoxStyled>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <OriginBox
            style={{ marginBottom: "10px" }}
            originRef={originRef}
            clearRoute={clearRoute}
          />
        </Box>
        <DestinationBox destinationRef={destinationRef} />
        <IconButtonStyled>
          <Tooltip title="車">
            <SIconButton onClick={() => setTravelMode("DRIVING")}>
              <DirectionsCarIcon
                color={travelMode === "DRIVING" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          <Tooltip title="公共交通機関">
            <SIconButton onClick={() => setTravelMode("TRANSIT")}>
              <DirectionsTransitIcon
                color={travelMode === "TRANSIT" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          <Tooltip title="自転車">
            <SIconButton onClick={() => setTravelMode("BICYCLING")}>
              <DirectionsBikeIcon
                color={travelMode === "BICYCLING" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          <Tooltip title="徒歩">
            <SIconButton onClick={() => setTravelMode("WALKING")}>
              <DirectionsWalkIcon
                color={travelMode === "WALKING" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          <Tooltip title="ルートを閉じる">
            <IconButton
              onClick={() => {
                navigate("/map");
              }}
            >
              <Close sx={{ color: "gray" }} />
            </IconButton>
          </Tooltip>
        </IconButtonStyled>
        <Button onClick={calculateRoute}>経路を算出</Button>
        <Typography>時間：{duration}</Typography>
        <Typography>距離：{distance}</Typography>
      </DirectionBoxStyled>
      <Drawer
        variant="persistent"
        sx={{
          zIndex: 1,
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          height: drawerHeight,
        }}
        open={true}
        anchor={anchor}
      >
        <Toolbar style={{ height: "110px" }} />
        <Box sx={{ overflow: "auto" }}></Box>
      </Drawer>
    </Box>
  );
});
