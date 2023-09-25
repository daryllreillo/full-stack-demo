import { RefObject, createRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getColor } from '@/app/_helper-functions/clientHelperFunctions';
import type { User } from './userModel';

export class Todo {
  id: string;
  date: Date;
  nodeRef: RefObject<HTMLLIElement>;
  text: string;
  color: string;
  user?: User;

  constructor(todoText: string, id?: string | undefined | null, user?: User) {
    this.id = id || uuidv4();
    this.date = new Date();
    this.nodeRef = createRef(); // nodeRef.current: null
    this.color = getColor();
    this.text = todoText;
    this.user = user;
  }
}
// the Todo class can be used an Interface and a Type Alias

export type TodoContextType = {
  todoItems: Todo[];
  getTodoText: (id: string) => string;
  saveTodo: (id: null | string, text: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  changeItemColor: (id: string) => void;
  isLoading: boolean;
};
