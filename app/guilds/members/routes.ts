import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MembersController = () => import('#app/guilds/members/controllers/members_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('overview', [MembersController, 'index']).as('index')
        router.get('create', [MembersController, 'create']).as('create')
        router.post('', [MembersController, 'store']).as('store')
        router.get(':uid', [MembersController, 'show']).as('show')
        router.get(':uid/edit', [MembersController, 'edit']).as('edit')
        router.put(':uid', [MembersController, 'update']).as('update')
        router.delete(':uid', [MembersController, 'delete']).as('delete')
      })
      .prefix('/members')
      .as('members')
  })
  .prefix('/guilds/:guildUid')
  .middleware(middleware.auth())
  .as('guilds')
