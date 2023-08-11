const TwitchNick = () => {
  return (
    <div>
      <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
        Supercharge your hiring by taking advantage of our{' '}
        <a
          href='#'
          className='text-blue-600 underline dark:text-blue-500 hover:no-underline'
        >
          limited-time sale
        </a>{' '}
        for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked
        candidates and the #1 design job board.
      </p>
      <div className='grid grid-cols-2 gap-4'>
        <a
          href='#'
          className='px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        >
          Learn more
        </a>
        <a
          href='#'
          className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          Get access{' '}
          <svg
            className='w-3.5 h-3.5 ml-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default TwitchNick
