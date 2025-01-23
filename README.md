# Database integration tests

This example showcases how you can configure your test environment in order to perform integration tests against NodeJS applications utilising SQL databases.

Tests are executed on a local [PostgresSQL](https://hub.docker.com/layers/library/postgres/16.6-alpine/images/sha256-c3cd2715a2957dc36383f87fcdaba17cc4e1270bbf20b5b48a06aa619c7e4de1) database using Docker via [Colima](https://github.com/abiosoft/colima).

Each tests will run in a isolated transaction which is rolled back automatically, allowing concurrent execution of them.

This project use ESM syntax everywhere with JavaScript ES2022 as target.

[swc](https://swc.rs/) Rust compiler is used to compile TypeScript code to JavaScript: for [Jest tests](https://swc.rs/docs/jest) and [on the fly CLIs](https://www.npmjs.com/package/@swc-node/register) like Prisma seed operations.

## Stack

- Jest 29.7.0
- Prisma 6.2.1
- jest-prisma 1.8.1
- swc/jest 0.2.37
- swc-node/register: 1.10.9
- Postgres 16.6
- NodeJS 22.13.0 (LTS)
- TypeScript 5.7.3
- Docker 27.5.0
- Docker Compose 2.29.2

## Setup

Install pnpm

```bash
brew install pnpm
```

Clone the repo.

```bash
git clone https://github.com/gmocquet/integration-tests-nodejs-jest-prisma-pgsql
```

Install the dependencies.

```bash
cd integration-tests-nodejs-jest-prisma-pgsql
pnpm install --frozen-lockfile
```

## Running the database

A `docker-compose.yml` file has been created to represent the Postgres database that we will use for local development.

You will need [Docker using Colima](https://github.com/abiosoft/colima) installed and configured.

To start the database run the following command:

```bash
pnpm db:start
```

Once you are finished developing you can stop the db by running the following command:

```bash
npm db:stop
```

This project has been configured to run with the following Postgres configuration. You can modify these to match your needs by editing the [`.env`](.env) file.

```
# For database server using Docker
- POSTGRES_USER=test
- POSTGRES_PASSWORD=test
- POSTGRES_DB=db

# For PG CLI client psql using Docker
- PGHOST: 127.0.0.1
- PGPORT: 5432
- PGUSER: test
- PGPASSWORD: test
- PGDATABASE: db

# For NodeJS Prisma client using Jest
- POSTGRES_URL=postgresql://test:test@127.0.0.1:5432/db?schema=public
```

## Populate the database schema

```bash
pnpm migrate:init
```

## Jest Configuration

We have configured Jest to execute with [@quramy/jest-prisma](https://www.npmjs.com/package/@quramy/jest-prisma) test environment.

Jest environment for Prisma integrated testing. You can run each test case in isolated transaction which is rolled back automatically.

## Running your tests

Ensure that your local Postgres is running.

```bash
pnpm db:start
```

Then execute the Jest tests via the following command:

```bash
pnpm test
```

When testing is complete, you can stop the database by running the following command:

```bash
pnpm db:stop
```

## Running TypeScript file

To execute a TypeScript file without the Jest framework, invoke `pnpm exec:auto-transpile`

All files are transpiled on the fly by SWC Rust transpiler before being executed. Similar to other build tools, SWC does not perform typechecking; it simply removes type annotations from the file.

```bash
pnpm exec:auto-transpile src/hello-world.ts
```
