import type { PropsWithChildren, ReactNode, SelectHTMLAttributes } from 'react';
import cls from './Select.module.scss';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    children: ReactNode;
}

export const Select = (props: PropsWithChildren<SelectProps>) => {
    const { className, children, ...otherProps } = props;

    return (
        <select {...otherProps} className={cls.Select}>
            {children}
        </select>
    );
};
