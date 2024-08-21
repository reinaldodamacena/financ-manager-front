// src/config/config.js

const development = {
    API_BASE_URL: 'https://localhost:5000/api',
    // Outras configurações específicas do ambiente de desenvolvimento
  };
  
  const production = {
    API_BASE_URL: 'https://api.seu-dominio.com/api',
    // Outras configurações específicas do ambiente de produção
  };
  
  const test = {
    API_BASE_URL: 'https://localhost:5000/api',
    // Outras configurações específicas do ambiente de teste
  };
  
  const config = {
    development,
    production,
    test,
  };
  
  export default config[process.env.NODE_ENV || 'development'];
  