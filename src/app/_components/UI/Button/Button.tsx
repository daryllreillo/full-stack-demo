import { ButtonHTMLAttributes } from 'react';

import classes from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | string | null;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = function (props) {
  const { type, className: propsClassName, onClick, disabled, ...restProps } = props;
  return (
    <button
      type={type}
      className={`text-white bg-[#046e9f] w-fit py-2 px-4 rounded-md transition-all m-0 hover:translate-y--2 hover:shadow-sky-500 active:translate-y-0 active:shadow-none disabled:bg-gray-400 ${propsClassName}`}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {props.children}
    </button>
  );
};

export default Button;
