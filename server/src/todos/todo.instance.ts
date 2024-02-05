
import { Document, Types } from 'mongoose'

export interface ITodosToken extends Document {
  token: string
}

export interface ITodo extends Document {
  title: string,
  description: string,
  completed: boolean,
  todosToken: Types.ObjectId
}

export class Todo {
  title: string
  description: string
  completed: boolean
  todosToken: Types.ObjectId

  constructor ({ title, description, completed, todosToken }: ITodo) {
    this.title = title
    this.description = description
    this.completed = completed
    this.todosToken = todosToken
  }
}