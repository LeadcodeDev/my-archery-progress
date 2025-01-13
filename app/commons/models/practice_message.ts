import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Practice from '#models/practice'
import User from '#models/user'

export default class PracticeMessage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Practice)
  declare practice: BelongsTo<typeof Practice>

  @column()
  declare content: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
