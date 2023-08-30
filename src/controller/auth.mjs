import got from 'got'
import path from 'path'
import { fileURLToPath } from 'url'
import auth from '../model/auth.mjs'

export const login = (_, res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  return res.sendFile(path.join(__dirname, 'view/index.html'))
}

export const getToken = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')

  // TODO all hardcoded stuff should come from config module
  const data = await got.post('https://app.multivende.com/oauth/access-token', {
    json: {
      client_id: '896123781342',
      client_secret: 'MjA5tPEuOkYS600yeJdDNCteBS5uKsHxdugztcXiWiOKqYmlYT',
      grant_type: 'authorization_code',
      code: req.query.code,
    }
  }).json();

  const authData = {
    oauth_client_id: data.OauthClientId,
    merchant_id: data.MerchantId,
    merchant_app_id: data.MerchantAppId,
    expires_at: data.expiresAt,
    refresh_token: data.refreshToken,
    refresh_token_expires_at: data.refreshTokenExpiresAt,
    token: data.token,
  }

  await auth.save(authData)

  return res.status(200).end()
}

