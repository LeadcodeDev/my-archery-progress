import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const GuildsController = () => import('#app/manager/guilds/controllers/guilds_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('overview', [GuildsController, 'index']).as('index')
        router.get('create', [GuildsController, 'create']).as('create')
        router.post('', [GuildsController, 'store']).as('store')
        router.get(':uid', [GuildsController, 'show']).as('show')
        router.get(':uid/edit', [GuildsController, 'edit']).as('edit')
        router.put(':uid', [GuildsController, 'update']).as('update')
        router.delete(':uid', [GuildsController, 'delete']).as('delete')
      })
      .prefix('/guilds')
      .as('guilds')
  })
  .prefix('/manager')
  .middleware(middleware.auth())
  .as('manager')
