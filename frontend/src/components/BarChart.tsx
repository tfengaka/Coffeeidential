import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from '~/types';

interface BarChartProps {
  width?: number | string;
  height?: number | string;
  dataSet: ChartData[];
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

function BarChart({ width, height, dataSet }: BarChartProps) {
  const data = {
    labels: dataSet.map((item) => item.date),
    datasets: [
      {
        label: 'Số lượt truy xuất',
        data: dataSet.map((item) => item.count),
        backgroundColor: '#54b862',
      },
    ],
  };
  return <Bar options={options} data={data} width={width} height={height} />;
}

export default BarChart;
