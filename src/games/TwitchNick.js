import { GameMode } from "./index";
import DrawerComponent from '@/components/drawers/TwitchNick'

class TwitchNick extends GameMode {
  constructor() {
    super({
      id: 'nick',
      title: 'Twitch nick',
      icon: '🥊',
      weight: 0,
      time: 1692224284000
    })

    this.setDrawerComponent(DrawerComponent)
  }

  validate = ({ lastStore, data }) => {
    const { message: lastMessage, player: lastPlayer } = lastStore
    const { message: message_data, message_type, username } = data
    const [message, ...parts] = message_data.split(' ')

    if (parts.length > 0) return { status: undefined }
    if (message_type !== 'chat') return { status: undefined }
    if (lastPlayer === username) return { status: undefined }

    if (!message.startsWith('@')) return { status: undefined }

    if (!lastMessage) return { status: message === `@${username}` }
    if (`@${lastPlayer}` !== message) return { status: false }

    return { status: true }
  }
}

export default new TwitchNick()