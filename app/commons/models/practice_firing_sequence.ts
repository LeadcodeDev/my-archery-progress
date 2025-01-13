import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Practice from '#models/practice'

export default class PracticeFiringSequence extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Practice)
  declare practice: BelongsTo<typeof Practice>

  @column()
  declare results: Record<string, any>

  @column()
  declare annotation: string

  @column()
  declare total: bigint

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
