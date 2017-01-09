## Install

    npm install

## Run in development

    npm start

## Run in production, with PM2

    npm install -g pm2
    pm2 start ./bin/www --name amplify-api

    # With a port
    PORT=30000 pm2 start ./bin/www --name amplify-api
