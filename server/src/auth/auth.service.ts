import UserModel from '../users/user.model'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import roleService from '../services/role.service'
import ApiError from '../exceptions/api-error'
import { UserDto } from '../users/user.dto'
import tokenService from '../tokens/token.service'

class AuthService {
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
    const user = await UserModel.create({ email, password: hashPassword, activationLink, role: userRole })
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return tokens
  }

  async login (email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный логин или пароль')
    }
    if (!user.isActivated) {
      throw ApiError.BadRequest('Аккаунт не активирован')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return tokens
  }

  //
  // async logout (req, res, next) {

  // }
  //
  async activate (activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации')
    }
    user.isActivated = true
    await user.save()

  }
  //
  // async refresh (req, res, next) {

  // }
}

export default new AuthService()