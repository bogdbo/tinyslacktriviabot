
class RepositoryBase {
  consturctor () { }
  async getQuestion () {
    throw String('not implemented exception')
  }
}

module.exports = RepositoryBase
