import { useState } from 'react'

const TimeoutSettings = () => {
  const [timeout, setTimeout] = useState(false)
  return (
    <div className='flex flex-col gap-2 p-4 w-full border-2 rounded-md'>
      <div className='grid grid-repeat-250 gap-2'>
        <div className='flex items-center'>
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
            className='w-full py-1 ml-2 text-sm font-medium text-gray-200 dark:text-gray-300'
          >
            Timeout a usuarios?
          </label>
        </div>

        {timeout && (
          <div className='flex items-center'>
            <input
              id='timeout_mod'
              type='checkbox'
              defaultChecked={false}
              name='timeoutMod'
              className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
            />
            <label
              htmlFor='timeout_mod'
              className='w-full py-1 ml-2 text-sm font-medium text-gray-200 dark:text-gray-300'
            >
              Timeout a moderadores?
            </label>
          </div>
        )}
      </div>

      {timeout && (
        <div className='flex flex-col gap-2'>
          <label htmlFor='timeout_count' className='text-sm font-medium'>
            Tiempo de timeout (s)
          </label>
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

export default TimeoutSettings
