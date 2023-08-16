import { GameMode } from "./index";

class PrimeNumber extends GameMode {
  constructor() {
    super({
      id: 'prime',
      title: 'Números primos',
      icon: '123'
    })
  }

  validate = ({ lastStore, data }) => {
    const { message: lastMessage, player: lastPlayer } = lastStore
    const { message: message_data, message_type, display_name } = data
    const [message, ...parts] = message_data.split(' ')

    if (parts.length > 0) return { status: undefined }
    if (message_type !== 'chat') return { status: undefined }
    if (lastPlayer === display_name) return { status: undefined }

    const number = Number(message)
    if (Number.isNaN(number)) return { status: undefined }

    if (lastMessage && number <= lastMessage) return { status: false }

    const next_prime = this.nextPrime(lastMessage)
    console.log({ next_prime });
    return { status: next_prime === number }
  }

  isPrimeNumber(n) {
    if (n <= 1) return false;

    for (let i = 2; i < n; i++) {
      if (n % i == 0) return false;
    }

    return true;
  }

  isPrime(num) {
    let sqrtnum = Math.floor(Math.sqrt(num));
    let prime = num !== 1;
    for (let i = 2; i < sqrtnum + 1; i++) {
      if (num % i === 0) {
        prime = false;
        break;
      };
    };
    return prime;
  }

  nextPrime(num = 1) {
    while (!this.isPrime(++num)) {
    };
    return num;
  };
}

export default new PrimeNumber()