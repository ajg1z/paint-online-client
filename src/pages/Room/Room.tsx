import { Canvas } from './Canvas';
import cls from './Room.module.scss';
import { SettingBar } from './SettingBar';
import { Toolbar } from './Toolbar';
import { observer } from 'mobx-react-lite';

export const Room = observer(() => {
    return (
        <div className={cls.Room}>
            <Toolbar />
            <SettingBar />
            <Canvas />
        </div>
    );
});
