import { useState } from 'react'

const CommandSettings = () => {
  const [useCommand, setTimeout] = useState(false)
  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex flex-col gap-1 border-2 rounded-md'>
        <div className='flex items-center pl-4 w-full'>
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
            className='w-full py-4 ml-2 text-sm font-medium text-gray-200 dark:text-gray-300'
          >
            Usar comando?
          </label>
        </div>

        {useCommand && (
          <div className='flex pl-4 flex-col p-2 gap-2 w-full'>
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
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CommandSettings
