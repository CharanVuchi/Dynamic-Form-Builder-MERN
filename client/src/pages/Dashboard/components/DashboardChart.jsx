import { useMemo } from "react";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const getThemeColor = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const DashboardChart = ({ analytics = {} }) => {
  const chartData = useMemo(() => {
    const canvasGradient = (context) => {
      const chart = context.chart;
      const { ctx, chartArea } = chart;

      if (!chartArea) return getThemeColor("--theme-chart-fill");

      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

      gradient.addColorStop(0, getThemeColor("--theme-chart-fill-strong"));
      gradient.addColorStop(1, getThemeColor("--theme-chart-fill-subtle"));

      return gradient;
    };

    return {
      labels: analytics.labels || [],
      datasets: [
        {
          label: "Submissions",
          data: analytics.values || [],
          borderColor: getThemeColor("--theme-brand-secondary"),
          backgroundColor: canvasGradient,
          fill: true,
          tension: 0,
          borderWidth: 4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: getThemeColor("--theme-brand-secondary"),
          pointBorderColor: getThemeColor("--theme-surface"),
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
          color: getThemeColor("--theme-text-subtle"),
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
          color: getThemeColor("--theme-border-subtle"),
        },
        ticks: {
          color: getThemeColor("--theme-text-subtle"),
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
