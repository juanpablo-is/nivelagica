import { useGames } from '@/store/index'
import { addDrawer } from '@/Drawer/store'
import Card from '../Card'

const GameList = () => {
  const { games } = useGames()

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
      <ul className='grid gap-1 grid-repeat-130'>
        {games.map(game => (
          <li key={game.id} className='relative'>
            <input
              id={game.id}
              type='radio'
              name='game'
              value={game.id}
              className='peer absolute w-full h-full top-0 -z-1'
              required
            />

            {game.drawerComponent && (
              <span
                className='i-lucide-help-circle absolute top-3 right-3 z-10 cursor-pointer hover:bg-accent'
                onClick={() => handlerShowDrawer(game)}
              />
            )}

            <Card
              as='label'
              htmlFor={game.id}
              className='gap-1 p-1 flex-col cursor-default'
            >
              {game.icon && <span className='text-2xl'>{game.icon}</span>}
              <h3 className='text-lg'>{game.title}</h3>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameList
