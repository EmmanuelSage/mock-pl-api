# Mock Premier League Api

[![Coverage Status](https://coveralls.io/repos/github/EmmanuelSage/mock-pl-api/badge.svg?branch=develop)](https://coveralls.io/github/EmmanuelSage/mock-pl-api?branch=develop)
[![Build Status](https://travis-ci.org/EmmanuelSage/mock-pl-api.svg?branch=develop)](https://travis-ci.org/EmmanuelSage/mock-pl-api)


This is an API that serves the latest scores of fixtures of matches in a “**Mock Premier League**”

- API is hosted live [here](https://polar-stream-67525.herokuapp.com/)
- Postman Documentation [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/669890f66febf1dd1803#?env%5BMock-pl-api-PROD%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwczovL3BvbGFyLXN0cmVhbS02NzUyNS5oZXJva3VhcHAuY29tIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhdXRoVG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)


## Tools/Stack

- NodeJs
- MongoDB
- Redis
- Docker
- POSTMAN
- Jest
- Express
- Eslint

## Requirements to run

To install this project you would need to have installed:
* Node js
* Git (vcs)
* Docker

## Setup project locally

- run `$ git clone https://github.com/EmmanuelSage/mock-pl-api.git`
- run `$ cd mock-pl-api`
- run `$ npm install`
- setup .env file using .env.example as a guide

Without Docker

- run `npm start`

With Docker 
- note that for the .env for docker use `mongo` and `redis` inplace of `127.0.0.7`
- run `docker-compose up --build`


## Project structure

- `e2e` tests folder is placed at the top for it tests the whole application
- `__tests__` folder is placed inside of the src folder and contains unit tests
which mimicks the folder structure of the application
- The project flow consists of `routers -> controllers -> service -> model`
- The routers are the interface for users to interact with, and Restful convention is used
- the controllers handles the application logic
- the services are used to interact with the models and database, this is done to ensure 
the data access layer is separated from the applicatoin logic.

## linting

- Eslint is used for linting and it extends airbnb conventions
- prettier is used in conjuction with eslint to ensure proper formatting
- Husky and lint-staged is used for pre-commit hooks to ensure proper linting is done
before commiting any code
- note that testing could be added to husky to ensure all tests are passing
before commiting code, `jest --findRelatedTests` could be added to the lint-staged config.


## Api Endpoints Summary

| Endpoints                             | Description                  | Access
| ------------------------------------- | -----------------------------|-----------|
| POST /auth/signup                     | Signs up a new user          | Public    |
| POST /auth/login                      | login a signed up user       | Public    |
| POST /fixtures                        | creates a new fixture        | Admin     |
| GET /fixtures                         | Fetch all fixtures           | User      |
| GET /fixtures/:id                     | Fetch a fixture by id        | User      |
| GET /search/fixtures?query=l          | search fixture by query      | Public    |
| PATCH /fixtures/:id/                  | Edit a fixture               | Admin     |
| DELETE /fixtures/:id                  | Delete a specific fixture    | Admin     |
| POST /teams                           | creates a new team           | Admin     |
| GET /teams                            | Fetch all teams              | User      |
| GET /teams/:id                        | Fetch a team by id           | User      |
| GET /search/teams?query=l             | search team by query         | Public    |
| PATCH /teams/:id/                     | Edit a team                  | Admin     |
| DELETE /teams/:id                     | Delete a specific team       | Admin     |


## Authentication and Session Management
- express-session is used for session
- Redis is used as a session store.
- Authentication and Authorization for admin and user accounts is done using `Bearer token` and `JWT`.

Todo : 
- add helmet package for securing session 
- add morgan for logging session ID's

## Api Documentation

- You can download this project and launch the postman collections in postman or access 
the documentation online [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/669890f66febf1dd1803#?env%5BMock-pl-api-PROD%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwczovL3BvbGFyLXN0cmVhbS02NzUyNS5oZXJva3VhcHAuY29tIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhdXRoVG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)
- API endpoints are documented using POSTMAN collections.
- There are two folders for login, `User` and `Admin`, signup or login with 
either to access the other endpoints, a test automation script has been added
to remove the redundant task of pasting the token in the header

```js
if(pm.response.code === 200){
    pm.environment.set('authToken', pm.response.json().token)
}
```

## Deployment and hosting
- `containerization` is done using `docker`.
- Project is deployed to the Heroku Container Registry
- API is hosted live [here](https://polar-stream-67525.herokuapp.com/)

## Testing
- e2e tests using `Jest` is implemented for all routes.
- Unit tests are implemented for most of the files except

TODO:
```
team.controllers.js
fixture.service.js
team.service.js
validate.js
```

## Web Caching
- `web caching` is implemented using `Redis` 
- The GET /teams currently uses Redis for caching response

Todo:
- implement web caching for GET /fixtures

## Rate Limiting
- `rate limiting` is implemented and is configured using environment variables 
- The rate limiting algorithm is the Sliding window Counter,
see [here](https://dev.to/ganeshmani/designing-a-scalable-api-rate-limiter-in-node-js-application-5hg3) for more info
- The current limit is set to 20 calls per minute


