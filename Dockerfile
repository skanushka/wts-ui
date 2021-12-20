FROM node:14-alpine AS development

ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]