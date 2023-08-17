import { useEffect } from 'react'
import { useLocation } from 'wouter'

import { Twitch as TwitchAPI } from '@/api'
import Jelly from '@/components/loaders/Jelly'
import { useGames } from '@/store'
import { KEY_SESSION_STORAGE } from '@/utils/index'

const OAuth = () => {
  const [_, setLocation] = useLocation()
  const setTwitchApi = useGames(p => p.setTwitchApi)

  useEffect(() => {
    async function onAuthTwitch () {
      const { hash } = window.location
      if (hash) {
        const path = '?' + hash.substring(1)
        const params = new URLSearchParams(path)
        if (params.has('access_token')) {
          const token = params.get('access_token')

          const api = new TwitchAPI(token)
          setTwitchApi(api)

          const [error, data] = await api.getAccountInfo(token)
          if (error) return setLocation('/')

          if (!token || !data.user_id || !data.login) {
            return setLocation('/')
          }

          api.setAccountId(data.user_id)
          window.sessionStorage.setItem(
            KEY_SESSION_STORAGE,
            JSON.stringify({
              token,
              user_id: data.user_id,
              channel: data.login
            })
          )
          return setLocation('/games')
        }
      }

      return setLocation('/')
    }

    onAuthTwitch()
  }, [])

  return (
    <div className='h-screen flex justify-center items-center'>
      <Jelly color='#9146FF' size='150px' />
    </div>
  )
}

export default OAuth
