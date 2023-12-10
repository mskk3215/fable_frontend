"use client";

import React from "react";
import { StatisticsMap } from "../../_components/statistics/StatisticsMap";
import { CollectionStatusTable } from "../../_components/statistics/CollectionStatusTable";
import { CollectionDoughnutChart } from "../../_components/statistics/CollectionDoughnutChart";
import { CollectionRankingChart } from "../../_components/statistics/CollectionRankingChart";
import { useUserInsectCollectionStats } from "../../../hooks/statistics/useUserInsectCollectionStats";
import { useUncollectedInsectsAndParksInfo } from "../../../hooks/statistics/useUncollectedInsectsAndParksInfo";
import { useCollectedInsectsAndParksInfo } from "../../../hooks/statistics/useCollectedInsectsAndParksInfo";
import { usePageSize } from "../../../hooks/usePageSize";
import { Container } from "@mui/material";

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
