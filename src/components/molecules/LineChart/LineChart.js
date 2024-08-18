import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';

// Registering necessary components from chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const LineChart = ({ data, options, width, height }) => {
  return (
    <div style={{ width: width, height: height }}>
      <Line data={data} options={options} />
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        borderColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        fill: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  options: PropTypes.object, // Gráfico pode ter várias opções, mas elas são opcionais
  width: PropTypes.string, // Largura do contêiner
  height: PropTypes.string, // Altura do contêiner
};

LineChart.defaultProps = {
  options: {
    responsive: true,
    maintainAspectRatio: false, // Permite que o gráfico preencha o contêiner
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
  width: '100%', // Largura padrão
  height: '20vh', // Altura padrão
};

export default LineChart;
