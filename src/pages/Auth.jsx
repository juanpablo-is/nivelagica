import { useMemo } from 'react'
import { Redirect } from 'wouter'

import { useGames } from '@/store'
import { Twitch as TwitchAPI } from '@/api'

const Auth = ({ children }) => {
  const sessionNumerica = useMemo(
    () => window.sessionStorage.getItem('numerica_jp'),
    []
  )
  const { setTwitchApi, twitchApi } = useGames()

  if (!sessionNumerica) {
    return <Redirect to='/' />
  }

  if (!twitchApi) {
    const session = JSON.parse(sessionNumerica)
    setTwitchApi(new TwitchAPI(session.token, session.user_id))
  }

  return children
}

export default Auth
