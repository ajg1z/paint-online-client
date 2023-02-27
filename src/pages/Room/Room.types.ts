import { ToolSettings } from "./Toolbar/Toolbar.types";
import { Socket } from "socket.io-client";
import { User } from "User";
import Point from "./tools/Point";

export enum ToolType {
	Brush = "brush",
	Rect = "rect",
	Circle = "circle",
	Line = "line",
	Eraser = "eraser",
}

export enum SocketEmit {
	CONNECT_ROOM = "connect_room",
	UPDATE_ROOM = "update_room",
	DRAW = "draw",
	REDO_UNDO = "redo_undo",
	LEAVE_ROOM = "leave_room",
}

export interface DrawPayload {
	roomId: string;
	type: ToolType;
	params: DrawTool["params"];
}

export interface IRoom {
	name: string;
	_id: string;
	author: User;
	members: User[];
	password?: string;
}

export enum UserRole {
	ADMIN = 0,
	USER = 1,
}

export type UserRoom = User & { role: UserRole; isForbiddenDraw: boolean };

export interface IRoomContext {
	socket: Socket | null;
	users: UserRoom[];
	room: IRoom | null;
}

export interface UpdateRoomResponse {
	members: UserRoom[];
}

export interface BrushParams {
	type: ToolType.Brush;
	params: {
		point: Point;
		settings: ToolSettings;
	};
}

export interface EraserParams {
	type: ToolType.Eraser;
	params: {
		point: Point;
		settings: ToolSettings;
	};
}

export interface RectParams {
	type: ToolType.Rect;
	params: {
		point: Point;
		width: number;
		height: number;
		settings: ToolSettings;
	};
}

export interface CircleParams {
	type: ToolType.Circle;
	params: {
		point: Point;
		radius: number;
		settings: ToolSettings;
	};
}

export interface LineParams {
	type: ToolType.Line;
	params: {
		startPoint: Point;
		endPoint: Point;
		settings: ToolSettings;
	};
}

export type DrawTool =
	| BrushParams
	| RectParams
	| EraserParams
	| CircleParams
	| LineParams;
