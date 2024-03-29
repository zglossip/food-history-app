# Food History (Mobile)

Version 0.1.0

A mobile application for tracking cooking history, recipes, and sources.

Currently a work in progress.

## Backend

This application requires a REST API. The repository containing the API application can be found [here](https://github.com/zglossip/food-history-api)

## Instructions

### Simple Setup

#### Live Development

To run the application:

- Ensure you have Node 21 installed
- Run `npm ci`
- Run `npm run dev`
- Application will be hosted at `http://localhost:8081`

#### Storybook

To run Storybook:

- Follow the first two steps above
- Run `npm run storybook`
- Storybook will be hosted at `http://localhost:6006`

#### Live Tests

To run the vitest tests:

- Follow the first two steps above
- Run `npm run test:unit`

### Docker Compose with API

I've set up a Docker Compose config to load both the frontend's and API's live development. The Dockerfile for the backend is contained in the [API repo](https://github.com/zglossip/food-history-api)

- Requires Docker Desktop
- Requires food-history-api in same parent directory in food-history-app
- Run `docker compose up`
- Application will be hosted at `http://localhost:8081`

## Release History

### 0.1.0

This is the initial release of the application. This contains basic browse and create functionality. Meant as a starting point for the application
