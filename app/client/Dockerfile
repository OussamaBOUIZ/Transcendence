# FROM node:20-alpine

# WORKDIR /app

# COPY * /app

# RUN npm install

# EXPOSE 5173

# CMD ["npm", "run", "dev", "--host"]

FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]