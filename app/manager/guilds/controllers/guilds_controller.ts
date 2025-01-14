import type { HttpContext } from '@adonisjs/core/http'
import { updateUserValidator } from '#app/manager/accounts/validators/user_validator'
import User from '#models/user'
import Role from '#models/role'
import {
  createGuildValidator,
  guildsSearchValidator,
} from '#app/manager/guilds/validators/guilds_validator'
import Structure from '#models/structure'
import AssetsService from '#app/commons/services/assets_service'
import { inject } from '@adonisjs/core'
import StringHelper from '@adonisjs/core/helpers/string'

@inject()
export default class GuildsController {
  constructor(protected assetsService: AssetsService) {}

  async index({ inertia, request }: HttpContext) {
    const { page, limit, search } = await request.validateUsing(guildsSearchValidator)

    const structures = await Structure.query()
      .withScopes((scopes) => scopes.search(search))
      .paginate(page ?? 1, limit ?? 20)

    return inertia.render('manager/guilds/guilds_overview', { guilds: structures })
  }

  async create({ inertia }: HttpContext) {
    const roles = await Role.query()
    return inertia.render('manager/guilds/guild_create_page', { roles })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createGuildValidator)
    const structureUid = StringHelper.generateRandom(10)

    await Structure.create({
      ...data,
      uid: structureUid,
      logo: data.logo
        ? await this.assetsService.convertAndUpload(`guilds/${structureUid}/logo`, data.logo)
        : undefined,
    })

    return response.redirect().toRoute('manager.guilds.index')
  }

  async show({ inertia, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    return inertia.render('manager/guilds/show', { user })
  }

  async edit({ inertia, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    const roles = await Role.query()
    const connexions = await User.accessTokens.all(user)

    return inertia.render('manager/guilds/guild_edit_page', { user, roles, connexions })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator(params.uid))

    const user = await User.findByOrFail('uid', params.uid)
    await user.merge(data).save()

    return response.redirect().toRoute('manager.guilds.index')
  }

  async delete({ response, params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.uid)

    await user.related('permissions').detach()
    await user.related('roles').detach()

    await user.delete()
    return response.redirect().toRoute('manager.guilds.index')
  }
}
