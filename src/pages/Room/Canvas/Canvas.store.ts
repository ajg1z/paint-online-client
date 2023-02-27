import { makeAutoObservable } from "mobx";
import { setCanvasImage } from "utils/setCanvasImage";

class CanvasStore {
	canvas: HTMLCanvasElement;
	undoList: string[] = [];
	redoList: string[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}

	pushToUndo(img: string) {
		this.undoList.push(img);
	}

	pushToRedo(img: string) {
		this.redoList.push(img);
	}

	undo() {
		const ctx = this.canvas.getContext("2d");
		if (this.undoList.length > 0) {
			const dataUrl = this.undoList.pop();
			this.pushToRedo(this.canvas.toDataURL());
			setCanvasImage(ctx, dataUrl, this.canvas);
			return dataUrl;
		} else {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	getImage() {
		return this.canvas.toDataURL();
	}

	redo() {
		const ctx = this.canvas.getContext("2d");
		if (this.redoList.length > 0) {
			const dataUrl = this.redoList.pop();
			this.pushToUndo(this.canvas.toDataURL());
			setCanvasImage(ctx, dataUrl, this.canvas);
			return dataUrl;
		}
	}
}

export default new CanvasStore();
