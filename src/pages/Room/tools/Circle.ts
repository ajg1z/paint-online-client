import { CircleParams, DrawPayload, ToolType } from "../Room.types";
import Point from "./Point";
import { Tool } from "./Tool";
import { Socket } from "socket.io-client";
import { setSettingsCanvas } from "utils/setSettingsCanvas";
import { draw } from "../api";

export default class Circle extends Tool {
	mouseDown: boolean;
	startX: number;
	startY: number;
	saved: string;
	radius: number;

	constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
		super(canvas, socket, id);
		this.name = ToolType.Circle;
	}

	initListenEvents() {
		this.canvas.onmouseup = this.onMouseUp.bind(this);
		this.canvas.onmousemove = this.onMouseMove.bind(this);
		this.canvas.onmousedown = this.onMouseDown.bind(this);
	}

	setActive() {
		this.initListenEvents();
		this.setupSettings();
	}

	onMouseUp(e: MouseEvent) {
		this.mouseDown = false;

		const payload: DrawPayload = {
			roomId: this.id,
			type: ToolType.Circle,
			params: {
				radius: this.radius,
				settings: this.settings,
				point: new Point(this.startX, this.startY),
			},
		};
		draw(payload, this.socket);
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
			const width = currentX - this.startX;
			const height = currentY - this.startY;
			const point = new Point(this.startX, this.startY);
			this.radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
			this.draw(point);
		}
	}

	draw(point: Point) {
		const { x, y } = point;

		const img = new Image();
		img.src = this.saved;

		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		params: CircleParams["params"]
	) {
		const { point, settings, radius } = params;

		setSettingsCanvas(ctx, settings);
		ctx.beginPath();
		ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
}
