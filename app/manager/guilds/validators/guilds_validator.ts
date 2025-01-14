import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'

export const guildsSearchValidator = vine.compile(vine.object(searchComposable.getProperties()))

export const createGuildValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    siret: vine.string().minLength(2).maxLength(255),
    isDeactivated: vine.boolean(),
    logo: vine
      .file({
        size: '8mb',
        extnames: ['jpg', 'png'],
      })
      .optional(),
  })
)

export const updateGuildValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255).optional(),
    siret: vine.string().minLength(2).maxLength(255).optional(),
    isDeactivated: vine.boolean().optional(),
    logo: vine
      .file({
        size: '8mb',
        extnames: ['jpg', 'png'],
      })
      .optional(),
  })
)
