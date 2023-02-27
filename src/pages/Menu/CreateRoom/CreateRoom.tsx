import classNames from "classnames";
import { Button } from "components/Button";
import { TextInput } from "components/Fields/TextInput/TextInput";
import { Modal } from "components/Modal";
import { $api } from "config/axios";
import { PropsWithChildren, useState } from "react";
import cls from "./CreateRoom.module.scss";

interface CreateRoomProps {
	className?: string;
	onClose: () => void;
	fetchMyRooms: (query?: string) => void;
}

export const CreateRoom = (props: PropsWithChildren<CreateRoomProps>) => {
	const { className, fetchMyRooms, onClose } = props;
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const createRoom = async () => {
		setError("");
		if (name) {
			try {
				const res = await $api.post("room", { name, password });
				if (res.data) {
					await fetchMyRooms();
					onClose();
				} else {
					throw new Error();
				}
			} catch (e) {
				setError("Error create");
			}
		} else setError("name required");
	};

	return (
		<Modal onClose={onClose}>
			<div className={classNames(className, cls.CreateRoom)}>
				<TextInput
					placeholder="name room"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextInput
					placeholder="password(optional)"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className={cls.footer}>
					{error && <p>{error}</p>}
					<Button onClick={createRoom}>Create</Button>
				</div>
			</div>
		</Modal>
	);
};
