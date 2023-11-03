import { useEffect, useRef } from "react";
import { Chart, LinearScale, BarElement, CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Paper, Typography } from "@mui/material";

Chart.register(LinearScale, BarElement, CategoryScale);

const dataPairs = [
  { label: "Ares", value: 65 },
  { label: "Blaze", value: 59 },
  { label: "Cyrus", value: 80 },
  { label: "Elara", value: 81 },
  { label: "Faylinn", value: 56 },
  { label: "Gideon", value: 72 },
  { label: "Helia", value: 88 },
  { label: "Iris", value: 44 },
  { label: "Jason", value: 99 },
  { label: "Kayla", value: 66 },
];

dataPairs.sort((a, b) => b.value - a.value);

const sortedLabels = dataPairs.map((pair) => `${pair.label}`);
const sortedData = dataPairs.map((pair) => pair.value);

const data = {
  labels: sortedLabels,
  datasets: [
    {
      label: "Dataset",
      data: sortedData,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 1,
    },
  ],
};

const options = {
  indexAxis: "y",
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

export const CorrectionRankingChart = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const myChart = chartRef.current;
    return () => {
      if (myChart && myChart.chartInstance) {
        myChart.chartInstance.destroy();
      }
    };
  }, []);

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
