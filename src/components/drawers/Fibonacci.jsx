const Fibonacci = () => {
  return (
    <div className='max-w-[max(36rem,50%)] m-auto sm:text-lg flex flex-col gap-2'>
      <p>
        Este modo de juego consiste en, conseguir el puntaje más alto
        escribiendo la secuencia de Fibonacci:
      </p>

      <ul className='list-inherit flex flex-col gap-1 p-revert'>
        <li>La secuencia inicia con el 2° número 1 <em>(1, 2, 3, 5...)</em></li>
      </ul>
    </div>
  )
}

export default Fibonacci
