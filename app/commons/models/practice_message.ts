import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PracticeMessage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare practiceId: bigint

  @column()
  declare content: string

  @column()
  declare userId: bigint

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
