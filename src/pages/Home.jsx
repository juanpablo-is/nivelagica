import Button from '@/components/Button'
import Footer from '@/components/Footer'

const Home = () => {
  return (
    <div className='flex flex-col w-full h-screen items-center p-3 gap-2 font-primary'>
      <main className='flex-1 flex flex-col justify-center gap-3 items-center'>
        <header className='flex flex-col gap-1 items-center'>
          <span className='fs-calc(0.4em_+_3.5vw)'>Juega</span>
          <h1 className='fs-calc(0.1em_+_7vw)'>NUMÉRICA</h1>
        </header>
        <Button variant='primary'>Ingresar</Button>
      </main>
      <Footer />
    </div>
  )
}

export default Home
