import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Chart, LinearScale, BarElement, CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useUserRankings } from "../../hooks/statistics/useUserRankings";
import { loginUserState } from "../../store/atoms/userAtom";
import { Box, Paper, Typography } from "@mui/material";
import { User } from "../../types/user";

Chart.register(LinearScale, BarElement, CategoryScale);

export const CollectionRankingChart = () => {
  const { rankingItems } = useUserRankings();

  const loginUser = useRecoilValue<User | undefined>(loginUserState);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const myChart = chartRef.current;
    return () => {
      if (myChart && myChart.chartInstance) {
        myChart.chartInstance.destroy();
      }
    };
  }, []);

  const rankingLabels = rankingItems.map((item) => `${item.userName}`);
  const rankingScore = rankingItems.map((item) => item.collectionRate);
  const backgroundColor = rankingItems.map((item) =>
    item.userName === loginUser?.nickname
      ? "rgba(255, 99, 132, 0.2)"
      : "rgba(75, 192, 192, 0.2)"
  );

  const data = {
    labels: rankingLabels,
    datasets: [
      {
        label: "Dataset",
        data: rankingScore,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
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
  };

  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <Paper sx={{ border: "1px solid lightgray" }}>
        <Typography variant="h6" style={{ color: "gray" }}>
          ランキング
        </Typography>
        <Bar ref={chartRef} data={data} options={options} />
      </Paper>
    </Box>
  );
};
