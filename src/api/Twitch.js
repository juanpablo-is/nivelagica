import { catchify } from '@/utils'

const _URL = 'https://id.twitch.tv/oauth2'

const authURL = () => {
  const url = new URL(`${_URL}/authorize`)
  url.searchParams.set('client_id', 's7zgzmyk5osg4px90j6lfemmhukrx7')
  url.searchParams.set('response_type', 'token')
  url.searchParams.set('scope', 'openid moderator:manage:banned_users')
  url.searchParams.set('redirect_uri', location.origin + '/oauth')
  return url.href
}

const getAccountInfo = async token => {
  return await catchify(
    fetch(`${_URL}/validate`, {
      headers: { authorization: `OAuth ${token}` }
    }),
    { json: true }
  )
}

export default {
  authURL,
  getAccountInfo
}
