import { Schema, model } from 'mongoose'
import { ITodosToken } from './todo.instance'


const TodosTokenModel = new Schema<ITodosToken>({
  token: { type: String, required: true }
})

export default model<ITodosToken>('TodosToken', TodosTokenModel)