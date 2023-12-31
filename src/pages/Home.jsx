import { useMemo } from 'react'
import { Twitch } from '@/api'
import { Button, Footer, Alert } from '@/components'

const Home = () => {
  const URL = useMemo(Twitch.authURL, [])

  return (
    <div className='flex flex-col w-full h-screen items-center p-3 gap-2 font-primary'>
      <main className='flex-1 flex flex-col justify-center gap-3 items-center'>
        <header className='flex flex-col gap-1 items-center'>
          <span className='fs-calc(0.4em_+_3.5vw)'>Juega</span>
          <h1 className='fs-calc(0.5em_+_8vw)'>
            {[...'NIVELAGICA'].map((letter, index) => (
              <span key={index} className='h-logo'>
                {letter}
              </span>
            ))}
          </h1>
        </header>
        <Alert variant="warning" ><strong>¡CUIDADO!</strong> no muestre la página de autenticación, se puede ver el token</Alert>
        <Button as='a' variant='primary' href={URL} target="_blank">
          Ingresar
        </Button>
      </main>
      <Footer />
    </div>
  )
}

export default Home
