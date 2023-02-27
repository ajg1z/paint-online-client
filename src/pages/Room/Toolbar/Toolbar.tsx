import { Button, ButtonTheme } from "components/Button";
import cls from "./Toolbar.module.scss";
import BrushIcon from "assets/img/brush.png";
import CircleIcon from "assets/img/circle.png";
import EraserIcon from "assets/img/eraser.png";
import LineIcon from "assets/img/line.png";
import RectIcon from "assets/img/rect.png";
import RedoIcon from "assets/img/redo.png";
import SaveIcon from "assets/img/save.png";
import UndoIcon from "assets/img/undo.png";
import { observer } from "mobx-react-lite";
import { ToolType } from "../Room.types";
import ToolbarStore from "./Toolbar.store";
import cn from "classnames";
import { CanvasStore } from "../Canvas";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "app/providers/router";
import { useRoomContext } from "../context/useRoomContext";
import { redoUndo, saveImage } from "../api";
import { useToast } from "components/Toast";

export const Toolbar = observer(() => {
	const navigate = useNavigate();
	const { toast } = useToast();

	function setActiveTool(type: ToolType) {
		ToolbarStore.setActiveTool(type);
	}

	const { room, socket } = useRoomContext();
	const params = useParams();

	const exit = () => {
		navigate(RoutePath.menu);
	};

	const onRedo = () => {
		const image = CanvasStore.redo();
		redoUndo(socket, image, params.id);
	};

	const onUndo = () => {
		const image = CanvasStore.undo();
		redoUndo(socket, image, params.id);
	};

	const onSaveImage = async () => {
		try {
			const data = await saveImage(CanvasStore.getImage(), params.id);
			if (data) {
				toast({ message: "Image saved" });
			} else toast({ message: "Error save image" });
		} catch (e) {
			toast({ message: "Error save image" });
		}
	};

	return (
		<div className={cls.Toolbar}>
			<div className={cls.paintTools}>
				<Button
					className={cn(
						ToolbarStore.activeTool === ToolType.Brush && cls.selectedTool
					)}
					theme={ButtonTheme.Clear}
					title="Brush"
					onClick={() => setActiveTool(ToolType.Brush)}
				>
					<img src={BrushIcon} alt="brush" />
				</Button>

				<Button
					className={cn(
						ToolbarStore.activeTool === ToolType.Circle && cls.selectedTool
					)}
					theme={ButtonTheme.Clear}
					title="Circle"
					onClick={() => setActiveTool(ToolType.Circle)}
				>
					<img src={CircleIcon} alt="circle" />
				</Button>

				<Button
					className={cn(
						ToolbarStore.activeTool === ToolType.Eraser && cls.selectedTool
					)}
					theme={ButtonTheme.Clear}
					title="Eraser"
					onClick={() => setActiveTool(ToolType.Eraser)}
				>
					<img src={EraserIcon} alt="eraser" />
				</Button>

				<Button
					className={cn(
						ToolbarStore.activeTool === ToolType.Line && cls.selectedTool
					)}
					theme={ButtonTheme.Clear}
					title="Line"
					onClick={() => setActiveTool(ToolType.Line)}
				>
					<img src={LineIcon} alt="line" />
				</Button>

				<Button
					className={cn(
						ToolbarStore.activeTool === ToolType.Rect && cls.selectedTool
					)}
					theme={ButtonTheme.Clear}
					title="Rect"
					onClick={() => setActiveTool(ToolType.Rect)}
				>
					<img src={RectIcon} alt="rect" />
				</Button>
			</div>

			<h2 className={cls.nameRoom}>Name room: {room?.name}</h2>

			<div className={cls.pageTools}>
				<Button title="undo" theme={ButtonTheme.Clear} onClick={onUndo}>
					<img src={UndoIcon} alt="undo" />
				</Button>

				<Button theme={ButtonTheme.Clear} onClick={onSaveImage}>
					<img src={SaveIcon} alt="save" />
				</Button>

				<Button title="redo" theme={ButtonTheme.Clear} onClick={onRedo}>
					<img src={RedoIcon} alt="redo" />
				</Button>
			</div>

			<Button onClick={exit}>Exit</Button>
		</div>
	);
});
