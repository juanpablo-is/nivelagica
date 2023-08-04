import { useState } from 'react'

const SettingsGames = () => {
  const [timeout, setTimeout] = useState(false)

  return (
    <div className='flex flex-col gap-2 w-full'>
      <h2 className='text-lg'>Configuración:</h2>

      <div className='grid grid-repeat-250 gap-3'>
        <div className='flex items-center pl-4 border-2 rounded-md'>
          <input
            id='timeout_user'
            type='checkbox'
            checked={timeout}
            name='timeout'
            className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
            onChange={e => setTimeout(e.target.checked)}
          />
          <label
            htmlFor='timeout_user'
            className='w-full py-4 ml-2 text-sm font-medium text-gray-200 dark:text-gray-300'
          >
            Timeout a usuarios?
          </label>
        </div>

        {timeout && (
          <div className='flex items-center pl-4 border-2 rounded-md'>
            <input
              id='timeout_mod'
              type='checkbox'
              defaultChecked={false}
              name='timeoutMod'
              className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
            />
            <label
              htmlFor='timeout_mod'
              className='w-full py-4 ml-2 text-sm font-medium text-gray-200 dark:text-gray-300'
            >
              Timeout a moderadores?
            </label>
          </div>
        )}
      </div>

      {timeout && (
        <div className='flex pl-4 border-2 rounded-md flex-col p-2 gap-2'>
          <label htmlFor='timeout_count' className='text-sm font-medium'>Tiempo de timeout (s)</label>
          <input
            id='timeout_count'
            type='number'
            name='timeoutCount'
            defaultValue={1}
            min={1}
            max={100}
            className='text-black px-2 py-1 rounded-md'
          />
        </div>
      )}
    </div>
  )
}

export default SettingsGames
