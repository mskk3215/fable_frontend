import React, { memo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ReactHtmlParser from "react-html-parser";
import { selectedCenterState } from "../../store/atoms/MapDirectionState";
import { Header } from "../atoms/layout/Header";
import { DestinationBox } from "../molecules/DestinationBox";
import { OriginBox } from "../molecules/OriginBox";
import styled from "styled-components";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import Tooltip from "@mui/material/Tooltip";
import { Anchor, Steps, TravelMode } from "../../types/map";

type Props = {
  originRef: React.RefObject<HTMLInputElement>;
  destinationRef: React.RefObject<HTMLInputElement>;
  calculateRoute: () => void;
  clearRoute: () => void;
  travelMode: string;
  setTravelMode: (mode: TravelMode) => void;
  distance?: string;
  duration?: string;
  steps: Steps[];
  anchor: Anchor;
  drawerWidth: string | number;
  drawerHeight: string | number;
  isDirectionsLoading: boolean;
  handleMouseOver: (step: any) => void;
  handleMouseOut: (step: any) => void;
  isCalculateRouteClicked: boolean;
  setInfoWindowLocationZoomSize: (size: number) => void;
  mapRef?: React.MutableRefObject<google.maps.Map | null>;
};

export const DirectionDrawer = memo((props: Props) => {
  const {
    originRef,
    destinationRef,
    calculateRoute,
    clearRoute,
    travelMode,
    setTravelMode,
    distance,
    duration,
    steps,
    anchor,
    drawerWidth,
    drawerHeight,
    isDirectionsLoading,
    handleMouseOver,
    handleMouseOut,
    isCalculateRouteClicked,
    mapRef,
  } = props;

  const setSelectedCenter = useSetRecoilState(selectedCenterState);
  const navigate = useNavigate();

  // リストをスクロールする
  const topListItemRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    if (steps && steps.length > 0 && topListItemRef.current) {
      topListItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [steps]);

  const handleDirectionItemClick = (step: Steps) => {
    mapRef?.current?.setZoom(15);
    setSelectedCenter({
      lat: step.latLng.lat,
      lng: step.latLng.lng,
    });
  };

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
          <OriginBox originRef={originRef} clearRoute={clearRoute} />
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
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            時間：
            {isDirectionsLoading ? <CircularProgress size={20} /> : duration}
          </span>
          <span>
            距離：
            {isDirectionsLoading ? <CircularProgress size={20} /> : distance}
          </span>
        </Typography>
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
        <Box
          sx={{
            overflow: "auto",
            marginTop: "300px",
            height: drawerHeight,
          }}
        >
          <List>
            {isDirectionsLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  mt: 2,
                }}
              >
                <CircularProgress />
              </Box>
            ) : isCalculateRouteClicked && steps.length === 0 && !originRef ? (
              <ListItem>
                <SListItemText primary="検索したルートは見つかりません。" />
              </ListItem>
            ) : (
              steps.map((step, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    key={index}
                    ref={index === 0 ? topListItemRef : null}
                    onMouseOver={() => {
                      handleMouseOver(step);
                    }}
                    onMouseOut={() => {
                      handleMouseOut(step);
                    }}
                    onClick={() => {
                      handleDirectionItemClick(step);
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            component="div"
                            variant="body2"
                            color="textPrimary"
                          >
                            {ReactHtmlParser(step.instruction)}
                          </Typography>
                          <Typography variant="body2" color="textPrimary">
                            {step.duration} ({step.distance})
                          </Typography>
                        </>
                      }
                      sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    />
                  </ListItem>
                  {index !== steps.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ overflow: "auto" }}></Box>
    </Box>
  );
});

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
const SListItemText = styled(ListItemText)`
  color: red;
`;
