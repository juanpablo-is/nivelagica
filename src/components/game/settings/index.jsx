import CommandSettings from './Command'
import TimeoutSettings from './Timeout'

const SettingsGames = () => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <h2 className='text-lg'>Configuración:</h2>

      <TimeoutSettings />
      <CommandSettings />
    </div>
  )
}

export default SettingsGames
