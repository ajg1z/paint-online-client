import { ToolType } from '../Room.types';
import Point from './Point';
import { Tool } from './Tool';

export default class Circle extends Tool {
    mouseDown: boolean;
    startX: number;
    startY: number;
    saved: string;

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
            const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
            this.draw(point, radius);
        }
    }

    draw(point: Point, r: number) {
        const { x, y } = point;

        const img = new Image();
        img.src = this.saved;

        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        };
    }
}
