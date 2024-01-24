import RoleModel from "../models/role.model.js";

class RoleService {
    async getByCode(code) {
        return await RoleModel.findOne({code})
    }

    async create ({code, title, permissions} = {}) {
        return await RoleModel.create({code, title, permissions})
    }
}

export default new RoleService();