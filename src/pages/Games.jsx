import { useEffect } from 'react'

import { useGames } from '@/store'
import { Drawer } from '@/Drawer'
import { Game, Button } from '@/components'
import GameList from '@/components/game/GameList'
import SettingsGames from '@/components/game/settings'

const Games = () => {
  const { actualGame, selectGame } = useGames()
  const connectTMI = useGames(p => p.connectTMI)

  useEffect(connectTMI, [connectTMI])

  function handlerSubmit (e) {
    e.preventDefault()

    const inputs = e.target.querySelectorAll('input')
    const types = [...inputs].reduce((acc, input) => {
      acc[input.name] = input.type
      return acc
    }, {})

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    const new_options = Object.entries(data).reduce((acc, [key, value]) => {
      const type = types[key]

      acc[key] = value
      if (type === 'checkbox') {
        acc[key] = value === 'on'
      }

      return acc
    }, {})

    if (new_options.game) {
      selectGame(new_options)
    }
  }

  if (actualGame) {
    // return <Game {...actualGame} score={{ high: 20, player: 'jp__is' }} />
    return <Game {...actualGame} />
  }

  return (
    <div className='grid gap-3 grid-repeat-130 max-w-2xl m-auto'>
      <form
        className='flex flex-col gap-3 items-center p-3'
        onSubmit={handlerSubmit}
      >
        <Drawer />

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
