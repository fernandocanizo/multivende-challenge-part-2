#!/usr/bin/env node

import amqp from 'amqplib'
import got from 'got'

import { getConnectionData } from '../src/model/auth.mjs'
import { setCreatedStatus } from '../src/model/product.mjs'

const multivendeConnData = await getConnectionData()

// TODO move connection string and queue name to config
const queue = 'products'
const rmqConn = await amqp.connect('amqp://user:password@localhost')

const channel = await rmqConn.createChannel()
await channel.assertQueue(queue)
// Throttle message consumption to abide to allowed request per second from
// Multivende
// Tried to use 5, but it seems setInterval overlaps. So play with prefetch and
// setInterval timer to find the seet spot
channel.prefetch(1)

const requeue = product => {
	// TODO implement
	// increment tries in DB, if tries >= 3, log and discard
	// else requeue into RabbitMQ
	console.log('=== REQUEUE START ===')
	console.log(product.toString())
	console.log('=== REQUEUE END ===')
}

const loadProduct = async product => {
		// TODO use an url joiner, get base URL from config
	const url = `https://app.multivende.com/api/m/${multivendeConnData.merchantId}/products`
	// TODO handle possible error
	// TODO set up max retry to 3 and provide logic to requeue
	const requestOptions = {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `Bearer ${multivendeConnData.token}`,
		},
		timeout: {
			send: 3500,
		},
		json: JSON.parse(product),
	}

	const { body, statusCode } = await got.post(url, requestOptions)
	const reply = JSON.parse(body)

	if (statusCode !== 201 || body.error) {
		console.debug({ statusCode, error: body.error })
		requeue(product)
		// TODO replace for `return`
		process.exit(0) // just for development
	} else if (reply.status === 'created') {
		console.log('>>>', { id: reply.code, name: reply.name, status: reply.status })
		await setCreatedStatus(reply.code)
		return
	}

	console.log(`!!! We shouldn't reach here`)
}

const consume = async () => {
	channel.consume(queue, async (msg) => {
		if (msg !== null) {
			console.log('<<< Processing product:', msg.content.toString())
			await loadProduct(msg.content)
			channel.ack(msg)
		} else {
			console.log('Consumer cancelled by server')
		}
	})
}

setInterval(consume, 5000)
