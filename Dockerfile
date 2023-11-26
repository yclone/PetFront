# Use uma imagem base leve, por exemplo, Nginx
FROM nginx:alpine

# Copie os arquivos do seu projeto para o diretório padrão do Nginx
COPY index.html /usr/share/nginx/html
COPY script.js /usr/share/nginx/html
COPY styles.css /usr/share/nginx/html

# Exponha a porta que o Nginx estará escutando (o padrão é 80)
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
