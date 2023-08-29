import { faker } from '@faker-js/faker'

import { writeFile } from 'fs/promises'

const InventoryTypeId = '791a6654-c5f2-11e6-aad6-2c56dc130c0d'
const data = []

for (let i = 0; i < 50_000; i++) {
	data.push({
		name: faker.commerce.productName(),
		code: faker.number.int(100_000),
		InventoryTypeId,
		InternalCodeTypeId: null,
		ProductVersions: [{
			status: 'waiting-for-creation',
			code: faker.number.int(100_000),
			isDefaultVersion: true,
			InventoryTypeId,
			InternalCodeTypeId: null,
			position: 0,
		}],
	})
}

await writeFile('data.json', JSON.stringify(data, null, 2), { encoding: 'utf8' })
