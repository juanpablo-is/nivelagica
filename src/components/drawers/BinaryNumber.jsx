const BinaryNumber = () => {
  return (
    <div className='max-w-[max(36rem,50%)] m-auto sm:text-lg flex flex-col gap-2'>
      <p>
        Este modo de juego consiste en, conseguir el puntaje más alto
        siguiendo la secuencia numérica basada en números binarios:
      </p>

      <ul className='list-inherit flex flex-col gap-1 p-revert'>
        <li>El valor inicial debe ser <strong>0</strong> </li>
      </ul>
    </div>
  )
}

export default BinaryNumber
