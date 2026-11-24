import { useMemo } from "react";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const DashboardChart = ({ analytics = {} }) => {
  const chartData = useMemo(() => {
    const canvasGradient = (context) => {
      const chart = context.chart;
      const { ctx, chartArea } = chart;

      if (!chartArea) return "rgba(156, 211, 187, 0.2)";

      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

      gradient.addColorStop(0, "rgba(156, 211, 187, 0.55)");
      gradient.addColorStop(1, "rgba(156, 211, 187, 0.02)");

      return gradient;
    };

    return {
      labels: analytics.labels || [],
      datasets: [
        {
          label: "Submissions",
          data: analytics.values || [],
          borderColor: "#283B80",
          backgroundColor: canvasGradient,
          fill: true,
          tension: 0,
          borderWidth: 4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: "#283B80",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
        },
      ],
    };
  }, [analytics]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#8190AA",
          font: {
            size: 11,
          },
        },
      },

      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "#EDF0F5",
        },
        ticks: {
          color: "#8190AA",
          font: {
            size: 11,
          },
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="h-[260px] w-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default DashboardChart;
