# Learn Social Gamer API

## Built with

* ExpressJS 4.17
* KnexJS 0.20
* Bookshelf 1.1
* SQLite3 4.1
* PM2 4.4 (for serving continuously)
* Jest

## Install

1. Be sure to have [NodeJS](https://nodejs.org/en/) *v12.16.1* or later
2. Clone the project and go to the directory root
3. Execute `npm install`

## Run

1. Execute `npm start`
2. API will be at http://localhost:8000

## Tests

1. Execute `npm test`

## Migrations

* Update to the latest: `npm run migrate`
* Rollback the latest: `npm run migrate:rollback`
* Make a new one: `npm run migrate:make migration_name`

## Seeds

* Update to the latest: `npm run seed`
* Make a new one: `npm run seed:make seed_name`

## API Documentation

It can be seen [here](http://sasknot.github.io/learn-socialgamer-api/)


## TODO

* Add more GraphQL queries and mutations
* Add tests for GraphQL queries and mutations
* Persist relationships (what will be the names?)
* Persist game rating
* Persist media
* Change apiDoc to JSDoc
* Should still use `routes`?