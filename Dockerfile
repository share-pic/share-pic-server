FROM node:latest
WORKDIR /app
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/share-pic/share-pic-server
WORKDIR /app/share-pic-server
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]