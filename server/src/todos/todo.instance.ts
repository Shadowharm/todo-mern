
import { Document } from 'mongoose'

export interface ITodosToken extends Document {
  token: string
}