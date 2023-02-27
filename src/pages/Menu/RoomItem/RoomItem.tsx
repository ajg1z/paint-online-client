import classNames from "classnames";
import { Button, ButtonTheme } from "components/Button";
import { IRoom } from "pages/Room";
import type { PropsWithChildren } from "react";
import UserStore from "User";
import cls from "./RoomItem.module.scss";

interface RoomItemProps {
	room: IRoom;
	navigate: (room: IRoom) => void;
}

export const RoomItem = (props: PropsWithChildren<RoomItemProps>) => {
	const { room, navigate } = props;

	return (
		<Button
			className={cls.RoomItem}
			theme={ButtonTheme.Clear}
			onClick={() => navigate(room)}
		>
			<div
				key={room._id}
				className={classNames(
					cls.room,
					room.author._id === UserStore.user._id && cls.isAuthor
				)}
			>
				{room.password && <span>🔒</span>}
				<span title={room.name}>{room.name}</span>
				<span
					className={classNames(cls.status, room.members.length && cls.online)}
				/>
			</div>
		</Button>
	);
};
