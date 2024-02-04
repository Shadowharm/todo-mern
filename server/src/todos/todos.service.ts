import TodosTokenModel from './todos-token.model'
import { v4 as uuidv4 } from 'uuid'
import { ITodosToken } from './todo.instance'

class TodosService {
  getTodosToken (token: string): Promise<ITodosToken[]> {
    return TodosTokenModel.find({ token })
  }

  createTodosToken (): Promise<ITodosToken> {
    return TodosTokenModel.create({ token: uuidv4() })
  }

}

export default new TodosService()