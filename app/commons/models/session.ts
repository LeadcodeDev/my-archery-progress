import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Structure from '#models/structure'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: BelongsTo<typeof User>

  @column()
  declare structureId: BelongsTo<typeof Structure>

  @column.dateTime()
  declare target_datetime: DateTime

  @column()
  declare order: Record<string, any>

  @column()
  declare annotation: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
