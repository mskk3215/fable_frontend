// Statistics.tsx
import React from "react";
import { StatisticsMap } from "../organisms/StatisticsMap";
import { CollectionStatusTable } from "../organisms/CollectionStatusTable";
import { CollectionDoughnutChart } from "../organisms/CollectionDoughnutChart";
import { CollectionRankingChart } from "../organisms/CollectionRankingChart";
import { Container } from "@mui/material";
import { useUserInsectCollectionStats } from "../../hooks/statistics/useUserInsectCollectionStats";
import { useUncollectedInsectsAndParksInfo } from "../../hooks/statistics/useUncollectedInsectsAndParksInfo";

export const Statistics = () => {
  const { collectionRate, collectionCount, unCollectedCount } =
    useUserInsectCollectionStats();
  const { setCurrentLat, setCurrentLng } = useUncollectedInsectsAndParksInfo();

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
      <StatisticsMap />
      <CollectionDoughnutChart
        collectionRate={collectionRate}
        collectionCount={collectionCount}
        unCollectedCount={unCollectedCount}
      />
      <CollectionRankingChart />
      <CollectionStatusTable
        isCollected={false}
        setCurrentLat={setCurrentLat}
        setCurrentLng={setCurrentLng}
      />
      <CollectionStatusTable isCollected={true} />
    </Container>
  );
};
