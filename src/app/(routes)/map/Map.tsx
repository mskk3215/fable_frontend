"use client";

import React, { useEffect, useState } from "react";
import { MapDrawer } from "../../_components/map/MapDrawer";
import { MapView } from "../../_components/map/MapView";
import { useParks } from "../../../hooks/useParks";
import { useAllInsects } from "../../../hooks/useAllInsects";
import { Anchor } from "../../../types/map";

export const Map = () => {
  const { searchResults, isParksLoading, handleGetParkSearchResults } =
    useParks();
  const { insectOptions, queryWord, setQueryWord } = useAllInsects();
  const [anchor, setAnchor] = useState<Anchor>("left");

  const drawerWidth = anchor === "bottom" ? "100%" : 400;
  const drawerHeight =
    anchor === "bottom" ? 250 : anchor === "top" ? 350 : "100%";

  //画面サイズによってdrawerの位置を変更する
  useEffect(() => {
    const screenSize = window.innerWidth;
    if (screenSize >= 576) {
      setAnchor("left");
    } else {
      setAnchor("bottom");
    }
  }, []);

  return (
    <>
      <MapDrawer
        anchor={anchor}
        drawerWidth={drawerWidth}
        drawerHeight={drawerHeight}
        searchResults={searchResults}
        isParksLoading={isParksLoading}
        handleGetParkSearchResults={handleGetParkSearchResults}
        insectOptions={insectOptions}
        queryWord={queryWord}
        setQueryWord={setQueryWord}
      />
      <MapView searchResults={searchResults} isMapPage={true} />
    </>
  );
};
