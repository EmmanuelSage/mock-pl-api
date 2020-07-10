# Mock Premier League Api

[![Coverage Status](https://coveralls.io/repos/github/EmmanuelSage/mock-pl-api/badge.svg?branch=ch-setup-test-env)](https://coveralls.io/github/EmmanuelSage/mock-pl-api?branch=develop)
[![Build Status](https://travis-ci.org/EmmanuelSage/mock-pl-api.svg?branch=develop)](https://travis-ci.org/EmmanuelSage/mock-pl-api)


This is an API that serves the latest scores of fixtures of matches in a “**Mock Premier League**”

## User Types

There should are:

- **Admin accounts** which are used to
  - signup/login
  - manage teams (add, remove, edit, view)
  - create fixtures (add, remove, edit, view)
  - Generate unique links for fixture

- **Users accounts** who can
  - signup/login
  - view teams
  - view completed fixtures
  - view pending fixtures

- **Public**
- robustly search fixtures/teams

## Authentication and Session Management
1. Redis is used as a session store.
3. Authentication and Authorization for admin and user accounts is done using `Bearer token` and `JWT`.

## Tools/Stack

- NodeJs (JavaScript or TypeScript)
- MongoDB
- Redis
- Docker
- POSTMAN
- Jest
- Express

## Documentation

- API endpoints are documented using POSTMAN collections.

## Hosting
The API is hosted [here](https://rocky-journey-87796.herokuapp.com/)

## Bonus

1. `containerization` is done using `docker`.
3. e2e tests using `Jest` is implemented.
4. `web caching` using `Redis` is implemented (GET/teams)
5. `rate limiting` is implemented and is configured using environment variables 


