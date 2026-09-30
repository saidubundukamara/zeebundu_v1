import * as migration_20260930_125236_initial from './20260930_125236_initial'
import * as migration_20260930_132846_media_object_key from './20260930_132846_media_object_key'

export const migrations = [
  {
    up: migration_20260930_125236_initial.up,
    down: migration_20260930_125236_initial.down,
    name: '20260930_125236_initial',
  },
  {
    up: migration_20260930_132846_media_object_key.up,
    down: migration_20260930_132846_media_object_key.down,
    name: '20260930_132846_media_object_key',
  },
]
