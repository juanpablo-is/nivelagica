import CommandSettings from './Command'
import TimeoutSettings from './Timeout'
import VIPSettings from './VIP'

const SettingsGames = () => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <h2 className='text-lg'>Configuración:</h2>

      <TimeoutSettings />
      <VIPSettings /> {/* TODO: añadir si está habilitado para usar VIPs */}
      <CommandSettings />
    </div>
  )
}

export default SettingsGames
