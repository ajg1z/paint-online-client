import { ToolSettings } from './../pages/Room/Toolbar/Toolbar.types';
import { getLineDash } from './getLineDash';

export const setSettingsCanvas = (ctx: CanvasRenderingContext2D, settings: ToolSettings) => {
    ctx.fillStyle = settings.fillColor;
    ctx.strokeStyle = settings.lineColor;
    ctx.setLineDash(getLineDash(settings.lineType, settings.lineWidth));
    ctx.lineWidth = settings.lineWidth;
};
