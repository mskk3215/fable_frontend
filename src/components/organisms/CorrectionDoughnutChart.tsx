import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Typography, Box, Paper } from "@mui/material";
import { Chart, DoughnutController, ArcElement } from "chart.js";

Chart.register(DoughnutController, ArcElement);

export const CorrectionDoughnutChart = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const currentChartRef = chartRef.current;
    return () => {
      if (currentChartRef && currentChartRef.chartInstance) {
        currentChartRef.chartInstance.destroy();
      }
    };
  }, []);

  const data = {
    labels: ["採集済み", "残り"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#ADD8E6", "#D3D3D3"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "30%",
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "10px",
      }}
    >
      <Paper sx={{ border: "1px solid lightgray" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" style={{ color: "gray" }}>
            あなたの採集率:70%
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box sx={{ maxWidth: "300px", maxHeight: "300px" }}>
              <Doughnut ref={chartRef} data={data} options={options} />
            </Box>
            <Box sx={{ pt: 2, pl: 2 }}>
              <Typography variant="h6">採集種類数:70</Typography>
              <Typography variant="h6">採集残:30</Typography>
              <Typography variant="h6">全種類:100</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
