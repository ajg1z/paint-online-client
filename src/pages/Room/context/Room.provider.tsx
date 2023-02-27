import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { RoomContext } from "./Room.context";
import { Socket, io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { IRoom, SocketEmit, UpdateRoomResponse, UserRoom } from "../Room.types";
import { PageLoader } from "components/PageLoader";
import { LocalStorageTokenKey } from "constans/localStorage";
import { useToast } from "components/Toast";

interface RoomProviderProps {}

export const RoomProvider = (props: PropsWithChildren<RoomProviderProps>) => {
	const [socket, setSocket] = useState<null | Socket>(null);
	const [users, setUsers] = useState<UserRoom[]>([]);
	const [room, setRoom] = useState<IRoom | null>(null);
	const { toast } = useToast();

	const params = useParams();
	const navigate = useNavigate();
	const [isConnect, setIsConnect] = useState(false);
	const [isDisconnect, setDisconnect] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem(LocalStorageTokenKey);

		const socket = io("http://localhost:5000/", {
			auth: {
				authorization: `Bearer ` + token,
			},
		});

		socket.on("connect", () => {
			setIsConnect(true);
			setSocket(socket);

			const payload = {
				id: params.id,
			};

			socket.emit(SocketEmit.CONNECT_ROOM, payload, (res: IRoom) => {
				if (!res) {
					navigate("/notFound");
					return;
				}
				setRoom(res);
			});
			socket.on(SocketEmit.UPDATE_ROOM, (res: UpdateRoomResponse) => {
				setUsers(res.members);
			});
		});

		socket.on("connect_error", (error) => {
			console.log("error", error);

			setDisconnect(true);
			toast({ message: "Connect error", time: 10000 });
		});

		socket.on("disconnect", (reason) => {
			console.log("disconnect", reason);

			setDisconnect(true);
			toast({ message: "Disconnect", time: 10000 });
		});

		return () => {
			socket.emit(SocketEmit.LEAVE_ROOM, { id: params.id });
			socket.disconnect();
		};
	}, []);

	const defaultProps = useMemo(() => {
		return {
			socket,
			users,
			room,
		};
	}, [socket, users, room]);

	if (!isConnect || !users.length || isDisconnect) {
		return <PageLoader />;
	}

	return (
		<RoomContext.Provider value={defaultProps}>
			{props.children}
		</RoomContext.Provider>
	);
};
