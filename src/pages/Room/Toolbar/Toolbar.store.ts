import { makeAutoObservable } from "mobx";
import { ToolType } from "../Room.types";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Rect from "../tools/Rect";
import { ToolSettings } from "./Toolbar.types";
import { Socket } from "socket.io-client";

class ToolbarStore {
	brush: Brush | null = null;
	line: Line | null = null;
	eraser: Eraser | null = null;
	rect: Rect | null = null;
	circle: Circle | null = null;

	activeTool: ToolType | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setupTools(canvas: HTMLCanvasElement, socket: Socket, id: string) {
		this.brush = new Brush(canvas, socket, id);
		this.circle = new Circle(canvas, socket, id);
		this.line = new Line(canvas, socket, id);
		this.rect = new Rect(canvas, socket, id);
		this.eraser = new Eraser(canvas, socket, id);
	}

	getActiveSettings() {
		switch (this.activeTool) {
			case ToolType.Brush:
				return this.brush.settings;
			case ToolType.Circle:
				return this.circle.settings;
			case ToolType.Eraser:
				return this.eraser.settings;
			case ToolType.Line:
				return this.line.settings;
			case ToolType.Rect:
				return this.rect.settings;
			default:
				return this.brush.settings;
		}
	}

	clearEvents() {
		this.brush?.clearListenEvents();
		this.circle?.clearListenEvents();
		this.rect?.clearListenEvents();
		this.eraser?.clearListenEvents();
		this.line?.clearListenEvents();
	}

	setSettings(settings: Partial<ToolSettings>) {
		switch (this.activeTool) {
			case ToolType.Brush:
				this.brush.setSettings({ ...this.brush.settings, ...settings });
				break;
			case ToolType.Circle:
				this.circle.setSettings({ ...this.circle.settings, ...settings });
				break;
			case ToolType.Eraser:
				this.eraser.setSettings({ ...this.eraser.settings, ...settings });
				break;
			case ToolType.Line:
				this.line.setSettings({ ...this.line.settings, ...settings });
				break;
			case ToolType.Rect:
				this.rect.setSettings({ ...this.rect.settings, ...settings });
				break;
		}
	}

	getSetting(name: keyof ToolSettings) {
		return this?.[this.activeTool]?.settings?.[name];
	}

	setActiveTool(type: ToolType) {
		this.clearEvents();

		this.activeTool = type;

		switch (type) {
			case ToolType.Brush:
				this.brush.setActive();
				break;
			case ToolType.Circle:
				this.circle.setActive();
				break;
			case ToolType.Eraser:
				this.eraser.setActive();
				break;
			case ToolType.Line:
				this.line.setActive();
				break;
			case ToolType.Rect:
				this.rect.setActive();
				break;
		}
	}
}

export default new ToolbarStore();
