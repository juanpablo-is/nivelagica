import { useState } from 'react'
import Alert from '@/components/Alert'

const NOT_ALLOW_COMMANDS = ['!game']

const CommandSettings = () => {
  const [useCommand, setTimeout] = useState(false)

  function handlerBlurInput (e) {
    const value = e.target.value
    if (NOT_ALLOW_COMMANDS.includes(value)) {
      const confirm = window.confirm(
        'Este comando posiblemente se esté usando en tu canal, ¿Desea usar igualmente este comando?'
      )
      if (confirm) {
        const form = e.target.closest('form')
        form.querySelector('button[type=submit]')?.click()
      } else {
        e.target.value = ''
      }
    }
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex flex-col gap-1 border-2 rounded-md p-4'>
        <div className='flex items-center w-full'>
          <input
            id='use_command'
            type='checkbox'
            checked={useCommand}
            name='timeout'
            className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
            onChange={e => setTimeout(e.target.checked)}
          />
          <label
            htmlFor='use_command'
            className='w-full py-1 ml-2 text-sm font-medium text-gray-200 dark:text-gray-300'
          >
            Usar comando?
          </label>
        </div>

        {useCommand && (
          <>
            <Alert variant='warning'>
              Ten cuidado en usar un comando de un bot de tu canal
            </Alert>

            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor='command' className='text-sm font-medium'>
                Ingrese comando
              </label>
              <input
                id='command'
                type='text'
                name='command'
                placeholder='Por ejemplo, !game'
                required
                className='text-black px-2 py-1 rounded-md'
                onBlur={handlerBlurInput}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CommandSettings
