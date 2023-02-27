import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import cls from "./Toast.module.scss";
import { ToastOptions } from "./Toast.types";

interface ToastProps extends ToastOptions {
	className?: string;
	onClose: () => void;
}

export const Toast = (props: PropsWithChildren<ToastProps>) => {
	const { className, message, position, onClose } = props;

	return createPortal(
		<div
			className={classNames(className, cls.Toast, cls[position])}
			onClick={onClose}
		>
			{message}
		</div>,
		document.body
	);
};
