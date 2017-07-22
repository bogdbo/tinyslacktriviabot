const path = require('path')
const Utils = require('./../utils.js')

class RepositoryProxy {
  constructor (settings) {
    this.repositories = this.loadRepositories(settings)
    this.currentRepository = null
    const loader = this
    return new Proxy(this, {
      get: function (target, propKey, receiver) {
        if (propKey === 'getQuestion') {
          loader.currentRepository = loader.repositories[Math.floor(Math.random() * loader.repositories.length)]
          console.log(`Current repository: ${loader.currentRepository.constructor.name}`)
        }

        const targetMethod = loader.currentRepository[propKey]
        return function (...args) {
          return targetMethod.apply(loader.currentRepository, args)
        }
      }
    })
  }

  loadRepositories (settings) {
    return settings.repository.filter(r => !r.ignore).map(repositorySettings => {
      const RepositoryType = require(this.resolveRepositoryPath(repositorySettings.path))
      return new RepositoryType(repositorySettings, settings)
    })
  }

  resolveRepositoryPath (repository) {
    if (path.isAbsolute(repository)) {
      return repository
    }

    return path.resolve(Utils.getRepositoriesFolderPath(), repository)
  }
}

module.exports = RepositoryProxy
