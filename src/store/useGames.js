import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Client } from 'tmi.js'

import TwitchNick from '@/components/drawers/TwitchNick'

const withStorageDOMEvents = store => {
  const storageEventCallback = e => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate()
    }
  }

  window.addEventListener('storage', storageEventCallback)

  return () => {
    window.removeEventListener('storage', storageEventCallback)
  }
}

const createStore = create(
  persist(
    (set, get) => ({
      games: [
        {
          id: 'nick',
          title: 'Twitch nick',
          icon: '🥊',
          drawerComponent: TwitchNick,
          validate: ({ lastStore, data }) => {
            const { message: lastMessage, player: lastPlayer } = lastStore
            const { message_trim, message_type, display_name } = data
            const [message, ...parts] = message_trim.split(' ')

            if (parts.length > 0) return { status: undefined }
            if (message_type !== 'chat') return { status: undefined }
            if (lastPlayer === display_name) return { status: undefined }

            if (!message.startsWith('@')) return { status: undefined }

            if (!lastMessage) return { status: message === `@${display_name}` }
            if (`@${lastPlayer}` !== message) return { status: false }

            return { status: true }
          }
        }
      ],
      actualGame: null,
      settings: {
        timeoutMod: false,
        timeout: false,
        timeoutCount: 1
      },

      account: { user_id: '96693344', user: 'jp__is' },

      client: new Client({
        options: { debug: true },
        channels: ['jp__is']
      }),

      twitchApi: null,
      setTwitchApi: instance => set({ twitchApi: instance }),

      selectGame: ({ game: id, ...settings }) => {
        const { games } = get()
        const game = games.find(g => g.id === id)
        if (game) {
          set(p => ({ actualGame: game, settings: { ...p.settings, ...settings } }))
        }
      }
    }),
    {
      name: 'numerica',
      partialize: state => ({})
    }
  )
)

export default createStore
withStorageDOMEvents(createStore)
