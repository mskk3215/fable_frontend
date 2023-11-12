import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, DoughnutController, ArcElement } from "chart.js";
import { Typography, Box, Paper } from "@mui/material";

Chart.register(DoughnutController, ArcElement);
type Props = {
  collectionRate: number;
  collectionCount: number;
  unCollectedCount: number;
};

const centerTextPlugin = {
  id: "centerText",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const { width, height } = chart;
    const centerText = `${chart.config.data.datasets[0].data[0]}%`;
    ctx.save();
    ctx.font = "20px Arial";
    ctx.fillStyle = "#8dca89";
    ctx.textBaseline = "middle";
    const textWidth = ctx.measureText(centerText).width;
    const textX = Math.round((width - textWidth) / 2);
    const textY = height / 2;
    ctx.fillText(centerText, textX, textY);
    ctx.restore();
  },
};

export const CollectionDoughnutChart = (props: Props) => {
  const { collectionRate, collectionCount, unCollectedCount } = props;
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
        data: [collectionRate, 100 - collectionRate],
        backgroundColor: ["#8dca89", "#D3D3D3"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      centerText: centerTextPlugin,
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
            採集率
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box sx={{ maxWidth: "250px", maxHeight: "250px" }}>
              <Doughnut
                ref={chartRef}
                data={data}
                options={options}
                plugins={[centerTextPlugin]}
              />
            </Box>
            <Box sx={{ pt: 2, pl: 2 }}>
              <Typography variant="h6">
                <span style={barStyle("#8dca89")}></span> 採集済:
                {collectionCount}
              </Typography>
              <Typography variant="h6">
                <span style={barStyle("#D3D3D3")}></span> 採集残:
                {unCollectedCount}
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
  marginRight: "8px",
});
