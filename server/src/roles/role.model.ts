import { Schema, model } from 'mongoose'
import { IRole } from './role.instance'

const RoleModel: Schema<IRole> = new Schema({
  code: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  permissions: { type: [String], default: [], required: false }
})

export default model<IRole>('Role', RoleModel)