# spot api
api project to get electricity spot prices from entsoe platform and serve them for a UI. Api serves data from a database.
data is updated to db separately via npm command

you need to do:
- install docker
- install docker-compose
- install node
- create .env from .env.example
- npm install

## tests
integration and end to end tests are run against database.
- npm run test:all starts a postgres database and run tests
- npm run test:unit runs only unit tests

## docker
you can run both the api and database in docker using

## commits
commits follow conventional commit form and are checked for proper format.
how to commit https://www.conventionalcommits.org/en/v1.0.0/

## seeds
you need to either start the api once or create the database with the same name as in your .env.
After that run
- npm run db:seed

## how to update prices
- npm run run:update:prices