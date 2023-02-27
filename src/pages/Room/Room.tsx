import { Canvas } from "./Canvas";
import cls from "./Room.module.scss";
import { SettingBar } from "./SettingBar";
import { Toolbar } from "./Toolbar";
import { observer } from "mobx-react-lite";
import { useRoomContext } from "./context/useRoomContext";
import { Sidebar } from "./Sidebar";

export const Room = observer(() => {
	const { users } = useRoomContext();
	return (
		<div className={cls.Room}>
			<Toolbar />
			<SettingBar />
			<div className={cls.body}>
				<Canvas />
				<Sidebar members={users} />
			</div>
		</div>
	);
});
