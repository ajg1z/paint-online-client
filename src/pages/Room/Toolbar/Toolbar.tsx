import { Button, ButtonTheme } from 'components/Button';
import cls from './Toolbar.module.scss';
import BrushIcon from 'assets/img/brush.png';
import CircleIcon from 'assets/img/circle.png';
import EraserIcon from 'assets/img/eraser.png';
import LineIcon from 'assets/img/line.png';
import RectIcon from 'assets/img/rect.png';
import RedoIcon from 'assets/img/redo.png';
import SaveIcon from 'assets/img/save.png';
import UndoIcon from 'assets/img/undo.png';
import { observer } from 'mobx-react-lite';
import { ToolType } from '../Room.types';
import ToolbarStore from './Toolbar.store';
import Brush from '../tools/Brush';
import { CanvasStore } from '../Canvas';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';
import cn from 'classnames';

export const Toolbar = observer(() => {
    function setTool(type: ToolType) {
        switch (type) {
            case ToolType.Brush:
                ToolbarStore.setTool(new Brush(CanvasStore.canvas));
                break;
            case ToolType.Circle:
                ToolbarStore.setTool(new Circle(CanvasStore.canvas));
                break;
            case ToolType.Line:
                ToolbarStore.setTool(new Line(CanvasStore.canvas));
                break;
            case ToolType.Rect:
                ToolbarStore.setTool(new Rect(CanvasStore.canvas));
                break;
            case ToolType.Eraser:
                ToolbarStore.setTool(new Eraser(CanvasStore.canvas));
                break;
        }
    }

    console.log('name', ToolbarStore.tool?.name);

    return (
        <div className={cls.Toolbar}>
            <div className={cls.paintTools}>
                <Button
                    className={cn(ToolbarStore.tool?.name === ToolType.Brush && cls.selectedTool)}
                    theme={ButtonTheme.Clear}
                    onClick={() => setTool(ToolType.Brush)}
                >
                    <img src={BrushIcon} alt='brush' />
                </Button>

                <Button
                    className={cn(ToolbarStore.tool?.name === ToolType.Circle && cls.selectedTool)}
                    theme={ButtonTheme.Clear}
                    onClick={() => setTool(ToolType.Circle)}
                >
                    <img src={CircleIcon} alt='circle' />
                </Button>

                <Button
                    className={cn(ToolbarStore.tool?.name === ToolType.Eraser && cls.selectedTool)}
                    theme={ButtonTheme.Clear}
                    onClick={() => setTool(ToolType.Eraser)}
                >
                    <img src={EraserIcon} alt='eraser' />
                </Button>

                <Button
                    className={cn(ToolbarStore.tool?.name === ToolType.Line && cls.selectedTool)}
                    theme={ButtonTheme.Clear}
                    onClick={() => setTool(ToolType.Line)}
                >
                    <img src={LineIcon} alt='line' />
                </Button>

                <Button
                    className={cn(ToolbarStore.tool?.name === ToolType.Rect && cls.selectedTool)}
                    theme={ButtonTheme.Clear}
                    onClick={() => setTool(ToolType.Rect)}
                >
                    <img src={RectIcon} alt='rect' />
                </Button>
            </div>

            <div className={cls.pageTools}>
                <Button theme={ButtonTheme.Clear}>
                    <img src={RedoIcon} alt='redo' />
                </Button>
                <Button theme={ButtonTheme.Clear}>
                    <img src={SaveIcon} alt='save' />
                </Button>
                <Button theme={ButtonTheme.Clear}>
                    <img src={UndoIcon} alt='undo' />
                </Button>
            </div>
        </div>
    );
});
