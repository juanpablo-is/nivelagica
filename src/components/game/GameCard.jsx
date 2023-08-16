import Card from '../Card'

const GameCard = ({ game, isNew, onShowDrawer }) => {
  return (
    <li className='relative'>
      {isNew && (
        <span className='bg-indigo-500 text-sm -top-2 left-3 z-100 font-medium text-white text-center rounded-full px-2 py-0.5 absolute '>
          Nuevo modo juego
        </span>
      )}
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
          onClick={() => onShowDrawer(game)}
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
  )
}

export default GameCard
