import { memo } from "react";
import { useNavigate } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../atoms/layout/Header' was resolved to '/... Remove this comment to see the full error message
import { Header } from "../atoms/layout/Header";
// @ts-expect-error TS(6142): Module '../molecules/DestinationBox' was resolved ... Remove this comment to see the full error message
import { DestinationBox } from "../molecules/DestinationBox";
// @ts-expect-error TS(6142): Module '../molecules/OriginBox' was resolved to '/... Remove this comment to see the full error message
import { OriginBox } from "../molecules/OriginBox";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
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
    // @ts-expect-error TS(2339): Property 'originRef' does not exist on type '{}'.
    originRef,
    // @ts-expect-error TS(2339): Property 'destinationRef' does not exist on type '... Remove this comment to see the full error message
    destinationRef,
    // @ts-expect-error TS(2339): Property 'calculateRoute' does not exist on type '... Remove this comment to see the full error message
    calculateRoute,
    // @ts-expect-error TS(2339): Property 'clearRoute' does not exist on type '{}'.
    clearRoute,
    // @ts-expect-error TS(2339): Property 'travelMode' does not exist on type '{}'.
    travelMode,
    // @ts-expect-error TS(2339): Property 'setTravelMode' does not exist on type '{... Remove this comment to see the full error message
    setTravelMode,
    // @ts-expect-error TS(2339): Property 'distance' does not exist on type '{}'.
    distance,
    // @ts-expect-error TS(2339): Property 'duration' does not exist on type '{}'.
    duration,
    // @ts-expect-error TS(2339): Property 'anchor' does not exist on type '{}'.
    anchor,
    // @ts-expect-error TS(2339): Property 'drawerWidth' does not exist on type '{}'... Remove this comment to see the full error message
    drawerWidth,
    // @ts-expect-error TS(2339): Property 'drawerHeight' does not exist on type '{}... Remove this comment to see the full error message
    drawerHeight,
  } = props;

  const navigate = useNavigate();

  const DirectionBoxStyled = styled.div`
    position: absolute;
    top: 50px;
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Box sx={{ display: "flex" }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <CssBaseline />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
      </AppBar>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DirectionBoxStyled>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <OriginBox
            // @ts-expect-error TS(2322): Type '{ style: { marginBottom: string; }; originRe... Remove this comment to see the full error message
            style={{ marginBottom: "10px" }}
            originRef={originRef}
            clearRoute={clearRoute}
          />
        </Box>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DestinationBox destinationRef={destinationRef} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <IconButtonStyled>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip title="車">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SIconButton onClick={() => setTravelMode("DRIVING")}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <DirectionsCarIcon
                color={travelMode === "DRIVING" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip title="公共交通機関">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SIconButton onClick={() => setTravelMode("TRANSIT")}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <DirectionsTransitIcon
                color={travelMode === "TRANSIT" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip title="自転車">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SIconButton onClick={() => setTravelMode("BICYCLING")}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <DirectionsBikeIcon
                color={travelMode === "BICYCLING" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip title="徒歩">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SIconButton onClick={() => setTravelMode("WALKING")}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <DirectionsWalkIcon
                color={travelMode === "WALKING" ? "primary" : "inherit"}
              />
            </SIconButton>
          </Tooltip>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Tooltip title="ルートを閉じる">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <IconButton
              onClick={() => {
                navigate("/map");
              }}
            >
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Close sx={{ color: "gray" }} />
            </IconButton>
          </Tooltip>
        </IconButtonStyled>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Button onClick={calculateRoute}>経路を算出</Button>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span>時間：{duration}</span>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span>距離：{distance}</span>
        </Typography>
      </DirectionBoxStyled>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box sx={{ overflow: "auto" }}></Box>
      </Drawer>
    </Box>
  );
});
