import { FCC } from 'app/types/react';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import cls from './Property.module.scss';

interface PropertyProps extends HTMLAttributes<HTMLLabelElement> {
    after?: boolean;
    label?: string;
}

export const Property: FCC<PropertyProps> = (props) => {
    const { children, label, after, className, ...otherProps } = props;
    return (
        <label {...otherProps} className={classNames(cls.Property, className)}>
            {label && !after && <span>{label}</span>}
            {children}
            {label && after && <span>{label}</span>}
        </label>
    );
};
