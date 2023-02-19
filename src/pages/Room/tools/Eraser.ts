import { ToolType } from '../Room.types';
import Brush from './Brush';
import Point from './Point';
import { Tool } from './Tool';

export default class Eraser extends Brush {
    mouseDown: boolean;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.name = ToolType.Brush;
    }

    draw(point: Point) {
        const { x, y } = point;

        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
    }
}
