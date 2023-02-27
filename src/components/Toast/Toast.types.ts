export interface IToastContext {
	toast: (options?: ToastOptions) => void;
}

export interface ToastProviderProps {
	time?: number;
	position?: ToastPosition;
}

export interface ToastOptions {
	time?: number;
	position?: ToastPosition;
	message: string;
}

export type ToastPosition =
	| "top-left"
	| "top-right"
	| "bottom-right"
	| "bottom-left";
