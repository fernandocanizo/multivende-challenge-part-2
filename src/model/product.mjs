import sql from '../../db/sql.mjs'

export const getAll = async () => {
  try {
    const result = await sql`select * from product`
    return result
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}

export const setCreatedStatus = async productId => {
  try {
    await sql`update product set fk_status = 'created' where id = ${productId}`
    return true
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}

export const getStatus = async () => {
  try {
    const result = await sql`select fk_status, count(fk_status) from product group by fk_status`
    return result
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}
