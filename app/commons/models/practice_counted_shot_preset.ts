import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Structure from '#models/structure'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PracticeCountedShotPreset extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare content: string

  @column()
  declare metadata: Record<string, any>

  @belongsTo(() => Structure)
  declare structure: BelongsTo<typeof Structure>

  @column()
  declare flags: Record<string, any>

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
