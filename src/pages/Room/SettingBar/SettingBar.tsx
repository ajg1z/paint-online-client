import cls from './SettingBar.module.scss';
import ToolbarStore from '../Toolbar/Toolbar.store';
import { ToolType } from '../Room.types';
import { NumberInput } from 'components/Fields/NumberInput/NumberInput';
import { ColorInput } from 'components/Fields/ColorInput/ColorInput';
import { observer } from 'mobx-react-lite';
import { Property } from './components/Property';
import { Select } from 'components/Fields/Select/Select';

export const SettingBar = observer(() => {
    function onChangeSettings(name: string, value: string) {
        ToolbarStore.setSettings({ [name]: value });
    }

    const lineWidth = (
        <Property label='Line width'>
            <NumberInput
                min={1}
                max={100}
                name='lineWidth'
                value={ToolbarStore.getSetting('lineWidth')}
                onChange={(e) => onChangeSettings(e.target.name, e.target.value)}
            />
        </Property>
    );

    const lineColor = (
        <Property label='Color line'>
            <ColorInput
                name='lineColor'
                value={ToolbarStore.getSetting('lineColor')}
                onChange={(e) => onChangeSettings(e.target.name, e.target.value)}
            />
        </Property>
    );

    const fillColor = (
        <Property label='Background line'>
            <ColorInput
                name='fillColor'
                value={ToolbarStore.getSetting('fillColor')}
                onChange={(e) => onChangeSettings(e.target.name, e.target.value)}
            />
        </Property>
    );

    const lineType = (
        <Property label='Line type'>
            <Select
                name='lineType'
                value={ToolbarStore.getSetting('lineType')}
                onChange={(e) => onChangeSettings(e.target.name, e.target.value)}
            >
                <option value={'solid'}>solid</option>
                <option value={'dash'}>dash</option>
                <option value={'dotted'}>dotted</option>
            </Select>
        </Property>
    );

    const toolSettings = () => {
        switch (ToolbarStore.activeTool) {
            case ToolType.Brush:
            case ToolType.Line:
                return (
                    <div className={cls.settingBlock}>
                        {lineWidth}
                        {lineColor}
                        {lineType}
                    </div>
                );
            case ToolType.Circle:
            case ToolType.Rect:
                return (
                    <div className={cls.settingBlock}>
                        {lineWidth}
                        {lineColor}
                        {fillColor}
                        {lineType}
                    </div>
                );
            case ToolType.Eraser:
                return <div className={cls.settingBlock}>{lineWidth}</div>;
        }
    };

    return (
        <>
            <div className={cls.SettingBar}>{toolSettings()}</div>
        </>
    );
});
