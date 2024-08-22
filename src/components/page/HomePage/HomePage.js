import React from 'react';
import { Background } from '../../atoms/Index';
import { Layout, StatsSection, SalesSection } from '../../organisms/Index';

const HomePage = () => {


  const salesData = [
    { date: '01/08/2024', product: 'Celular', quantity: 1, total: 'R$ 3.000,00', client: 'João' },
    { date: '02/08/2024', product: 'Notebook', quantity: 2, total: 'R$ 8.000,00', client: 'Maria' },
    // Adicione mais dados conforme necessário
  ];

  const topProductsData = [
    { name: 'Celular', price: 'R$ 3.000,00', quantity: 10, total: 'R$ 30.000,00' },
    { name: 'Notebook', price: 'R$ 4.000,00', quantity: 5, total: 'R$ 20.000,00' },
    // Adicione mais dados conforme necessário
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Progressão anual de vendas (R$)',
        data: [0, 200, 500, 1000, 1500, 2000, 2500, 3000],
        borderColor: theme.palette.primary.main, // Usando a cor principal do tema
        backgroundColor: theme.palette.primary.light, // Usando a variação da cor principal do tema
        fill: true,
      },
    ],
  };

  return (
    <Background>
      <Layout>
        <StatsSection />
        <SalesSection 
          salesData={salesData} 
          topProductsData={topProductsData} 
          chartData={chartData} 
        />
      </Layout>
    </Background>
  );
};

export default HomePage;
