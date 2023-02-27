import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import cls from './ColorInput.module.scss';

interface ColorInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const ColorInput: FC<ColorInputProps> = (props) => {
    const { className } = props;

    return <input {...props} className={classNames(cls.ColorInput, className)} type='color' />;
};
