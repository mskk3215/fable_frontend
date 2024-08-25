"use client";

import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PictureBookInfo } from "../../../types/picturebooks";
import { Box, Paper, useTheme } from "@mui/material";

ChartJS.register(LinearScale, BarElement, CategoryScale);
type Props = {
  pictureBookInfo?: PictureBookInfo;
  pageSize: number;
};
export const ActiveMonthChart = (props: Props) => {
  const { pictureBookInfo, pageSize } = props;
  const theme = useTheme();

  const dataMonths = {
    labels: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    datasets: [
      {
        label: "投稿枚数",
        data: pictureBookInfo?.takenAmountPerMonth.map((month) => month.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const maxDataValue = Math.max(...(dataMonths?.datasets[0]?.data ?? []));
  const suggestedMax = Math.max(10, Math.ceil(maxDataValue / 10) * 10);

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "投稿枚数",
        },
        suggestedMax: suggestedMax,
      },
    },
  };

  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <Paper
        sx={{ border: "1px solid lightgray", position: "relative" }}
        elevation={0}
      >
        <Box sx={{ padding: theme.spacing(2) }}>
          <Box sx={{ height: pageSize > 8 ? "500px" : "300px" }}>
            <Bar data={dataMonths} options={options} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
