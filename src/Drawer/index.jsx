import { useState, useEffect } from 'react'
import { DrawerState, addDrawer } from './store'

const POSITIONS = {
  left: 'h-screen max-w-1/2 top-0 left-0 overflow-y-auto',
  right: 'h-screen max-w-1/2 top-0 right-0 overflow-y-auto',
  top: 'w-screen max-h-1/2 top-0 left-0 right-0 overflow-x-auto',
  bottom: 'w-screen max-h-1/2 left-0 bottom-0 right-0 overflow-x-auto'
}

const Drawer = ({ position = 'left', closeOverlay = true }) => {
  const [drawer, setDrawer] = useState(() => {
    const _position = POSITIONS[position] || POSITIONS.left
    const _closeOverlay = Boolean(closeOverlay)
    return { component: null, position: _position, closeOverlay: _closeOverlay }
  })
  const _position = POSITIONS[drawer?.position] || POSITIONS.left //TODO

  useEffect(() => {
    return DrawerState.subscribe(subscribeDrawer)
  }, [])

  function subscribeDrawer (data) {
    setDrawer(prev => ({ ...prev, ...data }))
  }

  function closeDrawer () {
    DrawerState.removeDrawer()
  }

  if (!drawer || !drawer.component) return

  return (
    <div
      className='absolute top-0 right-0 bottom-0 left-0 w-screen h-screen bg-stone/50 z-40'
      onClick={e => {
        if (drawer.closeOverlay && e.currentTarget == e.target) {
          closeDrawer()
        }
      }}
    >
      <div
        className={`fixed z-40 p-4 transition-transform w-80 bg-dark ${_position}`}
        tabIndex='-1'
        aria-labelledby='drawer-label'
      >
        <header className='flex justify-between align-center flex-row-reverse'>
          <button
            type='button'
            data-drawer-hide='drawer-example'
            aria-controls='drawer-example'
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={closeDrawer}
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close menu</span>
          </button>
          {drawer.Header && drawer.Header}
        </header>

        {drawer.component}
      </div>
    </div>
  )
}

export { Drawer, addDrawer }
