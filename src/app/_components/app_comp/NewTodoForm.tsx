'use client';
import { useRef, useContext, useState, useEffect } from 'react';

import { TodoContext } from '@/app/_components/context/TodoContext';
import Button from '@/app/_components/UI/Button/Button';

const NewTodoForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValidInput, setIsValidInput] = useState(false);
  const context = useContext(TodoContext);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const inputText = inputRef.current!.value;
    if (inputText.trim().length === 0) {
      inputRef.current!.value = '';
      return;
    }

    context!.saveTodo(null, inputText);
    inputRef.current!.value = '';
    inputRef.current!.focus();
    setIsValidInput(false);
    return;
  };

  const inputChangeHandler = () => {
    console.log(isValidInput);
    if (inputRef.current!.value === '') setIsValidInput(false);
    else setIsValidInput(true);
  };

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  return (
    <>
      <form className="mt-4 text-center flex flex-col items-center" onSubmit={submitHandler}>
        <label htmlFor="text"></label>
        <input
          className="text-mainfg bg-mainfield rounded border-mainfg border-solid border-[1px] py-2 px-2.5 text-center w-[85%] text-[1.1rem] outline-1 outline-blue-400 placeholder:text-mainplaceholder focus:placeholder:text-transparent xl:w-[100%] 2xl:w-p[90%]"
          id="text"
          type="text"
          ref={inputRef}
          placeholder="new To Do text"
          autoComplete="off"
          onChange={inputChangeHandler}
        />
        <Button
          type="submit"
          className={'text-mainfg text-sm w-[6.5rem] py-2 px-3 rounded-md m-0 mt-2 border-blue-300 hover:shadow-md hover:shadow-blue-400 ' + (isValidInput ? 'translate-y-[-0.3rem] hover:shadow-md hover:shadow-blue-400 ' : '')}
          disabled={false}
          aria-label='Add to list'
        >
          Add to List
        </Button>
      </form>
      <p className="text-center my-[0.3rem] text-mainfg">(Maximum 5 items)</p>
    </>
  );
};

export default NewTodoForm;
