import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PracticeControllers = () => import('#app/client/practices/controllers/practices_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('overview', [PracticeControllers, 'index']).as('index')
        router.get('create', [PracticeControllers, 'create']).as('create')
        router.post('', [PracticeControllers, 'store']).as('store')
        router.get(':uid', [PracticeControllers, 'show']).as('show')
        router.get(':uid/edit', [PracticeControllers, 'edit']).as('edit')
        router.put(':uid', [PracticeControllers, 'update']).as('update')
        router.delete(':uid', [PracticeControllers, 'delete']).as('delete')
      })
      .prefix('/practices')
      .as('practices')
  })
  .prefix('/platform')
  .middleware(middleware.auth())
  .as('client')
