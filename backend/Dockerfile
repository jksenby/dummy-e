FROM node

RUN apt-get update && \
    apt-get install -y ansible ssh postgresql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./package.json .

#COPY ansible/ ./ansible/

RUN npm install


COPY . .

EXPOSE 3000

CMD node index.js
