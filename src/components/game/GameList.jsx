import { useMemo } from 'react'
import { useGames } from '@/store/index'
import GameCard from './GameCard'
import { addDrawer } from '@/Drawer/store'

const DIFF = 3600000 * 24 * 7

const GameList = () => {
  const { games } = useGames()
  const time = useMemo(() => Math.floor((+new Date() - DIFF) / 1000), [])

  function handlerShowDrawer ({ drawerComponent: Component, title }) {
    if (Component) {
      addDrawer(<Component />, {
        position: 'bottom',
        Header: (
          <h5 className='inline-flex items-center gap-2 text-lg font-semibold text-gray-400'>
            <span className='i-lucide-info' /> {title}
          </h5>
        )
      })
    }
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <h2 className='text-lg'>Juegos:</h2>
      <p>Seleccione un modo de juego</p>
      <ul className='grid gap-1 grid-repeat-130 max-h-[30vh] overflow-y-auto py-3'>
        {games.map(game => (
          <GameCard
            game={game}
            key={game.id}
            isNew={game.time && Math.floor(game.time / 1000) - time >= 0}
            onShowDrawer={() => handlerShowDrawer(game)}
          />
        ))}
      </ul>
    </div>
  )
}

export default GameList
