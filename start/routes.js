'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.group(() => {
  Route.post('signin', 'UserController.signin').middleware('guest'),
  Route.post('signup', 'UserController.signup').middleware('guest'),
  Route.get('me', 'UserController.currentUser').middleware('auth')
}).prefix('/api/auth')

Route.group(() => {
  Route.resource('projects', 'ProjectController')

  Route.get('projects/:id/tasks', 'TaskController.index')
  Route.post('projects/:id/tasks', 'TaskController.store')
  
  Route.put('tasks/:id', 'TaskController.update')
  Route.patch('tasks/:id', 'TaskController.update')
  Route.delete('tasks/:id', 'TaskController.destroy')
}).prefix('/api')
