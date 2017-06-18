const path = require('path')
const Utils = require('./../utils.js')

class RepositoryProxy {
  constructor (settings) {
    this.repositories = this.loadRepositories(settings)
    this.currentRepository = null
    var loader = this
    return new Proxy(this, {
      get: function (target, propKey, receiver) {
        if (propKey === 'getQuestion') {
          loader.currentRepository = loader.repositories[Math.floor(Math.random() * loader.repositories.length)]
          console.log(`Current repository: ${loader.currentRepository.constructor.name}`)
        }

        var targetMethod = loader.currentRepository[propKey]
        return function (...args) {
          return targetMethod.apply(loader.currentRepository, args)
        }
      }
    })
  }

  loadRepositories (settings) {
    let repositoryPaths = null
    if (Array.isArray(settings.repository)) {
      repositoryPaths = settings.repository.map(repository => this.resolveRepositoryPath(repository))
    } else {
      repositoryPaths = [this.resolveRepositoryPath(settings.repository)]
    }

    return repositoryPaths
      .map(path => require(path))
      .map(RepositoryType => new RepositoryType(settings))
  }

  resolveRepositoryPath (repository) {
    if (path.isAbsolute(repository)) {
      return repository
    }

    return path.resolve(Utils.getRepositoriesFolderPath(), repository)
  }
}

module.exports = RepositoryProxy
