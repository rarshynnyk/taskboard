'use strict'

const Project = use('App/Models/Project')
const Task = use('App/Models/Task')

class TaskController {
  async index({ params }) {    
    const { id } = params
    const project = await Project.find(id)
    return project.tasks().fetch()
  }

  async store ({ request, params }) {
    const { id } = params
    const project = await Project.find(id)
    const task = new Task()

    task.fill(request.only(['title']))

    await project.tasks().save(task)

    return task
  }

  async update ({ request, params }) {
    const { id } = params

    const task = await Task.find(id)
    task.merge(request.only(['title', 'completed']))

    await task.save()

    return task
  }

  async destroy ({ params }) {
    const { id } = params

    const task = await Task.find(id)
    await task.delete()

    return task
  }
}

module.exports = TaskController
