import React, { useRef, useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, DoughnutController, ArcElement } from "chart.js";
import { Typography, Box, Paper, useTheme } from "@mui/material";

Chart.register(DoughnutController, ArcElement);

type Props = {
  collectionRate: number;
  collectionCount: number;
  unCollectedCount: number;
  pageSize: number;
};

export const CollectionDoughnutChart = (props: Props) => {
  const { collectionRate, collectionCount, unCollectedCount, pageSize } = props;
  const chartRef = useRef<any>(null);
  const theme = useTheme();

  useEffect(() => {
    const currentChartRef = chartRef.current;
    return () => {
      if (currentChartRef && currentChartRef.chartInstance) {
        currentChartRef.chartInstance.destroy();
      }
    };
  }, []);

  const centerTextPlugin = useMemo(
    () => ({
      id: "centerText",
      afterDraw: (chart: Chart) => {
        const ctx = chart.ctx;
        const { width, height } = chart;
        const centerText = `${chart.config.data.datasets[0].data[0]}%`;
        const fontSize = pageSize > 8 ? "24px" : "16px";
        ctx.save();
        ctx.font = `bold ${fontSize} Roboto`;
        ctx.fillStyle = "#8dca89";
        ctx.textBaseline = "middle";
        const textWidth = ctx.measureText(centerText).width;
        const textX = Math.round((width - textWidth) / 2);
        const textY = height / 2;
        ctx.fillText(centerText, textX, textY);
        ctx.restore();
      },
    }),
    [pageSize]
  );

  const data = {
    labels: ["採集済", "採集残"],
    datasets: [
      {
        data: [collectionRate, 100 - collectionRate],
        backgroundColor: [theme.palette.success.main, theme.palette.grey[300]],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "40%",
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "10px",
      }}
    >
      <Paper sx={{ border: "1px solid lightgray" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(2),
          }}
        >
          <Typography
            variant={pageSize > 8 ? "h5" : "subtitle1"}
            color="textSecondary"
          >
            採集率
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                minWidth: pageSize > 8 ? "250px" : "150px",
                minHeight: pageSize > 8 ? "250px" : "150px",
              }}
            >
              <Doughnut
                ref={chartRef}
                data={data}
                options={options}
                plugins={[centerTextPlugin]}
              />
            </Box>
            <Box sx={{ pt: 2, pl: 2 }}>
              <Typography variant={pageSize > 8 ? "h5" : "subtitle1"}>
                <span style={barStyle(theme.palette.success.main)}></span>
                採集済:
                {collectionCount}
              </Typography>
              <Typography variant={pageSize > 8 ? "h5" : "subtitle1"}>
                <span style={barStyle(theme.palette.grey[300])}></span> 採集残:
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
