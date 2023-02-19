import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import ToolbarStore from '../Toolbar/Toolbar.store';
import Brush from '../tools/Brush';

import cls from './Canvas.module.scss';
import CanvasStore from './Canvas.store';

export const Canvas = observer(() => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            CanvasStore.setCanvas(canvasRef.current);
            ToolbarStore.setTool(new Brush(canvasRef.current));
        }
    }, []);

    return (
        <div className={cls.Canvas}>
            <canvas ref={canvasRef} width={1200} height={600} />
        </div>
    );
});
