import React from 'react';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function SensorChart({ data }) {
  const labels = data.map(d => dayjs(d.timestamp).format('HH:mm:ss'));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'CO₂ (ppm)',
        data: data.map(d => d.CO2),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.2,
      },
      {
        label: 'Teplota (°C)',
        data: data.map(d => d.temperature),
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.2,
      },
      {
        label: 'Vlhkosť (%)',
        data: data.map(d => d.humidity),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="mt-5">
      <h4 className="text-center mb-3">📈 Vizualizácia senzorových dát</h4>
      <Line data={chartData} />
    </div>
  );
}

export default SensorChart;
