FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

ARG NEXT_PUBLIC_JWT_SECRET

ENV NEXT_PUBLIC_JWT_SECRET=$NEXT_PUBLIC_JWT_SECRET

# Build static assets
RUN npm run build

EXPOSE 3000

# Iniciar la aplicación (esto es relevante solo si tu aplicación tiene un servidor para producción)
CMD ["npm", "start"]
