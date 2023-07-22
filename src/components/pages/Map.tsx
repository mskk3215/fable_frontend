import React, { useEffect, useState } from "react";
import { MapDrawer } from "../organisms/MapDrawer";
import { MapView } from "../organisms/MapView";
import { Anchor } from "../../types/map";

export const Map = () => {
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
      />
      <MapView />
    </>
  );
};
