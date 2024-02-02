import { Schema, model } from 'mongoose'

const UserModel = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  role: { type: Schema.Types.ObjectId, ref: 'Role', default: 'user' }
})

export default model('User', UserModel)