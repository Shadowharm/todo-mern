import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import roleService from '../roles/role.service'
import ApiError from '../exceptions/api-error'
import { IUser, User } from '../users/user.instance'
import tokenService from '../tokens/token.service'
import usersService from '../users/users.service'
import todosService from '../todos/todos.service'
import { IRole } from '../roles/role.instance'
import { ITodosToken } from '../todos/todo.instance'
import { AuthTokens } from '../tokens/token.instance'
import mailService from '../mail/mail.service'

class AuthService {
  async signup (email: string, password: string): Promise<AuthTokens> {
    const candidate: Pick<IUser, '_id'> = await usersService.exist({ email })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashPassword: string = await bcrypt.hash(password, 3)
    const activationLink: string = uuidv4()

    const userRole: IRole = await roleService.userRole()

    const todosToken: ITodosToken = await todosService.createTodosToken()

    const user: IUser = await usersService.create({
      email,
      password: hashPassword,
      activationLink,
      role: userRole._id,
      todosToken: todosToken._id
    })

    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)

    const userDto: User = new User(user)
    const tokens: AuthTokens = tokenService.generateTokens({ ...userDto, role: userRole })
    await tokenService.create(userDto.id, tokens.refreshToken)

    return tokens
  }

  async login (email: string, password: string) {
    const user = await usersService.getOne({ email })
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
    const userDto = new User(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.create(userDto.id, tokens.refreshToken)
    return tokens
  }

  //
  // async logout (req, res, next) {

  // }
  //
  async activate (activationLink) {
    const user = await usersService.getOne({ activationLink })
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