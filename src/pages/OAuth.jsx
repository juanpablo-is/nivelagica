import { useEffect } from 'react'
import { useLocation } from 'wouter'

import { Twitch as TwitchAPI } from '@/api'
import Jelly from '@/components/loaders/Jelly'
import { useGames } from '@/store'

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

          // const [error, data] = await api.getAccountInfo(token)
          // console.log(data);
          // if (error) {
          //   return
          //   // return setErrorAuth(
          //   //   'Se ha presentado un error en la autenticación, intente nuevamente'
          //   // )
          // }

          window.sessionStorage.setItem('numerica_token', token)
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
