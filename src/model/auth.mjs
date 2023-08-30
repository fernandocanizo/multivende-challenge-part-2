import sql from '../../db/sql.mjs'

export const save = async authData => {
  try {
    await sql`insert into auth ${sql(authData)}`
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}

export const getConnectionData = async () => {
  try {
    const result = await sql`select token, merchant_id from auth order by created_on desc limit 1`
    return {
      token: result[0].token,
      merchantId: result[0].merchant_id,
    }
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}
