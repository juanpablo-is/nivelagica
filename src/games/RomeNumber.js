import { GameMode } from "./index";

class PrimeNumber extends GameMode {
  constructor() {
    super({
      id: 'rome',
      title: 'Números romanos',
      icon: 'VII',
      time: 1692381156000
    })
  }

  validate = ({ lastStore, data }) => {
    const { message: lastMessage, player: lastPlayer } = lastStore
    const { message: message_data, message_type, username } = data
    const [message, ...parts] = message_data.split(' ')

    if (parts.length > 0) return { status: undefined }
    if (message_type !== 'chat') return { status: undefined }
    if (lastPlayer === username) return { status: undefined }
    if (!message) return { status: undefined }

    const rome_number = this.romeToNumber(message)
    const rome_number_last = this.romeToNumber(lastMessage)

    const check = !isNaN(rome_number) && rome_number === rome_number_last + 1
    return { status: check }
  }

  romeToNumber(txtRome) {
    txtRome = txtRome.toUpperCase();
    if (
      !/^M*(CM|CD|(D?C{0,3}))?(XC|XL|(L?X{0,3}))?(IX|IV|(V?I{0,3}))?$/.test(
        txtRome
      )
    )
      return NaN;

    let value = 0;
    txtRome.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
      value += {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      }[i];
    });

    return value;
  }

}

export default new PrimeNumber()