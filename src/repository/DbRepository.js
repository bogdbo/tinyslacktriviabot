var RepositoryBase = require('./repositoryBase.js')

class DbRepository extends RepositoryBase {
  constructor (db) {
    super()
    this.db = db
  }

  async getQuestion () {
    await this.db.get('SELECT id, q as question, a as answer FROM QUESTIONS ORDER BY random() LIMIT 1')
  }
}

module.exports = DbRepository
