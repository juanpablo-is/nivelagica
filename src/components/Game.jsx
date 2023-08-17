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

  // Validate if message starts with command
  function validateCommandMessage (message, command) {
    const [c, ...m] = message.split(' ')

    if (c !== command || m.length === 0) return [false]
    return [true, m.join(' ')]
  }

  const handlerMessage = useCallback(
    async (channel, tags, message = '', self) => {
      if (self) return

      const {
        mod,
        username,
        ['message-type']: message_type,
        ['user-id']: user_id
      } = tags

      const data = {
        isMod: Boolean(mod),
        isBroadcaster: `#${username}` === channel,
        username,
        message_type,
        message
      }

      if (settings.command) {
        const [validateCommand, new_message] = validateCommandMessage(
          message,
          settings.command
        )

        if (!validateCommand) return

        data.message = new_message
      }

      const game = validate({ lastStore: ref.current, data })
      if (game.status === true) {
        const newScore = ref.current.score + 1
        setLastStore({
          message: data.message,
          player: username,
          score: newScore
        })

        if (newScore > high) {
          setScore({ high: newScore, player: username })
          await saveScore({
            account: channel.substring(1),
            player: username,
            score: newScore,
            game: idGame
          })
        }
      } else if (game.status === false) {
        setLastStore({ message: '', player: '', score: 0 })
        if (
          settings.timeout &&
          !(data.isBroadcaster || (data.isMod && !settings.timeoutMod))
        ) {
          const time =
            game.durationTimeout || settings.timeoutCount * ref.current.score
          await twitchApi.timeout({ user: user_id, time: time, game: idGame })
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
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-2'>
      <h2 className='flex flex-col items-center fs-calc(2vw_+_2vh_+_2vmin)'>
        Jugando{' '}
        <span className='text-accent font-bold fs-calc(5vw_+_2vh_+_2vmin)'>
          {title}
        </span>
      </h2>

      {player && (
        <header className='flex gap-1 fs-calc(2vw_+_1vh_+_2vmin)'>
          <p>
            Record: <span className='text-accent font-bold'>{high}</span> por{' '}
            {player}
          </p>
        </header>
      )}

      {lastStore.message && (
        <div className='flex flex-col items-center justify-center'>
          <div className='relative'>
            <p className='flex flex-col items-center justify-center min-w-[100px] p-[2vw] gap-2 rounded-full bg-accent uppercase max-w-[12rem] aspect-square fs-calc(3vw_+_3vh_+_1vmin) fs-min(5vw,_100%)'>
              {lastStore.message}
            </p>
            <span className='absolute flex items-center min-w-[2vw] min-h-[2vw] justify-center bg-dark min-w[30px] -top-2.5 -right-3.5 aspect-square border rounded-full fs-min(5vw,_100%) p-[min(6vw,20px)]'>
              {lastStore.score}
            </span>
          </div>
          <p className='fs-calc(1vw_+_2vh_+_2vmin)'>
            por{' '}
            <span className='fs-calc(3vw_+_2vh_+_2vmin)'>
              {lastStore.player || '-'}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Game
