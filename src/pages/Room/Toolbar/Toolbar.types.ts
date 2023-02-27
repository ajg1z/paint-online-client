export type LineType = 'solid' | 'dotted' | 'dash';

export interface ToolSettings {
    lineWidth: number;
    lineColor: string;
    lineType: LineType;
    fillColor: string;
}
