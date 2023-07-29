import { useEffect } from 'react'

import { Card, Game } from '@/components/index'
import { useGames } from '@/store'

const Games = () => {
  const { games, actualGame, selectGame } = useGames()
  const clientTMI = useGames(p => p.client)

  useEffect(() => {
    if (!clientTMI) return

    clientTMI.connect()

    return () => {
      clientTMI.disconnect()
    }
  }, [clientTMI])

  const handleSelectGame = e => {
    selectGame(e)
  }

  if (actualGame) {
    return <Game {...actualGame} score={{ high: 20, player: 'jp__is' }} />
  }

  return (
    <div className='grid gap-3 grid-repeat-130 max-w-2xl m-auto'>
      {games.map(game => (
        <Card
          key={game.id}
          className='gap-1 flex-col cursor-default'
          onClick={() => handleSelectGame(game.id)}
        >
          {game.icon && <span className='text-2xl'>{game.icon}</span>}
          <h3>{game.title}</h3>
        </Card>
      ))}
    </div>
  )
}

export default Games
