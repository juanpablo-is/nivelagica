import { useMemo } from 'react'
import { Redirect } from 'wouter'

import { useGames } from '@/store'
import { Twitch as TwitchAPI } from '@/api'

const Auth = ({ children }) => {
  const sessionNumerica = useMemo(
    () => JSON.parse(window.sessionStorage.getItem('numerica_jp') || '{}'),
    []
  )
  const { setTwitchApi, twitchApi } = useGames()

  if (!sessionNumerica || !sessionNumerica.channel || !sessionNumerica.token) {
    return <Redirect to='/' />
  }

  if (!twitchApi) {
    setTwitchApi(new TwitchAPI(sessionNumerica.token, sessionNumerica.user_id))
  }

  return children
}

export default Auth
