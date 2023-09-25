# Use a imagem Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Construa o projeto
RUN npm run build

# Exponha a porta em que a aplicação Vite será executada (geralmente 3000)
EXPOSE 3000

# Comando para iniciar a aplicação quando o container for executado
CMD ["npm", "run", "dev", "--host"]
