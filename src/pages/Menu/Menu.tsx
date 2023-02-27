import classNames from "classnames";
import { Button, ButtonTheme } from "components/Button";
import { TextInput } from "components/Fields/TextInput/TextInput";
import { PropsWithChildren, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cls from "./Menu.module.scss";
import UserStore from "User";
import { observer } from "mobx-react-lite";
import { AuthByName } from "./AuthByName";
import { $api } from "config/axios";
import { CreateRoom } from "./CreateRoom";
import { IRoom } from "pages/Room";
import { RoomItem } from "./RoomItem";
import { AccessRoom } from "./AccessRoom/AccessRoom";
import { LocalStorageTokenKey } from "constans/localStorage";

interface MenuProps {
	className?: string;
}

export const Menu = observer((props: PropsWithChildren<MenuProps>) => {
	const { className } = props;
	const [search, setSearch] = useState("");
	const [isCreateRoom, setCreateRoom] = useState(false);
	const [isAccessRoom, setAccessRoom] = useState(false);
	const [selectedRoom, setSelectRoom] = useState<null | IRoom>(null);

	const [rooms, setRooms] = useState<IRoom[]>([]);

	const [errorSearch, setErrorSearch] = useState("");
	const navigate = useNavigate();

	const navigateToRoom = (room: IRoom) => {
		setSelectRoom(room);
		if (room.password) {
			setAccessRoom(true);
		} else {
			navigate("/room/" + room._id);
		}
	};

	const searchRoom = async (query?: string) => {
		try {
			const res = await $api.get("room", {
				params: { query: query || search },
			});
			if (res.data) setRooms(res.data);
		} catch (e) {
			setErrorSearch("Error search");
		}
	};

	const onApplyAccess = (password: string) => {
		if (selectedRoom.password === password) {
			navigate(`/room/${selectedRoom._id}`);
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (UserStore.user) searchRoom();
	}, [UserStore.user]);

	const onLogout = () => {
		UserStore.setUser(null);
		localStorage.removeItem(LocalStorageTokenKey);
	};

	return (
		<>
			{isCreateRoom && (
				<CreateRoom
					onClose={() => setCreateRoom(false)}
					fetchMyRooms={searchRoom}
				/>
			)}

			{isAccessRoom && (
				<AccessRoom
					onApply={onApplyAccess}
					onClose={() => {
						setAccessRoom(false);
						setSelectRoom(null);
					}}
				/>
			)}

			<div className={classNames(cls.Menu, className)}>
				<header className={cls.header}>
					<h2 className={cls.title}>Paint</h2>
					{UserStore.user && (
						<>
							<TextInput
								value={search}
								placeholder="Input room name..."
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button theme={ButtonTheme.Clear} onClick={() => searchRoom()}>
								Search
							</Button>
							{errorSearch && <p>{errorSearch}</p>}
							<Button onClick={() => setCreateRoom(true)}>Create room</Button>
							<Button className={cls.logout} onClick={onLogout}>
								Logout
							</Button>
						</>
					)}
				</header>

				{UserStore.user ? (
					<main className={cls.content}>
						{rooms?.map((room) => (
							<RoomItem key={room._id} room={room} navigate={navigateToRoom} />
						))}
					</main>
				) : (
					<AuthByName />
				)}
			</div>
		</>
	);
});
