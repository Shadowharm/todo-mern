import RoleModel from '../models/role.model'

class RoleService {
  async getByCode (code: string) {
    return await RoleModel.findOne({code})
  }

  async create ({code, title, permissions}: {code?: string, title?: string, permissions?: string[] } = {}) {
    return await RoleModel.create({code, title, permissions})
  }
}

export default new RoleService()