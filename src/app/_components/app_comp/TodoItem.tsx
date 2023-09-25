'use client';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';

import { TodoContext } from '@/app/_components/context/TodoContext';

const TodoItem: React.FC<{
  id: string;
  text: string;
  nodeRef: RefObject<HTMLLIElement> | undefined;
  color: string;
}> = ({ id, text, nodeRef, color }) => {
  const context = useContext(TodoContext);
  const rmvBtnRef = useRef<HTMLButtonElement>(null);
  const chgColorBtnRef = useRef<HTMLButtonElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const cnEditBtnRef = useRef<HTMLButtonElement>(null);
  const liRef = useRef<HTMLParagraphElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>(text);
  const [wasEditCancelled, setWasEditCancelled] = useState<boolean>(true);

  const todoItemClickHandler = () => {
    setTodoText(context!.getTodoText(id));
    setEditMode(() => true);
  };

  const rmvBtnClkHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    liRef.current!.innerHTML = '❌❌❌❌❌';
    context!.removeTodo(id);
  };

  const chgColorHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    context!.changeItemColor(id);
  };

  const cnEditBtnClkHandler = () => {
    setWasEditCancelled(() => true);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setWasEditCancelled(() => true);
      setTimeout(() => {
        setEditMode(false);
      }, 180);
    }
  };

  const mouseEnterHandler = () => {
    rmvBtnRef.current!.classList.remove('opacity-0');
    chgColorBtnRef.current!.classList.remove('opacity-0');
    rmvBtnRef.current!.classList.add('opacity-100');
    chgColorBtnRef.current!.classList.add('opacity-100');
  };

  const mouseLeaveHandler = () => {
    rmvBtnRef.current!.classList.remove('opacity-100');
    chgColorBtnRef.current!.classList.remove('opacity-100');
    rmvBtnRef.current!.classList.add('opacity-0');
    chgColorBtnRef.current!.classList.add('opacity-0');
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const submitUpdateHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setTimeout(() => {
      setEditMode(false);
    }, 180);
  };

  const editInputBlurHandler = () => {
    // Do not remove this setTimeout call!!
    // It ensures that the useEffect state captures
    // the correct state before editMode state update
    setTimeout(() => {
      setEditMode(false);
    }, 180);
  };

  useEffect(() => {
    // console.log(`${text}`, wasEditCancelled);
    if (editMode === true) {
      // auto-focus on TodoItem input when clicked
      editInputRef.current!.focus();
    } else {
      if (todoText.trim() !== liRef.current!.innerHTML) {
        if (!wasEditCancelled) {
          // submits the update if the Cancel Edit button is not clicked
          context.updateTodo(id, todoText);
          if (todoText.length !== 0) liRef.current!.innerHTML = todoText;
          else liRef.current!.innerHTML = '❌❌❌❌❌';
        }
      }
      nodeRef!.current!.style.backgroundColor = color;
    }
    // reset state
    setWasEditCancelled(false);
    // eslint-disable-next-line
  }, [editMode]);

  useEffect(() => {
    if (nodeRef?.current) {
      nodeRef!.current!.style.backgroundColor = color;
    }
  }, [color, nodeRef]);

  return (
    <>
      {editMode ? (
        <form className="relative indent-0 h-[34px] mb-3 w-[55%] flex flex-col items-center sm:w-[55%]" onSubmit={submitUpdateHandler}>
          <input
            className="my-[5px] mx-0 bg-mainfield border-mainfg border-[1px] border-solid outline-1 outline-blue-400 py-[5px] px-[9px] rounded-md text-center w-[100%] text-mainfg text-base transition-all duration-[600ms] ease-in-out"
            ref={editInputRef}
            value={todoText}
            type="text"
            autoComplete="off"
            onChange={inputChangeHandler}
            onKeyDownCapture={keyDownHandler}
            onBlur={editInputBlurHandler}
          />
          <button
            className="absolute right-[3px] top-[-4px] border-blue-950 border-[1px] border-solid rounded-md w-[34px] h-[30px] my-3 mx-0 text-[1.1rem] z-0 bg-button"
            type="submit"
            id={'sbEditBtn' + id}
            aria-label="submit edit"
          >
            <Image src="/icons8-check-mark-48.png" alt="change color button" width="20" height="20" className='mx-auto my-auto'/>
          </button>
          <button
            className="absolute right-[-30px] top-[-5px] border-blue-950 border-[1px] border-solid rounded-md w-[34px] h-[32px] my-3 -mx-2 text-base z-0 bg-button"
            ref={cnEditBtnRef}
            id={'cnEditBtn' + id}
            onClick={cnEditBtnClkHandler}
            aria-label="cancel edit"
          >
            <Image src="/icons8-red-circle-48.png" alt="change color button" width="20" height="20" className='my-auto mx-auto'/>
          </button>
          <Tooltip anchorSelect={'#sbEditBtn' + id} place="top">
            Submit edit
          </Tooltip>
          <Tooltip anchorSelect={'#cnEditBtn' + id} place="top">
            Cancel edit
          </Tooltip>
        </form>
      ) : (
        <li
          className="relative my-[5px] mx-0 border-mainfg border-[1px] border-solid py-[5px] px-[9px] rounded-md list-none indent-0 text-mainfg text-center text-base w-[55%] hover:border-x-[0.5px] hover:shadow-y-md hover:shadow-blue-200"
          id={'item' + id}
          ref={nodeRef}
          onClick={todoItemClickHandler}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <p className="overflow-x-hidden" ref={liRef}>
            {text}
          </p>
          {/* {`${styles.removeBtn} ${styles.buttonInvisible} `} */}
          <button
            className="absolute right-[-32px] top-[5px] border-blue-950 border-[1px] border-solid rounded-md w-[34px] h-[32px] -my-1 -mx-2 text-[1.1rem] z-0 pt-0 pr-1 pb-0 pl-1 bg-button opacity-0"
            ref={rmvBtnRef}
            onClick={rmvBtnClkHandler}
            id={'rmvBtn' + id}
            aria-label="remove item"
          >
            <Image src="/red-x-10335.svg" alt="Delete button" width="20" height="20" className='my-auto mx-auto'/>
          </button>
          <button
            className="absolute right-[-68px] top-[5px] border-blue-950 border-[1px] border-solid rounded-md w-[34px] h-[32px] -my-1 -mx-2 text-[1.1rem] z-0 pt-0 pr-1 pb-0 pl-1 bg-button opacity-0"
            ref={chgColorBtnRef}
            onClick={chgColorHandler}
            id={'chgColorBtn' + id}
            aria-label="change item color"
          >
            <Image src="/icons8-color-30.png" alt="change color button" width="20" height="20" className='my-auto mx-auto'/>
          </button>
          <Tooltip anchorSelect={'#item' + id} place="left">
            Click to Edit
          </Tooltip>
          <Tooltip anchorSelect={'#rmvBtn' + id} place="top">
            Remove item
          </Tooltip>
          <Tooltip anchorSelect={'#chgColorBtn' + id} place="top">
            Change color
          </Tooltip>
        </li>
      )}
    </>
  );
};

export default TodoItem;
