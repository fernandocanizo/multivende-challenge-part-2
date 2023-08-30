#!/usr/bin/env node

import amqp from 'amqplib'

import { getAll } from '../src/model/product.mjs'

const rawProductList = await getAll()

const productList = rawProductList.map(product => {
	return JSON.stringify({
		name: product.name,
		code: product.id,
		InventoryTypeId: product.inventory_type_id,
		InternalCodeTypeId: product.internal_code_type_id,
		ProductVersions: [
			{
				status: product.fk_status,
				code: product.id,
				isDefaultVersion: product.pv_is_default_version,
				InventoryTypeId: product.inventory_type_id,
				InternalCodeTypeId: product.internal_code_type_id,
				position: product.pv_position,
			}
		]
	})
})

// TODO move connection string and queue name to config
const queue = 'products'
const rmqConn = await amqp.connect('amqp://user:password@localhost')

const channel = await rmqConn.createChannel()
await channel.assertQueue(queue)

for (const product of productList) {
	channel.sendToQueue(queue, Buffer.from(product))
}

await channel.close()

process.exit(0)
