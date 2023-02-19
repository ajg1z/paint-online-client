import { ToolType } from '../Room.types';
import Point from './Point';
import { Tool } from './Tool';

export default class Line extends Tool {
    mouseDown: boolean;
    saved: string;
    startX: number;
    startY: number;

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
        this.startX = e.pageX - this.canvas.offsetLeft;
        this.startY = e.pageY - this.canvas.offsetTop;

        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
        this.saved = this.canvas.toDataURL();
    }

    onMouseMove(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(new Point(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop));
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
}
