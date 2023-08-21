import { catchify } from '@/utils'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || ''

class TwitchAPI {
  static #TWITCH_URL = 'https://id.twitch.tv/oauth2'
  static #HELIX_URL = 'https://api.twitch.tv/helix'

  #token = null
  #account_id = null

  constructor(token, account_id) {
    this.#token = token
    this.#account_id = account_id
  }

  setAccountId(account) {
    this.#account_id = account
  }

  async timeout({ user, time, game }) {
    if (!this.#account_id) return

    return await this.timeoutUser({
      data: {
        duration: time == 0 || Number.isNaN(time) ? 1 : time,
        user_id: user,
        reason: `Nivelagica en modo [${game}]`
      },
      token: this.#token
    })
  }

  async toggleVIP(lastVip, newVip) {
    await this.removeVIP(lastVip)
    await this.addVIP(newVip)
  }

  // API
  async getAccountInfo() {
    if (!this.#token) return

    return await catchify(
      fetch(`${TwitchAPI.#TWITCH_URL}/validate`, {
        headers: { authorization: `OAuth ${this.#token}` }
      }),
      { json: true }
    )
  }

  async timeoutUser({ data }) {
    if (!this.#token) return

    const url = new URL(`${TwitchAPI.#HELIX_URL}/moderation/bans`)
    url.searchParams.set('broadcaster_id', this.#account_id)
    url.searchParams.set('moderator_id', this.#account_id)

    return await catchify(
      fetch(url.href, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${this.#token}`,
          'Client-Id': CLIENT_ID,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      }),
      { json: true }
    )
  }

  async removeVIP(user_id) {
    if (!this.#token || !user_id) return

    const url = new URL(`${TwitchAPI.#HELIX_URL}/channels/vips`)
    url.searchParams.set('broadcaster_id', this.#account_id)
    url.searchParams.set('user_id', user_id)

    return await catchify(
      fetch(url.href, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${this.#token}`,
          'Client-Id': CLIENT_ID,
          'Content-Type': 'application/json'
        }
      }),
      { json: true }
    )
  }

  async addVIP(user_id) {
    if (!this.#token || !user_id) return

    const url = new URL(`${TwitchAPI.#HELIX_URL}/channels/vips`)
    url.searchParams.set('broadcaster_id', this.#account_id)
    url.searchParams.set('user_id', user_id)

    return await catchify(
      fetch(url.href, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${this.#token}`,
          'Client-Id': CLIENT_ID,
          'Content-Type': 'application/json'
        }
      }),
      { json: true }
    )
  }

  static authURL() {
    const url = new URL(`${TwitchAPI.#TWITCH_URL}/authorize`)
    url.searchParams.set('client_id', CLIENT_ID)
    url.searchParams.set('response_type', 'token')
    url.searchParams.set('scope', 'openid channel:manage:vips moderator:manage:banned_users')
    url.searchParams.set('redirect_uri', location.origin + '/oauth')
    return url.href
  }
}

export default TwitchAPI
