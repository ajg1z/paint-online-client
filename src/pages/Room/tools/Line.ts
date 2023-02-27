import { DrawPayload, LineParams, SocketEmit, ToolType } from "../Room.types";
import Point from "./Point";
import { Tool } from "./Tool";
import { Socket } from "socket.io-client";
import { setSettingsCanvas } from "utils/setSettingsCanvas";
import { draw } from "../api";

export default class Line extends Tool {
	mouseDown: boolean;
	saved: string;
	startX: number;
	startY: number;

	constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
		super(canvas, socket, id);
		this.name = ToolType.Line;
	}

	setActive() {
		this.initListenEvents();
		this.setupSettings();
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
			type: ToolType.Line,
			params: {
				settings: this.settings,
				startPoint: new Point(this.startX, this.startY),
				endPoint: new Point(
					e.pageX - this.canvas.offsetLeft,
					e.pageY - this.canvas.offsetTop
				),
			},
		};

		draw(payload, this.socket);
	}

	onMouseDown(e: MouseEvent) {
		this.mouseDown = true;
		this.startX = e.pageX - this.canvas.offsetLeft;
		this.startY = e.pageY - this.canvas.offsetTop;

		this.ctx.beginPath();
		this.ctx.moveTo(
			e.pageX - this.canvas.offsetLeft,
			e.pageY - this.canvas.offsetTop
		);
		this.saved = this.canvas.toDataURL();
	}

	onMouseMove(e: MouseEvent) {
		if (this.mouseDown) {
			this.draw(
				new Point(
					e.pageX - this.canvas.offsetLeft,
					e.pageY - this.canvas.offsetTop
				)
			);
		}
	}

	draw(point: Point) {
		const { x, y } = point;
		const img = new Image();
		img.src = this.saved;
		img.onload = async function () {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.moveTo(this.startX, this.startY);
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		}.bind(this);
	}

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		params: LineParams["params"]
	) {
		const { endPoint, startPoint } = params;

		setSettingsCanvas(ctx, params.settings);
		ctx.moveTo(startPoint.x, startPoint.y);
		ctx.lineTo(startPoint.x, startPoint.y);
		ctx.lineTo(endPoint.x, endPoint.y);
		ctx.stroke();
	}
}
