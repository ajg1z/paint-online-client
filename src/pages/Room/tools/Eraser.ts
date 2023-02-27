import { DrawPayload, EraserParams, SocketEmit, ToolType } from "../Room.types";
import Brush from "./Brush";
import Point from "./Point";
import { Socket } from "socket.io-client";
import { setSettingsCanvas } from "utils/setSettingsCanvas";
import { draw } from "../api";

export default class Eraser extends Brush {
	mouseDown: boolean;

	constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
		super(canvas, socket, id);
		this.name = ToolType.Eraser;
		this.settings.lineWidth = 5;
		this.settings.lineColor = "white";
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
				type: ToolType.Eraser,
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

	draw(point: Point) {
		const { x, y } = point;

		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		params: EraserParams["params"]
	) {
		setSettingsCanvas(ctx, params.settings);
		const { x, y } = params.point;
		ctx.lineTo(x, y);
		ctx.stroke();
	}

	setActive() {
		this.initListenEvents();
		this.setupSettings();
	}
}
