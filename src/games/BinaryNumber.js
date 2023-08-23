import { GameMode } from "./index";
import DrawerComponent from "@/components/drawers/BinaryNumber";

class PrimeNumber extends GameMode {
  constructor() {
    super({
      id: 'binary',
      title: 'Números binarios',
      icon: '1010',
      time: 1692628472000
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
    if (!message) return { status: undefined }

    if (!lastMessage) return { status: message === '0' }

    const num = Number(message)
    if (isNaN(num)) return { status: undefined }

    const decimal = this.binaryToDecimal(message)
    const decimal_last = this.binaryToDecimal(lastMessage)

    return { status: decimal === decimal_last + 1 }
  }

  binaryToDecimal(binary) {
    if (!binary) return 0

    const num = Number(binary)
    if (isNaN(num) || num < 0) return -1

    let decimal = 0;
    binary = num.toString()
    const binaryLength = binary.length;

    for (let i = binaryLength - 1; i >= 0; i--) {
      if (binary[i] !== "0" && binary[i] !== "1") return 0;
      if (binary[i] == "1") decimal += Math.pow(2, binaryLength - 1 - i);
    }
    return decimal;
  }

}

export default new PrimeNumber()