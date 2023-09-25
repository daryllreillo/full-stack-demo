'use client';
import { useState, InputHTMLAttributes, ChangeEvent, FocusEvent } from 'react';
import { TbEyeClosed, TbEye } from 'react-icons/tb';
import { Tooltip } from 'react-tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  // ref: React.RefObject<HTMLInputElement> | null;
  value: string;
  inputType: string;
  errorMsg: string;
  isValid: boolean;
  wasTouched: boolean;
  darkTheme?: boolean;
}

const Input: React.FC<InputProps> = props => {
  const { label, id, value, inputType, errorMsg, isValid, wasTouched, darkTheme, ...restProps } = props;
  const [type, setType] = useState<string>(inputType);
  const [showPwBtnIcon, setShowPwBtnIcon] = useState<JSX.Element>(<TbEyeClosed />);
  const [showPwBtnTooltipText, setShowPwBtnTooltipText] = useState<string>('Password Hidden');

  // if onChange event is triggered, pass input string
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(event);
  };
  // if onBlur event is triggered, pass trimmed input string
  const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) props.onBlur(event);
  };

  const showPwBtnClickHandler = () => {
    if (type === inputType) {
      setType('text');
      setShowPwBtnIcon(<TbEye />);
      setShowPwBtnTooltipText('Password Revealed');
    } else {
      setType(inputType);
      setShowPwBtnIcon(<TbEyeClosed />);
      setShowPwBtnTooltipText('Password Hidden');
    }
  };

  return (
    <div className="relative w-[90%] flex flex-col items-center mb-0 transition duration-500 md:w-[70%] lg:w-[60%]">
      <label className="text-start font-bold capitalize indent-[5%] self-start w-[100%] pl-2 block" htmlFor={id}>
        {label}
      </label>
      <input
        className={
          'p-2 font-sans rounded border-[1px] border-solid border-fg w-[90%] mb-0 cursor-text bg-field focus:outline-none focus:bg-field ' +
          (type === 'checkbox' ? 'h-[19px] w-auto m-0 ml-2 p-0 ' : ' ') +
          (wasTouched
            ? isValid
              ? 'transition-background-color duration-[0.05] ease-in'
              : 'bg-inputbg-invalid transition-background-color duration-150 ease-in'
            : '')
        }
        id={id}
        type={type}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        {...restProps}
        onFocus={blurHandler}
      />
      {
        <p
          className={
            'm-0 h-[22px] pl-2 text-center w-[90vw] ' +
            (wasTouched
              ? isValid
                ? 'before:content-[""] before:absolute before:right-[-3%] before:bottom-[40%] before:text-green-500 before:bg-icons8-checkmark-48-img before:bg-no-repeat before:w-5 before:h-5 first-letter:before:lowercase before:bg-20x20'
                : 'before:content-["❌"] text-text-invalid'
              : '')
          }
        >
          {wasTouched && !isValid && errorMsg}
        </p>
      }
      {inputType === 'password' && (
        <>
          <button
            id={`${id}-showPwBtn`}
            className="text-[28px] text-fg absolute top-[26px] right-[6%] w-fit h-fit flex content-center items-center bg-transparent py-[3px] border-none m-0 hover:transform-none hover:shadow-none"
            onClick={showPwBtnClickHandler}
            type="button"
          >
            {showPwBtnIcon}
          </button>
          <Tooltip anchorSelect={`#${id}-showPwBtn`} place="top">
            {showPwBtnTooltipText}
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default Input;
