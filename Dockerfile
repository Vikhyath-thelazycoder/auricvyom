# AURICVISTA Production Nginx Container
FROM nginx:alpine

# Copy all web assets into Nginx html directory
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
