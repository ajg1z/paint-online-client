import { DrawPayload, SocketEmit } from "pages/Room/Room.types";
import { Socket } from "socket.io-client";

export const draw = (params: DrawPayload, socket: Socket) => {
	socket.emit(SocketEmit.DRAW, params);
};

export const redoUndo = (socket: Socket, image: string, roomId: string) => {
	socket.emit(SocketEmit.REDO_UNDO, { roomId, image });
};
