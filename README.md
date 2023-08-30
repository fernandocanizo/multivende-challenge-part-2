# Multivende Coding Challenge - Part 2

## Setup

### Launch a RabbitMQ server with web management interface

```shell
docker run -itd --rm --name rabbitmq -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

You can access [management UI](http://localhost:15672/) after launch with `user:user` and `password:password` (set up different ones when launching docker container if you want).

### Launch a Postgres server and setup database

(Postgres configuration out of scope)

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

This will create 50,000 fake products with minimum information on Postgres database. You can run it again to get double or maybe also regenerate `data.json` so you don't have duplicated products.

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
