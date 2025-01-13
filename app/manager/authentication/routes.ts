import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthenticationController = () =>
  import('#app/manager/authentication/controllers/authentication_controller')

router
  .group(() => {
    router.get('/login', [AuthenticationController, 'login'])
    router.post('/login', [AuthenticationController, 'loginAction'])
    router.post('/logout', [AuthenticationController, 'logout']).use(middleware.auth())

    router.get('/forgot_password', [AuthenticationController, 'forgotPassword'])
    router.post('/forgot_password', [AuthenticationController, 'forgotPasswordAction'])

    router
      .get('/reset_password/:uid', [AuthenticationController, 'resetPassword'])
      .as('resetPassword')
    router.post('/reset_password/:uid', [AuthenticationController, 'resetPasswordAction'])
  })
  .prefix('/authentication')
