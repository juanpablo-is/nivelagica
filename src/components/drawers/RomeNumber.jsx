const RomeNumber = () => {
  return (
    <div className='max-w-[max(36rem,50%)] m-auto sm:text-lg flex flex-col gap-2'>
      <p>
        Este modo de juego consiste en, conseguir el puntaje más alto
        siguiendo la secuencia numérica basada en los números romanos:
      </p>

      <ul className='list-inherit flex flex-col gap-1 p-revert'>
        <li>Permite tanto minusculas o mayusculas <em>(no case-sensitive)</em></li>
        <li>El valor inicial debe ser <strong>I</strong> </li>
      </ul>
    </div>
  )
}

export default RomeNumber
