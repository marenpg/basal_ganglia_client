# Murine Basal Ganglia Web Solution - UI
This repository is a part of the master's thesis *"Graph-based representation, integration, and analysis of neuroscience data &mdash; The case of the murine basal ganglia"*.
In this thesis, we investigate aspects of graph-based data representation in the neuroscience domain. 
The data set basis is a relational database published by Bjerke et al. (2019) of quantitative neuroanatomical data about the healthy rat and mouse basal ganglia ([DOI:10.25493/DYXZ-76U](https://doi.org/10.25493/DYXZ-76U)).

This application is based on the [GRANDstack Starter](https://github.com/grand-stack/grand-stack-starter) react web application.
This directory contains a React app (bootstrapped with Create React App) that uses Apollo Client to query the  [murine basal ganglia GraphQL API](https://github.com/marenpg/basal_ganglia_api).

The web solution is deployed through [Heroku](https://www.heroku.com/) and is available  at https://basal-ganglia.herokuapp.com/.

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
