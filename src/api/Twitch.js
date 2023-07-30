import { catchify } from '@/utils'
class TwitchAPI {
  static TWITCH_URL = 'https://id.twitch.tv/oauth2'
  static HELIX_URL = 'https://api.twitch.tv/helix'

  #token = null

  constructor (token) {
    this.#token = token
  }

  async getAccountInfo () {
    return await catchify(
      fetch(`${this.TWITCH_URL}/validate`, {
        headers: { authorization: `OAuth ${this.#token}` }
      }),
      { json: true }
    )
  }

  async timeoutUser ({ account, data }) {
    const url = new URL(`${this.HELIX_URL}/moderation/bans`)
    url.searchParams.set('broadcaster_id', account)
    url.searchParams.set('moderator_id', account)

    return await catchify(
      fetch(url.href, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${this.#token}`,
          'Client-Id': 's7zgzmyk5osg4px90j6lfemmhukrx7',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      }),
      { json: true }
    )
  }

  static authURL () {
    const url = new URL(`${this.TWITCH_URL}/authorize`)
    url.searchParams.set('client_id', 's7zgzmyk5osg4px90j6lfemmhukrx7')
    url.searchParams.set('response_type', 'token')
    url.searchParams.set('scope', 'openid moderator:manage:banned_users')
    url.searchParams.set('redirect_uri', location.origin + '/oauth')
    return url.href
  }
}

export default TwitchAPI
