###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /app

COPY ./package.json .

RUN npm i

USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine As build

WORKDIR /app

COPY ./package.json .

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency.
#In the previous development stage we ran `npm ci` which installed all dependencies,
# so we can copy over the node_modules directory from the development image
COPY --from=development /app/node_modules ./node_modules

ENV NODE_ENV production

RUN npm i

COPY . .

#Use the node user from the image (instead of the root user)
USER node

#RUN rm -rf dist

RUN npm run build

#EXPOSE 3000

CMD ["npm", "run", "start:prod"]
