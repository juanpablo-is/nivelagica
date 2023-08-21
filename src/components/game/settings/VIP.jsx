const VIPSettings = () => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex flex-col gap-1 border-2 rounded-md p-4'>
        <div className='flex items-center w-full'>
          <input
            id='toggle_vip'
            type='checkbox'
            name='toggle_vip'
            className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
          />
          <label
            htmlFor='toggle_vip'
            className='w-full py-1 ml-2 font-medium text-gray-200 dark:text-gray-300'
          >
            Añadir VIP al high-score?
          </label>
        </div>
      </div>
    </div>
  )
}

export default VIPSettings
