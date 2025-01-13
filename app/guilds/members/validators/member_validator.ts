import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'

export const memberSearchValidator = vine.compile(vine.object(searchComposable.getProperties()))
