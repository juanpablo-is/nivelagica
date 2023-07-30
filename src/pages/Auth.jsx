import { useMemo } from 'react'
import { Redirect } from 'wouter'

import { useGames } from '@/store'
import { Twitch as TwitchAPI } from '@/api'

const Auth = ({ children }) => {
  const sessionToken = useMemo(
    () => window.sessionStorage.getItem('numerica_token'),
    []
  )
  const { setTwitchApi, twitchApi } = useGames()

  if (!sessionToken) {
    return <Redirect to='/' />
  }

  if (!twitchApi) {
    setTwitchApi(new TwitchAPI(sessionToken))
  }

  return children
}

export default Auth
