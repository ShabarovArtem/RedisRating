FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    redis-tools \
    postgresql-client \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 9000

CMD ["npm", "start"]

