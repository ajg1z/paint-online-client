import { setSettingsCanvas } from "./../../../utils/setSettingsCanvas";
import { DrawPayload, RectParams, SocketEmit, ToolType } from "../Room.types";
import { Socket } from "socket.io-client";
import Point from "./Point";
import { Tool } from "./Tool";
import { draw } from "../api";

export default class Rect extends Tool {
	mouseDown: boolean;
	startX: number;
	startY: number;
	saved: string;
	width: number;
	height: number;

	constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
		super(canvas, socket, id);
		this.name = ToolType.Rect;
	}

	initListenEvents() {
		this.canvas.onmouseup = this.onMouseUp.bind(this);
		this.canvas.onmousemove = this.onMouseMove.bind(this);
		this.canvas.onmousedown = this.onMouseDown.bind(this);
	}

	onMouseUp(e: MouseEvent) {
		this.mouseDown = false;

		const payload: DrawPayload = {
			roomId: this.id,
			type: ToolType.Rect,
			params: {
				height: this.height,
				width: this.width,
				settings: this.settings,
				point: new Point(this.startX, this.startY),
			},
		};

		draw(payload, this.socket);
	}

	setActive() {
		this.initListenEvents();
		this.setupSettings();
	}

	onMouseDown(e: MouseEvent) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.startX = e.pageX - this.canvas.offsetLeft;
		this.startY = e.pageY - this.canvas.offsetTop;
		this.saved = this.canvas.toDataURL();
	}

	onMouseMove(e: MouseEvent) {
		if (this.mouseDown) {
			const currentX = e.pageX - this.canvas.offsetLeft;
			const currentY = e.pageY - this.canvas.offsetTop;
			this.width = currentX - this.startX;
			this.height = currentY - this.startY;
			const point = new Point(this.startX, this.startY);
			this.draw(point, this.width, this.height);
		}
	}

	draw(point: Point, w: number, h: number) {
		const { x, y } = point;

		const img = new Image();
		img.src = this.saved;

		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.rect(x, y, w, h);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		params: RectParams["params"]
	) {
		const { height, point, width, settings } = params;

		setSettingsCanvas(ctx, settings);
		ctx.beginPath();
		ctx.rect(point.x, point.y, width, height);
		ctx.fill();
		ctx.stroke();
	}
}
