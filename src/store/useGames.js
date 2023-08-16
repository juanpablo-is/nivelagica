import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Client } from 'tmi.js'
import { gamesMode } from '@/utils/index'

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
      games: gamesMode,
      actualGame: null,
      settings: {
        timeoutMod: false,
        timeout: false,
        timeoutCount: 1,
        command: null,
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
