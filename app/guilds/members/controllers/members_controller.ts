import { HttpContext } from '@adonisjs/core/http'
import User, { UserType } from '#models/user'
import { memberSearchValidator } from '#app/guilds/members/validators/member_validator'

export default class PracticeController {
  async index({ request, inertia }: HttpContext) {
    const { page, limit, search } = await request.validateUsing(memberSearchValidator)

    const members = await User.query()
      .withScopes((scopes) => scopes.search(search, UserType.user))
      .preload('roles')
      .paginate(page ?? 1, limit ?? 20)

    return inertia.render('guild/members/members_overview', { members })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('guild/members/create')
  }

  async store({ response }: HttpContext) {
    return response.redirect().toRoute('guild.members.index')
  }

  async show({ inertia }: HttpContext) {
    return inertia.render('guild/members/show')
  }

  async edit({ inertia }: HttpContext) {
    return inertia.render('guild/members/edit')
  }

  async update({ response }: HttpContext) {
    return response.redirect().toRoute('guild.members.index')
  }

  async delete({ response }: HttpContext) {
    return response.redirect().toRoute('guild.members.index')
  }
}
