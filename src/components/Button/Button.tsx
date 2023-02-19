import cls from './Button.module.scss';
import { FCC } from 'app/types/react';
import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

export enum ButtonTheme {
    Clear = 'clear',
    Primary = 'primary',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme;
}

export const Button: FCC<ButtonProps> = (props) => {
    const { children, className, theme = ButtonTheme.Primary, ...otherProps } = props;

    return (
        <button className={classNames(cls.Button, className, cls[theme])} {...otherProps}>
            {children}
        </button>
    );
};
