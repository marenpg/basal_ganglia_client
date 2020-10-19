# Murine Basal Ganglia Web Solution - UI

This directory contains a React app (bootstrapped with Create React App) that uses Apollo Client to query a GraphQL API.

The template app queries for a list of users from the GraphQL API and displays them in a list.

## Quickstart

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

_.env_

```
REACT_APP_GRAPHQL_URI=http://localhost:4000
```
