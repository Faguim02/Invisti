# Usa uma imagem base do Node.js
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do frontend
COPY . .

# Constrói o projeto para produção
RUN npm run build

# Usa uma imagem leve de Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copia os arquivos construídos do frontend para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 (porta padrão do Nginx)
EXPOSE 80

# Comando para iniciar o Nginx