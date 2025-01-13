import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'structures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.bigint('owner_id').references('id').inTable('users').notNullable()
      table.string('name').notNullable()
      table.string('siret').notNullable()
      table.boolean('isDeactivated').defaultTo(false).notNullable()
      table.string('logo').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
