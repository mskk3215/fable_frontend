"use client";

import React, { memo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import parser from "html-react-parser";
import { selectedCenterState } from "../../../store/atoms/MapDirectionState";
import { Header } from "../headerfotter/Header";
import { DestinationBox } from "./DestinationBox";
import { OriginBox } from "./OriginBox";
import {
  destinationLocationState,
  originLocationState,
} from "../../../store/atoms/searchWordState";
import styled from "styled-components";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Anchor, Steps, TravelMode } from "../../../types/map";

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
  pageSize: number;
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
    pageSize,
  } = props;

  const setSelectedCenter = useSetRecoilState(selectedCenterState);
  const router = useRouter();
  const originLocation = useRecoilValue(originLocationState);
  const destinationLocation = useRecoilValue(destinationLocationState);
  const [isRouteVisible, setIsRouteVisible] = useState<boolean>(false);

  // リストをスクロールする
  const topListItemRef = useRef<HTMLLIElement | null>(null);

  const handleDirectionItemClick = (step: Steps) => {
    mapRef?.current?.setZoom(15);
    setSelectedCenter({
      lat: step.latLng.lat,
      lng: step.latLng.lng,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Header />
      </AppBar>
      {/* ルート入力フォーム */}
      {(pageSize > 8 || isRouteVisible === false) && (
        <Box
          sx={{
            zIndex: 2,
            position: "absolute",
            width: drawerWidth,
            top: "64px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            pb: "10px",
          }}
        >
          <OriginBox originRef={originRef} clearRoute={clearRoute} />
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
                  router.push("/map");
                }}
              >
                <Close sx={{ color: "gray" }} />
              </IconButton>
            </Tooltip>
            {pageSize <= 8 && steps.length > 0 && (
              <Tooltip title="ルート詳細を表示">
                <Button
                  onClick={() => {
                    setIsRouteVisible(true);
                  }}
                >
                  <ArrowForward sx={{ color: "primary" }} />
                </Button>
              </Tooltip>
            )}
          </IconButtonStyled>
          <Button onClick={calculateRoute}>経路を算出</Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "85%",
            }}
          >
            <Typography>
              <span>
                時間：
                {isDirectionsLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  duration
                )}
              </span>
            </Typography>
            <Typography>
              <span>
                距離：
                {isDirectionsLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  distance
                )}
              </span>
            </Typography>
          </Box>
        </Box>
      )}
      {/* // ルート詳細 */}
      <Drawer
        variant="persistent"
        sx={{
          zIndex: 1,
          width: drawerWidth,
          height: drawerHeight,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open={true}
        anchor={anchor}
      >
        {(pageSize > 8 || isRouteVisible) && steps.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: pageSize > 8 ? "330px" : "60px",
              height: pageSize > 8 ? null : "250px",
              overflowY: "scroll",
            }}
          >
            <Box>
              {pageSize <= 8 && (
                <Box
                  sx={{
                    zIndex: 2,
                    position: "absolute",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Button
                      onClick={() => {
                        setIsRouteVisible(false);
                      }}
                    >
                      <ArrowBack sx={{ color: "primary" }} />
                    </Button>
                  </Box>
                  <Box>
                    <Typography>
                      出発地:{" "}
                      {originLocation.length > 15
                        ? `${originLocation.slice(0, 15)}...`
                        : originLocation}
                    </Typography>
                    <Typography>到着地: {destinationLocation}</Typography>
                  </Box>
                </Box>
              )}
              <Divider />
              <Box
                sx={{
                  overflowY: "scroll",
                  maxHeight: "calc(100vh - 64px)",
                  display: "flex",
                  marginTop: pageSize > 8 ? "0px" : "50px",
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
                        height: "50%",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : isCalculateRouteClicked &&
                    steps.length === 0 &&
                    !originRef ? (
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
                                  {parser(step.instruction)}
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
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
});
DirectionDrawer.displayName = "DirectionDrawer";

const IconButtonStyled = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  gap: 15px;
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
