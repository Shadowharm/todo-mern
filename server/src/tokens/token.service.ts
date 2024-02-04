import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import TokenModel from './token.model'
import { User } from '../users/user.instance'
import { AuthTokens } from './token.instance'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret'
class TokenService {
  generateTokens (user: User): AuthTokens {
    return {
      accessToken: jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: '60m' }),
      refreshToken: uuidv4()
    }
  }

  validateAccessToken (token: string): User {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET)
    } catch (e) {
      return null
    }
  }

  create (userId: string, refreshToken: string) {
    return TokenModel.create({
      user: userId,
      refreshToken
    })
  }

  removeToken (refreshToken: string) {
    return TokenModel.deleteOne({ refreshToken })
  }

  findToken (refreshToken: string) {
    return TokenModel.findOne({ refreshToken })
  }
}

export default new TokenService()