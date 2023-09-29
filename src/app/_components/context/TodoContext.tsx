'use client';
import { createContext, useEffect, useState, createRef } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Provider } from 'react-redux';

import { Todo, TodoContextType } from '@/app/_models/todoModel';
import { getColor } from '@/app/_helper-functions/clientHelperFunctions';
import store from '@/app/_components/context/wordleRedux';

const maxTodoItems = 5;

export const TodoContext = createContext<TodoContextType>({
  todoItems: [],
  getTodoText: id => '',
  saveTodo: text => {},
  removeTodo: id => {},
  updateTodo: (id, text) => {},
  changeItemColor: id => {},
  isLoading: false,
});

async function getTodoList(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to fetch data from db');
  }
  return res.json();
}

async function postTodoItem(url: string, { arg }: { arg: { todoItem: Todo; new: boolean; updateDate: boolean } }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to POST / UPDATE data');
  }
  return res.json();
}

async function deleteTodoItem(url: string, { arg }: { arg: { id: string } }) {
  const res = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to DELETE data');
  }
  return res.json();
}

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [initContextData, setInitContextData] = useState<boolean>(true);
  const { data: todoData, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/api`, getTodoList);
  const { trigger: postTrigger, isMutating: postIsMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_DOMAIN}/api`, postTodoItem);
  const { trigger: deleteTrigger, isMutating: deleteIsMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_DOMAIN}/api`, deleteTodoItem);

  const getTodoText = (id: string) => {
    const todoItem = todoItems.find(item => item.id === id);
    return todoItem ? todoItem.text : '';
  };

  const saveTodo = (id: string | null | undefined, text: string) => {
    const newTodo: Todo = new Todo(text.trim(), id);
    // console.log(newTodo);
    setTodoItems(prevTodoList => {
      while (prevTodoList.some(item => newTodo.color === item.color)) {
        newTodo.color = getColor();
      }
      if (prevTodoList.length < maxTodoItems) {
        return [newTodo, ...prevTodoList];
      } else {
        while (prevTodoList.length >= maxTodoItems) {
          // while Todo list items are > 5, pop the last item
          const toBeDeleted = prevTodoList.pop();
          deleteTrigger({ id: toBeDeleted!.id });
        }
        return [newTodo, ...prevTodoList];
      }
    });
    postTrigger({ todoItem: newTodo, new: true, updateDate: true });
  };

  const removeTodo = (id: string) => {
    setTodoItems(prevTodoList => {
      return [...prevTodoList].filter(item => item.id !== id);
    });
    deleteTrigger({ id: id });
  };

  const updateTodo = (id: string, updateText: string) => {
    if (updateText.length < 1) {
      deleteTrigger({ id: id });
      setTodoItems(prevTodoList => [...prevTodoList].filter(item => item.id !== id));
    } else {
      let itemToUpdate: Todo;
      let index: number = -1;
      setTodoItems(prevTodoList => {
        index = prevTodoList.findIndex(item => item.id === id);
        if (index !== -1) {
          itemToUpdate = prevTodoList[index];
          itemToUpdate.text = updateText.trim();
          itemToUpdate.date = new Date();
          itemToUpdate.nodeRef = createRef();
          postTrigger({ todoItem: itemToUpdate, new: false, updateDate: true });
        } else {
          itemToUpdate = new Todo('Error update. Sorry👻. Please refresh page. Data might possibly be lost.');
        }
        if (index !== 0) {
          return [...prevTodoList].filter(item => item.id !== id);
        } else {
          return [itemToUpdate, ...prevTodoList];
        }
      });
      // this provides the animation on the updated item getting on top of list
      if (index !== 0) {
        setTimeout(() => {
          setTodoItems(prevTodoList => {
            return [itemToUpdate, ...prevTodoList];
          });
        }, 290);
      }
    }
  };

  const changeItemColor = (id: string) => {
    let index: number = -1;
    setTodoItems(prevTodoList => {
      const todoList = [...prevTodoList];
      index = todoList.findIndex(item => item.id === id);
      if (index !== -1) {
        let color = todoList[index].color;
        while (prevTodoList.some(item => color === item.color)) {
          color = getColor();
        }
        todoList[index].color = color;
        todoList[index].nodeRef = createRef();
        postTrigger({ todoItem: todoList[index], new: false, updateDate: false });
      }
      return todoList;
    });
  };

  useEffect(() => {
    // initial load only
    if (initContextData && !isLoading && todoData) {
      setTodoItems(() => {
        const output = todoData.map((item: Todo) => {
          return { date: item.date, id: item.id, color: item.color, nodeRef: createRef(), text: item.text };
        });
        return output;
      });
      setInitContextData(false);
    }
  }, [initContextData, todoData, isLoading]);

  return (
    <TodoContext.Provider value={{ todoItems, getTodoText, saveTodo, removeTodo, updateTodo, changeItemColor, isLoading }}>
      <Provider store={store}>{children}</Provider>
    </TodoContext.Provider>
  );
};

export default TodoProvider;
