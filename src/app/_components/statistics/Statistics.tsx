"use client";

import React from "react";
import { StatisticsMap } from "./StatisticsMap";
import { CollectionStatusTable } from "./CollectionStatusTable";
import { CollectionDoughnutChart } from "./CollectionDoughnutChart";
import { CollectionRankingChart } from "./CollectionRankingChart";
import { useUserInsectCollectionStats } from "../../../hooks/statistics/useUserInsectCollectionStats";
import { useUncollectedInsectsAndParksInfo } from "../../../hooks/statistics/useUncollectedInsectsAndParksInfo";
import { useCollectedInsectsAndParksInfo } from "../../../hooks/statistics/useCollectedInsectsAndParksInfo";
import { usePageSize } from "../../../hooks/usePageSize";
import { Container } from "@mui/material";
import "leaflet/dist/leaflet.css";

export const Statistics = () => {
  const { collectionRate, collectionCount, unCollectedCount } =
    useUserInsectCollectionStats();
  const { collectedInsectParkItems } = useCollectedInsectsAndParksInfo();
  const { setCurrentLat, setCurrentLng, uncollectedInsectParkItems } =
    useUncollectedInsectsAndParksInfo();
  const pageSize = usePageSize();

  return (
    <Container
      disableGutters
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "48px",
        paddingBottom: "24px",
        width: { xs: "99%", md: "100%" },
        m: "auto",
      }}
    >
      <StatisticsMap pageSize={pageSize} />
      <CollectionDoughnutChart
        collectionRate={collectionRate}
        collectionCount={collectionCount}
        unCollectedCount={unCollectedCount}
        pageSize={pageSize}
      />
      <CollectionStatusTable
        isCollected={false}
        setCurrentLat={setCurrentLat}
        setCurrentLng={setCurrentLng}
        uncollectedInsectParkItems={uncollectedInsectParkItems}
        pageSize={pageSize}
      />
      <CollectionStatusTable
        isCollected={true}
        collectedInsectParkItems={collectedInsectParkItems}
        pageSize={pageSize}
      />
      <CollectionRankingChart pageSize={pageSize} />
    </Container>
  );
};
