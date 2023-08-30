#!/usr/bin/env node

import amqp from 'amqplib'

import { getAll } from '../src/model/product.mjs'

const rawProductList = await getAll()

const productList = rawProductList.map(product => {
	return Buffer.from(JSON.stringify({
		id: product.id,
		name: product.name,
		code: product.code,
		InventoryTypeId: product.inventory_type_id,
		InternalCodeTypeId: product.internal_code_type_id,
		ProductVersions: [
			{
				status: product.fk_status,
				code: product.pv_code,
				isDefaultVersion: product.pv_is_default_version,
				InventoryTypeId: product.inventory_type_id,
				InternalCodeTypeId: product.internal_code_type_id,
				position: product.pv_position,
			}
		]
	}))
})

// TODO move connection string and queue name to config
const queue = 'products'
const rmqConn = await amqp.connect('amqp://user:password@localhost')

const channel = await rmqConn.createChannel()
await channel.assertQueue(queue)

for (const productBuffer of productList) {
	channel.sendToQueue(queue, productBuffer)
}

await channel.close()

process.exit(0)
