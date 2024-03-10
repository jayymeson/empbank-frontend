# Especifica a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia os arquivos restantes do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
