import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import cls from './NumberInput.module.scss';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const NumberInput: FC<NumberInputProps> = (props) => {
    const { className } = props;

    return <input {...props} className={classNames(cls.NumberInput, className)} type='number' />;
};
