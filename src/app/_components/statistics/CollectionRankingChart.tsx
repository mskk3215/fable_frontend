"use client";

import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Chart, LinearScale, BarElement, CategoryScale } from "chart.js";
import { ActiveElement } from "chart.js/dist/plugins/plugin.tooltip";
import { Bar } from "react-chartjs-2";
import { useUserRankings } from "../../../hooks/statistics/useUserRankings";
import { loginUserState } from "../../../store/atoms/userAtom";
import { Box, Pagination, Paper, Typography, useTheme } from "@mui/material";
import { User } from "../../../types/user";
import { Ranking } from "../../../types/statistics";

Chart.register(LinearScale, BarElement, CategoryScale);

type Props = {
  pageSize: number;
};
export const CollectionRankingChart = (props: Props) => {
  const { pageSize } = props;
  const { rankingItems } = useUserRankings();
  const [rankingPageSize, setRankingPageSize] = useState(20);
  const [rankingPageData, setRankingPageData] = useState<Ranking[]>([]);
  const [currentRankingPage, setCurrentRankingPage] = useState(1);

  const loginUser = useRecoilValue<User | undefined>(loginUserState);
  const chartRef = useRef<any>(null);
  const theme = useTheme();

  useEffect(() => {
    const myChart = chartRef.current;
    return () => {
      if (myChart && myChart.chartInstance) {
        myChart.chartInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    pageSize > 8 ? setRankingPageSize(20) : setRankingPageSize(5);
  }, [pageSize]);

  useEffect(() => {
    const start = (currentRankingPage - 1) * rankingPageSize;
    const end = start + rankingPageSize;
    setRankingPageData(rankingItems.slice(start, end));
  }, [currentRankingPage, pageSize, rankingItems]);

  const rankingLabels = rankingPageData.map((item) => `${item.userName}`);
  const rankingScore = rankingPageData.map((item) => item.collectionRate);
  const backgroundColor = rankingPageData.map((item) =>
    item.userName === loginUser?.nickname ? "red" : "#8dca89"
  );

  const data = {
    labels: rankingLabels,
    datasets: [
      {
        label: "Dataset",
        data: rankingScore,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        title: {
          display: true,
          text: "順位",
        },
        ticks: {
          padding: 0,
          autoSkip: false,
          maxTicksLimit: 20,
        },
      },
      x: {
        title: {
          display: true,
          text: "採集率[%]",
        },
      },
    },
    onClick: function (_: unknown, array: ActiveElement[] | BarElement[]) {
      if (array.length > 0) {
        const chartElement = array[0] as ActiveElement;
        const index = chartElement.index;
        const userId = rankingItems[index].userId;
        window.location.href = `/userpage/${userId}`;
      }
    },
  };

  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <Paper sx={{ border: "1px solid lightgray", position: "relative" }}>
        <Box sx={{ padding: theme.spacing(2) }}>
          <Typography
            variant={pageSize > 8 ? "h5" : "subtitle1"}
            style={{ color: "gray" }}
          >
            ランキング
          </Typography>
          <Box sx={{ height: pageSize > 8 ? "500px" : "250px" }}>
            <Bar ref={chartRef} data={data} options={options} />
          </Box>
          <Pagination
            count={Math.ceil(rankingItems.length / rankingPageSize)}
            page={currentRankingPage}
            onChange={(e, page) => setCurrentRankingPage(page)}
            sx={{ display: "flex", justifyContent: "center", pt: 2 }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
              <span style={barStyle("red")}></span>
              <Typography
                variant="caption"
                style={{ marginLeft: "5px", color: "red" }}
              >
                あなた
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
              <span style={barStyle("#8dca89")}></span>
              <Typography
                variant="caption"
                style={{ marginLeft: "5px", color: "#060706" }}
              >
                他のユーザー
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const barStyle = (color: string) => ({
  display: "inline-block",
  width: "32px",
  height: "16px",
  backgroundColor: color,
  marginRight: "5px",
});
