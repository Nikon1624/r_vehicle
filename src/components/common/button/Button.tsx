import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultButtonPropsType & {
  onClick?: (...args: any[]) => void;
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  block?: boolean;
  children?: JSX.Element | string;
};

export const Button: React.FC<ButtonPropsType> = ({
  onClick,
  primary = false,
  secondary = false,
  small = false,
  block = false,
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      type="button"
      className={cn(styles.button, className, {
        [styles.primary]: primary,
        [styles.secondary]: secondary,
        [styles.small]: small,
        [styles.block]: block,
      })}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
