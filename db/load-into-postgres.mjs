import { readFile } from 'fs/promises';

import sql from './sql.mjs'

const data = JSON.parse(
  await readFile(
    new URL('../data.json', import.meta.url)
  )
)

const convert = datum => {
  return {
    name: datum.name,
    code: datum.code,
    inventory_type_id: datum.InventoryTypeId,
    internal_code_type_id: datum.InternalCodeTypeId,
    fk_status: datum.ProductVersions[0].status,
    pv_code: datum.ProductVersions[0].code,
    pv_is_default_version: datum.ProductVersions[0].isDefaultVersion,
    pv_inventory_type_id: datum.ProductVersions[0].InventoryTypeId,
    pv_internal_code_type_id: datum.ProductVersions[0].InternalCodeTypeId,
    pv_position: datum.ProductVersions[0].position,
  }
}

for (const datum of data) {
  const sqlDatum = convert(datum)

  try {
    await sql`
      insert into product ${
        sql(sqlDatum)
      }`
  } catch (e) {
    console.debug('>>>', e)
  }
}

process.exit(0)

