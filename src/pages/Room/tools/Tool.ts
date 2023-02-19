import { ToolType } from '../Room.types';

export class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    name: ToolType;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.clearListenEvents();
    }

    set fillColor(color: string) {
        this.ctx.fillStyle = color;
    }

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    clearListenEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
    }
}
