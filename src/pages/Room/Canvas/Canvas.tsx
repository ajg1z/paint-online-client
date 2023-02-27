import { observer } from "mobx-react-lite";
import { FC, useRef } from "react";
import ToolbarStore from "../Toolbar/Toolbar.store";
import { useEffect } from "react";
import cls from "./Canvas.module.scss";
import CanvasStore from "./Canvas.store";
import { useRoomContext } from "../context/useRoomContext";
import { DrawTool, SocketEmit, ToolType } from "../Room.types";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import { setSettingsCanvas } from "utils/setSettingsCanvas";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import { setCanvasImage } from "utils/setCanvasImage";
import { useParams } from "react-router-dom";
import { getImage, saveImage } from "../api";
import { useToast } from "components/Toast";

interface CanvasProps {}

export const Canvas: FC<CanvasProps> = observer(() => {
	const canvasRef = useRef<null | HTMLCanvasElement>(null);
	const { socket, room } = useRoomContext();
	const params = useParams();
	const { toast } = useToast();

	useEffect(() => {
		const installImage = async () => {
			const ctx = canvasRef.current.getContext("2d");
			try {
				const image = await getImage(params.id);
				if (image) {
					setCanvasImage(ctx, image, canvasRef.current);
				}
			} catch (e) {
				toast({ message: "Error get image" });
			}
		};

		if (canvasRef.current && socket) {
			CanvasStore.setCanvas(canvasRef.current);
			ToolbarStore.setupTools(canvasRef.current, socket, params.id);
			installImage();
			socket.on(SocketEmit.DRAW, (res: DrawTool) => {
				draw(res);
			});

			socket.on(SocketEmit.REDO_UNDO, (res: string) => {
				redoUndo(res);
			});
		}
	}, []);

	const draw = (tool: DrawTool) => {
		const ctx = canvasRef.current.getContext("2d");
		switch (tool.type) {
			case ToolType.Brush:
				Brush.staticDraw(ctx, tool.params);
				break;
			case ToolType.Rect:
				Rect.staticDraw(ctx, tool.params);
				break;
			case ToolType.Circle:
				Circle.staticDraw(ctx, tool.params);
				break;
			case ToolType.Eraser:
				Eraser.staticDraw(ctx, tool.params);
				break;
			case ToolType.Line:
				Line.staticDraw(ctx, tool.params);
				break;
			default:
				ctx.beginPath();
		}
		setSettingsCanvas(ctx, ToolbarStore.getActiveSettings());
	};

	const redoUndo = (image: string) => {
		const ctx = canvasRef.current.getContext("2d");
		setCanvasImage(ctx, image, canvasRef.current);
	};

	const onMouseDown = () => {
		const image = canvasRef.current.toDataURL();
		CanvasStore.pushToUndo(image);
		try {
			saveImage(image, params.id);
		} catch (e) {
			toast({ message: "Error save image" });
		}
	};

	const onMouseUp = () => {
		const ctx = canvasRef.current.getContext("2d");
		socket.emit(SocketEmit.DRAW, {
			roomId: room._id,
		});
		ctx.beginPath();
	};

	return (
		<div className={cls.Canvas}>
			<canvas
				width={1200}
				height={580}
				onMouseDown={onMouseDown}
				ref={canvasRef}
				onMouseUp={onMouseUp}
			/>
		</div>
	);
});
