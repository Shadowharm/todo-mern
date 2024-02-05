import TodosTokenModel from './todos-token.model'
import { v4 as uuidv4 } from 'uuid'
import { ITodo, ITodosToken, Todo } from './todo.instance'
import TodoModel from './todo.model'
import ApiError from '../exceptions/api-error'

class TodosService {
  getTodosToken (token: string): Promise<ITodosToken | null> {
    return TodosTokenModel.findOne({ token })
  }

  createTodosToken (): Promise<ITodosToken> {
    return TodosTokenModel.create({ token: uuidv4() })
  }

  async createTodo (todosTokenValue: string | null, todo: Todo): Promise<ITodo> {
    const todosToken: ITodosToken = await this.getTodosToken(todosTokenValue)
    if (!todosToken) {
      throw ApiError.BadRequest('Отсутствует токен')
    }
    return TodoModel.create({ ...todo, todosToken: todosToken._id })
  }

}

export default new TodosService()