import {Schema, model} from 'mongoose'

const PermissionModel = new Schema({
  code: {type: String, unique: true, required: true},
  title: {type: String, required: true}
})

export default model('Permission', PermissionModel)