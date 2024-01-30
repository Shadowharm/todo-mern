import {Schema, model} from 'mongoose'

const RoleModel = new Schema({
  code: {type: String, unique: true, default: 'user'},
  title: {type: String, default: 'Пользователь'},
  permissions: [{type: String, ref: 'Permission'}]
})

export default model('Role', RoleModel)