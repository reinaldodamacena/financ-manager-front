// src/config/config.js

const development = {
    API_BASE_URL: 'https://34.39.139.236/api',
    // Outras configurações específicas do ambiente de desenvolvimento
  };
  
  const production = {
    API_BASE_URL: 'https://34.39.139.236/api',
    // Outras configurações específicas do ambiente de produção
  };
  
  const test = {
    API_BASE_URL: 'https://34.39.139.236/api',
    // Outras configurações específicas do ambiente de teste
  };
  
  const config = {
    development,
    production,
    test,
  };
  
  export default config[process.env.NODE_ENV || 'development'];
  