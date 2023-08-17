import { GameMode } from "./index";

class Fibonacci extends GameMode {
  constructor() {
    super({
      id: 'fibonacci',
      title: 'Fibonacci',
      icon: '🔗',
      time: 1692232745000
    })
  }

  validate = ({ lastStore, data }) => {
    const { message: lastMessage, player: lastPlayer } = lastStore
    const { message: message_data, message_type, username } = data
    const [message, ...parts] = message_data.split(' ')

    if (parts.length > 0) return { status: undefined }
    if (message_type !== 'chat') return { status: undefined }
    if (lastPlayer === username) return { status: undefined }

    const number = Number(message)
    if (Number.isNaN(number)) return { status: undefined }

    if (lastMessage && number <= lastMessage) return { status: false }

    const next_fibonacci = this.nextFibonacci(lastMessage)
    return { status: next_fibonacci === number }
  }

  nextFibonacci(n) {
    if (!n) return 1
    if (n === 1) return 2

    const a = n * (1 + Math.sqrt(5)) / 2.0;
    return Math.round(a);
  }
}

export default new Fibonacci()