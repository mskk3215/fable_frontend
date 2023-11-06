// Statistics.tsx
import React from "react";
import { StatisticsMap } from "../organisms/StatisticsMap";
import { CorrectionStatusTable } from "../organisms/CorrectionStatusTable";
import { CorrectionRankingChart } from "../organisms/CorrectionRankingChart";
import { CollectionDoughnutChart } from "../organisms/CollectionDoughnutChart";
import { Container } from "@mui/material";
import { useUserInsectCollectionStats } from "../../hooks/statistics/useUserInsectCollectionStats";

export const Statistics = () => {
  const { collectionRate, collectionCount, unCollectedCount } =
    useUserInsectCollectionStats();
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
      <CorrectionRankingChart />
      <CorrectionStatusTable isCorrected={false} />
      <CorrectionStatusTable isCorrected={true} />
      <CollectionDoughnutChart
        collectionRate={collectionRate}
        collectionCount={collectionCount}
        unCollectedCount={unCollectedCount}
      />
    </Container>
  );
};
