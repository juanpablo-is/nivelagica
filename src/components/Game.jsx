import { useEffect, useCallback } from 'react'
import { useGames } from '@/store'
import { useStateRef } from '@/hooks'

const Game = ({ title, score = {}, validate }) => {
  const { high, player } = score
  const clientTMI = useGames(p => p.client)

  const [lastStore, setLastStore, ref] = useStateRef({
    message: '',
    player: '',
    score: 0
  })

  const handlerMessage = useCallback((channel, tags, message = '', self) => {
    if (self) return

    const {
      mod,
      ['display-name']: display_name,
      ['message-type']: message_type
    } = tags

    const data = {
      mod,
      display_name,
      message_type,
      message,
      message_trim: message.trim()
    }

    const { status } = validate({ lastStore: ref.current, data })
    if (status === true) {
      setLastStore(p => ({ message, player: display_name, score: p.score + 1 }))
      // validar si es high-score y guardar
    } else if (status === false) {
      setLastStore({ message: '', player: '', score: 0 })
      // validar si se debe dar timeout
    }
  }, [])

  useEffect(() => {
    if (!clientTMI) return

    clientTMI.on('message', handlerMessage)
    return () => {
      clientTMI.off('message', handlerMessage)
    }
  }, [clientTMI, handlerMessage])

  return (
    <div>
      <h2>
        Playing <span className='text-light font-bold'>{title}</span>
      </h2>
      <header className='flex gap-1 flex-col'>
        <span>HIGH SCORE: {high}</span>
        <span>by {player}</span>
      </header>

      <span>{JSON.stringify(lastStore)}</span>
    </div>
  )
}

export default Game
