import { useMemo } from 'react'
import { Redirect } from 'wouter'

import { useGames } from '@/store'
import { Twitch as TwitchAPI } from '@/api'
import { KEY_SESSION_STORAGE as KEY } from '@/utils/index'

const Auth = ({ children }) => {
  const session = useMemo(
    () => JSON.parse(window.sessionStorage.getItem(KEY) || '{}'),
    []
  )
  const { setTwitchApi, twitchApi } = useGames()

  if (!session || !session.channel || !session.token) {
    return <Redirect to='/' />
  }

  if (!twitchApi) {
    setTwitchApi(new TwitchAPI(session.token, session.user_id))
  }

  return children
}

export default Auth
