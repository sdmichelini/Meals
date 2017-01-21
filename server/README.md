# Meals Server

Server for storing all data for the meals application

## Getting Started

- Make sure to clone and run `yarn install` in the root directory
- `yarn start` will start the API server which also serves the static files for the client
- `yarn test:server` will run the tests in the `server\__tests__`

## Structure

- `controllers` has all of the controllers which will handle requests, perform validation of requests, and interface with the models
- `models` has all of the models which handle mongodb interaction as well as DB level caching
- `utils` has common utilities for the server
- `application.js` has the express app and the route definitions
- `server.js` is the entry point for the server and handles DB connection and model instantiation
