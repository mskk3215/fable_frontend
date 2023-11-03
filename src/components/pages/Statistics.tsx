// Statistics.tsx
import React from "react";
import { StatisticsMap } from "../organisms/StatisticsMap";
import { CorrectionStatusTable } from "../organisms/CorrectionStatusTable";
import { CorrectionDoughnutChart } from "../organisms/CorrectionDoughnutChart";
import { CorrectionRankingChart } from "../organisms/CorrectionRankingChart";
import { Container } from "@mui/material";

export const Statistics = () => {
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
      <CorrectionDoughnutChart />
      <CorrectionRankingChart />
      <CorrectionStatusTable isCorrected={false} />
      <CorrectionStatusTable isCorrected={true} />
    </Container>
  );
};
