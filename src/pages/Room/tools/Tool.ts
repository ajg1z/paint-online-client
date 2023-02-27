import { Socket } from 'socket.io-client';
import { action, makeObservable, observable, autorun, reaction } from 'mobx';
import { getLineDash } from 'utils/getLineDash';
import { ToolType } from '../Room.types';
import { ToolSettings } from '../Toolbar/Toolbar.types';

export class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    name: ToolType;
    socket: Socket;
    id: string;

    settings: ToolSettings = {
        lineColor: 'black',
        lineType: 'solid',
        lineWidth: 1,
        fillColor: 'black',
    };

    constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas.getContext('2d');
        makeObservable(this, {
            settings: observable,
            setSettings: action,
        });
    }

    setSettings(settings: ToolSettings) {
        this.settings = {
            fillColor: settings.fillColor,
            lineColor: settings.lineColor,
            lineType: settings.lineType,
            lineWidth: +settings.lineWidth,
        };

        this.setupSettings();
    }

    clearListenEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;
    }

    setupSettings() {
        this.ctx.fillStyle = this.settings.fillColor;
        this.ctx.strokeStyle = this.settings.lineColor;
        this.ctx.lineWidth = +this.settings.lineWidth;
        this.ctx.setLineDash(getLineDash(this.settings.lineType, +this.settings.lineWidth));
    }
}
