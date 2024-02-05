import { Schema, model } from 'mongoose'
import { IUser } from './user.instance'

const UserModel = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  todosToken: { type: String, required: true }
}, {
  timestamps: true
})

export default model<IUser>('User', UserModel)