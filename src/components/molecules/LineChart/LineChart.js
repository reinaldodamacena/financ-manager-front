import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import { styled } from '@mui/material/styles';

// Registering necessary components from chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const ChartContainer = styled('div')(({ theme, width, height }) => ({
  width: width || '100%',
  height: height || '20vh',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: '30vh', // Aumenta a altura em telas menores
  },
}));

const LineChart = ({ data, options, width, height }) => {
  return (
    <ChartContainer width={width} height={height}>
      <Line data={data} options={options} />
    </ChartContainer>
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
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#000', // Pode ser ajustado para corresponder ao tema
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333', // Pode ser ajustado para corresponder ao tema
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  },
  width: '100%', // Largura padrão
  height: '20vh', // Altura padrão
};

export default LineChart;
