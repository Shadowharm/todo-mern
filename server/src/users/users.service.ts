import UserModel from './user.model'

class UsersService {
  getAll (params = {}) {
    return UserModel.find({}, { password: 0, isActivated: 0, activationLink: 0 }).populate('role')
  }
}


export default new UsersService()