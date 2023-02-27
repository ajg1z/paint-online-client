import {
	PropsWithChildren,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { Toast } from "./Toast";
import { ToastOptions, ToastPosition, ToastProviderProps } from "./Toast.types";
import { ToastContext } from "./ToastContext";

export const ToastProvider = (props: PropsWithChildren<ToastProviderProps>) => {
	const {
		children,
		position: initPosition = "top-right",
		time: initTime = 3000,
	} = props;

	const [visible, setVisible] = useState(false);

	const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [message, setMessage] = useState("");
	const [position, setPosition] = useState<ToastPosition>(initPosition);

	const toast = useCallback((options: ToastOptions) => {
		setVisible(true);
		setMessage(options.message);
		if (options.position) setPosition(options.position);
		setTime(options.time);
	}, []);

	const setTime = (time?: number) => {
		if (timerId.current) {
			clearTimeout(timerId.current);
		}

		timerId.current = setTimeout(() => {
			setVisible(false);
			setPosition(initPosition);
		}, time ?? initTime);
	};

	const onClose = () => {
		setVisible(false);
	};

	const defaultProps = useMemo(() => {
		return {
			toast,
		};
	}, [toast]);

	return (
		<ToastContext.Provider value={defaultProps}>
			{visible && (
				<Toast message={message} position={position} onClose={onClose} />
			)}
			{children}
		</ToastContext.Provider>
	);
};
