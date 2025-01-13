import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Structure from '#models/structure'
import Session from '#models/session'

export default class Practice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare structureId: BelongsTo<typeof Structure>

  @column()
  declare userId: BelongsTo<typeof User>

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare content: string

  @column()
  declare metadata: Record<string, any>

  @column()
  declare status: string

  @column()
  declare results: Record<string, any>

  @column()
  declare sessionId: BelongsTo<typeof Session>

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
