import { Button, ButtonTheme } from "components/Button";
import { TextInput } from "components/Fields/TextInput/TextInput";
import { Modal } from "components/Modal";
import { PropsWithChildren, useState } from "react";
import cls from "./AccessRoom.module.scss";

interface AccessRoomProps {
	onClose: () => void;
	onApply: (password: string) => boolean;
}

export const AccessRoom = (props: PropsWithChildren<AccessRoomProps>) => {
	const { onClose, onApply } = props;
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onClick = () => {
		setError("");
		if (onApply(password)) {
			onClose();
		} else {
			setError("Wrong password");
		}
	};

	return (
		<Modal onClose={onClose}>
			<div className={cls.AccessRoom}>
				<p>Password</p>
				<TextInput
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <p className={cls.error}>{error}</p>}
				<Button theme={ButtonTheme.Clear} onClick={onClick}>
					Apply
				</Button>
			</div>
		</Modal>
	);
};
