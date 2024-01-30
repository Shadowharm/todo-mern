import UserModel from '../models/user.model'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import roleService from './role.service'
import ApiError from '../exceptions/api-error'

class UserService {
  async signup (email: string, password: string) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()

    let userRole = await roleService.getByCode('user')
    if (!userRole) {
      userRole = await roleService.create()
    }
    return UserModel.create({ email, password: hashPassword, activationLink, role: userRole.code })
  }

  // async login(req, res, next) {
  //     try {
  //
  //     } catch (e) {
  //         console.error(e)
  //     }
  // }
  //
  // async logout (req, res, next) {
  //     try {
  //
  //     } catch (e) {
  //         console.error(e)
  //     }
  // }
  //
  // async activate (req, res, next) {
  //     try {
  //
  //     } catch (e) {
  //         console.error(e)
  //     }
  // }
  //
  // async refresh (req, res, next) {
  //     try {
  //
  //     } catch (e) {
  //         console.error(e)
  //     }
  // }
}

export default new UserService()