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
};

export const ActiveHourChart = (props: Props) => {
  const { pictureBookInfo } = props;
  const theme = useTheme();

  const dataHours = {
    labels: [
      "0:00 - 2:59",
      "3:00 - 5:59",
      "6:00 - 8:59",
      "9:00 - 11:59",
      "12:00 - 14:59",
      "15:00 - 17:59",
      "18:00 - 20:59",
      "21:00 - 23:59",
    ],
    datasets: [
      {
        label: "投稿枚数",
        data: pictureBookInfo?.takenAmountPerHour.map((slot) => slot.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const maxDataValue = Math.max(...(dataHours?.datasets[0]?.data ?? []));
  const suggestedMax = Math.max(10, Math.ceil(maxDataValue / 10) * 10);

  const options = {
    indexAxis: "y" as const,
    responsive: true,
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
          <Box>
            <Bar data={dataHours} options={options} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
