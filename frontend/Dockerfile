
FROM node:22

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install basic tools and update certificates
RUN apt-get update && \
    apt-get install -y ca-certificates curl dnsutils && \
    update-ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Network diagnostics (can remove after debugging)
RUN nslookup registry.npmjs.com
RUN curl -v https://registry.npmjs.com/

# Configure npm
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmmirror.com/
RUN npm config set fetch-retry-mintimeout 30000
RUN npm config set fetch-retry-maxtimeout 300000
RUN npm install -g npm@latest
RUN npm cache clean --force

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm install --legacy-peer-deps \
    --fetch-retries=10 \
    --fetch-retry-factor=12 \
    --network-timeout=600000

# Copy app and build
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
