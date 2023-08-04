import { useEffect } from 'react'

import { useGames } from '@/store'
import { Game, Button } from '@/components'
import GameList from '@/components/game/GameList'
import SettingsGames from '@/components/game/SettingsGame'

const Games = () => {
  const { actualGame, selectGame } = useGames()
  const clientTMI = useGames(p => p.client)

  useEffect(() => {
    if (!clientTMI) return

    clientTMI.connect()

    return () => {
      clientTMI.disconnect()
    }
  }, [clientTMI])

  function handlerSubmit (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const { game, ...options } = Object.fromEntries(formData.entries())
    if (game) {
      selectGame(game, options)
    }
  }

  if (actualGame) {
    return <Game {...actualGame} score={{ high: 20, player: 'jp__is' }} />
  }

  return (
    <div className='grid gap-3 grid-repeat-130 max-w-2xl m-auto'>
      <form
        className='flex flex-col gap-3 items-center p-3'
        onSubmit={handlerSubmit}
      >
        <GameList />

        <SettingsGames />

        <Button variant='primary' type='submit'>
          JUGAR
        </Button>
      </form>
    </div>
  )
}

export default Games
