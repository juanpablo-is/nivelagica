import { useEffect } from 'react'
import { useLocation } from 'wouter'

import { getAccountInfo } from '@/api/Twitch'
import Jelly from '@/components/loaders/Jelly'

const OAuth = () => {
  const [_, setLocation] = useLocation()

  useEffect(() => {
    async function onAuthTwitch () {
      const { hash } = window.location
      if (hash) {
        const path = '?' + hash.substring(1)
        const params = new URLSearchParams(path)
        if (params.has('access_token')) {
          const token = params.get('access_token')
          // const [error, data] = await getAccountInfo(token)
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
