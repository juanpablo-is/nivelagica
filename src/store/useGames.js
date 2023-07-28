import { create } from 'zustand'
import { Client } from 'tmi.js'

export default create((set, get) => ({
  games: [
    {
      id: 'nick',
      title: 'Twitch nick',
      icon: '🥊',
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
    removeMod: false,
    timeout: false,
    countTimeout: 10
  },

  client: new Client({
    options: { debug: true },
    channels: ['jp__is']
  }),

  selectGame: id => {
    const { games } = get()
    const game = games.find(g => g.id === id)
    if (game) {
      set({ actualGame: game })
    }
  }
}))
