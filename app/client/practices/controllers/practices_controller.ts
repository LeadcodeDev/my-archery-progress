import { HttpContext } from '@adonisjs/core/http'

export default class PracticeController {
  async index({ inertia }: HttpContext) {
    const practices = {
      meta: {},
      date: [],
    }

    return inertia.render('client/practices/practices_overview', { practices })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('client/practices/create')
  }

  async store({ response }: HttpContext) {
    return response.redirect().toRoute('client.practices.index')
  }

  async show({ inertia }: HttpContext) {
    return inertia.render('client/practices/show')
  }

  async edit({ inertia }: HttpContext) {
    return inertia.render('client/practices/edit')
  }

  async update({ response }: HttpContext) {
    return response.redirect().toRoute('client.practices.index')
  }

  async delete({ response }: HttpContext) {
    return response.redirect().toRoute('client.practices.index')
  }
}
