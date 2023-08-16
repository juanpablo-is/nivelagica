const TwitchNick = () => {
  return (
    <div className='max-w-[max(36rem,50%)] m-auto sm:text-lg flex flex-col gap-2'>
      <p>
        Este modo de juego consiste en, conseguir el puntaje más alto
        escribiendo el username de la cuenta del mensaje anterior:
      </p>

      <ul className='list-inherit flex flex-col gap-1 p-revert'>
        <li>El nombre del usuario debe estar seguido de un @ (@jp__is)</li>
        <li>
          Si no hay mensaje previo o se reinicia, para empezar debes enviar tu
          propio username (ex, <em>@jp__is</em>)
        </li>
        <li>Solo se permite un mensaje consecutivo por usuario</li>
      </ul>
    </div>
  )
}

export default TwitchNick
