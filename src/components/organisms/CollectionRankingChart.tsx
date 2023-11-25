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
      <Paper sx={{ border: "1px solid lightgray", position: "relative" }}>
        <Typography variant="h6" style={{ color: "gray" }}>
          ランキング
        </Typography>
        <Bar ref={chartRef} data={data} options={options} />
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <span style={barStyle("red")}></span>
            <Typography
              variant="caption"
              style={{ marginLeft: "5px", color: "red" }}
            >
              あなた
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <span style={barStyle("#8dca89")}></span>
            <Typography
              variant="caption"
              style={{ marginLeft: "5px", color: "#060706" }}
            >
              他のユーザー
            </Typography>
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
