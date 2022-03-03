# pull official base image
FROM node:16-alpine3.14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 8080

# install app dependencies
COPY package.json yarn.lock* ./
RUN yarn --silent

# add app
COPY . ./

# start app
CMD ["yarn", "start"]

EXPOSE 8080
