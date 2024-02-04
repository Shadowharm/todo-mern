import { Schema, model } from 'mongoose'

const TodoModel = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  todosToken: { type: Schema.Types.ObjectId, ref: 'TodosToken', required: true }
}, {
  timestamps: true
})

export default model('Todo', TodoModel)