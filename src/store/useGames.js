import { create } from 'zustand'
import { Client } from 'tmi.js'
import { KEY_SESSION_STORAGE, gamesMode } from '@/utils/index'

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

    client: null,
    connectTMI: () => {
      const { channel } = JSON.parse(window.sessionStorage.getItem(KEY_SESSION_STORAGE) || "{}")
      if (!channel) return

      const client = new Client({
        options: { debug: true },
        channels: [channel]
      })

      client.connect()
      set({ client: client })

      return () => client.disconnect()
    },

    twitchApi: null,
    setTwitchApi: instance => set({ twitchApi: instance }),

    selectGame: ({ game: id, ...settings }) => {
      const { games } = get()
      const game = games.find(g => g.id === id)
      if (game) {
        set(p => ({ actualGame: game, settings: { ...p.settings, ...settings } }))
      }
    }
  })
)

export default createStore
withStorageDOMEvents(createStore)
