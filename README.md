# Murine Basal Ganglia Web Solution - UI
This application is based on the [GRANDstack Starter](https://github.com/grand-stack/grand-stack-starter) react web application.
This directory contains a React app (bootstrapped with Create React App) that uses Apollo Client to query the  [murine basal ganglia GraphQL API](https://github.com/marenpg/basal_ganglia_api).

The web solution is deployed to Heroku at https://basal-ganglia.herokuapp.com/.

## Getting started

Install dependencies:

```
npm install
```

Start the development server:

```
npm run start-dev
```

## Configure

Configuration is done with environment variables specified in `.env`

Edit `.env` to specify the URI of the GraphQL API. The default is `http://localhost:4000`
