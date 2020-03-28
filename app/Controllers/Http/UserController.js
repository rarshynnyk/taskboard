'use strict'

const User = use('App/Models/User')

class UserController {
  signup({ request }) {
    const { email, password } = request.all()
    User.create({ email, password, username: email })
  }

  signin({ request, auth }) {
    const { email, password } = request.all()
    return auth.attempt(email, password)
  }

  currentUser({ auth }) {
    return auth.getUser()
  }
}

module.exports = UserController
