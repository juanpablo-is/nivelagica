export { default as catchify } from './catchify'

export const KEY_SESSION_STORAGE = "nivelagica_jp"

const COMMANDS_NIGHTBOT = [
  '!game',
  '!commands',
  '!commercial',
  '!filters',
  '!marker',
  '!poll',
  '!regular',
  '!songs',
  '!tags',
  '!title',
  '!winner'
]

const COMMANDS_STREAMELEMENTS = [
  '!accountage',
  '!bet',
  '!chatstats',
  '!contest',
  '!emotes',
  '!followage',
  '!giveaway',
  '!items',
  '!leaderboard',
  '!next',
  '!points',
  '!quote',
  '!redeem',
  '!song',
  '!tip',
  '!top',
  '!uptime',
  '!voteskip',
  '!watchtime',
  '!when',
  '!wrongsong',
]

export const notAllowedCommands = () => {
  return [...COMMANDS_NIGHTBOT, ...COMMANDS_STREAMELEMENTS]
}

const filesGamesMode = import.meta.glob(['../games/*.js', '!../games/index.js'], {
  import: 'default',
  eager: true,
})

export const gamesMode = Object.values(filesGamesMode).sort((a, b) => a.weight - b.weight)