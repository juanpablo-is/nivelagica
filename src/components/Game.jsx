import { useEffect, useCallback, useState } from 'react'

import { useGames } from '@/store'
import { useStateRef } from '@/hooks'

const Game = ({ id: idGame, title, score = {}, validate }) => {
  const [{ high, player }, setScore] = useState({
    high: score.high || 0,
    player: score.player || ''
  })
  const { client: clientTMI, twitchApi, settings = {} } = useGames()

  const [lastStore, setLastStore, ref] = useStateRef({
    message: '',
    player: '',
    score: 0
  })

  async function saveScore (a) {
    console.log(a)
  }

  const handlerMessage = useCallback(
    async (channel, tags, message = '', self) => {
      if (self) return

      const {
        mod,
        ['display-name']: display_name,
        ['message-type']: message_type,
        ['user-id']: user_id
      } = tags

      const data = {
        isMod: Boolean(mod),
        isBroadcaster: `#${display_name}` === channel,
        display_name,
        message_type,
        message,
        message_trim: message.trim()
      }

      const { status } = validate({ lastStore: ref.current, data })
      if (status === true) {
        const newScore = ref.current.score + 1
        setLastStore({ message, player: display_name, score: newScore })

        if (newScore > high) {
          setScore({ high: newScore, player: display_name })
          await saveScore({
            account: channel.substring(1),
            player: display_name,
            score: newScore,
            game: idGame
          })
        }
      } else if (status === false) {
        setLastStore({ message: '', player: '', score: 0 })
        if (
          settings.timeout &&
          !(data.isBroadcaster || (data.isMod && !settings.timeoutMod))
        ) {
          await twitchApi.timeout({ user: user_id, time: 2, game: idGame })
        }
      }
    },
    []
  )

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
        Playing <span className='text-accent font-bold'>{title}</span>
      </h2>

      {player && (
        <header className='flex gap-1 flex-col'>
          <span>HIGH SCORE: {high}</span>
          <span>by {player}</span>
        </header>
      )}

      <span>{JSON.stringify(lastStore)}</span>
    </div>
  )
}

export default Game
