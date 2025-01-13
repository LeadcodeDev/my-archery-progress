import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Practice from '#models/practice'
import User from '#models/user'

export default class PracticeMessage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare practiceId: BelongsTo<typeof Practice>

  @column()
  declare content: string

  @column()
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
