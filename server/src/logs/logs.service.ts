import LogModel from './log.model'

class LogsService {
  async saveLog (path, statusCode, error = null) {
    return LogModel.create({ path, statusCode, error })
  }

  async getAll (params = {}) {
    return LogModel.find()
  }
}

export default new LogsService()