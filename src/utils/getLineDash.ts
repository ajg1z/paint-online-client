import { LineType } from './../pages/Room/Toolbar/Toolbar.types';

export const getLineDash = (type: LineType, width: number) => {
    switch (type) {
        case 'solid':
            return [];
        case 'dotted':
            return [3 + width, 3 + width];
        case 'dash':
            return [20 + width, 5 + width / 2];
        default:
            return [];
    }
};
