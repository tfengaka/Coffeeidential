import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chartData } from '~/api/mockData';
interface BarChartProps {
  width?: number | string;
  height?: number | string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

function BarChart({ width, height }: BarChartProps) {
  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: 'Số lượt truy xuất',
        data: chartData.map((item) => item.data),
        backgroundColor: '#54b862',
      },
    ],
  };
  return <Bar options={options} data={data} width={width} height={height} />;
}

export default BarChart;
