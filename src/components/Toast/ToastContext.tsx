import { createContext, useContext } from "react";
import { IToastContext } from "./Toast.types";

export const ToastContext = createContext<IToastContext>({
	toast(options) {},
});

export const useToast = () => {
	return useContext(ToastContext);
};
