import TwitchNick from '@/components/drawers/TwitchNick'

export default [
  {
    id: 'nick',
    title: 'Twitch nick',
    icon: '🥊',
    drawerComponent: TwitchNick,
    validate: ({ lastStore, data }) => {
      const { message: lastMessage, player: lastPlayer } = lastStore
      const { message_trim: message_data, message_type, display_name } = data
      const [message, ...parts] = message_data.split(' ')

      if (parts.length > 0) return { status: undefined }
      if (message_type !== 'chat') return { status: undefined }
      if (lastPlayer === display_name) return { status: undefined }

      if (!message.startsWith('@')) return { status: undefined }

      if (!lastMessage) return { status: message === `@${display_name}` }
      if (`@${lastPlayer}` !== message) return { status: false }

      return { status: true }
    }
  }
]