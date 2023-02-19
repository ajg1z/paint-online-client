import { ToolType } from '../Room.types';
import Point from './Point';
import { Tool } from './Tool';

export default class Brush extends Tool {
    mouseDown: boolean;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.name = ToolType.Brush;
        this.initListenEvents();
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
        this.ctx.moveTo(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
    }

    onMouseMove(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(new Point(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop));
        }
    }

    draw(point: Point) {
        const { x, y } = point;

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}
