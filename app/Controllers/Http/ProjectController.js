'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index({ request }) {
    const { page } = request.all()    
    const projects = await Project.query().paginate(page)

    return projects.toJSON()
  }

  show({ params }) {
    const { id } = params
    return Project.find(id)
  }

  async store ({ request }) {
    const { title, description } = request.all()
    const project = new Project()
    
    project.fill({
      title,
      description
    })

    await project.save()

    return project
  }

  async update ({ request, params }) {
    const { id } = params

    const project = await Project.find(id)

    project.merge(request.only(['title', 'description']))

    await project.save()

    return project
  }

  async destroy ({ params }) {
    const { id } = params

    const project = await Project.find(id)

    return project.delete()
  }
}

module.exports = ProjectController
