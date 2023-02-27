import { setSettingsCanvas } from "./../../../utils/setSettingsCanvas";
import { BrushParams, DrawPayload, SocketEmit, ToolType } from "../Room.types";
import Point from "./Point";
import { Tool } from "./Tool";
import { Socket } from "socket.io-client";
import { draw } from "../api";

export default class Brush extends Tool {
	mouseDown: boolean;

	constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
		super(canvas, socket, id);
		this.name = ToolType.Brush;
	}

	initListenEvents() {
		this.canvas.onmouseup = this.onMouseUp.bind(this);
		this.canvas.onmousemove = this.onMouseMove.bind(this);
		this.canvas.onmousedown = this.onMouseDown.bind(this);
	}

	onMouseUp(e: MouseEvent) {
		this.mouseDown = false;
	}

	onMouseDown(e: MouseEvent) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.ctx.moveTo(
			e.pageX - this.canvas.offsetLeft,
			e.pageY - this.canvas.offsetTop
		);
	}

	onMouseMove(e: MouseEvent) {
		if (this.mouseDown) {
			this.draw(
				new Point(
					e.pageX - this.canvas.offsetLeft,
					e.pageY - this.canvas.offsetTop
				)
			);

			const payload: DrawPayload = {
				roomId: this.id,
				type: ToolType.Brush,
				params: {
					point: new Point(
						e.pageX - this.canvas.offsetLeft,
						e.pageY - this.canvas.offsetTop
					),
					settings: this.settings,
				},
			};
			draw(payload, this.socket);
		}
	}

	setActive() {
		this.initListenEvents();
		this.setupSettings();
	}

	draw(point: Point) {
		const { x, y } = point;
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		params: BrushParams["params"]
	) {
		setSettingsCanvas(ctx, params.settings);
		const { x, y } = params.point;
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
