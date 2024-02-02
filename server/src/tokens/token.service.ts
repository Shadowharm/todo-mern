import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import TokenModel from './token.model'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret'
class TokenService {
  generateTokens (payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '2m' })
    const refreshToken = uuidv4()
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken (token) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken (userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenModel.create({ user: userId, refreshToken })
    return token
  }

  async removeToken (refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken (refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken })
    return tokenData
  }
}

export default new TokenService()