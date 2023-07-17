import React, { useEffect, useState } from "react";
// @ts-expect-error TS(6142): Module '../organisms/MapDrawer' was resolved to '/... Remove this comment to see the full error message
import { MapDrawer } from "../organisms/MapDrawer";
// @ts-expect-error TS(6142): Module '../organisms/MapView' was resolved to '/Us... Remove this comment to see the full error message
import { MapView } from "../organisms/MapView";

export const Map = () => {
  const [anchor, setAnchor] = useState("left");

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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MapDrawer
        // @ts-expect-error TS(2322): Type '{ anchor: string; drawerWidth: string | numb... Remove this comment to see the full error message
        anchor={anchor}
        drawerWidth={drawerWidth}
        drawerHeight={drawerHeight}
      />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MapView />
    </>
  );
};
