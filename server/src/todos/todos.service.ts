import { ITodo, Todo } from './todo.instance'
import TodoModel from './todo.model'
import { v4 as uuidv4 } from 'uuid'

class TodosService {
  async createTodo (todosToken: string | null, todo: Todo): Promise<ITodo> {
    if (!todosToken) {
      todosToken = uuidv4()
    }
    return TodoModel.create({ ...todo, todosToken: todosToken })
  }

}

export default new TodosService()