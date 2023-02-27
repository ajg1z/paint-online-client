import classNames from 'classnames';
import { Button, ButtonTheme } from 'components/Button';
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    onClose?: () => void;
}

export const Modal = (props: PropsWithChildren<ModalProps>) => {
    const { className, children, onClose } = props;

    return createPortal(
        <div className={classNames(cls.Modal, className)}>
            <div className={cls.content}>
                <div className={cls.header}>
                    <Button className={cls.close} theme={ButtonTheme.Clear} onClick={onClose}>
                        ✕
                    </Button>
                </div>
                <div className={cls.body}>{children}</div>
            </div>
        </div>,
        document.body,
    );
};
