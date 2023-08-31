# Multivende Coding Challenge - Part 2

This repository solves part 2, "API REST Consumption", of Multivende coding challenge.

## Setup

### Launch a RabbitMQ server with web management interface

```shell
docker run -itd --rm --name rabbitmq -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

You can access [management UI](http://localhost:15672/) after launch with `user:user` and `password:password` (set up different ones when launching docker container if you want).

### Launch a Postgres server and setup database

(Postgres setup and role configuration out of scope)

```shell
createdb multivende
psql multivende < db/schema.sql
```

### Generate fake products

```shell
node util/generate-products.mjs
```

This will create a `data.json` file at repo top folder which will be used by the Postgres loader in next step.

### Load fake products into Postgres DB

```shell
node db/load-into-postgres.mjs
```

This will create 50,000 fake products with minimum information on Postgres database. You can run it again to get double or maybe also regenerate `data.json` so you don't have (probably? many?) duplicated products.

### Queue products on RabbitMQ

```shell
node util/product-queue.mjs
```

### Login to Multivende

Launch Express.js server and [login](http://localhost:3000/login) using a web browser. Login link will redirect you to Multivende auth server page where you need to give access to the app. Then Multivende will redirect you to our local endpoint `/configure` which will take care of requesting an access token and saving it to Postgres in order to use it in further requests.

### Upload products to Multivende

```shell
node util/product-loader.mjs
```

## Missing stuff

There's missing stuff from the requested exercise I couldn't finish. Below I list them and explain what would I do if I'd had more time:

### throttling

Currently the product loader is exiting on error, Multivende is returning a 'Response code 429 (Too Many Requests)' cause I'm hitting it too hard. I tried using `Channel.prefetch(1)`, from `amqplib`, which I thought would take items one-by-one from RabbitMQ. Maybe it does, but it does it so fast that we end up chocking Multivende API.

I'm a little but puzzled about this because I then tried delaying it via increasing the `setInterval` to 5 seconds, but it seems the `amqplib` method `Channel.consume()` goes at full speed no matter how little time you give it.

So, after doing some digging, my next attempt would be to use [`Channel.get`](https://amqp-node.github.io/amqplib/channel_api.html#channel_get), which takes a single message from the queue. I believe that with that, calling it only five times and an interval of one second, I'll solve the issue.

### token refresh

I didn't had time to implemente token refresh, so when you `/login`, Multivende says there's an app already and I have to change the name of the app.

### on code quality and cleanliness

Given time constraints and that this is not a real project anybody will be maintaining in the long run, I decided not to spend a single second setting up things like Prettier, Eslint, git hooks and other possible quality code ensurance tools.

There are several 'TODO' spread troughout the code, in particular I would have liked to add a configuration module to avoid having all those hardcoded strings (postgres connection, multivende api, rabbitmq connection, etc) in the code.

Of course this is not a reflection of how I manage my code under normal circumstances.

### minimum required Nodejs version

I used Node.js v20.5.1, I didn't have time to investigate what are the minimum required version to use things like `structuredClone` on the part 1. And there maybe other things that require an up-to-date Node.js version.

### on no unit tests

Exercise didn't requested them, but I like to code along with good unit tests.

## General notes

I wrote `util/generate-products.mjs` and `db/load-into-postgres.mjs` as separate script because the exercise required "to provide massive loader files", but a saner decision would have been to just do all, generation and loading, in a single step, avoiding the generation of the file `data.json`.
