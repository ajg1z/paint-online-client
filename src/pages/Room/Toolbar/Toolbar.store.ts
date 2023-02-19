import { makeAutoObservable } from 'mobx';
import { Tool } from '../tools/Tool';

class ToolbarStore {
    tool: Tool;

    constructor() {
        makeAutoObservable(this);
    }

    setFillColor(color: string) {
        this.tool.fillColor = color;
    }

    setStrokeColor(color: string) {
        this.tool.strokeColor = color;
    }

    setLineWidth(width: number) {
        this.tool.lineWidth = width;
    }

    setTool(tool: Tool) {
        this.tool = tool;
    }
}

export default new ToolbarStore();
