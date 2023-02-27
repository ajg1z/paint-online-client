import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";
import cls from "./TextInput.module.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput: FC<TextInputProps> = (props) => {
	const { className } = props;

	return (
		<input
			{...props}
			className={classNames(cls.TextInput, className)}
			type="text"
		/>
	);
};
