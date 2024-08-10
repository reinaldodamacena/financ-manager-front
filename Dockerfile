# Etapa de build
FROM node:20-alpine AS build

WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se existir) para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o restante do código fonte para o contêiner
COPY . .

# Crie o build da aplicação
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copie os arquivos do build da etapa anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
