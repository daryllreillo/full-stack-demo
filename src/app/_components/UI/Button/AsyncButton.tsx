'use client';

import { ButtonHTMLAttributes, useState } from 'react';

import classes from './AsyncButton.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const AsyncButton: React.FC<ButtonProps> = function (props) {
  const { type, className: propsClassName, onClick, disabled, isLoading, ...restProps } = props;

  const loadingClass = isLoading ? classes.isLoading : classes.isNotLoading;

  return (
    <button type={type} className={`${classes.button} ${loadingClass} ${propsClassName} `} onClick={onClick} disabled={disabled} {...restProps}>
      {props.children}
    </button>
  );
};

export default AsyncButton;
