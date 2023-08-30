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
