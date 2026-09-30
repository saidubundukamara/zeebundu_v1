import * as migration_20260930_125236_initial from './20260930_125236_initial'

export const migrations = [
  {
    up: migration_20260930_125236_initial.up,
    down: migration_20260930_125236_initial.down,
    name: '20260930_125236_initial',
  },
]
