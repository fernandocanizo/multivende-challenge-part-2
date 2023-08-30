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
    await sql`update product set status = 'created' where id = ${productId}`
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}
