import sql from '../../db/sql.mjs'

export const save = async authData => {
  try {
    await sql`insert into auth ${sql(authData)}`
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}

export const getToken = async () => {
  try {
    const result = await sql`select token from auth order by created_on desc limit 1`
    return result[0].token
  } catch (e) {
    console.debug('>>>', e)
    return false
  }
}
